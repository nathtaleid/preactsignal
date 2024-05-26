import { signal, computed, batch } from "@preact/signals";
import { todos } from "./TodoSignal";

const newItem = signal("");

export default function TodoList() {
  const completedCount = computed(() => {
    return todos.value.filter((todo) => todo.completed).length;
  });

  const onInput = (event: any) => {
    newItem.value = event.target.value;
  };

  const removeTodo = (index: number) => {
    todos.value.splice(index, 1);
    todos.value = [...todos.value];
  };

  const onAddClick = () => {
    batch(() => {
      if (newItem.value) {
        todos.value = [
          ...todos.value,
          { text: newItem.value, completed: false },
        ];
        newItem.value = "";
      }
    });
  };

  return (
    <>
      <input type="text" value={newItem} onInput={onInput} />
      <button style={{ marginLeft: "10px" }} onClick={onAddClick}>
        Add
      </button>
      <ul style={{ textAlign: "left" }}>
        {todos.value.map((todo, index) => {
          return (
            <li key={index}>
              <input
                type="checkbox"
                checked={todo.completed}
                onInput={() => {
                  todo.completed = !todo.completed;
                  todos.value = [...todos.value];
                }}
              />
              {todo.completed ? <s>{todo.text}</s> : todo.text}{" "}
              <button
                style={{ marginLeft: "10px", color: "red" }}
                onClick={() => removeTodo(index)}
              >
                x
              </button>
            </li>
          );
        })}
      </ul>
      <p>Completed count: {completedCount}</p>
    </>
  );
}
