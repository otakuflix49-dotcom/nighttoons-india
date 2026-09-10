import AnimeForm from "@/components/AnimeForm";import {requireOwnerPage} from "@/lib/owner";
export default async function NewAnime(){await requireOwnerPage();return <div><h1>Add Anime</h1><p className="muted">Create a new anime post.</p><AnimeForm mode="create"/></div>}
