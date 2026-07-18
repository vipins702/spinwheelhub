
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Baby, Plane, Building2, Heart, ChefHat, Stars, Gamepad2, Dumbbell, Search, Users, Zap, Shield, ArrowRight, Play, Settings, CheckCircle, HelpCircle, School, Gift, Presentation, ListPlus, MousePointerClick, PartyPopper } from 'lucide-react'
import SpinningWheel from '../components/SpinningWheel'
import SEOHead from '../components/SEOHead'
import { seoConfig } from '../seoConfig'

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isHeroWheelSpinning, setIsHeroWheelSpinning] = useState(false)

  const categories = [
    {
      id: 'custom',
      title: 'Custom Wheel',
      description: 'Create your own personalized wheel',
      icon: <Settings className="h-8 w-8" />,
      color: 'from-emerald-400 to-teal-500',
      count: 'Unlimited',
      features: ['Fully customizable', 'Import/Export', 'Templates included'],
      isCustom: true
    },
    {
      id: 'baby-names',
      title: 'Baby Names',
      description: 'Find the perfect name for your little one',
      icon: <Baby className="h-8 w-8" />,
      color: 'from-pink-400 to-rose-500',
      count: 'Popular picks',
      features: ['Boy & girl names', 'Spin to shortlist', 'Add your own']
    },
    {
      id: 'travel',
      title: 'Travel Destinations',
      description: 'Discover your next adventure',
      icon: <Plane className="h-8 w-8" />,
      color: 'from-blue-400 to-cyan-500',
      count: 'Ready-made list',
      features: ['Popular destinations', 'Spin to decide', 'Add your own']
    },
    {
      id: 'company-names',
      title: 'Company Names',
      description: 'Generate unique business names',
      icon: <Building2 className="h-8 w-8" />,
      color: 'from-purple-400 to-indigo-500',
      count: 'Idea starter',
      features: ['Name inspiration', 'Random picks', 'Add your own']
    },
    {
      id: 'life-decisions',
      title: 'Life Decisions',
      description: 'Navigate important life choices',
      icon: <Heart className="h-8 w-8" />,
      color: 'from-red-400 to-pink-500',
      count: 'Unlimited',
      features: ['Yes/no & choices', 'Fair random spin', 'Add your own']
    },
    {
      id: 'food-recipes',
      title: 'Food & Recipes',
      description: 'Decide what to cook or eat',
      icon: <ChefHat className="h-8 w-8" />,
      color: 'from-orange-400 to-red-500',
      count: 'Dinner sorted',
      features: ['Meal ideas', 'Takeout picks', 'Add your own']
    },
    {
      id: 'astrology',
      title: 'Astrology Fortune',
      description: 'Discover your cosmic guidance',
      icon: <Stars className="h-8 w-8" />,
      color: 'from-purple-500 to-pink-500',
      count: 'Just for fun',
      features: ['Fortune spins', 'Lucky picks', 'Party game']
    },
    {
      id: 'entertainment',
      title: 'Entertainment',
      description: 'Movies, books, games & more',
      icon: <Gamepad2 className="h-8 w-8" />,
      color: 'from-green-400 to-blue-500',
      count: 'Movie night fix',
      features: ['Movies & shows', 'Games & books', 'Add your own']
    },
    {
      id: 'challenges',
      title: 'Random Challenges',
      description: 'Fun challenges and activities',
      icon: <Dumbbell className="h-8 w-8" />,
      color: 'from-yellow-400 to-orange-500',
      count: 'Party ready',
      features: ['Fun dares', 'Group games', 'Add your own']
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
      description: "Click spin and let the wheel pick a truly random result — fair every time."
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
          "text": "Absolutely. We use a cryptographically secure pseudo-random number generator (CSPRNG) to ensure that every spin is fair and unpredictable."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use this for my classroom or presentation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! SpinWheelHub is perfect for teachers, presenters, and streamers. The interface is clean, fast, and works great on large screens."
        }
      }
    ]
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "SpinWheelHub",
    "url": "https://spinwheelhub.vercel.app",
    "description": "The ultimate random decision maker. Create custom spin wheels, pick random names, and choose winners for contests instantly.",
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
        title="Spin the Wheel — Free Online Wheel Spinner & Random Picker | SpinWheelHub"
        description="Spin the wheel to make decisions instantly. Free online wheel spinner for picking names, winners and choices — perfect for classrooms, giveaways, games and presentations."
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
                Enter names, spin wheel to pick a random winner. Create custom spin wheels with ease. Customize look and feel, save and share wheels.
                Perfect for classrooms, giveaways, presentations and standups.
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
              Perfect for Classrooms, Giveaways & Presentations
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
              <p className="text-gray-600">Perfect for social media giveaways, contests, and raffles. Pick random winners fairly and transparently.</p>
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
              Our spin wheel generator is perfect for classrooms, raffles, presentations and giveaways.
              Teachers love our classroom name picker, while event organizers use our spin wheel
              to pick random winners. Create custom spin wheels instantly. Completely free — no signup required.
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
                <Link to={
                  category.id === 'custom' ? '/custom-wheel-of-names' :
                    category.id === 'baby-names' ? '/wheel-of-names' :
                      `/wheel/${category.id}`
                }>
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
              Three steps from list to winner — no signup, nothing to install
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
            <h2 className="text-3xl font-bold text-gray-900 mb-6">The Ultimate Random Decision Maker</h2>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-4">
                Welcome to <strong>SpinWheelHub</strong>, the most advanced and user-friendly <strong>random spin wheel generator</strong> on the web. Whether you are a teacher looking for a fair way to pick students, a streamer hosting a giveaway, or a group of friends deciding where to eat, our tool is designed to make decision-making fun, fast, and fair.
              </p>
              <p className="mb-4">
                SpinWheelHub keeps the focus on the wheel: a clean, fast interface with no signup and no paywall. Our <strong>custom wheel maker</strong> lets you add unlimited options, customize colors, save your lists, and share your wheel with a link.
              </p>
              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Why Choose SpinWheelHub?</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" />
                  <span><strong>100% Fairness Guaranteed:</strong> We use advanced algorithms to ensure every spin is truly random.</span>
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
                <p className="text-gray-600">Yes! Our spin wheel generator is completely free for everyone. Whether you're using it for a classroom, a business event, or personal fun, you'll never hit a paywall.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-2">How do I verify the fairness?</h3>
                <p className="text-gray-600">We take fairness seriously. Our system uses a cryptographically secure random number generator (standard in modern browsers) to determine the outcome of every spin, ensuring it cannot be rigged or predicted.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Can I save and share my wheels?</h3>
                <p className="text-gray-600">Yes! Use "Save & Share Link" on the custom wheel page to get a permanent link to your wheel that anyone can open and spin. You can also export your list of options to a text file.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Does it work on mobile?</h3>
                <p className="text-gray-600">Absolutely. SpinWheelHub is fully responsive and optimized for all devices, including iPhones, iPads, and Android smartphones. You can spin on the go!</p>
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
            Free, fair, and instant — spin the wheel for your next decision,
            giveaway winner, or classroom pick.
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
