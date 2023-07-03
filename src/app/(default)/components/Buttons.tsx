interface IButtonEvent {
    onClick: () => void
}

export const SubmitButton = () => {
    return (
        <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Save
        </button>
    );
};

export const CancelButton: React.FC<IButtonEvent> = ({ onClick }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
        </button>
    );
};

interface IModalButton {
    showModal: () => void;
    children: React.ReactNode;
}

export const ModalButton: React.FC<IModalButton> = ({ showModal, children }) => {
    return (
        <button
            className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={showModal}>
            {children}
        </button>
    );
};
