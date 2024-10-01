"use client";

import { useGetSummary } from "@/features/summary/api/use-get-summary";
import { formatDateRange } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

import { DataCard } from "@/components/data-card";
import { FaPiggyBank } from "react-icons/fa";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

export const DataGrid = () => {
	const { data } = useGetSummary();

	const params = useSearchParams();
	const to = params.get('to') || undefined;
	const from = params.get('from') || undefined;

	const dateRangeLabel = formatDateRange({ to, from }); // format date from params

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
        <DataCard
					title='Remaining'
					value={data?.remainingAmount}
					icon={FaPiggyBank}
					variant='default'
					dateRange={dateRangeLabel}
				/>
        <DataCard
					title='Income'
					value={data?.incomeAmount}
					icon={FaArrowTrendUp}
					variant='default'
					dateRange={dateRangeLabel}
				/>
        <DataCard
					title='Expenses'
					value={data?.expensesAmount}
					icon={FaArrowTrendDown}
					variant='default'
					dateRange={dateRangeLabel}
				/>
    </div>
  )
}
