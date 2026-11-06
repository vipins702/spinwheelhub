import React from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { Calendar, ArrowLeft, Share2, Clock } from 'lucide-react'
import SEOHead from '../components/SEOHead'
import { blogPosts } from '../data/blogPosts'

// "Jan 28, 2024" -> "2024-01-28". Read as UTC so the day never shifts with the reader's timezone.
const toIsoDate = (text: string): string | undefined => {
    const date = new Date(`${text} UTC`)
    return isNaN(date.getTime()) ? undefined : date.toISOString().slice(0, 10)
}

const BlogPostPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>()
    const post = blogPosts.find(p => p.slug === slug)

    if (!post) {
        return <Navigate to="/blog" replace />
    }

    const url = `https://spinwheelhub.org/blog/${post.slug}`
    const published = toIsoDate(post.date)
    const otherPosts = blogPosts.filter(p => p.slug !== post.slug)

    return (
        <>
            <SEOHead
                title={post.seoTitle}
                description={post.seoDescription}
                keywords={post.keywords}
                image={post.image}
                type="article"
                schema={[
                    {
                        "@context": "https://schema.org",
                        "@type": "Article",
                        "headline": post.title,
                        "description": post.seoDescription,
                        "image": post.image,
                        ...(published ? { "datePublished": published } : {}),
                        "author": { "@type": "Person", "name": post.author },
                        "publisher": { "@type": "Organization", "name": "SpinWheelHub", "url": "https://spinwheelhub.org" },
                        "mainEntityOfPage": url
                    },
                    {
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://spinwheelhub.org/" },
                            { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://spinwheelhub.org/blog" },
                            { "@type": "ListItem", "position": 3, "name": post.title, "item": url }
                        ]
                    }
                ]}
            />

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
                            to={post.relatedWheelOptions ?
                                `/custom-wheel-of-names?title=${encodeURIComponent(post.relatedWheelTitle || 'Blog Wheel')}&options=${encodeURIComponent(post.relatedWheelOptions.join(','))}`
                                : "/custom-wheel-of-names"}
                            className="inline-block bg-purple-600 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-purple-700 transition-transform hover:scale-105 shadow-lg"
                        >
                            Try {post.relatedWheelTitle || 'Custom Wheel'}
                        </Link>
                    </div>

                    {/* More reading and tools: gives every post links in and out */}
                    <div className="p-8 md:p-12 border-t border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">More from the blog</h2>
                        <ul className="space-y-2">
                            {otherPosts.map(p => (
                                <li key={p.slug}>
                                    <Link to={`/blog/${p.slug}`} className="text-purple-700 font-semibold hover:underline">{p.title}</Link>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-6 text-gray-600">
                            Want to try the tools? Open the <Link to="/custom-wheel-of-names" className="text-purple-700 font-semibold hover:underline">custom wheel</Link>,
                            the <Link to="/giveaway" className="text-purple-700 font-semibold hover:underline">giveaway picker</Link>,
                            the <Link to="/team-generator" className="text-purple-700 font-semibold hover:underline">team generator</Link>,
                            or browse <Link to="/hub" className="text-purple-700 font-semibold hover:underline">all wheels</Link>.
                        </p>
                    </div>
                </article>
            </div>
        </>
    )
}

export default BlogPostPage
