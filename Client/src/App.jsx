import { Routes, Route } from "react-router-dom";
import Header from "./Components/header";
import "./App.css";
import Home from "./pages/home";
import AddNewBlog from "./pages/add-blog";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/add-blog" element={<AddNewBlog />} />
      </Routes>
    </>
  );
}

export default App;
