import BoardColumn from "./BoardColumn";
import AddColBtn from "./AddColBtn";

export default function BoardDisplay({ boardColumns, tasks, subtasks }) {
  return (
    <main className="overflow-scroll scrollbar-hide">
      {/* Columns */}
      <div className="flex gap-6 min-h-full p-4 ">
        {boardColumns.map((boardColumn, index) => (
          <BoardColumn
            key={index}
            boardColumn={boardColumn}
            tasks={tasks}
            subtasks={subtasks}
            boardColumns={boardColumns}
          />
        ))}
        {/* Column add btn */}
        <AddColBtn boardColumns={boardColumns} />
      </div>
    </main>
  );
}
