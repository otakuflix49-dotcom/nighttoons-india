import {redirect} from "next/navigation";
import {requireOwnerPage} from "@/lib/owner";

export default async function AdminRoot(){
  await requireOwnerPage();
  redirect("/admin/dashboard");
}
