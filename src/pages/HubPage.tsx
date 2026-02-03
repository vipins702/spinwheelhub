
import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { wheelTemplates } from '../data/wheelTemplates'
import { Sparkles, Gamepad2, Utensils, Lightbulb, HelpCircle } from 'lucide-react'

const HubPage: React.FC = () => {
    // Group templates by category
    const categories = {
        'Utility': wheelTemplates.filter(t => t.category === 'Utility'),
        'Gaming': wheelTemplates.filter(t => t.category === 'Gaming'),
        'Food': wheelTemplates.filter(t => t.category === 'Food'),
        'Entertainment': wheelTemplates.filter(t => t.category === 'Entertainment'),
        'Life': wheelTemplates.filter(t => t.category === 'Life'),
    }

    const getIcon = (cat: string) => {
        switch (cat) {
            case 'Gaming': return <Gamepad2 className="w-6 h-6 text-neon-purple" />
            case 'Food': return <Utensils className="w-6 h-6 text-neon-pink" />
            case 'Utility': return <HelpCircle className="w-6 h-6 text-neon-blue" />
            default: return <Sparkles className="w-6 h-6 text-neon-gold" />
        }
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
                    <meta name="description" content="Explore our massive collection of 50+ free spinning wheels. From food pickers and name generators to truth or dare - browse all our decision wheels here." />
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
                    {Object.entries(categories).map(([category, wheels]) => (
                        <div key={category}>
                            <div className="flex items-center space-x-3 mb-6">
                                {getIcon(category)}
                                <h2 className="text-2xl font-bold text-white">{category} Wheels</h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {wheels.map((wheel) => (
                                    <Link
                                        key={wheel.id}
                                        to={`/wheel/${wheel.id}`}
                                        className="glass-card p-6 rounded-xl glass-card-hover group relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 p-2 opacity-50 text-6xl rotate-12 group-hover:rotate-0 transition-all duration-500 origin-top-right select-none">
                                            🎡
                                        </div>

                                        <h3 className="text-lg font-bold text-gray-100 group-hover:text-neon-purple transition-colors mb-2 z-10 relative">
                                            {wheel.title}
                                        </h3>

                                        <p className="text-sm text-gray-400 line-clamp-2 z-10 relative">
                                            {wheel.description}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default HubPage
