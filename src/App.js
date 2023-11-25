import "./App.css";
import Todo from "./components/Todo";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login/Index.js";
import Signup from "./pages/Auth/Signup/Index.js";

function App() {
  return (
    <div className="App">
      <Routes>
                <Route
                    path={'/'}
                    element={<Login />}
                />
                <Route
                    path={'/signup'}
                    element={<Signup />}
                />
                <Route
                    path={'/todo'}
                    element={<Todo />}
                />
                <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
    </div>
  );
}

export default App;
