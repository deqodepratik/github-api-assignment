import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import RepoComponent from "./components/RepoComponent";
import UserComponent from "./components/UserComponent";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<UserComponent />} />
        <Route path="repo" element={<RepoComponent />} />
      </Routes>
    </>
  );
};

export default App;
