"use client"
import dynamic from "next/dynamic";

const BlogComp = dynamic(() => import("@/components/Blogs/BlogPage"), { ssr: false });



const blogData = {
  "time": 1742288761769,
  "blocks": [
    {
      "id": "header1",
      "type": "header",
      "data": {
        "text": "John Doe",
        "level": 2
      }
    },
    {
      "id": "image1",
      "type": "image",
      "data": {
        "url": "https://randomuser.me/api/portraits/men/45.jpg",
        "caption": "Profile Picture",
        "withBorder": true,
        "withBackground": false,
        "stretched": false
      }
    },
    {
      "id": "bio",
      "type": "paragraph",
      "data": {
        "text": "Experienced <b>Full Stack Developer</b> specializing in modern JavaScript frameworks such as React, Next.js, and Node.js. Passionate about building scalable web applications and optimizing user experience."
      }
    },
    {
      "id": "skills",
      "type": "list",
      "data": {
        "style": "unordered",
        "items": [
          { "content": "JavaScript (ES6+), TypeScript" },
          { "content": "React, Next.js, Vue.js" },
          { "content": "Node.js, Express, NestJS" },
          { "content": "PostgreSQL, MongoDB, Firebase" },
          { "content": "Docker, Kubernetes, AWS" },
          { "content": "CI/CD, Git, Agile Development" }
        ]
      }
    },
    {
      "id": "experience-header",
      "type": "header",
      "data": {
        "text": "Work Experience",
        "level": 3
      }
    },
    {
      "id": "experience1",
      "type": "paragraph",
      "data": {
        "text": "<b>Software Engineer</b> at Tech Solutions Inc. (2021 - Present)<br> Developed and maintained a large-scale e-commerce platform using <b>Next.js</b> and <b>Node.js</b>. Improved website performance by 40% through code optimizations and caching strategies."
      }
    },
    {
      "id": "experience2",
      "type": "paragraph",
      "data": {
        "text": "<b>Frontend Developer</b> at Webify Labs (2019 - 2021)<br> Built interactive user interfaces with <b>React</b> and <b>Redux</b>. Implemented a component library that standardized UI elements across multiple projects."
      }
    },
    {
      "id": "projects-header",
      "type": "header",
      "data": {
        "text": "Projects",
        "level": 3
      }
    },
    {
      "id": "project1",
      "type": "list",
      "data": {
        "style": "unordered",
        "items": [
          { "content": "<b>Task Manager App:</b> A productivity tool built with Next.js and Firebase for real-time task collaboration." },
          { "content": "<b>Portfolio Website:</b> A personal website showcasing projects, built with React and Tailwind CSS." }
        ]
      }
    },
    {
      "id": "quote1",
      "type": "quote",
      "data": {
        "text": "Code is like humor. When you have to explain it, it’s bad.",
        "caption": "— Cory House",
        "alignment": "left"
      }
    },
    {
      "id": "contacts-header",
      "type": "header",
      "data": {
        "text": "Contact Information",
        "level": 3
      }
    },
    {
      "id": "contacts",
      "type": "list",
      "data": {
        "style": "unordered",
        "items": [
          { "content": "📧 Email: john.doe@example.com" },
          { "content": "🔗 LinkedIn: linkedin.com/in/johndoe" },
          { "content": "🐦 Twitter: twitter.com/johndoe" },
          { "content": "🌐 Website: johndoe.dev" }
        ]
      }
    },
    {
      "id": "v-w_mqiWQZ",
      "type": "header",
      "data": {
        "text": "1. Free &amp; Open-Source Alternatives",
        "level": 3
      }
    },
    {
      "id": "43dZTAXd1W",
      "type": "list",
      "data": {
        "style": "unordered",
        "items": [
          {
            "content": "RustDesk – Open-source remote desktop tool with self-hosting options.",
            "items": []
          },
          {
            "content": "DWService – Browser-based remote control solution.",
            "items": []
          },
          {
            "content": "UltraVNC – Classic VNC-based remote desktop tool.",
            "items": []
          }
        ]
      }
    },
    {
      "id": "dqiJwUfeUB",
      "type": "header",
      "data": {
        "text": "2. Commercial &amp; Feature-Rich Alternatives",
        "level": 3
      }
    },
    {
      "id": "OMgojumQex",
      "type": "list",
      "data": {
        "style": "unordered",
        "items": [
          {
            "content": "TeamViewer – Popular remote desktop tool with strong security.",
            "items": []
          },
          {
            "content": "Splashtop – High-performance remote access with low latency.",
            "items": []
          },
          {
            "content": "Chrome Remote Desktop – Free and simple for personal use.",
            "items": []
          },
          {
            "content": "Microsoft Remote Desktop (RDP) – Built into Windows for LAN-based connections.",
            "items": []
          }
        ]
      }
    },
    {
      "id": "kg-VgE5GD5",
      "type": "header",
      "data": {
        "text": "3. Self-Hosted &amp; Secure Alternatives",
        "level": 3
      }
    },
    {
      "id": "totwvgvMKe",
      "type": "list",
      "data": {
        "style": "unordered",
        "items": [
          {
            "content": "MeshCentral – Open-source remote access for IT professionals.",
            "items": []
          },
          {
            "content": "NoMachine – Secure remote desktop software with high-quality streaming.",
            "items": []
          }
        ]
      }
    },
    {
      "id": "GdaH4L0QR0",
      "type": "header",
      "data": {
        "text": "<a href=\"https://Flairtips.om\">Which one suits you?</a>",
        "level": 3
      }
    },
    {
      "id": "LTvMzjqL4r",
      "type": "list",
      "data": {
        "style": "ordered",
        "items": [
          {
            "content": "For personal use: Chrome Remote Desktop or RustDesk.",
            "items": []
          },
          {
            "content": "For business &amp; support: TeamViewer or Splashtop.",
            "items": []
          },
          {
            "content": "For self-hosting &amp; privacy: MeshCentral or RustDesk.",
            "items": []
          }
        ]
      }
    },
    {
      "id": "bGdYHhtKu5",
      "type": "paragraph",
      "data": {
        "text": "Let me know if you need help setting up one! 🚀"
      }
    },
    {
      "id": "z0GEDcDryb",
      "type": "raw",
      "data": {
        "html": "<ul key={block.id} className=\"list-none\">\n                {block.data.items.map((item, index) => (\n                  <li key={index} className=\"flex items-center space-x-2\">\n                    <input\n                      type=\"checkbox\"\n                      checked={item.checked}\n                      readOnly\n                      className=\"h-4 w-4 text-blue-600 border-gray-300 rounded\"\n                    />\n                    <span className=\"text-gray-700\">{item.text}</span>\n                  </li>\n                ))}\n              </ul>"
      }
    }
  ],
  "version": "2.30.7"
}


const BlogPage = () => {
  return (
    <div className="flex gap-8 w-full max-w-[1280px] mx-auto px-6 py-12 lg:pt-40">
      <div className=" w-full mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Blog Post</h1>
      <BlogComp data={blogData} />
    
    </div>
    
    </div>
  );
};

export default BlogPage;
