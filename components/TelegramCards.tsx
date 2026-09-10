import { createAdminClient } from "@/lib/supabase-admin";
export default async function TelegramCards(){
 const {data}=await createAdminClient().from("telegram_channels").select("*").eq("active",true).order("slot");
 if(!data?.length)return null;
 return <section className="telegram-grid">{data.map((x:any)=><div className="card telegram-card" key={x.id}><div><small className="muted">TELEGRAM</small><h3>{x.title}</h3><p className="muted">{x.description}</p></div><a className="btn" href={x.channel_url} target="_blank" rel="noopener noreferrer">{x.button_text||"JOIN CHANNEL"}</a></div>)}</section>
}
