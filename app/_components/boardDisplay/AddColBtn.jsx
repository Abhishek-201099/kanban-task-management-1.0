import { ViewColumnsIcon } from "@heroicons/react/24/solid";

export default function AddColBtn() {
  return (
    <div className="min-w-[400px] p-4 bg-primary-900 rounded-xl flex items-center justify-center hover:bg-primary-800 transition-all shadow-md shadow-primary-900">
      <button className="flex gap-2 items-center cursor-pointer text-xl text-primary-500 hover:text-primary-400 transition-all  font-bold [word-spacing:4px]">
        <span>
          <ViewColumnsIcon className="h-6 w-6" />
        </span>
        <span>Add column</span>
      </button>
    </div>
  );
}
