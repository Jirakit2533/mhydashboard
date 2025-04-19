// pages/api/csv.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { parse } from 'csv-parse/sync'

const CSV_URL = process.env.CSV_URL

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (!CSV_URL) {
      return res.status(500).json({ error: 'Missing CSV_URL in environment variables' })
    }

    const response = await fetch(CSV_URL)
    const csvText = await response.text()

    const records = parse(csvText, {
      columns: false,
      skip_empty_lines: true,
    })

    // แปลงเป็นรูปแบบ { name: string, value: number }
    const data = records.map((row: string[]) => ({
      name: row[0],
      value: Number(row[1]),
    }))

    res.status(200).json(data)
  } catch (error: unknown) {
    res.status(500).json({ 
      error: 'Failed to fetch or parse CSV', 
      detail: error instanceof Error ? error.message : 'Unknown error' 
    })
  }
}
