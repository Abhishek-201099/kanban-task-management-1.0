import Task from "./Task";

export default async function BoardColumn({ boardColumn, tasks }) {
  // Boardcolumn : {
  //   id: 3,
  //   created_at: '2025-04-22T08:17:54.617409+00:00',
  //   columnName: 'Done',
  //   boardId: 1,
  //   accountId: 1
  // }

  const tasksForColumn = tasks.filter(
    (task) => task.columnId === boardColumn.id
  );

  return (
    <div className="min-w-[400px]  flex flex-col gap-6  rounded-xl p-4 bg-primary-900 shadow-md shadow-primary-900">
      <h3 className="uppercase text-primary-500 font-semibold text-lg [word-spacing:4px]">
        {boardColumn.columnName} ({tasksForColumn.length})
      </h3>
      {/* Tasks */}
      {tasksForColumn.map((task, index) => (
        <Task key={index} task={task} />
      ))}
    </div>
  );
}
