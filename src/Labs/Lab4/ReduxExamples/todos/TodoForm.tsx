import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";

export default function TodoForm(
) {
  const { todo } = useSelector((state: any) => state.todosReducer);
  const dispatch = useDispatch();
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <input
        value={todo.title}
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
        className="form-control form-control-sm"
      />
      <div className="btn-group">
        <button
          onClick={() => dispatch(updateTodo(todo))}
          className="btn btn-warning btn-sm"
          id="wd-update-todo-click"
        >
          Update
        </button>
        <button
          onClick={() => dispatch(addTodo(todo))}
          className="btn btn-success btn-sm"
          id="wd-add-todo-click"
        >
          Add
        </button>
      </div>
    </li>
  );
};
