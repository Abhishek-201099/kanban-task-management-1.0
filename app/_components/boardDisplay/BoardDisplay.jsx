import BoardColumn from "./BoardColumn";
import AddColBtn from "./AddColBtn";

export default function BoardDisplay({ boardColumns, tasks }) {
  return (
    <main className="overflow-scroll scrollbar-hide">
      {/* Columns */}
      <div className="flex gap-8 h-full px-8 py-6">
        {boardColumns.map((boardColumn, index) => (
          <BoardColumn key={index} boardColumn={boardColumn} tasks={tasks} />
        ))}
        {/* Column add btn */}
        <AddColBtn boardColumns={boardColumns} />
      </div>
    </main>
  );
}
