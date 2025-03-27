import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useLocation, useNavigate } from "react-router-dom";
import {
  authError,
  authLoading,
  authSuccess,
  dismissAuthToast,
} from "../../utils/authToast";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

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
    authAction("signUp", async () => {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if ((name, photo)) {
        await updateProfile(result?.user, {
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

  const socialSignIn = async (providerName) => {
    const provider = providers[providerName];
    try {
      const result = await authAction("signIn", () =>
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
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
