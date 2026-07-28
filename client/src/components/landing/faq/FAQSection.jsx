import { useState } from "react";
import { motion } from "framer-motion";
import FAQItem from "./FAQItem";
import { faqs } from "./faqData";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="faq"
      className="bg-gradient-to-br from-slate-50 via-white to-cyan-50 py-24"
    >
      <div className="mx-auto max-w-5xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            Frequently Asked Questions
          </span>

          <h2 className="mt-6 text-5xl font-bold text-slate-900">
            Have Questions?
            <span className="block text-cyan-600">
              We've Got Answers
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-600">
            Everything you need to know about CliniSense AI, security,
            AI-powered analysis, and your medical reports.
          </p>
        </motion.div>

        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              open={activeIndex === index}
              onClick={() =>
                setActiveIndex(activeIndex === index ? -1 : index)
              }
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQSection;