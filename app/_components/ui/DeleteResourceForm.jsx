export default function DeleteResourceForm({
  resourceName,
  onCloseModal,
  onConfirm,
}) {
  return (
    <div className="flex flex-col gap-10">
      <p className="text-base lg:text-lg [word-spacing:4px] font-medium text-accent-300 text-center leading-10">
        Are you sure you want to delete - &apos;{resourceName}&apos; ?
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-xl font-semibold tracking-wide text-primary-50">
        <button
          className="border-none text-sm md:text-base lg:text-lg py-3 px-12 md:py-2 md:px-4 rounded-2xl  bg-red-500 hover:bg-red-400"
          onClick={() => {
            onConfirm();
            onCloseModal?.();
          }}
        >
          Yes
        </button>
        <button
          className="border text-sm md:text-base lg:text-lg py-3 px-12 md:py-2 md:px-4 rounded-2xl hover:bg-primary-800"
          onClick={onCloseModal}
        >
          No
        </button>
      </div>
    </div>
  );
}
