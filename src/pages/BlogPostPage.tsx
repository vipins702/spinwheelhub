import React from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Calendar, User, ArrowLeft, Share2, Clock } from 'lucide-react'
import { blogPosts } from '../data/blogPosts'

const BlogPostPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>()
    const post = blogPosts.find(p => p.slug === slug)

    if (!post) {
        return <Navigate to="/blog" replace />
    }

    return (
        <>
            <Helmet>
                <title>{post.seoTitle}</title>
                <meta name="description" content={post.seoDescription} />
                <meta name="keywords" content={post.keywords} />

                {/* Open Graph */}
                <meta property="og:title" content={post.seoTitle} />
                <meta property="og:description" content={post.seoDescription} />
                <meta property="og:image" content={post.image} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={`https://spinwheelhub.vercel.app/blog/${post.slug}`} />

                <link rel="canonical" href={`https://spinwheelhub.vercel.app/blog/${post.slug}`} />
            </Helmet>

            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <article className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Hero Image */}
                    <div className="h-64 md:h-96 w-full relative">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                            <div className="p-8 text-white w-full">
                                <div className="flex items-center space-x-4 text-sm font-medium mb-3 opacity-90">
                                    <span className="bg-purple-600 px-3 py-1 rounded-full">{post.category}</span>
                                    <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {post.readTime}</span>
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-2">
                                    {post.title}
                                </h1>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 md:p-12">
                        <Link to="/blog" className="inline-flex items-center text-gray-500 hover:text-purple-600 mb-8 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Blog
                        </Link>

                        <div className="flex items-center justify-between border-b border-gray-100 pb-8 mb-8">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-xl">
                                    {post.author.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">{post.author}</div>
                                    <div className="text-gray-500 text-sm flex items-center">
                                        <Calendar className="w-3 h-3 mr-1" /> {post.date}
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(window.location.href)
                                    alert('Link copied to clipboard!')
                                }}
                                className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-all"
                                title="Share this post"
                            >
                                <Share2 className="w-5 h-5" />
                            </button>
                        </div>

                        <div
                            className="prose prose-lg prose-purple max-w-none text-gray-700"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </div>

                    {/* CTA Section */}
                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-8 border-t border-purple-100 text-center">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Ready to give it a spin?</h3>
                        <p className="text-gray-600 mb-6">Try our custom name picker wheel now!</p>
                        <Link
                            to="/custom-wheel-of-names"
                            className="inline-block bg-purple-600 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-purple-700 transition-transform hover:scale-105 shadow-lg"
                        >
                            Start Spinning Now
                        </Link>
                    </div>
                </article>
            </div>
        </>
    )
}

export default BlogPostPage
