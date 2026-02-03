import dynamic from "next/dynamic";
import { notFound } from 'next/navigation';
import blogsIndex from '@/data/blogs/index.json';

const BlogComp = dynamic(() => import("@/components/Blogs/BlogPage"));

export async function generateStaticParams() {
  return blogsIndex.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }) {
  const blog = blogsIndex.find((b) => b.slug === params.slug);
  
  if (!blog) {
    return {
      title: 'Blog Not Found - Netiqa',
    };
  }

  return {
    title: `${blog.title} - Netiqa Blog`,
    description: blog.excerpt,
    keywords: blog.tags.join(', '),
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      url: `https://www.netiqa.co.ke/blog/${blog.slug}`,
      type: 'article',
      images: [
        {
          url: blog.featuredImage,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.excerpt,
      images: [blog.featuredImage],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const blog = blogsIndex.find((b) => b.slug === params.slug);

  if (!blog) {
    notFound();
  }

  // Dynamically import the blog content
  const blogData = await import(`@/data/blogs/${blog.slug}.json`);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-[1280px] mx-auto px-6 py-12 pt-32">
        {/* Blog Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="mb-6">
            <span className="bg-green-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold">
              {blog.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            {blog.title}
          </h1>
          <div className="flex items-center gap-6 text-gray-600">
            <span>{blog.author}</span>
            <span>•</span>
            <span>{new Date(blog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span>•</span>
            <span>{blog.readTime}</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="max-w-4xl mx-auto mb-12">
          <img
            src={blog.featuredImage}
            alt={blog.title}
            className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
          />
        </div>

        {/* Blog Content */}
        <BlogComp data={blogData.content} />
      </div>
    </div>
  );
}
