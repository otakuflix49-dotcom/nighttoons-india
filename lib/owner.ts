import { createServerSupabase } from "./supabase-server";
import { redirect } from "next/navigation";
import { createAdminClient } from "./supabase-admin";

export async function requireOwner(){
  const supabase=await createServerSupabase();
  const {data:{user}}=await supabase.auth.getUser();
  if(!user || user.email?.toLowerCase()!==process.env.OWNER_EMAIL?.toLowerCase()) return null;
  return user;
}

export async function requireOwnerResponse(){
  const user=await requireOwner();
  if(!user) return {ok:false as const,status:401};
  return {ok:true as const,user};
}

export async function deleteStorageFile(publicUrl:string){
  const marker="/storage/v1/object/public/anime-posters/";
  const i=publicUrl.indexOf(marker);
  if(i<0)return;
  const path=publicUrl.slice(i+marker.length);
  await createAdminClient().storage.from("anime-posters").remove([path]);
}
export async function requireOwnerPage(){ const user=await requireOwner(); if(!user) redirect("/admin/login"); return user; }
