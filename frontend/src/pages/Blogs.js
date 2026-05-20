import React, { useEffect, useState } from "react";
import API from "../services/api";

function Blogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    API.get("/blogs/")
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

 return (
  <div className="p-8">

    <h1 className="text-3xl font-bold mb-6 text-center">
      All Blogs
    </h1>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      {blogs.map((blog, index) => (
        <div
          key={index}
          className="shadow-lg p-5 rounded-xl hover:shadow-2xl transition duration-300"
        >
          <h2 className="font-bold text-xl mb-2">
            {blog.title}
          </h2>

          <p className="text-gray-600">
            {blog.content}
          </p>
        </div>
      ))}

    </div>

  </div>
);
}

export default Blogs;