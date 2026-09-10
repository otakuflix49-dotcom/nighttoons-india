 "use client";
import {useState} from "react";import {useRouter} from "next/navigation";
type LinkRow={label:string,url:string,sort_order:number};type Anime={id:string,name:string,description:string,image_url:string|null,published:boolean,anime_links:LinkRow[]};
export default function AnimeForm({mode,anime}:{mode:"create"|"edit";anime?:Anime}){
 const [name,setName]=useState(anime?.name||"");const [description,setDescription]=useState(anime?.description||"AVAILABLE IN HINDI DUBBED");const [published,setPublished]=useState(anime?.published??true);const [image,setImage]=useState<File|null>(null);const [imageUrl,setImageUrl]=useState(anime?.image_url||"");const [links,setLinks]=useState<LinkRow[]>(anime?.anime_links?.sort((a,b)=>a.sort_order-b.sort_order)||[{label:"480P",url:"",sort_order:0}]);const [busy,setBusy]=useState(false);const router=useRouter();
 function update(i:number,k:keyof LinkRow,v:string|number){setLinks(x=>x.map((r,j)=>j===i?{...r,[k]:v}:r))}
 async function save(){setBusy(true);try{let finalImage=imageUrl||null;if(image){const fd=new FormData();fd.append("file",image);if(mode==="edit")fd.append("animeId",anime!.id);const up=await fetch("/api/admin/upload",{method:"POST",body:fd});if(!up.ok)throw new Error(await up.text());finalImage=(await up.json()).url}
 const body={name,description:description||"AVAILABLE IN HINDI DUBBED",published,image_url:finalImage,links:links.filter(x=>x.label.trim()&&x.url.trim()).map((x,i)=>({...x,sort_order:i}))};
 const url=mode==="create"?"/api/admin/anime":`/api/admin/anime/${anime!.id}`;const r=await fetch(url,{method:mode==="create"?"POST":"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});if(!r.ok)throw new Error(await r.text());router.push("/admin/anime");router.refresh()}catch(e:any){alert(e.message||"Save failed")}finally{setBusy(false)}}
 return <div className="card" style={{padding:20,display:"grid",gap:14,maxWidth:850}}>
  <label>Anime Name<input className="input" value={name} onChange={e=>setName(e.target.value)}/></label>
  <label>Image URL<input className="input" value={imageUrl} onChange={e=>setImageUrl(e.target.value)} placeholder="Optional if uploading below"/></label>
  <label>Upload Image<input className="input" type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={e=>setImage(e.target.files?.[0]||null)}/></label>
  <label>Description<textarea className="input" rows={5} value={description} onChange={e=>setDescription(e.target.value)}/></label>
  <label style={{display:"flex",gap:8,alignItems:"center"}}><input type="checkbox" checked={published} onChange={e=>setPublished(e.target.checked)}/> Published</label>
  <h3 style={{marginBottom:0}}>Links</h3>
  {links.map((l,i)=><div key={i} style={{display:"grid",gridTemplateColumns:"1fr 2fr auto",gap:8,alignItems:"center"}}><input className="input" placeholder="480P" value={l.label} onChange={e=>update(i,"label",e.target.value)}/><input className="input" placeholder="https://..." value={l.url} onChange={e=>update(i,"url",e.target.value)}/><button className="btn danger" type="button" onClick={()=>setLinks(x=>x.filter((_,j)=>j!==i))}>×</button></div>)}
  <button className="btn secondary" type="button" onClick={()=>setLinks(x=>[...x,{label:"",url:"",sort_order:x.length}])}>+ Add Link</button>
  <button className="btn" disabled={busy} onClick={save}>{busy?"Saving…":mode==="create"?"Create Anime":"Save Changes"}</button>
 </div>
}