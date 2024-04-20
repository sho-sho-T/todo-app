import { Routes, Route } from "react-router-dom";

import { TodoList } from "./pages/TodoList";
import { AddTodo } from "./pages/AddTodo"
import { EditTodo } from "./pages/EditTodo";

export const App = () => {
    return (
        <Routes>
            <Route path="/" element={<TodoList/>}/>
            <Route path="/addTodo" element={<AddTodo/>}/>
            <Route path="/EditTodo" element={<EditTodo/>}/>
        </Routes>
    )
};