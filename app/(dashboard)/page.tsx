import { DataCharts } from "@/components/data-charts";
import { DataGrid } from "@/components/data-grid";

export default function DashboardPage() {
  return (
    <div className="text-black max-w-screen-4xl mx-auto w-full pb-10">
      <DataGrid />
      <DataCharts />
    </div>
  )
}
