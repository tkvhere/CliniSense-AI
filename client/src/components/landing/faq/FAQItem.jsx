import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const FAQItem = ({ faq, open, onClick }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between px-6 py-5 text-left"
      >
        <span className="text-lg font-semibold text-slate-900">
          {faq.question}
        </span>

        <FaChevronDown
          className={`transition-transform duration-300 ${
            open ? "rotate-180 text-cyan-600" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="px-6 pb-6 leading-7 text-slate-600">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQItem;