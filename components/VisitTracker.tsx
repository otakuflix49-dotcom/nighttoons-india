 "use client";
import {useEffect} from "react";
export default function VisitTracker(){useEffect(()=>{fetch("/api/analytics/visit",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({path:location.pathname})}).catch(()=>{})},[]);return null}