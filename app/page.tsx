import { getContentViews } from "@/services/contentService";
import { DashboardList } from "@/components/content/DashboardList";

export default async function Home() {
  const initialContentTypes = await getContentViews();

  return (
    <main className="container mx-auto p-10">
      <DashboardList initialContentTypes={initialContentTypes} />
    </main>
  );
}
