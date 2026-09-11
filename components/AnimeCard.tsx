import Link from "next/link";

export default function AnimeCard({
  anime,
  variant = "default",
}: {
  anime: any;
  variant?: string;
}) {
  return (
    <Link
      className={`card anime-card ${variant === "home" ? "home-anime-card" : ""}`}
      href={`/${anime.slug}`}
    >
      <div className="poster">
        {anime.image_url ? (
          <img src={anime.image_url} alt={anime.name} />
        ) : (
          <div className="poster-empty">🌙</div>
        )}
      </div>

      <div className="anime-card-body">
        <strong>{anime.name}</strong>
        <span>Hindi Dubbed</span>
      </div>
    </Link>
  );
}