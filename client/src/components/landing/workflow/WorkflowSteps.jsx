import WorkflowCard from "./WorkflowCard";
import { workflowSteps } from "./workflowData";

const WorkflowSteps = () => {
  return (
    <div className="relative mt-20">

      {/* Connection Line (Desktop Only) */}
      <div className="absolute left-0 right-0 top-24 hidden h-1 bg-gradient-to-r from-cyan-200 via-cyan-400 to-cyan-200 xl:block" />

      <div className="relative grid gap-8 md:grid-cols-2 xl:grid-cols-4">
        {workflowSteps.map((item, index) => (
          <WorkflowCard
            key={item.step}
            step={item.step}
            icon={item.icon}
            title={item.title}
            description={item.description}
            index={index}
          />
        ))}
      </div>

    </div>
  );
};

export default WorkflowSteps;