"use server";

import { auth, signIn, signOut } from "./auth";
import { getAccount } from "./data-service";
import { supabase } from "./supabase";

export async function signInAction() {
  await signIn("google", { redirectTo: "/boards" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

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
}
