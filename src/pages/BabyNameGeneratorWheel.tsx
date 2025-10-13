import React, { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { ArrowLeft, Plus, X, Shuffle, Save, Download, Upload, Settings, Sparkles, Trash2, ToggleLeft, ToggleRight, Edit3, Baby } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import SpinningWheel from '../components/SpinningWheel'

interface BabyName {
  name: string
  meaning: string
  style: string
}

interface WheelOption {
  id: string
  text: string
  meaning?: string
  color?: string
  weight?: number
}

const BabyNameGeneratorWheel: React.FC = () => {
  const [options, setOptions] = useState<WheelOption[]>([])
  const [manualEntries, setManualEntries] = useState<string[]>([''])
  const [wheelSize, setWheelSize] = useState(550)
  const [lastResult, setLastResult] = useState<WheelOption | null>(null)
  const [spinHistory, setSpinHistory] = useState<WheelOption[]>([])
  const [excludeAfterSpin, setExcludeAfterSpin] = useState(false)
  const [showManualEntry, setShowManualEntry] = useState(false)
  const [selectedReligion, setSelectedReligion] = useState<string>('Christian')
  const [selectedGender, setSelectedGender] = useState<string>('Boys')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Enhanced magical colors
  const magicalColors = [
    '#FF3B30', '#34C759', '#007AFF', '#FFD60A', '#FF9500', '#AF52DE',
    '#FF2D92', '#5AC8FA', '#FFCC02', '#30D158', '#BF5AF2', '#FF6482'
  ]

  // Comprehensive baby names database with meanings
  const babyNamesDatabase = {
    Christian: {
      Boys: [
        { name: 'Noah', meaning: 'Rest, comfort', style: 'Biblical' },
        { name: 'Liam', meaning: 'Strong-willed warrior', style: 'Modern' },
        { name: 'Elijah', meaning: 'My God is Yahweh', style: 'Biblical' },
        { name: 'Oliver', meaning: 'Olive tree (peace)', style: 'Classic' },
        { name: 'James', meaning: 'Supplanter', style: 'Timeless' },
        { name: 'Levi', meaning: 'Joined, attached', style: 'Biblical' },
        { name: 'Asher', meaning: 'Happy, blessed', style: 'Biblical' },
        { name: 'Caleb', meaning: 'Wholehearted, faithful', style: 'Biblical' },
        { name: 'Lucas', meaning: 'Light-giving', style: 'Biblical' },
        { name: 'Mason', meaning: 'Worker in stone', style: 'Modern' },
        { name: 'Ezra', meaning: 'Help', style: 'Biblical' },
        { name: 'Nathan', meaning: 'Gift from God', style: 'Biblical' },
        { name: 'Josiah', meaning: 'God supports, heals', style: 'Biblical' },
        { name: 'Ethan', meaning: 'Strong, firm', style: 'Classic' },
        { name: 'Samuel', meaning: 'Heard by God', style: 'Biblical' },
        { name: 'Benjamin', meaning: 'Son of the right hand', style: 'Biblical' },
        { name: 'Gabriel', meaning: 'God is my strength', style: 'Angelic/Biblical' },
        { name: 'Micah', meaning: 'Who is like God', style: 'Biblical' },
        { name: 'Isaac', meaning: 'Laughter', style: 'Biblical' },
        { name: 'Theodore', meaning: 'Gift of God', style: 'Classic comeback' },
        { name: 'Matthew', meaning: 'Gift of God', style: 'Traditional' },
        { name: 'Jordan', meaning: 'To flow down (river name)', style: 'Biblical' },
        { name: 'Sebastian', meaning: 'Venerable, revered', style: 'Modern-classic' }
      ],
      Girls: [
        { name: 'Olivia', meaning: 'Olive tree (peace)', style: 'Biblical roots' },
        { name: 'Emma', meaning: 'Whole, universal', style: 'Classic' },
        { name: 'Charlotte', meaning: 'Free woman', style: 'Timeless' },
        { name: 'Amelia', meaning: 'Industrious', style: 'Modern' },
        { name: 'Ava', meaning: 'Life, bird', style: 'Biblical tone' },
        { name: 'Grace', meaning: 'Favor, blessing', style: 'Christian virtue' },
        { name: 'Faith', meaning: 'Trust, belief', style: 'Christian virtue' },
        { name: 'Hope', meaning: 'Expectation, optimism', style: 'Virtue' },
        { name: 'Elizabeth', meaning: 'God\'s promise', style: 'Biblical' },
        { name: 'Abigail', meaning: 'Father\'s joy', style: 'Biblical' },
        { name: 'Hannah', meaning: 'Grace', style: 'Biblical' },
        { name: 'Leah', meaning: 'Weary but gentle', style: 'Biblical' },
        { name: 'Naomi', meaning: 'Pleasantness', style: 'Biblical' },
        { name: 'Ruth', meaning: 'Compassionate friend', style: 'Biblical' },
        { name: 'Esther', meaning: 'Star', style: 'Biblical' },
        { name: 'Mary', meaning: 'Beloved, mother of Jesus', style: 'Classic' },
        { name: 'Anna', meaning: 'Grace', style: 'Timeless' },
        { name: 'Lydia', meaning: 'From Lydia (place in Greece)', style: 'Biblical' },
        { name: 'Sarah', meaning: 'Princess', style: 'Biblical' },
        { name: 'Rebecca', meaning: 'To bind', style: 'Biblical' },
        { name: 'Chloe', meaning: 'Blooming', style: 'New Testament' },
        { name: 'Eden', meaning: 'Delight, paradise', style: 'Biblical' },
        { name: 'Eliana', meaning: 'My God has answered', style: 'Modern biblical' },
        { name: 'Isla', meaning: 'Island', style: 'Trendy modern' },
        { name: 'Aria', meaning: 'Air, melody', style: 'Modern-feminine' }
      ]
    },
    Hindu: {
      Boys: [
        { name: 'Aarav', meaning: 'Peaceful, calm', style: 'Modern Sanskrit' },
        { name: 'Advik', meaning: 'Unique', style: 'Modern' },
        { name: 'Arjun', meaning: 'Bright, shining, warrior prince', style: 'Epic (Mahabharata)' },
        { name: 'Vihaan', meaning: 'Dawn, beginning', style: 'Modern' },
        { name: 'Krish', meaning: 'Lord Krishna', style: 'Divine' },
        { name: 'Shaurya', meaning: 'Bravery', style: 'Heroic' },
        { name: 'Arnav', meaning: 'Ocean', style: 'Modern' },
        { name: 'Rudra', meaning: 'Fierce (Lord Shiva)', style: 'Divine' },
        { name: 'Aryan', meaning: 'Noble', style: 'Timeless' },
        { name: 'Ishaan', meaning: 'Sun, Lord Shiva', style: 'Spiritual' },
        { name: 'Yuvan', meaning: 'Youthful', style: 'Modern' },
        { name: 'Dhruv', meaning: 'Pole star', style: 'Mythological' },
        { name: 'Om', meaning: 'Sacred sound', style: 'Spiritual' },
        { name: 'Rishaan', meaning: 'Good human being', style: 'Trendy' },
        { name: 'Vivaan', meaning: 'Full of life', style: 'Popular modern' },
        { name: 'Kian', meaning: 'Grace of God', style: 'Global Hindu' },
        { name: 'Tanish', meaning: 'Ambition', style: 'Stylish' },
        { name: 'Aarush', meaning: 'First ray of sun', style: 'Modern' },
        { name: 'Samar', meaning: 'War, battle', style: 'Heroic' },
        { name: 'Vedant', meaning: 'Knower of Vedas', style: 'Spiritual' }
      ],
      Girls: [
        { name: 'Aanya', meaning: 'Grace', style: 'Modern' },
        { name: 'Saanvi', meaning: 'Goddess Lakshmi', style: 'Divine' },
        { name: 'Aaradhya', meaning: 'Worship, devotion', style: 'Modern' },
        { name: 'Anaya', meaning: 'Caring, protection', style: 'Trendy' },
        { name: 'Avni', meaning: 'Earth', style: 'Nature-inspired' },
        { name: 'Diya', meaning: 'Light, lamp', style: 'Traditional' },
        { name: 'Myra', meaning: 'Beloved', style: 'Modern' },
        { name: 'Aashvi', meaning: 'Blessed, victorious', style: 'Modern' },
        { name: 'Ishita', meaning: 'Desire, greatness', style: 'Stylish' },
        { name: 'Meera', meaning: 'Devotee of Krishna', style: 'Bhakti-inspired' },
        { name: 'Riya', meaning: 'Singer, graceful', style: 'Popular' },
        { name: 'Navya', meaning: 'Young, modern', style: 'Modern' },
        { name: 'Kiara', meaning: 'Bright, clear', style: 'Global' },
        { name: 'Aditi', meaning: 'Mother of gods', style: 'Vedic' },
        { name: 'Shreya', meaning: 'Auspicious, beautiful', style: 'Classic' },
        { name: 'Vanya', meaning: 'Gracious gift of God', style: 'Modern' },
        { name: 'Nitya', meaning: 'Eternal', style: 'Spiritual' },
        { name: 'Charvi', meaning: 'Beautiful', style: 'Trendy' },
        { name: 'Trisha', meaning: 'Wish, desire', style: 'Modern' },
        { name: 'Gauri', meaning: 'Fair, Goddess Parvati', style: 'Traditional' }
      ]
    },
    Muslim: {
      Boys: [
        { name: 'Ayaan', meaning: 'Gift of God', style: 'Modern' },
        { name: 'Zain', meaning: 'Beauty, grace', style: 'Trendy' },
        { name: 'Rayyan', meaning: 'Heaven\'s gate', style: 'Quranic' },
        { name: 'Aariz', meaning: 'Respectable man', style: 'Modern' },
        { name: 'Hamza', meaning: 'Lion, strong', style: 'Classic' },
        { name: 'Idris', meaning: 'Prophet\'s name', style: 'Quranic' },
        { name: 'Mikael', meaning: 'Angel of mercy', style: 'Islamic' },
        { name: 'Imran', meaning: 'Prosperity', style: 'Quranic' },
        { name: 'Yusuf', meaning: 'Prophet Joseph', style: 'Quranic' },
        { name: 'Azlan', meaning: 'Lion', style: 'Trendy' },
        { name: 'Zayan', meaning: 'Bright, beautiful', style: 'Modern' },
        { name: 'Rayan', meaning: 'Luxuriant', style: 'Popular' },
        { name: 'Saad', meaning: 'Happiness', style: 'Traditional' },
        { name: 'Ilyas', meaning: 'Prophet Elijah', style: 'Quranic' },
        { name: 'Faris', meaning: 'Knight', style: 'Heroic' },
        { name: 'Aamir', meaning: 'Prosperous', style: 'Classic' },
        { name: 'Bilal', meaning: 'Prophet\'s companion', style: 'Historical' },
        { name: 'Khalid', meaning: 'Eternal', style: 'Timeless' },
        { name: 'Omar', meaning: 'Life, longevity', style: 'Classic' },
        { name: 'Zahir', meaning: 'Bright, evident', style: 'Modern' }
      ],
      Girls: [
        { name: 'Aisha', meaning: 'Living, life', style: 'Prophet\'s wife' },
        { name: 'Zara', meaning: 'Princess, flower', style: 'Trendy' },
        { name: 'Inaya', meaning: 'Care, concern', style: 'Modern' },
        { name: 'Maryam', meaning: 'Mother of Jesus', style: 'Quranic' },
        { name: 'Fatima', meaning: 'Captivating', style: 'Prophet\'s daughter' },
        { name: 'Hania', meaning: 'Happy', style: 'Modern' },
        { name: 'Amara', meaning: 'Eternal', style: 'Global' },
        { name: 'Noor', meaning: 'Light', style: 'Classic' },
        { name: 'Ayra', meaning: 'Respectable', style: 'New-age' },
        { name: 'Saira', meaning: 'Traveller', style: 'Modern' },
        { name: 'Leila', meaning: 'Night beauty', style: 'Poetic' },
        { name: 'Zaina', meaning: 'Beauty', style: 'Trendy' },
        { name: 'Yasmin', meaning: 'Jasmine flower', style: 'Classic' },
        { name: 'Samira', meaning: 'Companion', style: 'Elegant' },
        { name: 'Imaan', meaning: 'Faith', style: 'Spiritual' },
        { name: 'Anisa', meaning: 'Friendly', style: 'Modern' },
        { name: 'Naima', meaning: 'Tranquil', style: 'Beautiful' },
        { name: 'Safa', meaning: 'Purity', style: 'Quranic' },
        { name: 'Rida', meaning: 'Contentment', style: 'Peaceful' },
        { name: 'Sanaa', meaning: 'Brilliance', style: 'Modern' }
      ]
    },
    Sikh: {
      Boys: [
        { name: 'Arjan', meaning: 'Noble, holy', style: 'Religious' },
        { name: 'Gurpreet', meaning: 'Love of the Guru', style: 'Spiritual' },
        { name: 'Harsimran', meaning: 'Remembrance of God', style: 'Divine' },
        { name: 'Manveer', meaning: 'Brave-hearted', style: 'Modern' },
        { name: 'Tejinder', meaning: 'Powerful', style: 'Traditional' },
        { name: 'Amrit', meaning: 'Nectar (divine)', style: 'Religious' },
        { name: 'Gagandeep', meaning: 'Light of the sky', style: 'Spiritual' },
        { name: 'Harjot', meaning: 'Light of God', style: 'Devotional' },
        { name: 'Jaskaran', meaning: 'Good deeds', style: 'Modern' },
        { name: 'Prabhnoor', meaning: 'God\'s light', style: 'Trendy' }
      ],
      Girls: [
        { name: 'Simran', meaning: 'Meditation, remembrance', style: 'Devotional' },
        { name: 'Harleen', meaning: 'Absorbed in God', style: 'Modern' },
        { name: 'Jasleen', meaning: 'Absorbed in singing praises', style: 'Divine' },
        { name: 'Gurleen', meaning: 'One who is absorbed in Guru', style: 'Religious' },
        { name: 'Kiran', meaning: 'Ray of light', style: 'Timeless' },
        { name: 'Navleen', meaning: 'New, absorbed in God', style: 'Modern' },
        { name: 'Prabhjot', meaning: 'Light of God', style: 'Traditional' },
        { name: 'Sukhmeet', meaning: 'Friend of peace', style: 'Modern' },
        { name: 'Amanpreet', meaning: 'Lover of peace', style: 'Classic' },
        { name: 'Baani', meaning: 'Sacred word', style: 'Divine' }
      ]
    },
    Buddhist: {
      Boys: [
        { name: 'Bodhi', meaning: 'Enlightenment', style: 'Popular Global' },
        { name: 'Siddharth', meaning: 'One who has attained', style: 'Buddha\'s name' },
        { name: 'Rahul', meaning: 'Efficient, Buddha\'s son', style: 'Traditional' },
        { name: 'Ananda', meaning: 'Bliss', style: 'Spiritual' },
        { name: 'Tenzin', meaning: 'Holder of teaching', style: 'Tibetan origin' },
        { name: 'Karma', meaning: 'Action, destiny', style: 'Spiritual' },
        { name: 'Nanda', meaning: 'Joy', style: 'Ancient' },
        { name: 'Rishi', meaning: 'Sage', style: 'Classic' },
        { name: 'Arya', meaning: 'Noble', style: 'Global' },
        { name: 'Deva', meaning: 'Divine', style: 'Sanskrit' }
      ],
      Girls: [
        { name: 'Tara', meaning: 'Star, goddess of compassion', style: 'Buddhist deity' },
        { name: 'Maya', meaning: 'Illusion, Buddha\'s mother', style: 'Global' },
        { name: 'Anika', meaning: 'Grace', style: 'Modern' },
        { name: 'Daya', meaning: 'Compassion', style: 'Virtue' },
        { name: 'Pema', meaning: 'Lotus', style: 'Tibetan' },
        { name: 'Metta', meaning: 'Loving kindness', style: 'Pali' },
        { name: 'Amita', meaning: 'Infinite', style: 'Peaceful' },
        { name: 'Karuna', meaning: 'Compassion', style: 'Spiritual' },
        { name: 'Sonam', meaning: 'Merit, good fortune', style: 'Tibetan' },
        { name: 'Nima', meaning: 'Sun, radiant', style: 'Modern' }
      ]
    }
  }

  useEffect(() => {
    // Load names based on selected religion and gender
    const loadNamesForSelection = () => {
      const selectedNames = babyNamesDatabase[selectedReligion as keyof typeof babyNamesDatabase]?.[selectedGender as keyof typeof babyNamesDatabase.Christian] || []
      const initialOptions = selectedNames.slice(0, 12).map((nameData, index) => ({
        id: `${index + 1}`,
        text: nameData.name,
        meaning: nameData.meaning,
        color: magicalColors[index % magicalColors.length]
      }))
      setOptions(initialOptions)
      setSpinHistory([])
      setLastResult(null)
    }
    
    loadNamesForSelection()
  }, [selectedReligion, selectedGender])

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
    a.download = 'baby-names.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const resetToDefaults = () => {
    const selectedNames = babyNamesDatabase[selectedReligion as keyof typeof babyNamesDatabase]?.[selectedGender as keyof typeof babyNamesDatabase.Christian] || []
    const defaultOptions = selectedNames.slice(0, 12).map((nameData, index) => ({
      id: `${index + 1}`,
      text: nameData.name,
      meaning: nameData.meaning,
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
    
    // Store in localStorage for history
    const history = JSON.parse(localStorage.getItem('babyNameHistory') || '[]')
    history.unshift({
      name: result.text,
      timestamp: new Date().toISOString(),
      type: 'Baby Name'
    })
    localStorage.setItem('babyNameHistory', JSON.stringify(history.slice(0, 10)))
  }

  const handleOptionExcluded = (optionId: string) => {
    setOptions(prev => prev.filter(option => option.id !== optionId))
  }

  return (
    <>
      {/* Enhanced SEO Head */}
      <Helmet>
        <title>Baby Name Spin Wheel | Random Name Picker | SpinWheelHub</title>
        <meta name="description" content="Spin wheel to pick random baby names! Features popular names including Emma, Liam, Olivia, Noah and more. Free name generator and decision maker spin wheel." />
        <meta name="keywords" content="spin wheel, wheel of names, random name picker, name wheel, name spinner, decision maker, random picker, name generator tool" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="SpinWheelHub" />
        <link rel="canonical" href="https://spinwheelhub.com/wheel-of-names" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Baby Name Spin Wheel | Random Baby Name Picker" />
        <meta property="og:description" content="Spin the wheel to pick the perfect baby name! Popular names with SpinWheelHub's easy-to-use baby name generator." />
        <meta property="og:url" content="https://spinwheelhub.com/wheel-of-names" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://images.pexels.com/photos/1111597/pexels-photo-1111597.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Baby Name Spin Wheel | SpinWheelHub" />
        <meta name="twitter:description" content="Find the perfect baby name with our spinning wheel generator!" />
        <meta name="twitter:image" content="https://images.pexels.com/photos/1111597/pexels-photo-1111597.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Baby Name Spin Wheel - SpinWheelHub",
            "description": "Free baby name spin wheel with popular baby names for expecting parents",
            "url": "https://spinwheelhub.com/wheel-of-names",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": ["baby name picker", "random baby name generator", "baby name spin wheel", "pregnancy naming tool"]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
        <div className="w-full max-w-none px-2 md:px-4 pt-1 pb-4 overflow-x-auto">
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
              {/* Religion Selection */}
              <div className="flex items-center space-x-1 md:space-x-2 bg-white px-2 md:px-3 py-2 rounded-lg shadow-md">
                <span className="text-xs font-medium text-gray-700 hidden md:inline">Religion:</span>
                <select
                  value={selectedReligion}
                  onChange={(e) => setSelectedReligion(e.target.value)}
                  className="text-xs font-medium bg-transparent border-none outline-none text-purple-600"
                >
                  <option value="Christian">✝️ Christian</option>
                  <option value="Hindu">🕉️ Hindu</option>
                  <option value="Muslim">☪️ Muslim</option>
                  <option value="Sikh">🛕 Sikh</option>
                  <option value="Buddhist">☸️ Buddhist</option>
                </select>
              </div>

              {/* Gender Selection */}
              <div className="flex items-center space-x-1 md:space-x-2 bg-white px-2 md:px-3 py-2 rounded-lg shadow-md">
                <span className="text-xs font-medium text-gray-700 hidden md:inline">Gender:</span>
                <select
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.target.value)}
                  className="text-xs font-medium bg-transparent border-none outline-none text-pink-600"
                >
                  <option value="Boys">👦 Boys</option>
                  <option value="Girls">👧 Girls</option>
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
              <Baby className="w-4 h-4 md:w-5 md:h-5 text-pink-600" />
              <h1 className="text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                {selectedReligion} {selectedGender} Names
              </h1>
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-pink-600" />
            </div>
            <p className="text-xs md:text-sm text-gray-600 leading-tight px-2">
              Discover the perfect {selectedReligion.toLowerCase()} {selectedGender.toLowerCase().slice(0, -1)} name! Browse meaningful names with cultural significance.
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
                    Add Baby Names
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
                          placeholder={`Enter baby name ${index + 1}...`}
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
                    <span>Import Names</span>
                  </button>
                  
                  <button
                    onClick={exportOptions}
                    disabled={options.length === 0}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-2 md:px-3 py-2 rounded-lg hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-1 md:space-x-2 font-medium text-xs shadow-md"
                  >
                    <Download className="w-3 h-3" />
                    <span>Export Names</span>
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
                    <span>Reset {selectedReligion} Names</span>
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
                  Baby Names ({options.length})
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
                        className="flex items-center space-x-2 p-2 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border border-pink-100"
                      >
                        <div className="w-5 h-5 md:w-6 md:h-6 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm flex-shrink-0">
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
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-3 md:p-4 border-2 border-pink-200 shadow-lg">
                <h3 className="text-sm md:text-base font-bold text-gray-900 mb-3 flex items-center">
                  <span className="text-base md:text-lg mr-1 md:mr-2">💡</span>
                  Baby Naming Tips
                </h3>
                <div className="space-y-2 md:space-y-3 text-xs text-gray-700">
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-pink-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <p className="leading-relaxed">Consider how the name sounds with your last name</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <p className="leading-relaxed">Think about potential nicknames and initials</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <p className="leading-relaxed">Add your own family names or cultural favorites</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <p className="leading-relaxed">Export your final list to share with your partner</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <p className="leading-relaxed">Let the wheel help you make this special decision!</p>
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
              background: linear-gradient(to bottom, #ec4899, #a855f7);
              border-radius: 8px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: linear-gradient(to bottom, #db2777, #9333ea);
            }
          `
        }} />
      </div>
    </>
  )
}

export default BabyNameGeneratorWheel