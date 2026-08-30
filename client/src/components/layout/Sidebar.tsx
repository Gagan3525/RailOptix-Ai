const Sidebar = () => {
  return (
    <aside className="w-64 bg-slate-800 text-white">

      <nav className="p-5">

        <ul className="space-y-4">

          <li className="cursor-pointer hover:text-blue-400">
            Dashboard
          </li>

          <li className="cursor-pointer hover:text-blue-400">
            Operations
          </li>

          <li className="cursor-pointer hover:text-blue-400">
            Simulation
          </li>

          <li className="cursor-pointer hover:text-blue-400">
            Analytics
          </li>

          <li className="cursor-pointer hover:text-blue-400">
            AI Assistant
          </li>

        </ul>

      </nav>

    </aside>
  );
};

export default Sidebar;