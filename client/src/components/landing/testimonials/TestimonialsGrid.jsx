import TestimonialCard from "./TestimonialCard";
import { testimonials } from "./testimonialsData";

const TestimonialsGrid = () => {
  return (
    <div className="mt-20 grid gap-8 lg:grid-cols-3">
      {testimonials.map((testimonial) => (
        <TestimonialCard
          key={testimonial.name}
          name={testimonial.name}
          role={testimonial.role}
          hospital={testimonial.hospital}
          rating={testimonial.rating}
          review={testimonial.review}
        />
      ))}
    </div>
  );
};

export default TestimonialsGrid;