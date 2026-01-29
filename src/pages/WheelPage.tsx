
import React, { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ArrowLeft, Plus, X, Shuffle, Save, Download, Upload, Settings, Sparkles, Trash2, ToggleLeft, ToggleRight, Edit3 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import SpinningWheel from '../components/SpinningWheel'

interface WheelOption {
  id: string
  text: string
  color?: string
}

const WheelPage: React.FC = () => {
  const { category } = useParams<{ category: string }>()
  const [options, setOptions] = useState<WheelOption[]>([])
  const [manualEntries, setManualEntries] = useState<string[]>([''])
  const [wheelSize, setWheelSize] = useState(550)
  const [lastResult, setLastResult] = useState<WheelOption | null>(null)
  const [spinHistory, setSpinHistory] = useState<WheelOption[]>([])
  const [excludeAfterSpin, setExcludeAfterSpin] = useState(false)
  const [showManualEntry, setShowManualEntry] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Enhanced magical colors
  const magicalColors = [
    '#FF3B30', '#34C759', '#007AFF', '#FFD60A', '#FF9500', '#AF52DE',
    '#FF2D92', '#5AC8FA', '#FFCC02', '#30D158', '#BF5AF2', '#FF6482'
  ]

  // Enhanced category data with SEO optimization
  const categoryData: Record<string, {
    title: string;
    options: string[];
    colors: string[];
    description: string;
    keywords: string;
    seoTitle: string;
  }> = {
    'baby-names': {
      title: 'Baby Names',
      seoTitle: 'Baby Name Generator Wheel | Random Baby Name Picker | SpinWheelHub',
      description: 'Spin our magical baby name wheel to find the perfect name for your little one! Over 45 popular baby names including Emma, Liam, Olivia, Noah and more. Free random baby name generator.',
      keywords: 'baby names, baby name generator, random baby name picker, baby name wheel, name generator, baby naming, pregnancy names, newborn names, popular baby names, unique baby names',
      options: [
        'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Ethan', 'Sophia', 'Mason',
        'Isabella', 'William', 'Mia', 'James', 'Charlotte', 'Benjamin', 'Amelia',
        'Lucas', 'Harper', 'Henry', 'Evelyn', 'Alexander', 'Abigail', 'Sebastian',
        'Emily', 'Jack', 'Elizabeth', 'Owen', 'Mila', 'Theodore', 'Ella', 'Jacob',
        'Grace', 'Michael', 'Aria', 'Daniel', 'Scarlett', 'Matthew', 'Chloe', 'Aiden',
        'Luna', 'David', 'Lily', 'Joseph', 'Zoe', 'Samuel', 'Nora', 'Carter'
      ],
      colors: magicalColors
    },
    'travel': {
      title: 'Travel Destinations',
      seoTitle: 'Travel Destination Picker Wheel | Random Travel Generator | SpinWheelHub',
      description: 'Spin the wheel to discover your next travel adventure! 40+ amazing destinations including Paris, Tokyo, Bali, Iceland and more. Perfect for planning your next vacation or trip.',
      keywords: 'travel destinations, travel picker, vacation planner, random travel generator, travel wheel, destination picker, travel ideas, vacation destinations, travel planning, wanderlust',
      options: [
        'Paris', 'Tokyo', 'New York', 'London', 'Sydney', 'Rome', 'Barcelona', 'Amsterdam',
        'Bali', 'Dubai', 'Santorini', 'Iceland', 'Maldives', 'Thailand', 'Morocco', 'Egypt',
        'Peru', 'Costa Rica', 'Switzerland', 'Norway', 'New Zealand', 'Canada', 'Australia',
        'Greece', 'Turkey', 'Portugal', 'Croatia', 'Vietnam', 'India', 'Brazil', 'Argentina',
        'Chile', 'South Africa', 'Kenya', 'Madagascar', 'Fiji', 'Hawaii', 'Alaska', 'Patagonia'
      ],
      colors: magicalColors
    },
    'company-names': {
      title: 'Company Names',
      seoTitle: 'Company Name Generator Wheel | Business Name Picker | SpinWheelHub',
      description: 'Generate creative company names with our spinning wheel! Perfect for startups, businesses, and entrepreneurs. Includes tech, innovative, and professional business name ideas.',
      keywords: 'company names, business name generator, startup names, business name picker, company name ideas, brand names, business naming, entrepreneur tools, startup generator',
      options: [
        'InnovateTech', 'NextGen Solutions', 'Quantum Dynamics', 'Stellar Ventures', 'Apex Digital',
        'Fusion Labs', 'Velocity Systems', 'Pinnacle Group', 'Catalyst Corp', 'Nexus Innovations',
        'Zenith Technologies', 'Prism Solutions', 'Vortex Enterprises', 'Summit Strategies', 'Eclipse Ventures',
        'Phoenix Industries', 'Titan Dynamics', 'Nova Systems', 'Infinity Labs', 'Horizon Tech'
      ],
      colors: magicalColors
    },
    'life-decisions': {
      title: 'Life Decisions',
      seoTitle: 'Life Decision Maker Wheel | Random Life Choice Generator | SpinWheelHub',
      description: 'Need help making important life decisions? Spin our wheel for guidance on career changes, lifestyle choices, personal growth, and major life decisions.',
      keywords: 'life decisions, decision maker, life choices, personal decisions, life advice, decision wheel, life guidance, major decisions, life planning, decision help',
      options: [
        'Change Career', 'Move to New City', 'Start a Business', 'Go Back to School', 'Travel the World',
        'Learn New Skill', 'Buy a House', 'Adopt a Pet', 'Join a Gym', 'Start Dating',
        'Write a Book', 'Learn an Instrument', 'Volunteer', 'Take a Break', 'Pursue Hobby',
        'Get Married', 'Have Children', 'Change Lifestyle', 'Move Abroad', 'Start Investing'
      ],
      colors: magicalColors
    },
    'food-recipes': {
      title: 'Food & Recipes',
      seoTitle: 'Food Recipe Picker Wheel | Random Meal Generator | SpinWheelHub',
      description: 'Can\'t decide what to cook? Spin our food wheel for delicious recipe ideas! International cuisine options including Italian, Asian, Mexican, and American dishes.',
      keywords: 'food picker, recipe generator, meal planner, cooking ideas, random recipes, food wheel, dinner ideas, meal generator, cooking inspiration, recipe picker',
      options: [
        'Pizza Margherita', 'Chicken Curry', 'Beef Tacos', 'Sushi Rolls', 'Pasta Carbonara',
        'Thai Pad Thai', 'Indian Biryani', 'Mexican Quesadilla', 'Italian Risotto', 'Chinese Fried Rice',
        'Greek Salad', 'French Ratatouille', 'Spanish Paella', 'Japanese Ramen', 'Korean BBQ',
        'American Burger', 'Fish and Chips', 'Chicken Tikka', 'Beef Stir Fry', 'Vegetable Curry'
      ],
      colors: magicalColors
    },
    'entertainment': {
      title: 'Entertainment',
      seoTitle: 'Entertainment Activity Picker | Random Fun Ideas Generator | SpinWheelHub',
      description: 'Bored and need entertainment ideas? Spin our wheel for fun activities including movies, games, music, sports, and creative pursuits. Never be bored again!',
      keywords: 'entertainment ideas, fun activities, boredom buster, activity picker, entertainment wheel, fun generator, leisure activities, hobby ideas, entertainment options',
      options: [
        'Watch Netflix', 'Play Video Games', 'Read a Book', 'Listen to Music', 'Watch YouTube',
        'Go to Movies', 'Play Board Games', 'Watch Sports', 'Listen to Podcast', 'Binge TV Series',
        'Play Mobile Games', 'Watch Documentary', 'Listen to Audiobook', 'Stream Live', 'Browse Social Media',
        'Play Guitar', 'Draw/Paint', 'Dance', 'Sing Karaoke', 'Write Stories'
      ],
      colors: magicalColors
    },
    'astrology': {
      title: 'Astrology Fortune',
      seoTitle: 'Astrology Fortune Wheel | Daily Fortune Picker | SpinWheelHub',
      description: 'Discover your cosmic fortune with our magical astrology wheel! Get positive predictions, spiritual guidance, and daily fortune readings for luck and inspiration.',
      keywords: 'astrology fortune, daily fortune, cosmic predictions, spiritual guidance, fortune wheel, astrology readings, daily horoscope, spiritual wheel, fortune teller, cosmic guidance',
      options: [
        'Great Fortune Ahead', 'Love is Coming', 'Career Success', 'Financial Gain', 'New Friendship',
        'Travel Opportunity', 'Creative Breakthrough', 'Health Improvement', 'Family Joy', 'Personal Growth',
        'Lucky Day Today', 'Unexpected Gift', 'Dream Come True', 'New Adventure', 'Positive Change',
        'Spiritual Awakening', 'Inner Peace', 'Abundance Flow', 'Divine Protection', 'Cosmic Alignment'
      ],
      colors: magicalColors
    },
    'challenges': {
      title: 'Random Challenges',
      seoTitle: 'Random Challenge Generator Wheel | Personal Challenge Picker | SpinWheelHub',
      description: 'Ready for a challenge? Spin our wheel for personal growth challenges, fitness goals, skill development, and life improvement activities. Transform your routine!',
      keywords: 'random challenges, personal challenges, self improvement, fitness challenges, skill development, personal growth, challenge generator, life challenges, habit building',
      options: [
        '30-Day Fitness', 'Learn New Language', 'Read 10 Books', 'No Social Media Week', 'Cook Every Day',
        'Walk 10k Steps Daily', 'Meditation Challenge', 'Photography Project', 'Write Daily Journal', 'Learn to Code',
        'Art Challenge', 'Music Practice', 'Volunteer Work', 'Skill Development', 'Creativity Boost',
        'Cold Shower Challenge', 'Early Rising', 'Gratitude Practice', 'Random Acts of Kindness', 'Digital Detox'
      ],
      colors: magicalColors
    }
  }

  const currentCategory = categoryData[category || ''] || {
    title: 'Custom Wheel',
    seoTitle: 'Custom Decision Wheel | SpinWheelHub',
    description: 'Create your own custom spinning wheel for any decision! Add your own options and spin to make choices.',
    keywords: 'custom wheel, decision maker, choice picker, spinning wheel',
    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
    colors: magicalColors
  }

  useEffect(() => {
    // Load initial options for the category
    const initialOptions = currentCategory.options.slice(0, 8).map((option, index) => ({
      id: `${index + 1}`,
      text: option,
      color: magicalColors[index % magicalColors.length]
    }))
    setOptions(initialOptions)
  }, [category])

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
    a.download = `${currentCategory.title.toLowerCase().replace(/\s+/g, '-')}-options.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const resetToDefaults = () => {
    const defaultOptions = currentCategory.options.slice(0, 8).map((option, index) => ({
      id: `${index + 1}`,
      text: option,
      color: magicalColors[index % magicalColors.length]
    }))
    setOptions(defaultOptions)
    setSpinHistory([])
    setLastResult(null)
    setManualEntries([''])
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
        <title>{currentCategory.seoTitle}</title>
        <meta name="description" content={currentCategory.description} />
        <meta name="keywords" content={currentCategory.keywords} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="SpinWheelHub" />
        <link rel="canonical" href={`https://spinwheelhub.com/wheel/${category}`} />

        {/* Open Graph */}
        <meta property="og:title" content={currentCategory.seoTitle} />
        <meta property="og:description" content={currentCategory.description} />
        <meta property="og:url" content={`https://spinwheelhub.com/wheel/${category}`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://images.pexels.com/photos/1111597/pexels-photo-1111597.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={currentCategory.seoTitle} />
        <meta name="twitter:description" content={currentCategory.description} />
        <meta name="twitter:image" content="https://images.pexels.com/photos/1111597/pexels-photo-1111597.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": currentCategory.title + " Wheel - SpinWheelHub",
            "description": currentCategory.description,
            "url": `https://spinwheelhub.com/wheel/${category}`,
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": currentCategory.keywords.split(', ')
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
        <div className="w-full max-w-none px-2 md:px-4 py-3 md:py-6 overflow-x-auto">
          {/* Optimized Header for 100% zoom */}
          <div className="flex items-center justify-between mb-4 md:mb-6 max-w-7xl mx-auto">
            <Link
              to="/"
              className="inline-flex items-center px-3 md:px-4 py-2 bg-white text-gray-700 hover:text-gray-900 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 font-medium text-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Back</span>
            </Link>

            <div className="flex items-center space-x-2 md:space-x-3">
              {/* Exclude Toggle */}
              <div className="flex items-center space-x-1 md:space-x-2 bg-white px-2 md:px-4 py-2 rounded-lg shadow-md">
                <span className="text-xs font-medium text-gray-700 hidden md:inline">Exclude after spin:</span>
                <span className="text-xs font-medium text-gray-700 md:hidden">Exclude:</span>
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
                <label className="text-xs font-medium text-gray-700 hidden md:inline">Size:</label>
                <input
                  type="range"
                  min="400"
                  max="650"
                  value={wheelSize}
                  onChange={(e) => setWheelSize(Number(e.target.value))}
                  className="w-12 md:w-16 accent-purple-600"
                />
                <span className="text-xs text-gray-600 font-mono hidden md:inline">{wheelSize}px</span>
              </div>
            </div>
          </div>

          {/* Optimized Title for 100% zoom */}
          <div className="text-center mb-6 md:mb-8 max-w-5xl mx-auto px-2">
            <div className="flex items-center justify-center space-x-2 mb-2 md:mb-3">
              <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
                {currentCategory.title} Wheel
              </h1>
              <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-pink-600" />
            </div>
            <p className="text-sm md:text-lg text-gray-600 leading-relaxed px-2">
              Spin the magical wheel to make your choice! Add manual entries, import options, or use our curated list.
            </p>
          </div>

          {/* Optimized Main Grid for 100% zoom */}
          <div className="grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-1 gap-3 md:gap-6 max-w-[1500px] mx-auto">
            {/* Left Panel - Manual Entry & Options Management */}
            <div className="xl:col-span-1 lg:col-span-1 space-y-3 md:space-y-4 min-w-[260px]">
              {/* Manual Entry Section */}
              <div className="bg-white rounded-xl p-3 md:p-4 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm md:text-base font-bold text-gray-900 flex items-center">
                    <Edit3 className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 text-purple-600" />
                    Manual Entry
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
                          placeholder={`Enter name ${index + 1}...`}
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
                      Press Enter after each name
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
                    <span>Import File</span>
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
                    <span>Reset Defaults</span>
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
                        <div
                          className="w-3 h-3 rounded-full shadow-sm border border-white flex-shrink-0"
                          style={{ backgroundColor: option.color }}
                        />
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
            <div className="xl:col-span-1 lg:col-span-1 space-y-3 md:space-y-4 min-w-[260px]">
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
                    <p className="leading-relaxed">Press Enter after each manual entry</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-pink-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <p className="leading-relaxed">Import text files with one option per line</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <p className="leading-relaxed">Toggle exclude to remove winners automatically</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <p className="leading-relaxed">Export your options to save for later</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <p className="leading-relaxed">Wheel spins with smooth physics and celebrations!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Related Wheels - Internal Linking for SEO */}
        <section className="py-8 md:py-12 bg-white mt-8 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center">
              Explore More Wheels
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
              {Object.entries(categoryData)
                .filter(([key]) => key !== category)
                .slice(0, 6)
                .map(([key, data]) => (
                  <Link
                    key={key}
                    to={`/wheel/${key}`}
                    className="flex flex-col items-center p-3 rounded-xl bg-gray-50 hover:bg-purple-50 hover:shadow-md transition-all duration-200 text-center group"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <span className="text-lg md:text-xl">🎡</span>
                    </div>
                    <span className="text-xs md:text-sm font-medium text-gray-700 group-hover:text-purple-700">
                      {data.title}
                    </span>
                  </Link>
                ))}
            </div>
            <div className="text-center mt-6">
              <Link to="/" className="text-purple-600 hover:text-purple-700 font-semibold text-sm">
                View All Categories &rarr;
              </Link>
            </div>
          </div>
        </section>

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

export default WheelPage
