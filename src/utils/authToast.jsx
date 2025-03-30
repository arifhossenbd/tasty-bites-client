import toast from "react-hot-toast";

const baseStyle = {
  padding: "16px",
  border: "1px solid",
  borderRadius: "8px",
  maxWidth: "420px",
};

const actionMessage = {
  signUp: {
    title: "Account created",
    icon: "🎉",
    gotMessage: (user) => `Welcome ${user?.displayName || ""}! You're all set`,
  },
  signIn: {
    title: "Welcome back!",
    icon: "👋",
    gotMessage: (user) => `Good to see you ${user?.displayName || ""}`,
  },
  signOut: {
    title: "Signed Out",
    icon: "🔒",
    gotMessage: () => "Come back soon!",
  },
};

const errorMessage = {
  "auth/email-already-in-use": {
    title: "Email Taken",
    message: "This email is already registered",
    icon: "📧",
  },
  "auth/wrong-password": {
    title: "Wrong Password",
    message: "Please check your password",
    icon: "🔑",
  },
  "auth/user-not-found": {
    title: "Account Not Found",
    message: "Please sign up first",
    icon: "👤",
  },
  "auth/too-many-requests": {
    title: "Too Many Attempts",
    message: "Please try again later",
    icon: "⏳",
  },
};

const loadingMessage = {
  signIn: "Signing in...",
  signUp: "Creating your account...",
  signOut: "Signing out...",
};

export const authSuccess = (action, user = null) => {
  const config = actionMessage[action] || {
    title: "Success",
    icon: "✔️",
    gotMessage: () => "Action completed",
  };

  toast.success(
    <div className="flex items-center gap-3 text-stone-700">
      <span className="text-lg mt-0.5">{config.icon}</span>
      <div>
        <h2 className="text-lg font-bold">{config.title}</h2>
        <p className="text-sm">{config.gotMessage(user)}</p>
      </div>
    </div>,
    {
      duration: 2000,
      style: {
        ...baseStyle,
        background: "#f0fdf4",
        borderColor: "#4ade80",
      },
    }
  );
};

export const authError = (error) => {
  const config = errorMessage[error.code] || {
    title: "Error",
    message: error.message || "Something went wrong",
    icon: "❌",
  };
  toast.error(
    <div className="flex items-center gap-3 text-stone-700">
      <span className="text-lg mt-0 5">{config.icon}</span>
      <div>
        <h2 className="text-lg font-bold">{config.title}</h2>
        <p className="text-sm">{config.message}</p>
      </div>
    </div>,
    {
      duration: 2000,
      style: {
        ...baseStyle,
        background: "#fef2f2",
        borderColor: "#f87171",
      },
    }
  );
};

export const authLoading = (action) => {
  return toast.loading(
    <div className="flex items-center gap-3 text-stone-700">
      <span className="text-lg">⏳</span>
      <p>{loadingMessage[action] || "Processing..."}</p>
    </div>,
    {
      duration: 2000,
      style: { ...baseStyle, background: "#fafaf9", borderColor: "#78716c" },
    }
  );
};

export const dismissAuthToast = toast.dismiss;
