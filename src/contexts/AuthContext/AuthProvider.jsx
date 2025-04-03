import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import {
  authError,
  authLoading,
  authSuccess,
  dismissAuthToast,
} from "../../utils/authToast";
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  signOut,
} from "firebase/auth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import auth from "../../firebase/firebase.config";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic();

  const navigate = useNavigate();
  const location = useLocation();

  const providers = {
    google: new GoogleAuthProvider(),
    github: new GithubAuthProvider(),
    facebook: new FacebookAuthProvider(),
  };

  const handleNavigate = () => {
    const from = location?.state?.pathname || "/";
    navigate(from, { replace: true });
    return;
  };

  const authAction = async (action, authFunction) => {
    const toastId = authLoading(action);
    try {
      setLoading(true);
      const result = await authFunction();
      setUser(result?.user);
      authSuccess(action, result?.user);
      handleNavigate();
      return result;
    } catch (error) {
      authError(error);
    } finally {
      dismissAuthToast(toastId);
      setLoading(false);
    }
  };

  const signUp = (email, password, name, photo) => {
    authAction("signUp", () => {
      const result = createUserWithEmailAndPassword(auth, email, password);
      if ((name, photo)) {
        updateProfile(result?.user, {
          displayName: name,
          photoURL: photo,
        });
        return result;
      }
    });
  };

  const signIn = (email, password) => {
    authAction("signIn", () =>
      signInWithEmailAndPassword(auth, email, password)
    );
  };

  const socialSignIn = (providerName) => {
    const provider = providers[providerName];
    try {
      const result = authAction("signIn", () =>
        signInWithPopup(auth, provider)
      );
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser = async (name, photo) => {
    try {
      if (!auth.currentUser) return;
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });
      setUser({ ...auth.currentUser });
    } catch (error) {
      console.error(error);
    }
  };

  const signOutUser = () => {
    authAction("signOut", () => signOut(auth));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
      if (currentUser) {
        const user = { email: currentUser?.email };
        console.log(user);
        try {
          const res = axiosPublic.post("/jwt", user);
          const token = res?.data?.token;
          if (token) {
            localStorage.setItem("access-token", token);
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        axiosPublic.post("/logout");
        localStorage.removeItem("access-token");
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    setLoading,
    signUp,
    updateUser,
    signIn,
    google: () => socialSignIn("google"),
    github: () => socialSignIn("github"),
    facebook: () => socialSignIn("facebook"),
    signOut: signOutUser,
  };
  return (
    <AuthContext.Provider value={authInfo}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
