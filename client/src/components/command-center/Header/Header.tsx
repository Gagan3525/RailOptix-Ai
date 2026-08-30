import Clock from "./Clock";
import StatusBadge from "./StatusBadge";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B1220]/80 backdrop-blur-xl">
      <div className="flex h-20 items-center justify-between px-8">

        {/* LEFT */}

        <div className="flex items-center gap-5">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/20 text-3xl shadow-lg shadow-green-500/20">
            🚆
          </div>

          <div>

            <h1 className="text-2xl font-bold tracking-wide text-white">
              RailOptix AI
            </h1>

            <p className="text-sm tracking-widest text-green-400 uppercase">
              Railway Decision Intelligence Platform
            </p>

          </div>

        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-5">

          <StatusBadge
            label="AI ONLINE"
            color="green"
          />

          <StatusBadge
            label="NETWORK LIVE"
            color="green"
          />

          <Clock />

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-lg font-bold text-black">
            A
          </div>

        </div>

      </div>
    </header>
  );
};

export default Header;