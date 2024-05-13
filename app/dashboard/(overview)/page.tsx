import { BarChartHero } from '@/components/barChart'
import { Card } from '@tremor/react'
import React from 'react'

export default function DashboardPage() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between mb-2">
        <h1 className={` text-2xl`}>Dashboard</h1>
      </div>
      <Card>
        <BarChartHero />
      </Card>
    </div>
  )
}
