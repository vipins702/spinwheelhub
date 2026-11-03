import React, { useEffect, useRef, useState } from 'react'
import { Download, Trash2, Upload, Wand2 } from 'lucide-react'
import { downloadFile, namesFromFile, tidyNames } from '../utils/names'

interface NameListInputProps {
    id: string
    label: string
    value: string
    onChange: (value: string) => void
    storageKey: string
    exportName: string
    rows?: number
}

const MAX_FILE_BYTES = 1024 * 1024

const save = (key: string, value: string) => {
    try {
        localStorage.setItem(key, value)
    } catch {
        // Private windows can block storage; the list still works for this visit
    }
}

// Shared list box: type or paste, import a file, tidy, save, and remember the list in this browser
const NameListInput: React.FC<NameListInputProps> = ({ id, label, value, onChange, storageKey, exportName, rows = 10 }) => {
    const fileRef = useRef<HTMLInputElement>(null)
    const [message, setMessage] = useState('')
    const count = value.split('\n').filter(line => line.trim()).length

    useEffect(() => {
        try {
            const saved = localStorage.getItem(storageKey)
            if (saved !== null) onChange(saved)
        } catch {
            // Storage unavailable: keep the starting list
        }
        // Restore once on load only
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storageKey])

    const update = (next: string, note = '') => {
        onChange(next)
        save(storageKey, next)
        setMessage(note)
    }

    const importFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        e.target.value = ''
        if (!file) return
        if (file.size > MAX_FILE_BYTES) {
            setMessage('That file is over 1 MB. Use a smaller .txt or .csv file.')
            return
        }
        const names = namesFromFile(await file.text(), file.name.toLowerCase().endsWith('.csv'))
        if (names.length === 0) {
            setMessage('No names found in that file.')
            return
        }
        update(names.join('\n'), `Imported ${names.length} names from ${file.name}.`)
    }

    const tidy = () => {
        const names = tidyNames(value)
        const removed = count - names.length
        update(names.join('\n'), removed > 0 ? `Tidied. Removed ${removed} duplicates.` : `Tidied. ${names.length} names.`)
    }

    const buttonClass = 'inline-flex items-center justify-center gap-1 px-2 py-2 rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-700 hover:border-purple-400 hover:text-purple-700 disabled:opacity-50 disabled:cursor-not-allowed'

    return (
        <div>
            <label htmlFor={id} className="text-sm font-bold text-gray-900 mb-2 flex items-center justify-between">
                <span>{label}</span>
                <span className="text-xs font-semibold text-purple-700 bg-purple-50 rounded-full px-2 py-0.5">{count} {count === 1 ? 'name' : 'names'}</span>
            </label>
            <textarea
                id={id}
                value={value}
                onChange={(e) => update(e.target.value)}
                rows={rows}
                placeholder={'Alex\nJordan\nSam'}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm text-gray-900 bg-white"
            />
            <input ref={fileRef} type="file" accept=".txt,.csv,text/plain,text/csv" onChange={importFile} className="hidden" aria-label="Import names from a file" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                <button type="button" onClick={() => fileRef.current?.click()} className={buttonClass}>
                    <Upload className="w-3.5 h-3.5" /> Import
                </button>
                <button type="button" onClick={tidy} disabled={count === 0} title="Split names on commas and remove duplicates" className={buttonClass}>
                    <Wand2 className="w-3.5 h-3.5" /> Tidy
                </button>
                <button type="button" onClick={() => downloadFile(exportName, value)} disabled={count === 0} className={buttonClass}>
                    <Download className="w-3.5 h-3.5" /> Save
                </button>
                <button type="button" onClick={() => update('', 'List cleared.')} disabled={value === ''} className={buttonClass}>
                    <Trash2 className="w-3.5 h-3.5" /> Clear
                </button>
            </div>
            <p className="text-[11px] text-gray-500 mt-2" aria-live="polite">
                {message || 'Import a .txt or .csv file, or paste names separated by commas and press Tidy. Your list stays in this browser.'}
            </p>
        </div>
    )
}

export default NameListInput
