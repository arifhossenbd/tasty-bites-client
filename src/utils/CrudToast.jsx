import toast from "react-hot-toast";

const baseStyle = {
  padding: "10px",
  border: "1px solid",
  borderRadius: "8px",
  maxWidth: "420px",
};

export const showSuccessToast = (
  heading,
  data = {},
  defaultMsg,
  icon = "✅"
) => {

  const toastId = toast(
    <div className="flex items-center gap-3 text-stone-700 w-full">
      <span className="text-lg mt-0.5">{icon}</span>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">{heading}</h2>
        {data ? (
          <div className="flex items-center gap-2">
            <figure className="h-20 w-20">
              <img
                className="w-full h-full rounded-md object-cover"
                src={data?.image}
                alt={data?.name}
              />
            </figure>
            <div className="flex flex-col gap-1">
              <p className="badge badge-warning w-fit rounded-full text-white text-sm">
                {data?.category}
              </p>
              <h1 className="font-semibold text-stone-900">{data?.name}</h1>
              <p className="text-sm font-semibold text-yellow-600">
                ${data?.price ? Number(data?.price?.toFixed(2)) : 0.0}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-sm">{defaultMsg}</p>
        )}
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
  setTimeout(() => {
    toast.dismiss(toastId);
  }, 3000);
};

export const showErrorToast = (title, message, icon = "❌") => {
  const toastId = toast(
    <div className="flex items-center gap-3 text-stone-700 w-full">
      <span className="text-lg mt-0.5">{icon}</span>
      <div>
        <h2 className="text-lg font-bold">{title}</h2>
        <div className="text-sm">{message}</div>
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
  setTimeout(() => {
    toast.dismiss(toastId);
  }, 5000);
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
      <div className="flex flex-col gap-3 text-stone-700 w-full">
        <div className="flex items-center gap-3">
          <span className="text-lg mt-0.5">❓</span>
          <div>
            <h2 className="text-lg font-bold">Confirm Action</h2>
            <div className="text-sm">{message}</div>
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
