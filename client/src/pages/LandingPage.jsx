import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import WorkflowSection from "../components/landing/workflow/WorkflowSection";
import StatisticsSection from "../components/landing/statistics/StatisticsSection";
import TestimonialsSection from "../components/landing/testimonials/TestimonialsSection";
import CTASection from "../components/landing/cta/CTASection";



const LandingPage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <WorkflowSection />
      <StatisticsSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
};

export default LandingPage;

   