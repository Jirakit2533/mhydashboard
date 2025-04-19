'use client'

import { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'

export default function Page() {
  const [data, setData] = useState<{ name: string; value: number }[]>([])

  useEffect(() => {
    fetch('/api/csv')
      .then((res) => res.json())
      .then(setData)
  }, [])

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#a4de6c', '#d0ed57', '#8dd1e1', '#ffbb28']

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      <h1 className="text-3xl font-bold mb-6">แผนภูมิจากข้อมูล Excel</h1>

      {data.length > 0 ? (
        <PieChart width={500} height={500}>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={150} fill="#8884d8">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      ) : (
        <p>กำลังโหลดข้อมูล...</p>
      )}
    </main>
  )
}



