const CTAButtons = () => {
  return (
    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
      <button
        className="rounded-xl bg-cyan-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-cyan-700 hover:shadow-xl"
      >
        Get Started Free
      </button>

      <button
        className="rounded-xl border border-slate-300 bg-white px-8 py-4 text-lg font-semibold text-slate-700 transition-all duration-300 hover:border-cyan-600 hover:text-cyan-600"
      >
        Sign In
      </button>
    </div>
  );
};

export default CTAButtons;