import Analytics from "@/components/Analytics";import {requireOwnerPage} from "@/lib/owner";
export default async function Page(){await requireOwnerPage();return <div><h1>Analytics</h1><p className="muted">Owner-only visit statistics.</p><Analytics/></div>}
