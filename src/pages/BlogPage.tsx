import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Calendar, User, ArrowRight, Play, Tag } from 'lucide-react'
import { motion } from 'framer-motion'
import { blogPosts } from '../data/blogPosts'

const BlogPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Blog & Vlog - SpinWheelHub | Name Finder Tips & Tricks</title>
        <meta name="description" content="Read the latest articles about name finders, classroom activities, party games, and updates from SpinWheelHub. Improve your spinning experience!" />
        <meta name="keywords" content="spin wheel blog, name finder tips, random picker guide, classroom games, decision making articles" />
        <link rel="canonical" href="https://spinwheelhub.com/blog" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              SpinWheelHub <span className="text-purple-600">Blog & Vlog</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tips, tricks, and inspiration for finding the perfect name.
              From classroom management to party planning.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
              >
                <Link to={`/blog/${post.slug}`} className="block relative h-48 overflow-hidden group">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-purple-600 uppercase tracking-wide flex items-center">
                    <Tag className="w-3 h-3 mr-1" />
                    {post.category}
                  </div>
                </Link>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {post.author}
                    </div>
                  </div>

                  <Link to={`/blog/${post.slug}`} className="block">
                    <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-purple-600 transition-colors cursor-pointer line-clamp-2">
                      {post.title}
                    </h2>
                  </Link>

                  <p className="text-gray-600 mb-6 flex-1 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto">
                    <Link to={`/blog/${post.slug}`} className="text-purple-600 font-semibold inline-flex items-center group hover:text-purple-700 transition-colors">
                      Read Article
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Vlog Section Placeholder */}
          <div className="mt-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Latest Vlogs</h2>
              <button className="text-purple-600 font-semibold hover:text-purple-700">View All Videos</button>
            </div>

            <div className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-3xl overflow-hidden shadow-2xl">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-6 w-max">
                    FEATURED VIDEO
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Top 5 Ways Teachers Are Using Wheel Assigners
                  </h3>
                  <p className="text-purple-100 text-lg mb-8">
                    Watch how classrooms around the world are transforming participation and engagement with simple digital tools.
                  </p>
                  <button className="bg-white text-purple-900 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors inline-flex items-center w-max">
                    <Play className="w-5 h-5 mr-2 fill-current" />
                    Watch Now
                  </button>
                </div>
                <div className="relative h-64 lg:h-auto bg-gray-800">
                  <img
                    src="https://images.pexels.com/photos/8471799/pexels-photo-8471799.jpeg?auto=compress&cs=tinysrgb&w=1200"
                    alt="Video Thumbnail"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white cursor-pointer hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-white fill-current ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BlogPage
