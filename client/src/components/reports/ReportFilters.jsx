const ReportFilters = ({
  search,
  setSearch,
  reportType,
  setReportType,
  riskLevel,
  setRiskLevel,
  sortBy,
  setSortBy,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid gap-4 lg:grid-cols-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search reports..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-500"
        />

        {/* Report Type */}
        <select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-500"
        >
          <option value="All">All Report Types</option>
          <option value="cbc">CBC</option>
          <option value="lipid">Lipid Profile</option>
          <option value="thyroid">Thyroid</option>
          <option value="kidney">Kidney</option>
          <option value="liver">Liver</option>
          <option value="diabetes">Diabetes</option>
        </select>

        {/* Risk */}
        <select
          value={riskLevel}
          onChange={(e) => setRiskLevel(e.target.value)}
          className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-500"
        >
          <option value="All">All Risk Levels</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-500"
        >
          <option value="latest">Latest First</option>
          <option value="oldest">Oldest First</option>
          <option value="health">Health Score</option>
        </select>
      </div>
    </div>
  );
};

export default ReportFilters;