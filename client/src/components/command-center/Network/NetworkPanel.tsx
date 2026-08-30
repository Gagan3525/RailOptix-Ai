import RailwayCanvas from "./RailwayCanvas";

const NetworkPanel = () => {
  return (
    <section className="rounded-3xl border border-white/10 bg-[#111827] p-8 shadow-xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            🚆 Live Railway Network
          </h2>

          <p className="mt-2 text-gray-400">
            Real-time railway topology visualization
          </p>
        </div>

        <div className="rounded-xl bg-green-500/10 px-4 py-2 border border-green-500/20">
          <span className="text-green-400 text-sm font-semibold">
            LIVE SIMULATION
          </span>
        </div>
      </div>

      <div className="mt-8 h-[430px] rounded-2xl bg-[#0B1220] overflow-hidden">
        <RailwayCanvas />
      </div>
    </section>
  );
};

export default NetworkPanel;