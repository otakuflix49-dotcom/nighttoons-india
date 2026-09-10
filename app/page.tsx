export const dynamic = "force-dynamic";

import Link from "next/link";
import {createAdminClient} from "@/lib/supabase-admin";
import VisitTracker from "@/components/VisitTracker";
import PublicHeader from "@/components/PublicHeader";
import AnimeCard from "@/components/AnimeCard";
import TelegramCards from "@/components/TelegramCards";
export default async function Home(){
 const {data,error}=await createAdminClient().from("anime").select("id,name,slug,image_url,description").eq("published",true).order("created_at",{ascending:false}).limit(24);
 if(error) console.error("Anime fetch error:",error);
 const animeList=data??[];
 return <><PublicHeader/><main className="container page-space"><VisitTracker/><section className="hero"><div className="eyebrow">WELCOME TO</div><h1>NIGHTTOONS INDIA</h1><p>Hindi Dubbed Anime in One Place</p><div className="hero-actions"><Link className="btn" href="/search">🔎 Search Anime</Link><Link className="btn secondary" href="/wishlist">♡ Wishlist</Link></div></section><section><div className="section-head"><div><h2>Latest Anime</h2><p className="muted">Freshly added titles</p></div><Link href="/search">View all →</Link></div>{animeList.length?<div className="anime-grid">{animeList.map((a:any)=><AnimeCard anime={a} key={a.id}/>)}</div>:<div className="card empty"><h2>No anime available yet</h2><p className="muted">Add your first anime from the Owner Dashboard.</p></div>}</section><TelegramCards/></main></>
}
