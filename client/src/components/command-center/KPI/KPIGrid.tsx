import KPICard from "./KPICard";

const KPIGrid = () => {
  return (
    <section className="grid gap-6 lg:grid-cols-4 md:grid-cols-2">

      <KPICard
        icon="🚆"
        title="Live Trains"
        value="274"
        subtitle="+12 Running"
        color="bg-green-500"
      />

      <KPICard
        icon="⚠"
        title="Conflicts"
        value="07"
        subtitle="Need Attention"
        color="bg-red-500"
      />

      <KPICard
        icon="🧠"
        title="AI Accuracy"
        value="98.4%"
        subtitle="Recommendation Engine"
        color="bg-emerald-500"
      />

      <KPICard
        icon="⏱"
        title="Efficiency"
        value="93.8%"
        subtitle="Network Performance"
        color="bg-cyan-500"
      />

    </section>
  );
};

export default KPIGrid;