import Link from "next/link";
export default function AnimeCard({anime}:{anime:any}){
 return <Link className="card anime-card" href={`/${anime.slug}`}>
  <div className="poster">{anime.image_url?<img src={anime.image_url} alt={anime.name}/>:<div className="poster-empty">🌙</div>}</div>
  <div className="anime-card-body"><strong>{anime.name}</strong><span>Hindi Dubbed</span></div>
 </Link>
}
