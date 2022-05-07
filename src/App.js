import { Routes, Route } from "react-router-dom";

import "./App.css";
import NotesListPage from "./pages/NotesListPage";
import NotePage from "./pages/NotePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Layout from "./components/Layout";
import Missing from "./pages/Missing";
import RequireAuth from "./utils/RequireAuth";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public pages */}
        <Route path="/register" exact element={<RegisterPage />} />
        <Route path="/login" exact element={<LoginPage />} />

        {/* we want to protect these routes */}
        <Route element={<RequireAuth />}>
          <Route path="/" exact element={<NotesListPage />} />
          <Route path="/note/:id" exact element={<NotePage />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
        
  );
}

export default App;
