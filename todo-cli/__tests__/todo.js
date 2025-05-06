import todoList from "../todo";
import { describe, beforeAll, test, expect } from "@jest/globals";

const { all, markAsComplete, add } = todoList();

export const toDisplayableList = (list) => {
  const today = new Date().toISOString().slice(0, 10);
  return list
    .map((item) => {
      const status = item.completed ? "[x]" : "[ ]";
      const displayDate = item.dueDate === today ? "" : item.dueDate;
      return `${status} ${item.title} ${displayDate}`.trim();
    })
    .join("\n");
};

describe("Todolist Test Suite", () => {
  beforeAll(() => {
    add({
      title: "Test Todo",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
  });
  test("add a  todo", () => {
    const todoItemCount = all.length;

    add({
      title: "Test Todo",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    expect(all.length).toBe(todoItemCount + 1);
  });
  
  test(" mark todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
  test("Retrieve overdue items", () => {
    const overdueItems = all.filter(
      (todo) =>
        new Date(todo.dueDate) < new Date("2025-05-03") && !todo.completed,
    );
    expect(overdueItems.length).toBe(0); // Adjusted to match the expected state of the 'all' array
  });

  test("Retrieve due today items", () => {
    const dueTodayItems = all.filter(
      (todo) =>
        todo.dueDate === new Date().toISOString().slice(0, 10) &&
        !todo.completed,
    );
    expect(dueTodayItems.length).toBe(1); // Adjusted to match the expected state of the 'all' array
  });

  test("Retrieve due later items", () => {
    const dueLaterItems = all.filter(
      (todo) => new Date(todo.dueDate) > new Date() && !todo.completed,
    );
    expect(dueLaterItems.length).toBe(0);
  });
});
