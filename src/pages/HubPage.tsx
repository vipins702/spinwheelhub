
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
    }

    return (
        <>
            <Helmet>
                <title>All Spin Wheels | Decision Arcade Directory</title>
                <meta name="description" content="Browse our collection of 100+ spin wheels. From Roblox game pickers to Dinner deciders, find the perfect random generator for any situation." />
            </Helmet>

            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        <span className="gradient-text">Decision Arcade</span> Directory
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Explore our massive collection of random generators.
                        Select a category to start spinning.
                    </p>
                </div>

                <div className="space-y-16">
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
