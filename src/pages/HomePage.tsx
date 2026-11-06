
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Baby, Plane, Heart, ChefHat, Gamepad2, Dumbbell, Search, Users, Zap, Shield, ArrowRight, Play, Settings, CheckCircle, HelpCircle, School, Gift, Presentation, ListPlus, MousePointerClick, PartyPopper, Hash, Film, Pencil } from 'lucide-react'
import SpinningWheel from '../components/SpinningWheel'
import SEOHead from '../components/SEOHead'
import { seoConfig } from '../seoConfig'

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isHeroWheelSpinning, setIsHeroWheelSpinning] = useState(false)

  // Every card links to a real page. Keep `to` in sync with routes in App.tsx and ids in wheelTemplates.ts.
  const categories = [
    {
      id: 'custom',
      to: '/custom-wheel-of-names',
      title: 'Custom Wheel',
      description: 'Make your own wheel with any names or choices',
      icon: <Settings className="h-8 w-8" />,
      color: 'from-emerald-400 to-teal-500',
      count: 'Unlimited entries',
      features: ['Add your own list', 'Import and export', 'Share with a link']
    },
    {
      id: 'yes-no',
      to: '/wheel/yes-no',
      title: 'Yes or No Wheel',
      description: 'Ask a question and let the wheel answer',
      icon: <Heart className="h-8 w-8" />,
      color: 'from-red-400 to-pink-500',
      count: '50/50 answer',
      features: ['Quick decisions', 'Add Maybe', 'Works on any phone']
    },
    {
      id: 'team-generator',
      to: '/team-generator',
      title: 'Team Generator',
      description: 'Split a list of names into random teams',
      icon: <Users className="h-8 w-8" />,
      color: 'from-blue-400 to-cyan-500',
      count: 'Even teams',
      features: ['Teams or groups', 'Pick captains', 'Copy the results']
    },
    {
      id: 'secret-santa',
      to: '/secret-santa',
      title: 'Secret Santa',
      description: 'Draw names for your gift exchange',
      icon: <Gift className="h-8 w-8" />,
      color: 'from-red-500 to-green-600',
      count: 'Nobody gets themselves',
      features: ['Keep couples apart', 'Private reveal', 'Set a budget']
    },
    {
      id: 'what-for-dinner',
      to: '/wheel/what-for-dinner',
      title: 'What\'s for Dinner?',
      description: 'Let the food wheel pick tonight\'s meal',
      icon: <ChefHat className="h-8 w-8" />,
      color: 'from-orange-400 to-red-500',
      count: 'Dinner sorted',
      features: ['Meal ideas', 'Takeout picks', 'Add your own']
    },
    {
      id: 'number-wheel',
      to: '/number-wheel',
      title: 'Random Number Wheel',
      description: 'Pick a number from 1 to 100 or any range',
      icon: <Hash className="h-8 w-8" />,
      color: 'from-green-400 to-emerald-500',
      count: 'Any range',
      features: ['1 to 10, 1 to 100', 'Custom range', 'Raffles and games']
    },
    {
      id: 'random-letter',
      to: '/wheel/random-letter',
      title: 'Random Letter',
      description: 'Spin the alphabet wheel from A to Z',
      icon: <School className="h-8 w-8" />,
      color: 'from-yellow-400 to-orange-500',
      count: '26 letters',
      features: ['Word games', 'Classrooms', 'Remove hard letters']
    },
    {
      id: 'pictionary-words',
      to: '/wheel/pictionary-words',
      title: 'Pictionary Words',
      description: 'Get a random word to draw',
      icon: <Pencil className="h-8 w-8" />,
      color: 'from-purple-400 to-indigo-500',
      count: '60 words',
      features: ['Game night', 'Kids and adults', 'Add your own words']
    },
    {
      id: 'random-movie',
      to: '/wheel/random-movie',
      title: 'Random Movie',
      description: 'Stop scrolling and pick a movie',
      icon: <Film className="h-8 w-8" />,
      color: 'from-green-400 to-blue-500',
      count: 'Movie night fix',
      features: ['50 favorites', 'Add your watchlist', 'No repeats option']
    },
    {
      id: 'truth-or-dare',
      to: '/wheel/truth-or-dare',
      title: 'Truth or Dare',
      description: 'Spin to see if you get a truth or a dare',
      icon: <Dumbbell className="h-8 w-8" />,
      color: 'from-pink-500 to-purple-600',
      count: 'Party ready',
      features: ['Sleepovers', 'Parties', 'Family friendly']
    },
    {
      id: 'random-country',
      to: '/wheel/random-country',
      title: 'Random Country',
      description: 'Spin all 195 countries for travel ideas',
      icon: <Plane className="h-8 w-8" />,
      color: 'from-sky-400 to-blue-500',
      count: '195 countries',
      features: ['Travel ideas', 'Geography games', 'Trivia']
    },
    {
      id: 'baby-names',
      to: '/wheel-of-names',
      title: 'Baby Names',
      description: 'Spin boy and girl names to build a shortlist',
      icon: <Baby className="h-8 w-8" />,
      color: 'from-pink-400 to-rose-500',
      count: 'Popular picks',
      features: ['Boy and girl names', 'Spin to shortlist', 'Add your own']
    },
    {
      id: 'rock-paper-scissors',
      to: '/rock-paper-scissors',
      title: 'Rock Paper Scissors',
      description: 'Play against the computer, best of 3 or 5',
      icon: <Gamepad2 className="h-8 w-8" />,
      color: 'from-amber-400 to-orange-600',
      count: 'Quick game',
      features: ['Keep score', 'Keyboard shortcuts', 'Settle a tie']
    }
  ]

  const filteredCategories = categories.filter(category =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const howItWorks = [
    {
      icon: <ListPlus className="h-10 w-10" />,
      title: "1. Add Your Entries",
      description: "Type your names or choices, paste a list, or start from a ready-made template."
    },
    {
      icon: <MousePointerClick className="h-10 w-10" />,
      title: "2. Spin the Wheel",
      description: "Click spin and the wheel picks a random result. Every entry has the same chance."
    },
    {
      icon: <PartyPopper className="h-10 w-10" />,
      title: "3. Get Your Winner",
      description: "See the result instantly. Save your wheel and share the link with anyone."
    }
  ]

  const features = [
    {
      icon: <Users className="h-12 w-12" />,
      title: "Free Forever",
      description: "No signup, no paywall, no limits on wheels or entries"
    },
    {
      icon: <Zap className="h-12 w-12" />,
      title: "Lightning Fast",
      description: "Get instant results with smooth animations and responsive design"
    },
    {
      icon: <Shield className="h-12 w-12" />,
      title: "Privacy First",
      description: "Your decisions are private and secure. We never share your data"
    }
  ]

  const heroWheelOptions = [
    { id: '1', text: 'Baby Names', color: '#ec4899' },
    { id: '2', text: 'Travel', color: '#06b6d4' },
    { id: '3', text: 'Food', color: '#f97316' },
    { id: '4', text: 'Movies', color: '#10b981' },
    { id: '5', text: 'Challenges', color: '#8b5cf6' },
    { id: '6', text: 'Life Decisions', color: '#ef4444' }
  ]

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is SpinWheelHub free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, SpinWheelHub is 100% free to use. There are no hidden fees, subscriptions, or limits on how many wheels you can create."
        }
      },
      {
        "@type": "Question",
        "name": "How do I create a custom wheel?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Simply click on 'Custom Wheel' or 'Start Spinning', then use the 'Manual Entry' box to add your own options. You can also import a list from a text file."
        }
      },
      {
        "@type": "Question",
        "name": "Is the wheel selection truly random?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Every slice on the wheel is the same size, and the wheel stops at a random point picked by your browser's random number generator. Nobody, including us, can choose or predict the result. That is fine for games and everyday decisions, but not for anything that needs certified randomness, such as a regulated lottery."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use this for my classroom or presentation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Teachers, presenters and streamers use SpinWheelHub every day. The wheel is easy to read on a projector or a shared screen, and there is a fullscreen mode."
        }
      }
    ]
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "SpinWheelHub",
    "url": "https://spinwheelhub.org",
    "description": "Free spin wheel and random picker. Make custom wheels, pick random names and choose contest winners.",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Customizable entries",
      "Random name picker",
      "No login required",
      "Save and share wheels",
      "Secure and private"
    ]
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Spin the Wheel: Free Online Wheel Spinner | SpinWheelHub"
        description="Spin the wheel to pick a name, a winner or an answer. A free wheel spinner for classrooms, giveaways and games. Add your own entries, no sign-up."
        keywords="spin wheel, random name picker, wheel of names, decision maker, raffle wheel, giveaway picker, classroom spinner, free spin wheel"
        schema={[seoConfig.organizationSchema, webAppSchema, faqSchema]}
      />
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-white opacity-5 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 bg-white opacity-5 rounded-full animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
                Spin Wheel Generator
                <span className="block text-yellow-300">Free & Easy Spinner</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
                Type in some names, spin the wheel, and get a random winner. Make your own wheel, save it and share the link.
                Teachers, streamers and teams use it every day.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                  onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Play className="h-5 w-5" />
                  Start Spinning
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-purple-600 transition-colors"
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg">
                <SpinningWheel
                  options={heroWheelOptions}
                  size={350}
                  onSpinComplete={(result) => {
                    console.log('Hero wheel result:', result)
                  }}
                  enableSound={true}
                  showControls={false}
                  idleSpin={true}
                />
                <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-yellow-400 text-purple-900 px-2 py-1 sm:px-4 sm:py-2 rounded-full font-bold text-xs sm:text-sm animate-bounce">
                  Try me! 🎯
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-8"
              >
                <div className="text-purple-600 mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 text-lg">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Use Cases Section - SEO Optimized */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              A Spin Wheel for Classrooms, Giveaways and Meetings
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white mb-4 mx-auto">
                <School className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Classroom Name Picker</h3>
              <p className="text-gray-600">Teachers use our random name picker to fairly select students for activities, questions, and participation.</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white mb-4 mx-auto">
                <Gift className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Giveaway Spinner</h3>
              <p className="text-gray-600">Run an Instagram giveaway, a contest or a raffle. Pick a random winner in front of everyone so nobody can say it was rigged.</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white mb-4 mx-auto">
                <Presentation className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Presentation Tool</h3>
              <p className="text-gray-600">Engage your audience during presentations and meetings with interactive decision-making.</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white mb-4 mx-auto">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Standup Meetings</h3>
              <p className="text-gray-600">Use in daily standups and team meetings to randomly select who goes first or assigns tasks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Spin Wheel Generator for <span className="text-gradient">Every Occasion</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Pick a wheel below, or make your own. Teachers use the name picker in class,
              organizers use it to draw raffle winners, and friends use it to settle what to eat.
              Everything is free and you don't need an account.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {filteredCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link to={category.to}>
                  <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer h-full">
                    <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      {category.icon}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3">{category.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{category.description}</p>

                    <div className="text-sm text-purple-600 font-semibold mb-4">{category.count}</div>

                    <div className="space-y-2">
                      {category.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-500">
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></div>
                          {feature}
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center text-purple-600 font-semibold group-hover:text-purple-700">
                      <span>Try it now</span>
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredCategories.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-xl text-gray-600">No categories found matching "{searchTerm}"</p>
              <button
                onClick={() => setSearchTerm('')}
                className="mt-4 text-purple-600 hover:text-purple-700 font-semibold"
              >
                Clear search
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How to Use the Wheel Spinner
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three steps from list to winner. No sign-up, nothing to install.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-purple-600 mb-4 flex justify-center">{step.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content Section - About & FAQ */}
      <section className="py-20 px-4 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto space-y-16">

          {/* About Section */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">A Free Random Picker for Everyday Decisions</h2>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-4">
                <strong>SpinWheelHub</strong> is a free <strong>spin wheel generator</strong>. Teachers use it to pick students fairly. Streamers use it to choose giveaway winners live. Friends use it when nobody can decide where to eat.
              </p>
              <p className="mb-4">
                Beyond the classic wheel, you'll find a <Link to="/wheel/yes-no" className="text-purple-600 font-semibold hover:underline">yes or no wheel</Link>, a <Link to="/team-generator" className="text-purple-600 font-semibold hover:underline">random team generator</Link>, a <Link to="/secret-santa" className="text-purple-600 font-semibold hover:underline">Secret Santa generator</Link>, a <Link to="/number-wheel" className="text-purple-600 font-semibold hover:underline">random number wheel</Link> and game wheels like <Link to="/wheel/pictionary-words" className="text-purple-600 font-semibold hover:underline">Pictionary words</Link> and <Link to="/wheel/charades" className="text-purple-600 font-semibold hover:underline">charades</Link>. See them all in the <Link to="/hub" className="text-purple-600 font-semibold hover:underline">wheel hub</Link>.
              </p>
              <p className="mb-4">
                SpinWheelHub keeps the focus on the wheel: a clean, fast interface with no signup and no paywall. Our <strong>custom wheel maker</strong> lets you add unlimited options, customize colors, save your lists, and share your wheel with a link.
              </p>
              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Why Choose SpinWheelHub?</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" />
                  <span><strong>Fair every time:</strong> Every slice is the same size and the wheel stops at a random point, so each entry has the same chance.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" />
                  <span><strong>Privacy First:</strong> Spinning runs entirely in your browser. Your lists are only stored if you choose to save and share a wheel.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" />
                  <span><strong>No Login Required:</strong> Start spinning instantly. No sign-ups, no barriers.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* FAQ Section */}
          <div id="faq">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
              <HelpCircle className="w-8 h-8 text-purple-600 mr-3" />
              Frequently Asked Questions
            </h2>
            <div className="grid gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Is SpinWheelHub free to use?</h3>
                <p className="text-gray-600">Yes. Every wheel and tool on the site is free. There is no paywall, no account and no limit on how many wheels you make.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Is the wheel really random?</h3>
                <p className="text-gray-600">Yes. Every slice is the same size, and the wheel stops at a random point picked by your browser's random number generator. Nobody, including us, can choose or predict the result. For giveaways, the <Link to="/giveaway" className="text-purple-600 font-semibold hover:underline">giveaway picker</Link> also gives you a proof link you can share.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Can I save and share my wheels?</h3>
                <p className="text-gray-600">Yes! Use "Save & Share Link" on the custom wheel page to get a permanent link to your wheel that anyone can open and spin. You can also export your list of options to a text file.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Does it work on mobile?</h3>
                <p className="text-gray-600">Yes. It works on iPhone, iPad, Android and any computer. Just open the page and tap Spin.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Make Better Decisions?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Free, fair and quick. Spin the wheel for your next decision,
            giveaway winner or classroom pick.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors"
            onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get Started for Free
          </motion.button>
        </motion.div>
      </section>
    </div>
  )
}

export default HomePage
