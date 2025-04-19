'use client'

import { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'
import { fetchExcelData } from '../lib/fetchExcelData'

const COLORS = ['#FF5733', '#33FF57', '#3357FF', '#FF33A6']

export default function HomePage() {
  const [data, setData] = useState<{ name: string; value: number }[]>([])

  useEffect(() => {
    fetchExcelData().then(setData)
  }, [])

  return (
    <main className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-8">
        <h1 className="text-4xl font-bold text-center mb-6">แผนภูมิวงกลมจากไฟล์ Excel (GitHub)</h1>
        {data.length > 0 ? (
          <PieChart width={400} height={400}>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150} paddingAngle={5}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        ) : (
          <p className="text-center">กำลังโหลดข้อมูล...</p>
        )}
      </div>
    </main>
  )
}
