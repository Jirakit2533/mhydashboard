export async function fetchExcelData(): Promise<{ name: string; value: number }[]> {
  const res = await fetch('https://raw.githubusercontent.com/username/repo/main/data.csv')
  const text = await res.text()
  const rows = text.trim().split('\n').slice(1) // skip header

  return rows.map(row => {
    const [name, value] = row.split(',')
    return { name, value: Number(value) }
  })
}
