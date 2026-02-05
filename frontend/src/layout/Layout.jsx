import { Bell, Settings, LogOut, LayoutDashboard, Briefcase, Users, Calendar, BarChart3, FileText, MessageSquare } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function Layout() {
  const location = useLocation();

  const menu = [
    { label: "Dashboard", path: "/", icon: LayoutDashboard },
    { label: "Jobs", path: "/jobs", icon: Briefcase },
    { label: "Candidates", path: "/candidates", icon: Users },
    { label: "Interviews", path: "/interviews", icon: Calendar },
    { label: "Analytics", path: "/analytics", icon: BarChart3 },
    { label: "Reports", path: "/reports", icon: FileText },
    { label: "Messages", path: "/messages", icon: MessageSquare },
  ];

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen bg-[#6b5b3e] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a0d06] text-white flex flex-col justify-between">
        <div>
          {/* Logo */}
          <div className="px-6 py-5 flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Users className="text-white" size={24} />
            </div>
            <span className="text-lg font-bold tracking-wide">JUMBOO ATS</span>
          </div>

          {/* Navigation */}
          <nav className="space-y-1 px-3 mt-4">
            {menu.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? "bg-indigo-600 text-white shadow-lg"
                      : "text-gray-300 hover:bg-white/10"
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Menu */}
        <div className="px-3 py-4 space-y-1 border-t border-white/10">
          <button className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/10 rounded-lg w-full transition-all duration-200">
            <Settings size={18} />
            <span>Settings</span>
          </button>
          <button className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/10 rounded-lg w-full transition-all duration-200">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white px-6 py-3 flex items-center justify-between shadow-sm">
          <div className="relative flex-1 max-w-xl">
            <input
              placeholder="Search candidates, jobs, or keywords..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="8" cy="8" r="6" />
              <path d="M12 12l3 3" />
            </svg>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-600 hover:text-gray-800 transition-colors">
              <Bell size={20} />
            </button>
            
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                AM
              </div>
              <div className="text-sm">
                <div className="font-semibold text-gray-900">Alex Morgan</div>
                <div className="text-gray-500 text-xs">Sr. Recruiter</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <section className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </section>
      </main>
    </div>
  );
}