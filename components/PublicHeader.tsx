import Link from "next/link";
export default function PublicHeader(){
 return <header className="site-header"><div className="container header-inner">
  <Link href="/" className="brand"><span className="logo-mark">🌙</span><span>NIGHTTOONS INDIA</span></Link>
  <nav className="public-nav">
   <Link href="/">Home</Link><Link href="/search">Search</Link><Link href="/wishlist">Wishlist</Link><Link href="/telegram">Telegram</Link><Link href="/about">About</Link>
  </nav>
  <Link href="/admin/login" className="btn secondary">Owner Login</Link>
 </div></header>
}
