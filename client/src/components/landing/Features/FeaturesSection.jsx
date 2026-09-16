import FeatureGrid from "./FeatureGrid";

const FeaturesSection = () => {
  return (
    <section
  id="features"
  className="bg-white py-24"
>
      <div className="mx-auto max-w-7xl px-6">

        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            Platform Features
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900">
            Everything You Need for
            <span className="block text-cyan-600">
              AI Clinical Intelligence
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            CliniSense AI combines artificial intelligence,
            clinical analytics, and patient-friendly insights
            into one secure healthcare platform.
          </p>

        </div>

        {/* Features Grid */}
        <FeatureGrid />

      </div>
    </section>
  );
};

export default FeaturesSection;