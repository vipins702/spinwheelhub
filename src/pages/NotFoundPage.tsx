import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Home, AlertTriangle, ArrowRight } from 'lucide-react';
import { wheelTemplates } from '../data/wheelTemplates';

const NotFoundPage: React.FC = () => {
    // Get 3 random popular wheels
    const popularWheels = wheelTemplates.slice(0, 3);

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4 py-16 text-center">
            <Helmet>
                <title>404 - Page Not Found | SpinWheelHub</title>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto"
            >
                <div className="inline-block p-4 bg-red-500/10 rounded-full mb-6">
                    <AlertTriangle className="w-16 h-16 text-red-500" />
                </div>

                <h1 className="text-5xl font-bold text-white mb-4">Page Not Found</h1>
                <p className="text-xl text-gray-400 mb-8">
                    Oops! The spin wheel you are looking for has rolled away.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                    <Link
                        to="/"
                        className="px-8 py-3 bg-neon-purple hover:bg-neon-blue text-white rounded-xl font-bold transition-all flex items-center gap-2"
                    >
                        <Home className="w-5 h-5" />
                        Go Home
                    </Link>
                    <Link
                        to="/hub"
                        className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-bold transition-all"
                    >
                        Browse All Wheels
                    </Link>
                </div>

                <div className="border-t border-white/10 pt-8">
                    <h2 className="text-lg font-semibold text-gray-300 mb-6">Popular Wheels</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                        {popularWheels.map(wheel => (
                            <Link
                                key={wheel.id}
                                to={`/wheel/${wheel.id}`}
                                className="block p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group"
                            >
                                <h3 className="text-neon-blue font-bold group-hover:text-neon-purple transition-colors flex items-center gap-2">
                                    {wheel.title}
                                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </h3>
                                <p className="text-xs text-gray-400 mt-1 line-clamp-1">{wheel.description}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default NotFoundPage;
