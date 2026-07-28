import { motion } from "framer-motion";
import TestimonialCard from "./TestimonialCard";
import { testimonials } from "./testimonialsData";

const TestimonialsGrid = () => {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={testimonial.name}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: index * 0.15,
          }}
          whileHover={{
            y: -10,
            scale: 1.02,
          }}
        >
          <TestimonialCard
            {...testimonial}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default TestimonialsGrid;