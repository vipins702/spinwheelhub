import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Search, Grid, Tag, Sparkles, FolderOpen, Play } from 'lucide-react'
import { motion } from 'framer-motion'
import { wheelTemplates } from '../data/wheelTemplates'

// Category color schemes for visual appeal
const categoryColors: Record<string, { gradient: string; dots: string[] }> = {
  Life: { gradient: 'from-pink-500 to-rose-500', dots: ['#ec4899', '#f43f5e', '#fb7185', '#fda4af'] },
  Food: { gradient: 'from-orange-500 to-amber-500', dots: ['#f97316', '#fb923c', '#fbbf24', '#fcd34d'] },
  Entertainment: { gradient: 'from-purple-500 to-indigo-500', dots: ['#a855f7', '#c084fc', '#d8b4fe', '#e9d5ff'] },
  Gaming: { gradient: 'from-blue-500 to-cyan-500', dots: ['#3b82f6', '#60a5fa', '#93c5fd', '#cffafe'] },
  Utility: { gradient: 'from-green-500 to-emerald-500', dots: ['#22c55e', '#4ade80', '#86efac', '#bbf7d0'] }
}

const HubPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('')

    // Group templates by category
    const categories = Array.from(new Set(wheelTemplates.map(t => t.category)))
    const groupedWheels = categories.reduce((acc, category) => {
        acc[category] = wheelTemplates.filter(t => t.category === category)
        return acc
    }, {} as Record<string, typeof wheelTemplates>)

    // Flatten for search
    const filteredWheels = wheelTemplates.filter(t =>
        t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.keywords.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Helmet>
                <title>All Spin Wheels | The Ultimate Spin Wheel Collection | SpinWheelHub</title>
                <meta name="description" content="Explore our massive collection of free spinning wheels. From food pickers and name generators to truth or dare - browse all our decision wheels here." />
                <link rel="canonical" href="https://spinwheelhub.vercel.app/hub" />
            </Helmet>

            {/* Hero Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-16 px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Wheel Hub</h1>
                <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                    Browse our complete collection of decision wheels.
                    Pick a category or search below to find your perfect spinner.
                </p>

                {/* Search Bar */}
                <div className="max-w-xl mx-auto relative text-gray-900">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search for wheels (e.g., 'Dinner', 'Names', 'Yes or No')..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 rounded-full shadow-lg focus:ring-4 focus:ring-purple-300 outline-none text-lg"
                    />
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12">

                {/* Featured Tools */}
                {!searchTerm && (
                    <div className="grid sm:grid-cols-3 gap-4 mb-12">
                        <Link to="/custom-wheel-of-names" className="group bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all hover:scale-105">
                            <h3 className="text-lg font-bold mb-1">🎡 Custom Wheel</h3>
                            <p className="text-sm text-white/80">Build your own wheel and share it with a link.</p>
                        </Link>
                        <Link to="/number-wheel" className="group bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all hover:scale-105">
                            <h3 className="text-lg font-bold mb-1"># Number Wheel</h3>
                            <p className="text-sm text-white/80">Pick a random number in any range (1–100 & custom).</p>
                        </Link>
                        <Link to="/giveaway" className="group bg-gradient-to-br from-pink-600 to-rose-600 text-white rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all hover:scale-105">
                            <h3 className="text-lg font-bold mb-1">🎁 Giveaway Picker</h3>
                            <p className="text-sm text-white/80">Pick a random winner with a verifiable proof link.</p>
                        </Link>
                    </div>
                )}

                {/* Search Results State */}
                {searchTerm ? (
                    <div>
                        <h2 className="text-2xl font-bold mb-6 flex items-center">
                            <Search className="mr-2 h-6 w-6 text-purple-600" />
                            Search Results ({filteredWheels.length})
                        </h2>
                        {filteredWheels.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {filteredWheels.map(wheel => (
                                    <WheelCard key={wheel.id} wheel={wheel} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 text-gray-500">
                                <p className="text-xl">No wheels found for "{searchTerm}"</p>
                                <button onClick={() => setSearchTerm('')} className="mt-4 text-purple-600 font-bold hover:underline">
                                    Clear Search
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    /* Categorized View (Hub & Spoke) */
                    <div className="space-y-16">
                        {categories.map(category => (
                            <div key={category} id={category.toLowerCase()}>
                                <h2 className="text-3xl font-bold mb-8 flex items-center border-b pb-4 border-gray-200 text-gray-800">
                                    <Tag className="mr-3 h-8 w-8 text-purple-600 p-1 bg-purple-100 rounded-lg" />
                                    {category} Wheels
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {groupedWheels[category].map(wheel => (
                                        <WheelCard key={wheel.id} wheel={wheel} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

// Internal Component for Wheel Cards
const WheelCard: React.FC<{ wheel: any }> = ({ wheel }) => {
    const colors = categoryColors[wheel.category] || categoryColors.Utility
    const wheelColors = wheel.colors || colors.dots

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="h-full"
        >
            <Link to={`/wheel/${wheel.id}`} className="block group h-full">
                <div className={`bg-gradient-to-br ${colors.gradient} rounded-2xl shadow-lg hover:shadow-2xl p-0 overflow-hidden transition-all duration-300 transform group-hover:scale-105 h-full flex flex-col`}>
                    {/* Color Preview Top */}
                    <div className="h-24 bg-white bg-opacity-10 backdrop-blur-sm flex items-center justify-center gap-2 p-4">
                        {wheelColors.slice(0, 5).map((color, i) => (
                            <motion.div
                                key={i}
                                animate={{ y: [0, -4, 0] }}
                                transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
                                className="w-8 h-8 md:w-10 md:h-10 rounded-full shadow-lg border-2 border-white"
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>

                    {/* Content */}
                    <div className="bg-white flex flex-col flex-grow p-5">
                        <div className="mb-3">
                            <span
                                className="inline-block text-xs font-bold tracking-widest text-white px-2 py-1 rounded-sm uppercase"
                                style={{
                                    backgroundImage: `linear-gradient(135deg, ${wheelColors[0]}, ${wheelColors[1] || wheelColors[0]})`,
                                }}
                            >
                                {wheel.category}
                            </span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                            {wheel.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                            {wheel.description}
                        </p>
                        <div className="flex items-center justify-between mb-4">
                            <span className="flex items-center text-sm font-medium text-gray-600">
                                <Sparkles className="w-4 h-4 mr-1" />
                                {wheel.options.length} Options
                            </span>
                        </div>

                        {/* Spin Now Button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full py-3 rounded-lg font-bold text-white flex items-center justify-center gap-2 transition-all duration-200 group-hover:shadow-lg"
                            style={{ backgroundImage: `linear-gradient(135deg, ${wheelColors[0]}, ${wheelColors[2] || wheelColors[0]})` }}
                        >
                            <Play className="w-4 h-4" />
                            Spin Now
                        </motion.button>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}

export default HubPage
