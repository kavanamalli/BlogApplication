import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/blogs/${id}/`)
      .then((res) => setBlog(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!blog) return <p className="p-5">Loading...</p>;

  return (

    <div className="max-w-3xl mx-auto p-6 pt-24">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-700">{blog.content}</p>
    </div>
  );
}

export default BlogDetail;