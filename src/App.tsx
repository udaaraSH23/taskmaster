import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./pages/Home";
import AddTask from "./pages/AddTask";
import { TaskProvider } from "./Context/TaskContext";
import { ThemeProvider } from "./Context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
    <TaskProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddTask />} />
      </Routes>
    </Router>
    </TaskProvider>
    </ThemeProvider>
  );
}

export default App;
