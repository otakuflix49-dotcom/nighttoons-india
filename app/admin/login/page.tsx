"use client";
import {useEffect,useState} from "react";
import {createClient} from "@/lib/supabase-browser";
import {useRouter} from "next/navigation";
import Link from "next/link";

export default function Login(){
  const [email,setEmail]=useState("");
  const [otp,setOtp]=useState("");
  const [sent,setSent]=useState(false);
  const [busy,setBusy]=useState(false);
  const [msg,setMsg]=useState("");
  const router=useRouter();
  const sb=createClient();

  useEffect(()=>{
    let active=true;
    fetch("/api/auth/session-owner").then(r=>r.json()).then(data=>{
      if(active && data.owner) router.replace("/admin/dashboard");
    });
    return ()=>{active=false};
  },[]);

  async function send(){
    setBusy(true); setMsg("");
    try{
      const r=await fetch("/api/auth/check-owner",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({email})
      });
      if(!r.ok){setMsg("This email is not authorized.");return}

      const redirectTo = `${window.location.origin}/auth/callback`;
      const {error}=await sb.auth.signInWithOtp({
        email:email.trim(),
        options:{
          shouldCreateUser:true,
          emailRedirectTo:redirectTo
        }
      });
      if(error) setMsg(error.message);
      else {setSent(true);setMsg("OTP sent. Check the owner email.");}
    }catch(e:any){
      setMsg(e.message||"Could not send OTP.");
    }finally{setBusy(false);}
  }

  async function verify(){
    setBusy(true);setMsg("");
    try{
      const {error}=await sb.auth.verifyOtp({
        email:email.trim(),
        token:otp.trim(),
        type:"email"
      });
      if(error)setMsg(error.message);
      else window.location.replace("/admin/dashboard");
    }catch(e:any){
      setMsg(e.message||"OTP verification failed.");
    }finally{setBusy(false);}
  }

  return <main className="container page-space narrow">
    <div className="card" style={{padding:28,maxWidth:460,margin:"40px auto"}}>
      <div className="eyebrow">OWNER ACCESS</div>
      <h1>NightToons Admin</h1>
      <p className="muted">Only the configured owner Gmail can enter.</p>
      <label>Email<input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Owner Gmail" autoComplete="email"/></label>
      {sent&&<label style={{display:"block",marginTop:10}}>OTP<input className="input" value={otp} onChange={e=>setOtp(e.target.value)} placeholder="6-digit OTP" inputMode="numeric" autoComplete="one-time-code"/></label>}
      <button className="btn" disabled={busy} style={{width:"100%",marginTop:14}} onClick={sent?verify:send}>
        {busy?"Please wait…":sent?"Verify OTP":"Send OTP"}
      </button>
      {msg&&<p className="muted">{msg}</p>}
      <Link href="/" className="muted" style={{display:"block",marginTop:20}}>← Back to website</Link>
    </div>
  </main>;
}

