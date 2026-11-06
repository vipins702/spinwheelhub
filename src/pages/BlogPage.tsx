import React from 'react'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import { Calendar, User, ArrowRight, Tag } from 'lucide-react'
import { motion } from 'framer-motion'
import { blogPosts } from '../data/blogPosts'

const BlogPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Blog: Name Pickers, Giveaways and Classroom Games | SpinWheelHub"
        description="Articles on picking random names, running fair giveaways, classroom activities and making decisions."
        keywords="spin wheel blog, name finder tips, random picker guide, classroom games, decision making articles"
      />

      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              SpinWheelHub <span className="text-purple-600">Blog</span>
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
        </div>
      </div>
    </>
  )
}

export default BlogPage
