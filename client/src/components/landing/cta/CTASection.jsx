import { motion } from "framer-motion";
import CTAButtons from "./CTAButtons";

const CTASection = () => {
  return (
    <section className="bg-gradient-to-r from-cyan-600 via-cyan-700 to-blue-700 py-24">
      <div className="mx-auto max-w-5xl px-6 text-center">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white">
            Get Started Today
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
            Experience the Future of
            <span className="block">
              AI-Powered Healthcare
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-cyan-100">
            Upload medical reports, receive intelligent clinical insights,
            and understand complex healthcare information in seconds with
            CliniSense AI.
          </p>

          <CTAButtons />
        </motion.div>

      </div>
    </section>
  );
};

export default CTASection;