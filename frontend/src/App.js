import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import CreateBlog from "./pages/CreateBlog";
import Blogs from "./pages/Blogs";
import Search from "./pages/Search";
import Navbar from "./components/Navbar";
import BlogDetail from "./pages/BlogDetail";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/search" element={<Search />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>
    </Router>
  );
}

export default App;