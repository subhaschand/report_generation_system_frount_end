import MyComponents from './HomePage.jsx';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProjectInfo from "./ProjectInfo";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProjectInfo />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}
