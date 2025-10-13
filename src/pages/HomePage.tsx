
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {Baby, Plane, Building2, Heart, ChefHat, Stars, Gamepad2, Dumbbell, Search, Users, Zap, Shield, Star, ArrowRight, Play, Settings} from 'lucide-react'
import ProfessionalCanvasWheel from '../components/ProfessionalCanvasWheel'

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
      count: '50K+ names',
      features: ['Popular names', 'Cultural origins', 'Name meanings']
    },
    {
      id: 'travel',
      title: 'Travel Destinations',
      description: 'Discover your next adventure',
      icon: <Plane className="h-8 w-8" />,
      color: 'from-blue-400 to-cyan-500',
      count: '1K+ destinations',
      features: ['Budget-friendly', 'Visa info', 'Best seasons']
    },
    {
      id: 'company-names',
      title: 'Company Names',
      description: 'Generate unique business names',
      icon: <Building2 className="h-8 w-8" />,
      color: 'from-purple-400 to-indigo-500',
      count: '100K+ ideas',
      features: ['Domain check', 'Industry-specific', 'Logo suggestions']
    },
    {
      id: 'life-decisions',
      title: 'Life Decisions',
      description: 'Navigate important life choices',
      icon: <Heart className="h-8 w-8" />,
      color: 'from-red-400 to-pink-500',
      count: 'Unlimited',
      features: ['Pro/con analysis', 'Decision tracking', 'Expert tips']
    },
    {
      id: 'food-recipes',
      title: 'Food & Recipes',
      description: 'Decide what to cook or eat',
      icon: <ChefHat className="h-8 w-8" />,
      color: 'from-orange-400 to-red-500',
      count: '10K+ recipes',
      features: ['Dietary filters', 'Cook time', 'Shopping lists']
    },
    {
      id: 'astrology',
      title: 'Astrology Fortune',
      description: 'Discover your cosmic guidance',
      icon: <Stars className="h-8 w-8" />,
      color: 'from-purple-500 to-pink-500',
      count: 'Daily updates',
      features: ['Horoscopes', 'Compatibility', 'Lucky numbers']
    },
    {
      id: 'entertainment',
      title: 'Entertainment',
      description: 'Movies, books, games & more',
      icon: <Gamepad2 className="h-8 w-8" />,
      color: 'from-green-400 to-blue-500',
      count: '50K+ options',
      features: ['Streaming links', 'Reviews', 'Recommendations']
    },
    {
      id: 'challenges',
      title: 'Random Challenges',
      description: 'Fun challenges and activities',
      icon: <Dumbbell className="h-8 w-8" />,
      color: 'from-yellow-400 to-orange-500',
      count: '1K+ challenges',
      features: ['Fitness goals', 'Creative prompts', 'Skill building']
    }
  ]

  const filteredCategories = categories.filter(category =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "New Mom",
      content: "SpinWheelHub helped us find the perfect name for our daughter! The cultural origins feature was amazing.",
      rating: 5,
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    },
    {
      name: "Mike Chen",
      role: "Travel Blogger",
      content: "I've discovered so many hidden gems using the travel wheel. It's made my adventures more spontaneous and exciting!",
      rating: 5,
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    },
    {
      name: "Emily Rodriguez",
      role: "Entrepreneur",
      content: "The company name generator saved me weeks of brainstorming. Found the perfect name and domain in minutes!",
      rating: 5,
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    }
  ]

  const features = [
    {
      icon: <Users className="h-12 w-12" />,
      title: "10M+ Happy Users",
      description: "Join millions who trust SpinWheelHub for their daily decisions"
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white opacity-5 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white opacity-5 rounded-full animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Wheel of Names
                <span className="block text-yellow-300">Free & Easy Spinner</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
                Enter names, spin wheel to pick a random winner. Customize look and feel, save and share wheels.
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
              <div className="relative">
                <ProfessionalCanvasWheel
                  options={heroWheelOptions}
                  size={500}
                  onSpinComplete={(result) => {
                    console.log('Hero wheel result:', result)
                  }}
                  enableSound={true}
                  showControls={true}
                />
                <div className="absolute -top-4 -right-4 bg-yellow-400 text-purple-900 px-4 py-2 rounded-full font-bold text-sm animate-bounce">
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
                <span className="text-2xl">🏫</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Classroom Name Picker</h3>
              <p className="text-gray-600">Teachers use our random name picker to fairly select students for activities, questions, and participation.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white mb-4 mx-auto">
                <span className="text-2xl">🎁</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Giveaway Spinner</h3>
              <p className="text-gray-600">Perfect for social media giveaways, contests, and raffles. Pick random winners fairly and transparently.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white mb-4 mx-auto">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Presentation Tool</h3>
              <p className="text-gray-600">Engage your audience during presentations and meetings with interactive decision-making.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white mb-4 mx-auto">
                <span className="text-2xl">👥</span>
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
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Random Name Picker for <span className="text-gradient">Every Occasion</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Our spinning wheel is perfect for classrooms, raffles, presentations and giveaways. 
              Teachers love our classroom name picker, while event organizers use our giveaway spinner 
              to pick random winners. Completely free and ad-free!
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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

      {/* Testimonials Section */}
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
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join millions of satisfied users who have transformed their decision-making with SpinWheelHub
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
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
            Join millions of users who have discovered the joy of decision-making with SpinWheelHub. 
            Start your journey to better choices today!
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
