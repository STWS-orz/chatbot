/*
 * Description: markdownToHtmlTable
 * File Created:  21st June 2023 10:34:12 pm
 * Author: shiqin
 */
// Function to parse the Markdown tables in the message
export function markdownToHtmlTable(markdown: any) {
  const tableRegex = /((\|.*\|)(?:<br>|\n)*)+/gm
  const matches = [...markdown.matchAll(tableRegex)]
  if (!matches.length) return markdown
  let result = markdown
  matches.forEach((match) => {
    const rows = match[0]
      .split(/<br>\s*|\n/)
      .filter(
        (row: any) =>
          row.trim() !== '' && !/^(\|?\s*-+\s*\|)+$/.test(row.trim())
      )
    let htmlTable = '<table>'

    // Header row
    htmlTable += '<tr>'
    const headerRowData = rows[0]
      .split('|')
      .filter((item: any) => item.trim() !== '')
    headerRowData.forEach((cell: any) => {
      htmlTable += `<th>${cell.trim()}</th>`
    })
    htmlTable += '</tr>'

    // Data rows
    for (let i = 1; i < rows.length; i++) {
      const rowData = rows[i]
        .split('|')
        .filter((item: any) => item.trim() !== '')

      let htmlRow = '<tr>'
      rowData.forEach((cell: any) => {
        htmlRow += `<td>${cell.trim()}</td>`
      })
      htmlRow += '</tr>'

      htmlTable += htmlRow
    }

    htmlTable += '</table>'
    result = result.replace(match[0], htmlTable)
  })

  return result
}
