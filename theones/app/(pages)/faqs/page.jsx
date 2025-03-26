"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import FAQSchema from "@/components/Faqs/FaqScheme";
import FaqsFilter from "@/components/Faqs/FaqsFilter";

const faqs = [
  {
    category: "Web Development",
    question: "What technologies do you use?",
    answer: "We use Next.js, React, Tailwind CSS, Node.js, and PostgreSQL.",
  },
  {
    category: "Web Development",
    question: "How long does it take to build a website?",
    answer: "Depending on the complexity, it can take 2 to 8 weeks.",
  },
  {
    category: "Web Development",
    question: "Do you offer e-commerce development?",
    answer:
      "Yes, we build e-commerce websites using Shopify, WooCommerce, and custom solutions.",
  },
  {
    category: "Web Development",
    question: "Can I update my website myself?",
    answer: "Yes, we provide CMS-based solutions for easy updates.",
  },
  {
    category: "Web Development",
    question: "Do you provide hosting services?",
    answer:
      "We don’t directly offer hosting but can recommend and set up hosting for you.",
  },
  {
    category: "Branding & Design",
    question: "What branding services do you offer?",
    answer:
      "We create logos, brand guidelines, business cards, and social media assets.",
  },
  {
    category: "Branding & Design",
    question: "How long does a branding project take?",
    answer:
      "Typically, branding projects take 2 to 4 weeks depending on complexity.",
  },
  {
    category: "Branding & Design",
    question: "Can I request multiple logo revisions?",
    answer: "Yes, we allow up to 3 revisions to ensure your satisfaction.",
  },
  {
    category: "Branding & Design",
    question: "Do you offer custom illustrations?",
    answer:
      "Yes, we provide unique illustrations to enhance your brand identity.",
  },
  {
    category: "Branding & Design",
    question: "What design tools do you use?",
    answer:
      "We use Adobe Illustrator, Photoshop, Figma, and Canva for designs.",
  },
  {
    category: "SEO",
    question: "How does SEO help my business?",
    answer:
      "SEO improves your website ranking, driving organic traffic and increasing visibility.",
  },
  {
    category: "SEO",
    question: "How long does it take to see SEO results?",
    answer:
      "It usually takes 3 to 6 months to see significant improvements in rankings.",
  },
  {
    category: "SEO",
    question: "Do you offer on-page and off-page SEO?",
    answer:
      "Yes, we optimize content, meta tags, backlinks, and site performance.",
  },
  {
    category: "SEO",
    question: "Can you help with local SEO?",
    answer:
      "Yes, we optimize Google My Business, local citations, and geo-targeted keywords.",
  },
  {
    category: "SEO",
    question: "Do you provide SEO reports?",
    answer:
      "Yes, we offer monthly performance reports with key insights and recommendations.",
  },
];
const categories = ["All", "Web Development", "Branding & Design", "SEO"];

export default function FAQSection() {
  const [openQuestion, setOpenQuestion] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const toggleFAQ = (index) => {
    setOpenQuestion((prev) => (prev === `${index}` ? null : `${index}`));
  };

  const filteredFaqs =
    selectedCategory === "All"
      ? faqs
      : faqs.filter((p) => p.category === selectedCategory);

  return (
    <div className="">
      <div className="w-full max-w-[1280px] mx-auto px-6 py-12 pt-32 md:pt-40">
        <FAQSchema faqs={faqs} />
        <h1 className="text-3xl font-bold text-center text-green-800">
          Frequently Asked Questions
        </h1>
        {/* Filter Section */}
        <FaqsFilter
          categories={categories}
          activeCategory={selectedCategory}
          setActiveCategory={setSelectedCategory}
        />
        <div className="flex-1 py-6 md:py-12">
          <div className=" mt-4 lg:mt-8">
            <div className="mt-4 space-y-4">
              {filteredFaqs.map((faq, index) => (
                <div
                  key={index}
                  className="border-b border-gray-300 bg-green-50 rounded-2xl"
                >
                  <button
                    className="w-full text-left p-4 font-medium text-lg text-black flex justify-between items-center"
                    onClick={() => toggleFAQ(index)}
                  >
                    {faq.question}
                    <span>
                      {openQuestion === `${index}` ? (
                        <svg
                          className="w-6 h-6 text-black rotate-180 transform"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m5 15 7-7 7 7"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-6 h-6 text-black "
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m5 15 7-7 7 7"
                          />
                        </svg>
                      )}
                    </span>
                  </button>
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={
                      openQuestion === `${index}`
                        ? { height: "auto", opacity: 1 }
                        : { height: 0, opacity: 0 }
                    }
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="p-4 text-gray-600">{faq.answer}</p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
