"use client";
import {useRouter,useSearchParams} from "next/navigation";
import {useState} from "react";
export default function SearchBox(){const p=useSearchParams();const [q,setQ]=useState(p.get("q")||"");const router=useRouter();function go(e:React.FormEvent){e.preventDefault();router.push(`/search${q.trim()?`?q=${encodeURIComponent(q.trim())}`:""}`)}return <form onSubmit={go} className="search-form"><input className="input" value={q} onChange={e=>setQ(e.target.value)} placeholder="Search anime name..."/><button className="btn">Search</button></form>}
