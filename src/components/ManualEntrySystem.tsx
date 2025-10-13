import React, { useState, useRef, useEffect } from 'react'
import { Plus, X, Download, Upload, Shuffle, Trash2, Edit3 } from 'lucide-react'

interface WheelOption {
  id: string
  text: string
  color?: string
  weight?: number
}

interface ManualEntrySystemProps {
  options: WheelOption[]
  onOptionsChange: (options: WheelOption[]) => void
  maxOptions?: number
  showWeights?: boolean
}

const ManualEntrySystem: React.FC<ManualEntrySystemProps> = ({
  options,
  onOptionsChange,
  maxOptions = 50,
  showWeights = false
}) => {
  const [newOption, setNewOption] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingText, setEditingText] = useState('')
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Professional color palette
  const colorPalette = [
    '#6C5CE7', '#00B894', '#FD79A8', '#FDCB6E', '#E17055', '#74B9FF',
    '#A29BFE', '#55A3FF', '#26DE81', '#FC5C65', '#2ECC71', '#E74C3C'
  ]

  // Auto-focus input
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const addOption = () => {
    if (!newOption.trim()) return
    
    // Check for duplicates
    const isDuplicate = options.some(opt => 
      opt.text.toLowerCase() === newOption.trim().toLowerCase()
    )
    
    if (isDuplicate) {
      alert('This option already exists!')
      return
    }

    if (options.length >= maxOptions) {
      alert(`Maximum ${maxOptions} options allowed`)
      return
    }

    const newId = Date.now().toString()
    const randomColor = colorPalette[Math.floor(Math.random() * colorPalette.length)]
    
    const newWheelOption: WheelOption = {
      id: newId,
      text: newOption.trim(),
      color: randomColor,
      weight: 1
    }

    onOptionsChange([...options, newWheelOption])
    setNewOption('')
    
    // Re-focus input
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 100)
  }

  const removeOption = (id: string) => {
    onOptionsChange(options.filter(opt => opt.id !== id))
  }

  const startEdit = (option: WheelOption) => {
    setEditingId(option.id)
    setEditingText(option.text)
  }

  const saveEdit = () => {
    if (!editingText.trim()) return
    
    onOptionsChange(options.map(opt => 
      opt.id === editingId 
        ? { ...opt, text: editingText.trim() }
        : opt
    ))
    
    setEditingId(null)
    setEditingText('')
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditingText('')
  }

  const changeColor = (id: string, color: string) => {
    onOptionsChange(options.map(opt => 
      opt.id === id ? { ...opt, color } : opt
    ))
  }

  const shuffleOptions = () => {
    const shuffled = [...options].sort(() => Math.random() - 0.5)
    onOptionsChange(shuffled)
  }

  const sortOptions = () => {
    const sorted = [...options].sort((a, b) => a.text.localeCompare(b.text))
    onOptionsChange(sorted)
  }

  const clearAll = () => {
    if (confirm('Are you sure you want to remove all options?')) {
      onOptionsChange([])
    }
  }

  // CSV Export
  const exportCSV = () => {
    const csvContent = options.map(opt => 
      `"${opt.text}","${opt.color}",${opt.weight || 1}`
    ).join('\n')
    
    const header = 'Option,Color,Weight\n'
    const blob = new Blob([header + csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'wheel_options.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  // CSV Import
  const importCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      const lines = text.split('\n').filter(line => line.trim())
      
      // Skip header if exists
      const dataLines = lines[0].toLowerCase().includes('option') ? lines.slice(1) : lines
      
      const importedOptions: WheelOption[] = dataLines.map((line, index) => {
        const [text, color, weight] = line.split(',').map(item => 
          item.replace(/"/g, '').trim()
        )
        
        return {
          id: Date.now().toString() + index,
          text: text || `Option ${index + 1}`,
          color: color || colorPalette[index % colorPalette.length],
          weight: parseFloat(weight) || 1
        }
      }).filter(opt => opt.text)

      if (importedOptions.length > 0) {
        onOptionsChange([...options, ...importedOptions.slice(0, maxOptions - options.length)])
      }
    }
    
    reader.readAsText(file)
    event.target.value = '' // Reset input
  }

  // Drag and drop handlers
  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (dropIndex: number) => {
    if (draggedIndex === null) return
    
    const newOptions = [...options]
    const draggedOption = newOptions[draggedIndex]
    
    newOptions.splice(draggedIndex, 1)
    newOptions.splice(dropIndex, 0, draggedOption)
    
    onOptionsChange(newOptions)
    setDraggedIndex(null)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Customize Your Wheel</h3>
        <span className="text-sm text-gray-500">
          {options.length}/{maxOptions} options
        </span>
      </div>

      {/* Add new option */}
      <div className="flex gap-2 mb-6">
        <input
          ref={inputRef}
          type="text"
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addOption()}
          placeholder="Enter new option..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          maxLength={50}
        />
        <button
          onClick={addOption}
          disabled={!newOption.trim() || options.length >= maxOptions}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add
        </button>
      </div>

      {/* Batch operations */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={shuffleOptions}
          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm flex items-center gap-1"
        >
          <Shuffle className="h-3 w-3" />
          Shuffle
        </button>
        <button
          onClick={sortOptions}
          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm"
        >
          Sort A-Z
        </button>
        <button
          onClick={exportCSV}
          disabled={options.length === 0}
          className="px-3 py-1 bg-green-100 hover:bg-green-200 text-green-700 rounded text-sm flex items-center gap-1 disabled:opacity-50"
        >
          <Download className="h-3 w-3" />
          Export CSV
        </button>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded text-sm flex items-center gap-1"
        >
          <Upload className="h-3 w-3" />
          Import CSV
        </button>
        <button
          onClick={clearAll}
          disabled={options.length === 0}
          className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded text-sm flex items-center gap-1 disabled:opacity-50"
        >
          <Trash2 className="h-3 w-3" />
          Clear All
        </button>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv,.txt"
        onChange={importCSV}
        className="hidden"
      />

      {/* Options list */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {options.map((option, index) => (
          <div
            key={option.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-move"
          >
            {/* Color picker */}
            <div className="flex gap-1">
              {colorPalette.slice(0, 6).map(color => (
                <button
                  key={color}
                  onClick={() => changeColor(option.id, color)}
                  className={`w-6 h-6 rounded-full border-2 ${
                    option.color === color ? 'border-gray-600' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            {/* Option text */}
            <div className="flex-1">
              {editingId === option.id ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') saveEdit()
                      if (e.key === 'Escape') cancelEdit()
                    }}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-purple-500"
                    autoFocus
                  />
                  <button
                    onClick={saveEdit}
                    className="px-2 py-1 bg-green-600 text-white rounded text-xs"
                  >
                    ✓
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="px-2 py-1 bg-gray-600 text-white rounded text-xs"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div 
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => startEdit(option)}
                >
                  <span className="flex-1">{option.text}</span>
                  <Edit3 className="h-3 w-3 text-gray-400" />
                </div>
              )}
            </div>

            {/* Weight (Pro feature) */}
            {showWeights && (
              <input
                type="number"
                min="1"
                max="10"
                value={option.weight || 1}
                onChange={(e) => {
                  const weight = parseInt(e.target.value) || 1
                  onOptionsChange(options.map(opt => 
                    opt.id === option.id ? { ...opt, weight } : opt
                  ))
                }}
                className="w-16 px-2 py-1 border border-gray-300 rounded text-sm text-center"
              />
            )}

            {/* Remove button */}
            <button
              onClick={() => removeOption(option.id)}
              className="p-1 text-red-500 hover:text-red-700 transition-colors duration-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {options.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p className="mb-2">No options yet</p>
          <p className="text-sm">Add some options above to get started</p>
        </div>
      )}
    </div>
  )
}

export default ManualEntrySystem