import BlogListing from "@/components/Blogs/BlogListing";

export const metadata = {
  title: "Blog - Netiqa | Web Development, SEO & Digital Marketing Insights",
  description: "Expert insights, tips, and strategies for web development, SEO, branding, and digital marketing. Stay updated with the latest trends and best practices.",
  keywords: "web development blog, SEO tips, digital marketing, branding, design trends, Netiqa blog",
  openGraph: {
    title: "Netiqa Blog - Expert Insights on Web & Digital Marketing",
    description: "Stay updated with expert insights on web development, SEO, and digital marketing",
    url: "https://www.netiqa.co.ke/blog",
    type: "website",
  },
};

const BlogPage = () => {
  return <BlogListing />;
};

export default BlogPage;
