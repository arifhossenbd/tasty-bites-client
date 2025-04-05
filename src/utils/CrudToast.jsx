import toast from "react-hot-toast";

const baseStyle = {
  padding: "16px",
  border: "1px solid",
  borderRadius: "8px",
  maxWidth: "420px",
};

const actionMessage = {
  create: {
    title: "Created Successfully",
    icon: "🆕",
    gotMessage: (itemName) => `${itemName || "Item"} was successfully created`,
  },
  update: {
    title: "Updated Successfully",
    icon: "🔄",
    gotMessage: (itemName) => `${itemName || "Item"} was successfully updated`,
  },
  patch: {
    title: "Modified Successfully",
    icon: "🪡",
    gotMessage: (itemName) => `${itemName || "Item"} was partially updated`,
  },
  delete: {
    title: "Deleted Successfully",
    icon: "🗑️",
    gotMessage: (itemName) => `${itemName || "Item"} was successfully deleted`,
  },
};

const errorMessage = {
  default: {
    title: "Operation Failed",
    message: "Something went wrong",
    icon: "❌",
  },
  notFound: {
    title: "Not Found",
    message: "The request item doesn't exist",
    icon: "🔍",
  },
  conflict: {
    title: "Conflict",
    message: "This item already exist",
    icon: "⚠️",
  },
  serverError: {
    title: "Server Error",
    message: "Please try again later",
    icon: "🚨",
  },
};

const loadingMessage = {
  create: "Creating...",
  update: "Updating...",
  patch: "Modifying...",
  delete: "Deleting...",
};

export const crudSuccess = (action, itemName = null) => {
  const config = actionMessage[action] || {
    title: "Success",
    icon: "✔️",
    gotMessage: () => "Operation completed",
  };

  toast.success(
    <div className="flex items-center gap-3 text-stone-700">
      <span className="text-lg mt-0.5">{config.icon}</span>
      <div>
        <h2 className="text-lg font-bold">{config.title}</h2>
        <p className="text-sm">{config.gotMessage(itemName)}</p>
      </div>
    </div>,
    {
      duration: 3000,
      style: {
        ...baseStyle,
        background: "#f0fdf4",
        borderColor: "#4ade80",
      },
    }
  );
};

export const crudError = (error = {}, customConfig = {}) => {
  const errorType = error.code || error.status || "default";
  const defaultConfig = errorMessage[errorType] || errorMessage.default;

  const config = {
    ...defaultConfig,
    ...customConfig,
    message: customConfig.message || error.message || defaultConfig.message,
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
      duration: 3000,
      style: {
        ...baseStyle,
        background: "#fef2f2",
        borderColor: "#f87171",
      },
    }
  );
};

export const crudLoading = (action) => {
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

export const dismissCrudToast = toast.dismiss;
export const createToast = (itemName) => crudSuccess("create", itemName);
export const updateToast = (itemName) => crudSuccess("update", itemName);
export const patchToast = (itemName) => crudSuccess("patch", itemName);
export const deleteToast = (itemName) => crudSuccess("delete", itemName);
