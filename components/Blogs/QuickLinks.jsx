"use client";
import React from "react";

const QuickLinks = ({ blocks }) => {
  const extractText = (html) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || "";
  };

  const quickLinks = blocks
    .filter((block) => block.type === "header")
    .map((block) => ({
      id: `header-${block.id}`,
      text: extractText(block.data.text), // Remove any HTML (like <a> tags)
    }));

  if (quickLinks.length === 0) return null;

  const handleScroll = (id) => {
    const targetElement = document.getElementById(id);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Adjust for navbar height
        behavior: "smooth",
      });
    }
  };

  return (
    <aside className="hidden lg:block min-w-72 ml-8">
      <div className="sticky top-20 p-4 bg-gray-100 rounded-lg shadow">
        <h3 className="font-bold text-lg mb-2">Quick Links</h3>
        <ul className="space-y-2">
          {quickLinks.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => handleScroll(link.id)}
                className="text-blue-600 hover:text-blue-800 transition duration-200 text-sm underline"
              >
                {link.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default QuickLinks;
