import FoodForm from "../component/FoodForm/FoodForm";

const Modal = ({ isOpen, onClose, food, onUpdateSuccess }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      {/* Modal container */}
      <div className="bg-stone-50 rounded-md shadow-xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal header */}
        <div className="border-b border-stone-200 p-4 md:p-6 sticky top-0 bg-stone-50 z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-xl md:text-2xl font-bold text-stone-700">
              Update Food
            </h2>
            <button
              onClick={onClose}
              className="text-stone-500 hover:text-yellow-500 text-2xl md:text-3xl font-light"
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>
        </div>
        <div className="overflow-y-auto flex-1 px-4 md:px-6">
          <FoodForm food={food} btnText="Update" onSubmit={onUpdateSuccess} onClose={onClose} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
