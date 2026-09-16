import WorkflowSteps from "./WorkflowSteps";

const WorkflowSection = () => {
  return (
    <section
  id="workflow"
  className="bg-slate-50 py-24"
>
      <div className="mx-auto max-w-7xl px-6">

        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            AI Workflow
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900">
            How CliniSense AI
            <span className="block text-cyan-600">
              Transforms Medical Reports
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            From secure report upload to intelligent clinical insights,
            our AI-powered workflow simplifies complex medical information
            into clear, actionable results.
          </p>

        </div>

        {/* Workflow Steps */}
        <WorkflowSteps />

      </div>
    </section>
  );
};

export default WorkflowSection;