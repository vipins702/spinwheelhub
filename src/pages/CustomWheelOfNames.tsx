import React, { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { ArrowLeft, Plus, X, Shuffle, Save, Download, Upload, Settings, Sparkles, Trash2, ToggleLeft, ToggleRight, Edit3, Circle, Share2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import SpinningWheel from '../components/SpinningWheel'

interface WheelOption {
  id: string
  text: string
  meaning?: string
  color?: string
  weight?: number
}

const CustomWheelOfNames: React.FC = () => {
  const [options, setOptions] = useState<WheelOption[]>([])
  const [manualEntries, setManualEntries] = useState<string[]>([''])
  const [wheelSize, setWheelSize] = useState(550)
  const [lastResult, setLastResult] = useState<WheelOption | null>(null)
  const [spinHistory, setSpinHistory] = useState<WheelOption[]>([])
  const [excludeAfterSpin, setExcludeAfterSpin] = useState(false)
  const [showManualEntry, setShowManualEntry] = useState(true)
  const [wheelTitle, setWheelTitle] = useState('Custom Spin Wheel')
  const [showTitleEditor, setShowTitleEditor] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Enhanced magical colors
  const magicalColors = [
    '#FF3B30', '#34C759', '#007AFF', '#FFD60A', '#FF9500', '#AF52DE',
    '#FF2D92', '#5AC8FA', '#FFCC02', '#30D158', '#BF5AF2', '#FF6482',
    '#32D74B', '#5E5CE6', '#FF453A', '#FF9F0A', '#BF5AF2', '#AC8E68'
  ]

  // Color theme palettes for the wheel
  const wheelThemes: Record<string, string[]> = {
    Vibrant: magicalColors,
    Pastel: ['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF', '#E3BAFF', '#FFC9DE', '#C9FFF4'],
    Neon: ['#FF10F0', '#00FFF0', '#CCFF00', '#00FF66', '#FF6700', '#7DF9FF', '#FF3131', '#9D00FF'],
    Casino: ['#C8102E', '#1C1C1C', '#FFD700', '#C8102E', '#1C1C1C', '#FFD700', '#C8102E', '#1C1C1C'],
    Ocean: ['#023E8A', '#0077B6', '#0096C7', '#00B4D8', '#48CAE4', '#90E0EF', '#036666', '#14746F'],
    Sunset: ['#F94144', '#F3722C', '#F8961E', '#F9844A', '#F9C74F', '#D62873', '#B5179E', '#7209B7']
  }
  const [activeTheme, setActiveTheme] = useState('Vibrant')

  const applyTheme = (name: string) => {
    const palette = wheelThemes[name]
    if (!palette) return
    setActiveTheme(name)
    setOptions(prev => prev.map((option, index) => ({
      ...option,
      color: palette[index % palette.length]
    })))
  }

  const updateOptionColor = (id: string, color: string) => {
    setOptions(prev => prev.map(option => option.id === id ? { ...option, color } : option))
  }

  // Default starter options for different categories
  const starterTemplates = {
    'General Decision': [
      'Yes', 'No', 'Maybe', 'Definitely', 'Not Now', 'Ask Later', 'Absolutely', 'Never'
    ],
    'Food Choices': [
      'Pizza', 'Burger', 'Sushi', 'Pasta', 'Tacos', 'Salad', 'Sandwich', 'Soup'
    ],
    'Activities': [
      'Movie Night', 'Go for Walk', 'Read Book', 'Play Games', 'Listen Music', 'Exercise', 'Cook', 'Sleep'
    ],
    'Team Selection': [
      'Team A', 'Team B', 'Team C', 'Team D', 'Team E', 'Team F', 'Team G', 'Team H'
    ],
    'Numbers': [
      '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'
    ],
    'Colors': [
      'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Pink', 'Black', 'White', 'Gray'
    ]
  }

  useEffect(() => {
    // Check for URL parameters first
    const searchParams = new URLSearchParams(window.location.search)
    const urlOptions = searchParams.get('options')
    const urlTitle = searchParams.get('title')

    if (urlOptions) {
      // Decode and split options
      const items = urlOptions.split(',').filter(item => item.trim())
      const customOptions = items.slice(0, 50).map((option, index) => ({
        id: `${index + 1}`,
        text: decodeURIComponent(option.trim()),
        color: magicalColors[index % magicalColors.length]
      }))

      if (customOptions.length > 0) {
        setOptions(customOptions)
        setManualEntries([''])
        if (urlTitle) setWheelTitle(decodeURIComponent(urlTitle))
        return // Skip default initialization
      }
    }

    // Load initial default options if no URL params
    const initialOptions = starterTemplates['General Decision'].slice(0, 8).map((option, index) => ({
      id: `${index + 1}`,
      text: option,
      color: magicalColors[index % magicalColors.length]
    }))
    setOptions(initialOptions)
  }, [])

  // Handle manual entry input changes
  const handleManualEntryChange = (index: number, value: string) => {
    const newEntries = [...manualEntries]
    newEntries[index] = value
    setManualEntries(newEntries)
  }

  // Handle Enter key press for manual entries
  const handleManualEntryKeyPress = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const currentValue = manualEntries[index].trim()

      if (currentValue) {
        const newId = (options.length + 1).toString()
        const newColor = magicalColors[options.length % magicalColors.length]

        setOptions(prev => [...prev, {
          id: newId,
          text: currentValue,
          color: newColor
        }])
      }

      if (index === manualEntries.length - 1) {
        setManualEntries(prev => [...prev, ''])
      }

      setTimeout(() => {
        const nextInput = document.querySelector(`input[data-index="${index + 1}"]`) as HTMLInputElement
        if (nextInput) {
          nextInput.focus()
        }
      }, 0)
    }
  }

  // Add all manual entries to wheel
  const addAllManualEntries = () => {
    const validEntries = manualEntries.filter(entry => entry.trim())

    const newOptions = validEntries.map((entry, index) => ({
      id: `${options.length + index + 1}`,
      text: entry.trim(),
      color: magicalColors[(options.length + index) % magicalColors.length]
    }))

    setOptions(prev => [...prev, ...newOptions])
    setManualEntries([''])
  }

  // Clear all manual entries
  const clearManualEntries = () => {
    setManualEntries([''])
  }

  // Remove option from wheel
  const removeOption = (id: string) => {
    if (options.length > 2) {
      setOptions(options.filter(option => option.id !== id))
    }
  }

  // Clear all options
  const clearAllOptions = () => {
    setOptions([])
    setSpinHistory([])
    setLastResult(null)
  }

  // Load template
  const loadTemplate = (templateName: string) => {
    const template = starterTemplates[templateName as keyof typeof starterTemplates]
    if (template) {
      const templateOptions = template.map((option, index) => ({
        id: `${index + 1}`,
        text: option,
        color: magicalColors[index % magicalColors.length]
      }))
      setOptions(templateOptions)
      setSpinHistory([])
      setLastResult(null)
      setManualEntries([''])
      setWheelTitle(`${templateName} Wheel`)
    }
  }

  // Import options from file
  const importOptions = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        const lines = content.split('\n').filter(line => line.trim())

        const importedOptions = lines.map((line, index) => ({
          id: `imported-${index + 1}`,
          text: line.trim(),
          color: magicalColors[index % magicalColors.length]
        }))

        setOptions(importedOptions)
        setSpinHistory([])
        setLastResult(null)
      } catch (error) {
        alert('Error reading file. Please make sure it\'s a valid text file.')
      }
    }
    reader.readAsText(file)
  }

  // Export options to file
  const exportOptions = () => {
    const content = options.map(option => option.text).join('\n')
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = `${wheelTitle.toLowerCase().replace(/\s+/g, '-')}-options.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Save wheel to the server and copy a shareable /w/:id link
  const [isSharing, setIsSharing] = useState(false)
  const shareWheel = async () => {
    if (options.length < 2) {
      toast.error('Add at least 2 options before sharing')
      return
    }
    setIsSharing(true)
    try {
      const res = await fetch('/api/wheels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: wheelTitle,
          entries: options.map(o => ({ text: o.text, color: o.color }))
        })
      })
      if (!res.ok) throw new Error((await res.json()).error || 'Failed to save wheel')
      const { url } = await res.json()
      const fullUrl = `${window.location.origin}${url}`
      await navigator.clipboard.writeText(fullUrl)
      toast.success('Wheel saved! Share link copied to clipboard')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not share wheel')
    } finally {
      setIsSharing(false)
    }
  }

  const resetToDefaults = () => {
    const defaultOptions = starterTemplates['General Decision'].slice(0, 8).map((option, index) => ({
      id: `${index + 1}`,
      text: option,
      color: magicalColors[index % magicalColors.length]
    }))
    setOptions(defaultOptions)
    setSpinHistory([])
    setLastResult(null)
    setManualEntries([''])
    setWheelTitle('Custom Spin Wheel')
  }

  const handleSpinComplete = (result: WheelOption) => {
    setLastResult(result)
    setSpinHistory([result, ...spinHistory.slice(0, 9)])
  }

  const handleOptionExcluded = (optionId: string) => {
    setOptions(prev => prev.filter(option => option.id !== optionId))
  }

  return (
    <>
      {/* Enhanced SEO Head */}
      <Helmet>
        <title>Custom Spin Wheel — Make Your Own Customizable Wheel Spinner | SpinWheelHub</title>
        <meta name="description" content="Make your own custom spin wheel in seconds. Add your entries, customize colors, and spin — a free customizable wheel spinner for teams, giveaways, classrooms and decisions." />
        <meta name="keywords" content="spin wheel, wheel of names, custom wheel, random picker, decision maker, name picker, team selector, random generator, spinning wheel, choice maker, custom spinner, random name picker, decision wheel, name selector, team picker, random chooser" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="SpinWheelHub" />
        <link rel="canonical" href="https://spinwheelhub.vercel.app/custom-wheel-of-names" />

        {/* Open Graph */}
        <meta property="og:title" content="Custom Spin Wheel — Make Your Own Customizable Wheel Spinner" />
        <meta property="og:description" content="Create your personalized spin wheel! Perfect for team selection, decision making, name drawing, and any random picking needs." />
        <meta property="og:url" content="https://spinwheelhub.vercel.app/custom-wheel-of-names" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://images.pexels.com/photos/1111597/pexels-photo-1111597.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Custom Spin Wheel | SpinWheelHub" />
        <meta name="twitter:description" content="Build your own custom spinning wheel for any decision or name picking need. Free and fully customizable!" />
        <meta name="twitter:image" content="https://images.pexels.com/photos/1111597/pexels-photo-1111597.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Custom Wheel of Names - SpinWheelHub",
            "description": "Create personalized spinning wheels for any purpose. Free random picker and decision maker with customizable options.",
            "url": "https://spinwheelhub.vercel.app/custom-wheel-of-names",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": ["custom wheel creator", "random name picker", "decision maker", "team selector", "import export options", "customizable spinner"]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
        <div className="w-full max-w-none px-2 md:px-4 py-3 md:py-6 overflow-x-auto">
          {/* Optimized Header for 100% zoom */}
          <div className="flex items-center justify-between mb-1 md:mb-2 max-w-7xl mx-auto">
            <Link
              to="/"
              className="inline-flex items-center px-3 md:px-4 py-2 bg-white text-gray-700 hover:text-gray-900 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 font-medium text-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Back</span>
            </Link>

            <div className="flex items-center space-x-2 md:space-x-3">
              {/* Template Selection */}
              <div className="flex items-center space-x-1 md:space-x-2 bg-white px-2 md:px-3 py-2 rounded-lg shadow-md">
                <span className="text-xs font-medium text-gray-700 hidden md:inline">Template:</span>
                <select
                  onChange={(e) => loadTemplate(e.target.value)}
                  className="text-xs font-medium bg-transparent border-none outline-none text-purple-600"
                  defaultValue=""
                >
                  <option value="" disabled>Choose Template</option>
                  {Object.keys(starterTemplates).map(template => (
                    <option key={template} value={template}>{template}</option>
                  ))}
                </select>
              </div>

              {/* Exclude Toggle */}
              <div className="flex items-center space-x-1 md:space-x-2 bg-white px-2 md:px-4 py-2 rounded-lg shadow-md">
                <span className="text-xs font-medium text-gray-700 hidden md:inline">Exclude:</span>
                <button
                  onClick={() => setExcludeAfterSpin(!excludeAfterSpin)}
                  className="flex items-center"
                >
                  {excludeAfterSpin ? (
                    <ToggleRight className="w-5 h-5 md:w-6 md:h-6 text-green-500" />
                  ) : (
                    <ToggleLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-400" />
                  )}
                </button>
              </div>

              {/* Wheel Size Control */}
              <div className="flex items-center space-x-1 md:space-x-2 bg-white px-2 md:px-4 py-2 rounded-lg shadow-md">
                <Settings className="w-3 h-3 md:w-4 md:h-4 text-gray-600" />
                <input
                  type="range"
                  min="400"
                  max="650"
                  value={wheelSize}
                  onChange={(e) => setWheelSize(Number(e.target.value))}
                  className="w-12 md:w-16 accent-purple-600"
                />
              </div>
            </div>
          </div>

          {/* Optimized Title for 100% zoom */}
          <div className="text-center mb-1 md:mb-2 max-w-5xl mx-auto px-2">
            <div className="flex items-center justify-center space-x-2 mb-0 md:mb-1">
              <Circle className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
              {showTitleEditor ? (
                <input
                  type="text"
                  value={wheelTitle}
                  onChange={(e) => setWheelTitle(e.target.value)}
                  onBlur={() => setShowTitleEditor(false)}
                  onKeyPress={(e) => e.key === 'Enter' && setShowTitleEditor(false)}
                  className="text-lg md:text-xl lg:text-2xl font-bold bg-transparent border-b-2 border-purple-600 outline-none text-center bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent"
                  autoFocus
                />
              ) : (
                <h1
                  className="text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent cursor-pointer hover:opacity-80"
                  onClick={() => setShowTitleEditor(true)}
                >
                  {wheelTitle}
                </h1>
              )}
              <button
                onClick={() => setShowTitleEditor(true)}
                className="text-gray-400 hover:text-purple-600 transition-colors"
              >
                <Edit3 className="w-3 h-3 md:w-4 md:h-4" />
              </button>
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
            </div>
            <p className="text-xs md:text-sm text-gray-600 leading-tight px-2">
              Create your custom wheel for any purpose! Add your own options, import lists, or choose from templates.
            </p>
          </div>

          {/* Optimized Main Grid for 100% zoom */}
          <div className="grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-1 gap-1 md:gap-2 max-w-[1500px] mx-auto">
            {/* Left Panel - Manual Entry & Options Management */}
            <div className="xl:col-span-1 lg:col-span-1 space-y-1 md:space-y-2 min-w-[260px]">
              {/* Manual Entry Section */}
              <div className="bg-white rounded-xl p-2 md:p-3 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm md:text-base font-bold text-gray-900 flex items-center">
                    <Edit3 className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 text-purple-600" />
                    Add Options
                  </h3>
                  <button
                    onClick={() => setShowManualEntry(!showManualEntry)}
                    className="text-purple-600 hover:text-purple-700 text-xs font-semibold"
                  >
                    {showManualEntry ? 'Hide' : 'Show'}
                  </button>
                </div>

                {showManualEntry && (
                  <div className="space-y-3">
                    <div className="max-h-40 md:max-h-48 overflow-y-auto space-y-2 custom-scrollbar">
                      {manualEntries.map((entry, index) => (
                        <input
                          key={index}
                          type="text"
                          value={entry}
                          onChange={(e) => handleManualEntryChange(index, e.target.value)}
                          onKeyPress={(e) => handleManualEntryKeyPress(index, e)}
                          placeholder={`Enter option ${index + 1}...`}
                          className="w-full px-2 md:px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-xs md:text-sm"
                          maxLength={25}
                          data-index={index}
                        />
                      ))}
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={addAllManualEntries}
                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-2 md:px-3 py-2 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-medium text-xs"
                      >
                        Add All
                      </button>
                      <button
                        onClick={clearManualEntries}
                        className="px-2 md:px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium text-xs"
                      >
                        Clear
                      </button>
                    </div>

                    <p className="text-xs text-gray-500 text-center">
                      Press Enter after each option
                    </p>
                  </div>
                )}
              </div>

              {/* Import/Export Section */}
              <div className="bg-white rounded-xl p-3 md:p-4 shadow-lg border border-gray-100">
                <h3 className="text-sm md:text-base font-bold text-gray-900 mb-3 flex items-center">
                  <Upload className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 text-blue-600" />
                  Import/Export
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={shareWheel}
                    disabled={isSharing || options.length < 2}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 md:px-3 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-1 md:space-x-2 font-medium text-xs shadow-md"
                  >
                    <Share2 className="w-3 h-3" />
                    <span>{isSharing ? 'Saving…' : 'Save & Share Link'}</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".txt"
                    onChange={importOptions}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-2 md:px-3 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-1 md:space-x-2 font-medium text-xs shadow-md"
                  >
                    <Upload className="w-3 h-3" />
                    <span>Import Options</span>
                  </button>

                  <button
                    onClick={exportOptions}
                    disabled={options.length === 0}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-2 md:px-3 py-2 rounded-lg hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-1 md:space-x-2 font-medium text-xs shadow-md"
                  >
                    <Download className="w-3 h-3" />
                    <span>Export Options</span>
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl p-3 md:p-4 shadow-lg border border-gray-100">
                <h3 className="text-sm md:text-base font-bold text-gray-900 mb-3 flex items-center">
                  <Shuffle className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 text-blue-600" />
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={resetToDefaults}
                    className="w-full bg-gradient-to-r from-gray-500 to-gray-600 text-white px-2 md:px-3 py-2 rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-200 flex items-center justify-center space-x-1 md:space-x-2 font-medium text-xs shadow-md"
                  >
                    <Shuffle className="w-3 h-3" />
                    <span>Reset to Default</span>
                  </button>

                  <button
                    onClick={clearAllOptions}
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-2 md:px-3 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 flex items-center justify-center space-x-1 md:space-x-2 font-medium text-xs shadow-md"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Clear All</span>
                  </button>
                </div>
              </div>

              {/* Wheel Color Themes */}
              <div className="bg-white rounded-xl p-3 md:p-4 shadow-lg border border-gray-100">
                <h3 className="text-sm md:text-base font-bold text-gray-900 mb-3 flex items-center">
                  <Circle className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 text-purple-600" />
                  Wheel Colors
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(wheelThemes).map(([name, palette]) => (
                    <button
                      key={name}
                      onClick={() => applyTheme(name)}
                      className={`rounded-lg p-1.5 border-2 transition-all duration-200 ${activeTheme === name ? 'border-purple-500 shadow-md' : 'border-gray-200 hover:border-purple-300'}`}
                      title={`Apply ${name} theme`}
                    >
                      <div className="flex h-3 rounded overflow-hidden mb-1">
                        {palette.slice(0, 6).map((c, i) => (
                          <div key={i} className="flex-1" style={{ backgroundColor: c }} />
                        ))}
                      </div>
                      <span className="text-[10px] font-medium text-gray-700">{name}</span>
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-gray-400 mt-2 text-center">Tip: click any color dot below to fine-tune a single slice</p>
              </div>

              {/* Current Options */}
              <div className="bg-white rounded-xl p-3 md:p-4 shadow-lg border border-gray-100">
                <h3 className="text-sm md:text-base font-bold text-gray-900 mb-3">
                  Options ({options.length})
                </h3>
                <div className="space-y-2 max-h-48 md:max-h-64 overflow-y-auto custom-scrollbar">
                  {options.map((option) => (
                    <div
                      key={option.id}
                      className="flex items-center justify-between p-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg group hover:from-gray-100 hover:to-gray-200 transition-all duration-200"
                    >
                      <div className="flex items-center space-x-2 flex-1 min-w-0">
                        <label
                          className="w-4 h-4 rounded-full shadow-sm border border-white flex-shrink-0 cursor-pointer relative overflow-hidden"
                          style={{ backgroundColor: option.color }}
                          title="Change slice color"
                        >
                          <input
                            type="color"
                            value={option.color || '#FF3B30'}
                            onChange={(e) => updateOptionColor(option.id, e.target.value)}
                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                          />
                        </label>
                        <span className="text-xs font-medium text-gray-900 truncate">
                          {option.text}
                        </span>
                      </div>
                      {options.length > 2 && (
                        <button
                          onClick={() => removeOption(option.id)}
                          className="opacity-0 group-hover:opacity-100 p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-all duration-200 flex-shrink-0"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Center Panel - Spinning Wheel */}
            <div className="xl:col-span-3 lg:col-span-1 flex flex-col items-center justify-start space-y-1 md:space-y-2 min-h-[300px] md:min-h-[350px]">
              <div className="bg-white rounded-xl p-1 md:p-2 shadow-xl border border-gray-100">
                <SpinningWheel
                  options={options}
                  size={Math.min(wheelSize, window.innerWidth - 100)}
                  excludeAfterSpin={excludeAfterSpin}
                  onSpinComplete={handleSpinComplete}
                  onOptionExcluded={handleOptionExcluded}
                />
              </div>

              {/* Result now shows in interactive popup instead of here */}
            </div>

            {/* Right Panel - History & Stats */}
            <div className="xl:col-span-1 lg:col-span-1 space-y-1 md:space-y-2 min-w-[260px]">
              {/* Spin History */}
              {spinHistory.length > 0 && (
                <div className="bg-white rounded-xl p-3 md:p-4 shadow-lg border border-gray-100">
                  <h3 className="text-sm md:text-base font-bold text-gray-900 mb-3 flex items-center">
                    <span className="text-sm md:text-base mr-1 md:mr-2">📊</span>
                    Recent Results
                  </h3>
                  <div className="space-y-2 max-h-48 md:max-h-64 overflow-y-auto custom-scrollbar">
                    {spinHistory.map((result, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 p-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100"
                      >
                        <div className="w-5 h-5 md:w-6 md:h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm flex-shrink-0">
                          {index + 1}
                        </div>
                        <div
                          className="w-3 h-3 rounded-full shadow-sm border border-white flex-shrink-0"
                          style={{ backgroundColor: result.color }}
                        />
                        <span className="text-xs font-medium text-gray-900 truncate flex-1">
                          {result.text}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setSpinHistory([])}
                    className="w-full mt-3 px-2 md:px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-xs font-medium"
                  >
                    Clear History
                  </button>
                </div>
              )}

              {/* Enhanced Tips */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-3 md:p-4 border-2 border-purple-200 shadow-lg">
                <h3 className="text-sm md:text-base font-bold text-gray-900 mb-3 flex items-center">
                  <span className="text-base md:text-lg mr-1 md:mr-2">💡</span>
                  Pro Tips
                </h3>
                <div className="space-y-2 md:space-y-3 text-xs text-gray-700">
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <p className="leading-relaxed">Click the title to customize your wheel name</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-pink-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <p className="leading-relaxed">Use templates for quick setup</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <p className="leading-relaxed">Import/export options to save your lists</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <p className="leading-relaxed">Toggle exclude to remove winners</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <p className="leading-relaxed">Perfect for team selection, decisions, and games!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Custom scrollbar styles */}
        <style dangerouslySetInnerHTML={{
          __html: `
            .custom-scrollbar::-webkit-scrollbar {
              width: 4px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: #f1f5f9;
              border-radius: 8px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: linear-gradient(to bottom, #a855f7, #ec4899);
              border-radius: 8px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: linear-gradient(to bottom, #9333ea, #db2777);
            }
          `
        }} />
      </div>
    </>
  )
}

export default CustomWheelOfNames