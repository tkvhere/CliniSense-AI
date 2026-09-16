import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/features/FeaturesSection";
import WorkflowSection from "../components/landing/workflow/WorkflowSection";
import StatisticsSection from "../components/landing/statistics/StatisticsSection";
import TestimonialsSection from "../components/landing/testimonials/TestimonialsSection";
import CTASection from "../components/landing/cta/CTASection";
import AboutSection from "../components/landing/about/AboutSection";
import FAQSection from "../components/landing/faq/FAQSection";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <WorkflowSection />
      <AboutSection />
      <StatisticsSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
};

export default LandingPage;

   