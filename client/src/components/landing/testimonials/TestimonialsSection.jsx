import TestimonialsGrid from "./TestimonialsGrid";

const TestimonialsSection = () => {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            Trusted by Professionals
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900">
            What Healthcare Professionals
            <span className="block text-cyan-600">
              Say About CliniSense AI
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Doctors and patients rely on CliniSense AI to simplify complex
            medical reports, improve understanding, and save valuable time.
          </p>

        </div>

        {/* Testimonials */}
        <TestimonialsGrid />

      </div>
    </section>
  );
};

export default TestimonialsSection;