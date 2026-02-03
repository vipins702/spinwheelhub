import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Search, Grid, Tag, Sparkles, FolderOpen } from 'lucide-react'
import { wheelTemplates } from '../data/wheelTemplates'

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
const WheelCard: React.FC<{ wheel: any }> = ({ wheel }) => (
    <Link to={`/wheel/${wheel.id}`} className="block group h-full">
        <div className="bg-white rounded-xl shadow-sm hover:shadow-xl border border-gray-100 p-6 transition-all duration-300 transform group-hover:-translate-y-1 h-full flex flex-col">
            <div className="mb-4">
                <span className="text-xs font-bold tracking-wider text-purple-600 bg-purple-50 px-2 py-1 rounded-sm uppercase">
                    {wheel.category}
                </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                {wheel.title}
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                {wheel.description}
            </p>
            <div className="flex items-center text-sm font-medium text-gray-500 group-hover:text-purple-600">
                <Sparkles className="w-4 h-4 mr-1" />
                {wheel.options.length} Options
            </div>
        </div>
    </Link>
)

export default HubPage
