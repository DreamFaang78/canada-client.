"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutDashboard,
  Users,
  FileText,
  BarChart2,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  ShieldAlert,
  Loader2
} from "lucide-react";

interface AdminShellProps {
  children: React.ReactNode;
}

export default function AdminShell({ children }: AdminShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    async function checkAuth() {
      try {
        const {
          data: { user },
          error
        } = await supabase.auth.getUser();

        if (error || !user) {
          router.push("/admin");
          return;
        }

        // Fetch admin profile
        const { data: profile } = await supabase
          .from("admins")
          .select("full_name, role, avatar_url")
          .eq("id", user.id)
          .single();

        setAdminUser({
          email: user.email,
          fullName: profile?.full_name || "Admin User",
          role: profile?.role || "admin",
          avatarUrl: profile?.avatar_url
        });
      } catch (err) {
        console.error("Auth check failed:", err);
        router.push("/admin");
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin");
  };

  const navItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Leads", href: "/admin/leads", icon: FileText },
    { label: "Customers", href: "/admin/customers", icon: Users },
    { label: "Analytics", href: "/admin/analytics", icon: BarChart2 },
    { label: "Settings", href: "/admin/settings", icon: Settings }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 text-big-red animate-spin mb-4" />
        <p className="text-sm text-mid-gray font-poppins">Verifying session...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar for desktop */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-big-dark text-white border-r border-white/5 shrink-0">
        <div className="h-16 px-6 border-b border-white/5 flex items-center gap-2.5">
          <ShieldAlert className="w-6 h-6 text-big-red" />
          <span className="font-poppins font-bold text-lg tracking-wide uppercase">
            BIG Admin
          </span>
        </div>

        {/* Profile Card */}
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          <div className="relative w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0 border border-white/10 overflow-hidden">
            {adminUser?.avatarUrl ? (
              <Image src={adminUser.avatarUrl} alt="avatar" fill sizes="40px" className="object-cover rounded-full" />
            ) : (
              <User className="w-5 h-5 text-gray-300" />
            )}
          </div>
          <div className="overflow-hidden">
            <h4 className="font-poppins font-bold text-sm truncate text-white leading-tight">
              {adminUser?.fullName}
            </h4>
            <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block mt-0.5">
              {adminUser?.role}
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-poppins font-semibold transition-all ${
                  isActive
                    ? "bg-big-red text-white shadow-md shadow-big-red/10"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer Logout */}
        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-poppins font-semibold text-gray-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main panel */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header bar */}
        <header className="h-16 bg-white border-b border-gray-200 px-4 sm:px-6 flex items-center justify-between lg:justify-end shrink-0 z-20">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden w-10 h-10 rounded-xl hover:bg-gray-150 flex items-center justify-center text-charcoal"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <span className="text-xs text-mid-gray font-poppins font-semibold">
              RIBO CRM Environment
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto custom-scrollbar">
          {children}
        </main>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-big-dark text-white flex flex-col"
            >
              <div className="h-16 px-6 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShieldAlert className="w-6 h-6 text-big-red" />
                  <span className="font-poppins font-bold text-lg tracking-wide uppercase">
                    BIG Admin
                  </span>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-gray-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 border-b border-white/5 flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/10">
                  <User className="w-5 h-5 text-gray-300" />
                </div>
                <div>
                  <h4 className="font-poppins font-bold text-sm text-white">
                    {adminUser?.fullName}
                  </h4>
                  <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block mt-0.5">
                    {adminUser?.role}
                  </span>
                </div>
              </div>

              <nav className="flex-1 p-4 space-y-1.5">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-poppins font-semibold transition-all ${
                        isActive ? "bg-big-red text-white" : "text-gray-400 hover:text-white"
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-white/5">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-poppins font-semibold text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
