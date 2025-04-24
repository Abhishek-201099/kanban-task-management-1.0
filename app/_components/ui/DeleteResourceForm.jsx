export default function DeleteResourceForm({
  resourceName,
  onCloseModal,
  onConfirm,
}) {
  return (
    <div className="flex flex-col gap-10">
      <p className="text-2xl [word-spacing:4px] font-medium text-accent-300 text-center">
        Are you sure you want to delete board '{resourceName}' ?
      </p>
      <div className="flex items-center justify-center gap-6 text-xl font-semibold tracking-wide">
        <button
          className="border-none py-4 px-6 rounded-3xl bg-red-500 hover:bg-red-400"
          onClick={() => {
            onConfirm();
            onCloseModal();
          }}
        >
          Yes
        </button>
        <button
          className="border py-4 px-6 rounded-3xl hover:bg-primary-800"
          onClick={onCloseModal}
        >
          No
        </button>
      </div>
    </div>
  );
}
