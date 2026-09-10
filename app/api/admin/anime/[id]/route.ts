import {revalidatePath} from "next/cache";
import {NextResponse} from "next/server";
import {requireOwner,deleteStorageFile} from "@/lib/owner";
import {createAdminClient} from "@/lib/supabase-admin";
import {animeSchema,linkSchema} from "@/lib/validation";

export async function PUT(req:Request,{params}:{params:Promise<{id:string}>}){
  if(!await requireOwner()) return new NextResponse("Unauthorized",{status:401});
  const {id}=await params;
  const body=await req.json();
  const parsed=animeSchema.safeParse(body);
  if(!parsed.success) return new NextResponse("Invalid anime data",{status:400});

  const sb=createAdminClient();
  const {data:old}=await sb.from("anime").select("*").eq("id",id).single();
  if(!old) return new NextResponse("Not found",{status:404});

  const {error}=await sb.from("anime").update({
    ...parsed.data,
    description:parsed.data.description||"AVAILABLE IN HINDI DUBBED",
    updated_at:new Date().toISOString()
  }).eq("id",id);
  if(error) return new NextResponse(error.message,{status:400});

  await sb.from("anime_links").delete().eq("anime_id",id);
  const links=Array.isArray(body.links)
    ? body.links.map((x:any,i:number)=>linkSchema.parse({...x,sort_order:i}))
    : [];
  if(links.length) await sb.from("anime_links").insert(links.map(x=>({...x,anime_id:id})));

  if(old.image_url&&parsed.data.image_url&&old.image_url!==parsed.data.image_url)
    await deleteStorageFile(old.image_url);

  revalidatePath("/");
  revalidatePath("/search");
  revalidatePath(`/${old.slug}`);

  return NextResponse.json({ok:true});
}

export async function DELETE(_req:Request,{params}:{params:Promise<{id:string}>}){
  if(!await requireOwner()) return new NextResponse("Unauthorized",{status:401});
  const {id}=await params;
  const sb=createAdminClient();
  const {data:a}=await sb.from("anime").select("image_url,slug").eq("id",id).single();
  if(!a) return new NextResponse("Not found",{status:404});

  const {error}=await sb.from("anime").delete().eq("id",id);
  if(error) return new NextResponse(error.message,{status:400});
  if(a.image_url) await deleteStorageFile(a.image_url);

  revalidatePath("/");
  revalidatePath("/search");
  revalidatePath(`/${a.slug}`);

  return NextResponse.json({ok:true});
}
