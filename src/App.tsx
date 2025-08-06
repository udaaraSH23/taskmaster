import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./pages/Home";
import AddTask from "./pages/AddTask";
import { TaskProvider } from "./Context/TaskContext";

function App() {
  return (
    <TaskProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddTask />} />
      </Routes>
    </Router>
    </TaskProvider>
  );
}

export default App;
