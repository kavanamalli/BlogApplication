import React from "react";
import { Link } from "react-router-dom";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}
      <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          AI Blog
        </Link>

        <div className="space-x-6">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/create" className="hover:text-blue-600">Create Blog</Link>
          <Link to="/search" className="hover:text-blue-600">AI Search</Link>
        </div>
      </nav>

      {/* PAGE CONTENT */}
      <main className="max-w-5xl mx-auto p-6">
        {children}
      </main>

    </div>
  );
}

export default Layout;