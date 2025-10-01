/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import React from "react";

export const description = "An interactive area chart";

const dummyEnrollmentsData = [
  { date: "2024-08-01", enrollments: 10 },
  { date: "2024-08-02", enrollments: 14 },
  { date: "2024-08-03", enrollments: 12 },
  { date: "2024-08-04", enrollments: 9 },
  { date: "2024-08-05", enrollments: 15 },
  { date: "2024-08-06", enrollments: 11 },
  { date: "2024-08-07", enrollments: 16 },
  { date: "2024-08-08", enrollments: 13 },
  { date: "2024-08-09", enrollments: 18 },
  { date: "2024-08-10", enrollments: 12 },
  { date: "2024-08-11", enrollments: 17 },
  { date: "2024-08-12", enrollments: 19 },
  { date: "2024-08-13", enrollments: 14 },
  { date: "2024-08-14", enrollments: 11 },
  { date: "2024-08-15", enrollments: 15 },
  { date: "2024-08-16", enrollments: 13 },
  { date: "2024-08-17", enrollments: 16 },
  { date: "2024-08-18", enrollments: 12 },
  { date: "2024-08-19", enrollments: 17 },
  { date: "2024-08-20", enrollments: 10 },
  { date: "2024-08-21", enrollments: 15 },
  { date: "2024-08-22", enrollments: 18 },
  { date: "2024-08-23", enrollments: 14 },
  { date: "2024-08-24", enrollments: 19 },
  { date: "2024-08-25", enrollments: 13 },
  { date: "2024-08-26", enrollments: 17 },
  { date: "2024-08-27", enrollments: 11 },
  { date: "2024-08-28", enrollments: 15 },
  { date: "2024-08-29", enrollments: 12 },
  { date: "2024-08-30", enrollments: 18 },
  { date: "2024-08-31", enrollments: 14 },

  { date: "2024-09-01", enrollments: 12 },
  { date: "2024-09-02", enrollments: 15 },
  { date: "2024-09-03", enrollments: 11 },
  { date: "2024-09-04", enrollments: 17 },
  { date: "2024-09-05", enrollments: 13 },
  { date: "2024-09-06", enrollments: 16 },
  { date: "2024-09-07", enrollments: 10 },
  { date: "2024-09-08", enrollments: 18 },
  { date: "2024-09-09", enrollments: 12 },
  { date: "2024-09-10", enrollments: 15 },
  { date: "2024-09-11", enrollments: 19 },
  { date: "2024-09-12", enrollments: 14 },
  { date: "2024-09-13", enrollments: 16 },
  { date: "2024-09-14", enrollments: 13 },
  { date: "2024-09-15", enrollments: 11 },
  { date: "2024-09-16", enrollments: 17 },
  { date: "2024-09-17", enrollments: 12 },
  { date: "2024-09-18", enrollments: 15 },
  { date: "2024-09-19", enrollments: 10 },
  { date: "2024-09-20", enrollments: 18 },
  { date: "2024-09-21", enrollments: 13 },
  { date: "2024-09-22", enrollments: 16 },
  { date: "2024-09-23", enrollments: 11 },
  { date: "2024-09-24", enrollments: 14 },
  { date: "2024-09-25", enrollments: 19 },
  { date: "2024-09-26", enrollments: 12 },
  { date: "2024-09-27", enrollments: 15 },
  { date: "2024-09-28", enrollments: 13 },
  { date: "2024-09-29", enrollments: 17 },
  { date: "2024-09-30", enrollments: 11 },
];

const chartConfig = {
  enrollments: {
    label: "Enrollments",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

interface ChartAreaInteractiveProps {
  data: {
    date: string;
    enrollments: number;
  }[];
}

export function ChartAreaInteractive({ data }: ChartAreaInteractiveProps) {
  const totalEnrollmentsNumber = React.useMemo(
    () => data.reduce((acc, curr) => acc + curr.enrollments, 0),
    [data]
  );
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Enrollments</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total Enrollments for the last 30 days: {totalEnrollmentsNumber}
          </span>
          <span className="@[540px]/card:hidden">Last 30 days: 1200</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            margin={{
              left: 12,
              right: 12,
            }}
            data={data}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={"preserveStartEnd"}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />

            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  labelFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />
              }
            />

            <Bar dataKey={"enrollments"} fill="var(--color-enrollments)" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
