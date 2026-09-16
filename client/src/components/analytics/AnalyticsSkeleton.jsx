const AnalyticsSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="h-4 w-24 rounded bg-gray-200" />
                <div className="mt-4 h-8 w-16 rounded bg-gray-200" />
              </div>

              <div className="h-12 w-12 rounded-full bg-gray-200" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="h-7 w-48 rounded bg-gray-200" />
            <div className="mt-3 h-4 w-64 rounded bg-gray-200" />
            <div className="mt-8 h-72 rounded-2xl bg-gray-100" />
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="h-7 w-48 rounded bg-gray-200" />
        <div className="mt-3 h-4 w-72 rounded bg-gray-200" />
        <div className="mt-8 h-72 rounded-2xl bg-gray-100" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md"
          >
            <div className="h-6 w-40 rounded bg-gray-200" />

            <div className="mt-6 space-y-4">
              {Array.from({ length: 4 }).map((_, itemIndex) => (
                <div
                  key={itemIndex}
                  className="flex items-center gap-4"
                >
                  <div className="h-10 w-10 rounded-full bg-gray-200" />

                  <div className="flex-1">
                    <div className="h-4 w-3/4 rounded bg-gray-200" />
                    <div className="mt-2 h-3 w-1/3 rounded bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsSkeleton;