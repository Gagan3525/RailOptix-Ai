import { motion } from "framer-motion";

interface KPICardProps {
  icon: string;
  title: string;
  value: string;
  subtitle: string;
  color: string;
}

const KPICard = ({
  icon,
  title,
  value,
  subtitle,
  color,
}: KPICardProps) => {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{
        duration: 0.25,
      }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#111827] p-6"
    >
      {/* Glow */}
      <div
        className={`absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-all ${color}`}
      />

      <div className="relative z-10">

        <div className="flex items-center justify-between">

          <span className="text-3xl">
            {icon}
          </span>

          <span className="text-xs uppercase tracking-[3px] text-gray-500">
            LIVE
          </span>

        </div>

        <h3 className="mt-5 text-sm uppercase tracking-widest text-gray-400">
          {title}
        </h3>

        <div className="mt-3 text-5xl font-bold text-white">
          {value}
        </div>

        <p className="mt-3 text-sm text-green-400">
          {subtitle}
        </p>

      </div>

    </motion.div>
  );
};

export default KPICard;