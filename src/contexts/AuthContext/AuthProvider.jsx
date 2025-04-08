import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import {
  authError,
  authLoading,
  authSuccess,
  dismissAuthToast,
} from "../../utils/AuthToast";
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
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  const navigate = useNavigate();
  const location = useLocation();

  const providers = {
    google: new GoogleAuthProvider(),
    github: new GithubAuthProvider(),
    facebook: new FacebookAuthProvider(),
  };

  const handleNavigate = () => {
    const from = location?.state?.from || "/";
    navigate(from, { replace: true });
    return;
  };

  const authAction = async (action, authFunction) => {
    const toastId = authLoading(action);
    try {
      const result = await authFunction();
      setUser(result?.user);
      authSuccess(action, result?.user);
      return result;
    } catch (error) {
      authError(error);
      throw error;
    } finally {
      dismissAuthToast(toastId);
    }
  };

  const signUp = async (email, password, name, photo) => {
    try {
      const result = await authAction("signUp", () =>
        createUserWithEmailAndPassword(auth, email, password)
      );
      if (name && photo) {
        await updateProfile(result.user, {
          displayName: name,
          photoURL: photo,
        });
        setUser({ ...result.user });
      }
      handleNavigate();
      return result;
    } catch (error) {
      console.error("SignUp Error:", error);
      throw error;
    }
  };

  const signIn = async (email, password) => {
    try {
      const result = await authAction("signIn", () =>
        signInWithEmailAndPassword(auth, email, password)
      );
      handleNavigate();
      return result;
    } catch (error) {
      console.error("SignIn Error:", error);
      throw error;
    }
  };

  const socialSignIn = async (providerName) => {
    const provider = providers[providerName];
    try {
      const result = await authAction("signIn", () =>
        signInWithPopup(auth, provider)
      );
      handleNavigate();
      return result;
    } catch (error) {
      console.error("Social SignIn Error:", error);
      throw error;
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
      throw error;
    }
  };

  const signOutUser = async () => {
    try {
      await authAction("signOut", () => signOut(auth));
    } catch (error) {
      console.error("SignOut Error:", error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser || null);
      if (currentUser) {
        const user = { email: currentUser?.email };
        try {
          const res = await axiosPublic.post("/jwt", user);
          const token = res?.data?.token;
          if (token) {
            localStorage.setItem("access-token", token);
          }
        } catch (error) {
          console.error("JWT Error:", error);
          throw error;
        }
      } else {
        try {
          await axiosPublic.post("/logout");
          localStorage.removeItem("access-token");
        } catch (error) {
          console.error("JWT Logout Error:", error);
          throw error;
        }
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
