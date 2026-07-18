import StatisticsGrid from "./StatisticsGrid";

const StatisticsSection = () => {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            Trusted Performance
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900">
            Built for Accuracy,
            <span className="block text-cyan-600">
              Speed & Security
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            CliniSense AI is designed to deliver reliable clinical insights
            with fast processing, intelligent analysis, and enterprise-grade
            security for healthcare professionals and patients.
          </p>

        </div>

        {/* Statistics Grid */}
        <StatisticsGrid />

      </div>
    </section>
  );
};

export default StatisticsSection;