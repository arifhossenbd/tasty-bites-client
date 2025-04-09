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
    message: "The requested item doesn't exist",
    icon: "🔍",
  },
  conflict: {
    title: "Conflict",
    message: "This item already exists",
    icon: "⚠️",
  },
  serverError: {
    title: "Server Error",
    message: "Please try again later",
    icon: "🚨",
  },
};

export const crudSuccess = (action, itemName = null) => {
  const config = actionMessage[action] || {
    title: "Success",
    icon: "✔️",
    gotMessage: () => "Operation completed",
  };

  // Store the toast ID and dismiss it after duration
  const toastId = toast.success(
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

  // Automatically dismiss after duration
  setTimeout(() => {
    toast.dismiss(toastId);
  }, 3000);
};

export const crudError = (error = {}, customConfig = {}) => {
  const errorType = error?.status || "default";
  const defaultConfig = errorMessage[errorType] || errorMessage.default;

  const config = {
    ...defaultConfig,
    ...customConfig,
    message: customConfig.message || error.message || defaultConfig.message,
  };

  // Store the toast ID and dismiss it after duration
  const toastId = toast.error(
    <div className="flex items-center gap-3 text-stone-700">
      <span className="text-lg mt-0.5">{config.icon}</span>
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

  // Automatically dismiss after duration
  setTimeout(() => {
    toast.dismiss(toastId);
  }, 3000);
};

export const confirmToast = ({
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) => {
  const toastId = `confirm-${Date.now()}`;

  const toastInstance = toast(
    (t) => (
      <div className="flex flex-col gap-3 text-stone-700">
        <div className="flex items-center gap-3">
          <span className="text-lg mt-0.5">❓</span>
          <div>
            <h2 className="text-lg font-bold">Confirm Action</h2>
            <p className="text-sm">{message}</p>
          </div>
        </div>
        <div className="flex gap-2 justify-end mt-2">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              onConfirm?.();
              clearTimeout(timeoutId);
            }}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
          >
            {confirmText}
          </button>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              onCancel?.();
              clearTimeout(timeoutId);
            }}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
          >
            {cancelText}
          </button>
        </div>
      </div>
    ),
    {
      duration: 10000,
      style: {
        ...baseStyle,
        background: "#fff",
        borderColor: "#fcd34d",
      },
      id: toastId,
    }
  );

  const timeoutId = setTimeout(() => {
    toast.dismiss(toastId);
    onCancel?.();
  }, 10000);

  return toastInstance;
};
export const createToast = (itemName) => crudSuccess("create", itemName);
export const updateToast = (itemName) => crudSuccess("update", itemName);
export const patchToast = (itemName) => crudSuccess("patch", itemName);
export const deleteToast = (itemName) => crudSuccess("delete", itemName);
