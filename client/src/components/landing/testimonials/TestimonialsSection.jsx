import { motion } from "framer-motion";
import TestimonialsGrid from "./TestimonialsGrid";

const TestimonialsSection = () => {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-cyan-50 py-24"
    >
      {/* Background Glow */}
      <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-cyan-200/20 blur-3xl"></div>

      <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-blue-200/20 blur-3xl"></div>

      <div className="relative mx-auto max-w-screen-2xl px-6 lg:px-12">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            Trusted by Healthcare Professionals
          </span>

          <h2 className="mt-6 text-5xl font-bold text-slate-900">
            What Our Users
            <span className="block text-cyan-600">
              Say About CliniSense AI
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Thousands of healthcare professionals and patients trust
            CliniSense AI to simplify medical reports, improve clinical
            understanding, and make better healthcare decisions through
            Artificial Intelligence.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <TestimonialsGrid />

      </div>
    </section>
  );
};

export default TestimonialsSection;