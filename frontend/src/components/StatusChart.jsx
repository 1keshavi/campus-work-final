const chartColors = {
  applied: "var(--accent-blue)",
  selected: "var(--accent-green)",
  rejected: "var(--accent-red)",
};

function StatusChart({ applications }) {
  const totals = applications.reduce(
    (acc, application) => {
      acc[application.status] += 1;
      return acc;
    },
    { applied: 0, selected: 0, rejected: 0 }
  );

  const totalApplications = Math.max(
    1,
    totals.applied + totals.selected + totals.rejected
  );
  const appliedAngle = (totals.applied / totalApplications) * 360;
  const selectedAngle = (totals.selected / totalApplications) * 360;
  const rejectedAngle = (totals.rejected / totalApplications) * 360;

  const donutStyle = {
    background: `conic-gradient(
      ${chartColors.applied} 0deg ${appliedAngle}deg,
      ${chartColors.selected} ${appliedAngle}deg ${appliedAngle + selectedAngle}deg,
      ${chartColors.rejected} ${appliedAngle + selectedAngle}deg ${
        appliedAngle + selectedAngle + rejectedAngle
      }deg
    )`,
  };

  return (
    <div className="card">
      <div className="section-heading">
        <div>
          <h3>Application Status</h3>
        </div>
      </div>

      <div className="donut-layout">
        <div className="donut-wrap">
          <div className="donut-chart" style={donutStyle}>
            <div className="donut-hole" />
          </div>
        </div>

        <div className="chart-list">
          {Object.entries(totals).map(([status, count]) => (
            <div className="chart-row" key={status}>
              <div className="chart-labels">
                <span>{status}</span>
                <strong>{count}</strong>
              </div>
              <div className="chart-legend">
                <span className="legend-dot" style={{ background: chartColors[status] }} />
                <span className="muted">{status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StatusChart;
