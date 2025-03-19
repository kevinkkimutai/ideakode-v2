"use client";
import React, { useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import QuickLinks from "./QuickLinks";


const BlogComp = ({ data }) => {
  
  useEffect(() => {
    data;
  }, []);
  
  if (!data || !data.blocks) return <p>No content available</p>;
  return (
    <div className="flex">
      {/* Blog Content */}
      <div className="prose lg:prose-lg max-w-none space-y-6 flex-1">
        {data.blocks.map((block) => {
          switch (block.type) {
            // case "header":
            //   return React.createElement(
            //     `h${block.data.level}`,
            //     {
            //       key: block.id,
            //       id: `header-${block.id}`, // Ensure ID for scrolling
            //       className: "font-bold text-2xl mt-4 text-gray-900",
            //     },
            //     block.data.text
            //   );

            case "header":
  return React.createElement(
    `h${block.data.level}`,
    {
      key: block.id,
      id: `header-${block.id}`,
      className: "font-bold text-2xl mt-4 text-gray-900",
      dangerouslySetInnerHTML: {
        __html: block.data.text.replace(
          /<a /g,
          '<a className="underline text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer" '
        ),
      },
    }
  );

            


            case "paragraph":
              return (
                <p
                  key={block.id}
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: block.data.text }}
                />
              );

            case "raw":
              if (!block.data.html.trim()) return null;
              return (
                <SyntaxHighlighter
                  key={block.id}
                  language="jsx"
                  style={dracula}
                  wrapLines={true}
                  wrapLongLines={true}
                >
                  {block.data.html}
                </SyntaxHighlighter>
              );

            case "checklist":
              return (
                <ul key={block.id} className="list-none">
                  {block.data.items.map((item, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        readOnly
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                      <span className="text-gray-700">{item.text}</span>
                    </li>
                  ))}
                </ul>
              );

            case "list":
              return block.data.style === "unordered" ? (
                <ul key={block.id} className="list-disc pl-6 space-y-2">
                  {block.data.items.map((item, index) => (
                    <li
                      key={index}
                      className="text-gray-700"
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    />
                  ))}
                </ul>
              ) : (
                <ol key={block.id} className="list-decimal pl-6 space-y-2">
                  {block.data.items.map((item, index) => (
                    <li
                      key={index}
                      className="text-gray-700"
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    />
                  ))}
                </ol>
              );

            case "quote":
              return (
                <blockquote
                  key={block.id}
                  className="border-l-4 border-blue-500 pl-4 italic text-gray-600"
                >
                  {block.data.text}
                  {block.data.caption && (
                    <footer className="text-sm text-gray-500 mt-2">
                      — {block.data.caption}
                    </footer>
                  )}
                </blockquote>
              );

            case "table":
              return (
                <div key={block.id} className="overflow-x-auto">
                  <table className="table-auto border-collapse border border-gray-300 w-full">
                    <tbody>
                      {block.data.content.map((row, rowIndex) => (
                        <tr key={rowIndex} className="border border-gray-300">
                          {row.map((cell, cellIndex) => (
                            <td
                              key={cellIndex}
                              className="border border-gray-300 p-2 text-gray-700"
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );

            case "warning":
              return (
                <div key={block.id} className="bg-yellow-100 border-l-4 border-yellow-500 p-4">
                  <p className="font-bold text-yellow-800">{block.data.title}</p>
                  <p className="text-yellow-700">{block.data.message}</p>
                </div>
              );

            case "image":
              return (
                <div key={block.id} className="my-6 ">
                  <img
                    src={block.data.url}
                    alt={block.data.caption || "Blog Image"}
                    className="rounded-lg shadow-lg  max-w-2xl mx-aut"
                  />
                  {block.data.caption && (
                    <p className="text-sm text-gray-500 mt-2">{block.data.caption}</p>
                  )}
                </div>
              );

            default:
              return null;
          }
        })}
      </div>

      {/* Quick Links Sidebar */}
      <QuickLinks blocks={data.blocks} />
    </div>
  );
};

export default BlogComp;
