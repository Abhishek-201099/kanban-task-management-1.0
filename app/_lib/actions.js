"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { getAccount } from "./data-service";
import { supabase } from "./supabase";
import { redirect } from "next/navigation";

export async function signInAction() {
  await signIn("google", { redirectTo: "/boards" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

// Create
export async function createNewBoardAction(boardName, boardColumns) {
  const session = await auth();
  const account = await getAccount(session.user.email);

  // 1. Add the boardName and accountID to boards table.
  const { data: board, error } = await supabase
    .from("boards")
    .insert([{ boardName, accountId: account.id }])
    .select()
    .single();

  if (error) throw new Error("There was a problem in adding the new board");

  // 2. Add the columns to the column table with fields - columnName, boardId, accountId.
  const inserts = boardColumns.map((column) => {
    return {
      columnName: column.columnName,
      boardId: board.id,
      accountId: account.id,
    };
  });

  const { error: columnError } = await supabase.from("columns").insert(inserts);

  if (columnError) throw new Error("There was a problem in adding the columns");

  revalidatePath("/boards");
  redirect(`/boards/${board.id}`);
}

export async function addNewTaskAction(data) {
  const session = await auth();
  const account = await getAccount(session.user.email);
  const { taskName, taskDescription, subtasks, boardId, columnId } = data;

  const { data: task, error } = await supabase
    .from("tasks")
    .insert([
      { taskName, taskDescription, accountId: account.id, boardId, columnId },
    ])
    .select()
    .single();

  if (error) throw new Error("There was a problem in adding the new task");

  const inserts = subtasks.map((subtask) => {
    return {
      subtaskName: subtask.subtaskName,
      isChecked: false,
      accountId: account.id,
      boardId,
      columnId,
      taskId: task.id,
    };
  });

  const { error: subtaskError } = await supabase
    .from("subtasks")
    .insert(inserts);

  if (subtaskError) {
    throw new Error("There was a problem in adding the subtasks");
  }

  revalidatePath(`/boards/${boardId}`);
}

export async function addNewColumnAction({ newColumn, boardId }) {
  // Add columnName, boardId,accountId
  const session = await auth();
  const account = await getAccount(session.user.email);

  const { data, error } = await supabase
    .from("columns")
    .insert([{ columnName: newColumn, accountId: account.id, boardId }])
    .select()
    .single();

  if (error) {
    console.log("##Addnewcolumnaction error : ", error.message);
    throw new Error("There was a problem in adding the new column");
  }

  revalidatePath(`/boards/${boardId}`);
}

// Update
export async function updateBoardNameAction(data) {
  const { updatedBoardName, boardId } = data;

  const { error } = await supabase
    .from("boards")
    .update({ boardName: updatedBoardName })
    .eq("id", boardId);

  if (error) {
    throw new Error("Board name could not be updated");
  }

  revalidatePath("/boards");
  revalidatePath(`/boards/${boardId}`);
}

export async function updateAccountAction(data) {
  const { fullName } = data;
  const session = await auth();
  const account = await getAccount(session.user.email);

  const { error } = await supabase
    .from("accounts")
    .update({ fullName })
    .eq("id", account.id);

  if (error) {
    console.log("###updateAccountAction error : ", error.message);
    throw new Error("Account could not be updated");
  }

  revalidatePath(`/boards/settings`);
  revalidatePath(`/boards`);
}

export async function updateTaskAction(selectedColumn, subtasks, task) {
  const session = await auth();
  const account = await getAccount(session.user.email);

  const { error } = await supabase
    .from("tasks")
    .update({ columnId: selectedColumn.id })
    .eq("id", task.id)
    .eq("accountId", account.id)
    .eq("columnId", task.columnId)
    .eq("boardId", task.boardId);

  if (error) {
    console.log("###updateAccountAction error : ", error.message);
    throw new Error("Account could not be updated");
  }

  for (const subtask of subtasks) {
    const { error } = await supabase
      .from("subtasks")
      .update({ columnId: selectedColumn.id, isChecked: subtask.isChecked })
      .eq("id", subtask.id)
      .eq("accountId", account.id)
      .eq("taskId", subtask.taskId)
      .eq("columnId", subtask.columnId)
      .eq("boardId", subtask.boardId);

    if (error) {
      console.log("###updateAccountAction subtask error : ", error.message);
      throw new Error("subtask could not be updated");
    }
  }

  revalidatePath(`/boards/${task.boardId}`);
}

export async function editTaskAction(data, curTask, subtaskForTask) {
  const session = await auth();
  const account = await getAccount(session.user.email);

  const { id: taskToEditId } = curTask;
  const { taskName, taskDescription, subtasks, columnId, boardId } = data;

  // Edit task- to save updated fields for a particular task.
  // 1) Update taskName, taskDescription, currentStatus(columnId)
  const { error: taskError } = await supabase
    .from("tasks")
    .update({ taskName, taskDescription, columnId })
    .eq("id", taskToEditId);

  if (taskError) {
    console.log("###EditTaskAction taskError : ", taskError.message);
    throw new Error("There was an error in updating task");
  }

  // 2) We have subtasks submitted from editTaskForm
  // Now these subtasks are either -
  // a) Already in the database and so only require updation
  // b) Not in the database so needs to be added.
  // c) Are removed while editing the task
  // Step 1- Modify the subtasks to include all necessary fields
  const modifiedSubtasks = subtasks.map((subtask) => {
    return {
      subtaskName: subtask.subtaskName,
      isChecked: false,
      accountId: account.id,
      boardId,
      columnId,
      taskId: taskToEditId,
    };
  });

  // Step 2- Loop through subtaskForTask
  for (const subtask of subtaskForTask) {
    const foundTask = modifiedSubtasks.find(
      (modSubtask) => modSubtask.subtaskName === subtask.subtaskName
    );

    // Step 3- if a subtask is in modifiedSubtasks then update that modifiedSubtask
    if (foundTask) {
      const { error: subtaskError } = await supabase
        .from("subtasks")
        .update({
          subtaskName: foundTask.subtaskName,
          isChecked: subtask.isChecked,
          accountId: foundTask.accountId,
          columnId: foundTask.columnId,
          boardId: foundTask.boardId,
          taskId: foundTask.taskId,
        })
        .eq("id", subtask.id);

      if (subtaskError) {
        console.log("##EditTaskAction subtaskErro : ", subtaskError.message);
        throw new Error("There was an error while updating subtask");
      }
    } else {
      // Step 4 - if the subtask doesn't exist in modifiedSubtasks
      // It means that it is removed by the user during editing task
      // Therefore it should be removed from database as well.
      const { error: subtaskDelError } = await supabase
        .from("subtasks")
        .delete()
        .eq("id", subtask.id);

      if (subtaskDelError) {
        console.error("##editTaskAction subtasks del error:", subtaskDelError);
        throw new Error("Subtask could not be deleted");
      }
    }
  }

  // Step 5 - if a modSubtask doesn't exist in prev subtasks then add it to subtasks in database.
  for (const modSubtask of modifiedSubtasks) {
    const foundModTask = subtaskForTask.find(
      (subtask) => subtask.subtaskName === modSubtask.subtaskName
    );

    if (!foundModTask) {
      const { error: subtaskAddError } = await supabase
        .from("subtasks")
        .insert([
          {
            subtaskName: modSubtask.subtaskName,
            isChecked: modSubtask.isChecked,
            columnId: modSubtask.columnId,
            boardId: modSubtask.boardId,
            taskId: modSubtask.taskId,
            accountId: modSubtask.accountId,
          },
        ]);

      if (subtaskAddError) {
        console.log("#EditTaskAction subtaskAddError : ", subtaskAddError);
        throw new Error("There was an error in adding subtask");
      }
    }
  }

  revalidatePath(`/boards/${boardId}`);
}

export async function editColumnNameAction(data) {
  const { updatedColumnName, columnId, boardId } = data;

  const { error } = await supabase
    .from("columns")
    .update({ columnName: updatedColumnName })
    .eq("id", columnId);

  if (error) {
    console.log("##editColumnNameAction error : ", error.message);
    throw new Error("There was an error in editing column name");
  }

  revalidatePath(`/boards/${boardId}`);
}

// Delete
export async function deleteBoardAction(boardId) {
  // To delete a board we have to delete -
  // 1) Subtasks from subtasks for boardId.
  const { error: subtasksError } = await supabase
    .from("subtasks")
    .delete()
    .eq("boardId", boardId);

  if (subtasksError) {
    console.error("##deletBoardAction subtasks error:", subtasksError);
    throw new Error("Subtasks could not be deleted");
  }

  // 2) Tasks from tasks for boardId.
  const { error: tasksError } = await supabase
    .from("tasks")
    .delete()
    .eq("boardId", boardId);

  if (tasksError) {
    console.error("##deletBoardAction tasks error:", tasksError);
    throw new Error("Tasks could not be deleted");
  }

  // 3) Columns from columns for boardID.
  const { error: columnError } = await supabase
    .from("columns")
    .delete()
    .eq("boardId", boardId);

  if (columnError) {
    console.error("##deletBoardAction col error:", columnError);
    throw new Error("Columns could not be deleted");
  }

  // 4) Board from board columns.
  const { error } = await supabase.from("boards").delete().eq("id", boardId);

  if (error) {
    console.error("##deletBoardAction board error:", error);
    throw new Error("Board could not be deleted");
  }

  revalidatePath("/boards");
  redirect("/boards");
}

export async function deleteColumnAction(columnId, boardId) {
  const session = await auth();
  const account = await getAccount(session.user.email);

  // 1) Delete subtasks for the column
  const { error: subtasksError } = await supabase
    .from("subtasks")
    .delete()
    .eq("columnId", columnId)
    .eq("boardId", boardId)
    .eq("accountId", account.id);

  if (subtasksError) {
    console.error("##deleteColumnAction subtasks error:", subtasksError);
    throw new Error("Subtasks could not be deleted");
  }

  // 2) Delete tasks for the column
  const { error: tasksError } = await supabase
    .from("tasks")
    .delete()
    .eq("columnId", columnId)
    .eq("boardId", boardId)
    .eq("accountId", account.id);

  if (tasksError) {
    console.error("##deleteColumnAction tasks error:", tasksError);
    throw new Error("Tasks could not be deleted");
  }

  // 3) Delete column
  const { error } = await supabase
    .from("columns")
    .delete()
    .eq("id", columnId)
    .eq("boardId", boardId)
    .eq("accountId", account.id);

  if (error) {
    console.error("##deleteColumnAction tasks error:", error.message);
    throw new Error("Column could not be deleted");
  }

  revalidatePath(`/boards/${boardId}`);
}

export async function deleteTaskAction(task) {
  const { error: subtaskError } = await supabase
    .from("subtasks")
    .delete()
    .eq("taskId", task.id);

  if (subtaskError) {
    console.log("###DeleteTaskAction subtaskError : ", subtaskError.message);
    throw new Error("Subtasks related to task could not be deleted");
  }

  const { error: taskError } = await supabase
    .from("tasks")
    .delete()
    .eq("id", task.id);

  if (taskError) {
    console.log("##deleteTaskAction taskError : ", taskError);
    throw new Error("Task could not be deleted");
  }

  revalidatePath(`/boards/${task.boardId}`);
}
