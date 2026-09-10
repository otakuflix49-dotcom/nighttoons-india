import {NextResponse} from "next/server";
import {requireOwner} from "@/lib/owner";

export async function GET(){
  const user = await requireOwner();
  return NextResponse.json({owner:!!user});
}
