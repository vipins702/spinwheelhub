const clean = (name: string) => name.trim().replace(/^["']|["']$/g, '').trim()

// Removes blanks and case-insensitive repeats, keeping the first spelling
export const uniqueNames = (names: string[]): string[] => {
    const seen = new Set<string>()
    return names.map(clean).filter(name => {
        const key = name.toLowerCase()
        if (!name || seen.has(key)) return false
        seen.add(key)
        return true
    })
}

// Messy pasted text: names separated by new lines, commas, semicolons or tabs
export const tidyNames = (text: string): string[] => uniqueNames(text.split(/[\n\r,;\t]+/))

// A quoted cell can contain commas, as in "Lee, Kim"
const firstCsvCell = (line: string): string => {
    const quoted = line.match(/^\s*"((?:[^"]|"")*)"/)
    return quoted ? quoted[1].replace(/""/g, '"') : line.split(/[,;\t]/)[0]
}

// Imported files. A .csv uses its first column and skips a "name" header. A one-line file is split like pasted text.
export const namesFromFile = (text: string, isCsv: boolean): string[] => {
    const lines = text.split(/\r?\n/).filter(line => line.trim())
    if (lines.length === 1) return tidyNames(lines[0])
    const names = isCsv ? lines.map(firstCsvCell) : lines
    if (/^["']?(full )?names?["']?$/i.test(clean(names[0] ?? ''))) names.shift()
    return uniqueNames(names)
}

// Quotes a CSV cell and stops spreadsheets from running a name as a formula
export const csvCell = (value: string): string => {
    const safe = /^[=+\-@]/.test(value) ? `'${value}` : value
    return `"${safe.replace(/"/g, '""')}"`
}

export const downloadFile = (filename: string, content: string, type = 'text/plain') => {
    const url = URL.createObjectURL(new Blob([content], { type }))
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
}
