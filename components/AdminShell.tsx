"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {LayoutDashboard,Film,Plus,Send,BarChart3,LogOut,Globe} from "lucide-react";

export default function AdminShell({children}:{children:React.ReactNode}){
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return <div className="admin-grid">
    <aside className="admin-side">
      <div className="admin-brand">🌙 NIGHTTOONS ADMIN</div>
      <nav className="admin-nav">
        <Link className="navlink" href="/admin/dashboard"><LayoutDashboard size={18}/>Dashboard</Link>
        <Link className="navlink" href="/admin/anime"><Film size={18}/>Anime</Link>
        <Link className="navlink" href="/admin/anime/new"><Plus size={18}/>Add Anime</Link>
        <Link className="navlink" href="/admin/telegram"><Send size={18}/>Telegram</Link>
        <Link className="navlink" href="/admin/analytics"><BarChart3 size={18}/>Analytics</Link>
        <Link className="navlink" href="/"><Globe size={18}/>Website</Link>
        <form action="/api/auth/logout" method="post">
          <button className="navlink logout" type="submit"><LogOut size={18}/>Logout</button>
        </form>
      </nav>
    </aside>
    <section className="admin-main">{children}</section>
  </div>;
}
