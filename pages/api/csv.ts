import { NextResponse } from 'next/server'
import * as XLSX from 'xlsx'

export async function GET() {
  const url = 'https://github.com/Jirakit2533/mhydashboard/raw/refs/heads/main/public/data.csv'
  const res = await fetch(url)
  const arrayBuffer = await res.arrayBuffer()
  const data = new Uint8Array(arrayBuffer)
  const workbook = XLSX.read(data, { type: 'array' })
  const sheet = workbook.Sheets[workbook.SheetNames[0]]

  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as (string | number)[][]

  const headers = rows[0].slice(1) // หมวดหมู่: แถวแรก (col 2 เป็นต้นไป)
  const result: { name: string; value: number }[] = []

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i]
    const variableName = row[0] // ชื่อตัวแปรใน col 1

    for (let j = 1; j < row.length; j++) {
      const category = headers[j - 1]
      const value = Number(row[j])
      if (!isNaN(value)) {
        result.push({
          name: `${variableName} - ${category}`,
          value,
        })
      }
    }
  }

  return NextResponse.json(result)
}
