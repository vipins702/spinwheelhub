import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export interface GuideSection {
    heading: string
    paragraphs: string[]
}

export interface GuideFaq {
    q: string
    a: string
}

interface PageGuideProps {
    sections: GuideSection[]
    faqs?: GuideFaq[]
}

// Turns "[text](/path)" into an internal link; everything else stays plain text
const renderWithLinks = (text: string) =>
    text.split(/(\[[^\]]+\]\(\/[^)]*\))/g).map((part, i) => {
        const match = part.match(/^\[([^\]]+)\]\((\/[^)]*)\)$/)
        return match
            ? <Link key={i} to={match[2]} className="text-purple-600 font-semibold hover:underline">{match[1]}</Link>
            : part
    })

const plainText = (text: string) => text.replace(/\[([^\]]+)\]\(\/[^)]*\)/g, '$1')

// Written explanation under a tool: how it works, what people use it for, and common questions
const PageGuide: React.FC<PageGuideProps> = ({ sections, faqs = [] }) => (
    <section className="py-12 px-4 bg-white border-t border-purple-100">
        <div className="max-w-3xl mx-auto space-y-10">
            {sections.map(section => (
                <div key={section.heading}>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{section.heading}</h2>
                    <div className="space-y-4">
                        {section.paragraphs.map((p, i) => (
                            <p key={i} className="text-gray-700 leading-relaxed">{renderWithLinks(p)}</p>
                        ))}
                    </div>
                </div>
            ))}

            {faqs.length > 0 && (
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Questions people ask</h2>
                    <div className="space-y-5">
                        {faqs.map(faq => (
                            <div key={faq.q}>
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">{faq.q}</h3>
                                <p className="text-gray-700 leading-relaxed">{renderWithLinks(faq.a)}</p>
                            </div>
                        ))}
                    </div>
                    <Helmet>
                        <script type="application/ld+json">
                            {JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "FAQPage",
                                "mainEntity": faqs.map(faq => ({
                                    "@type": "Question",
                                    "name": faq.q,
                                    "acceptedAnswer": { "@type": "Answer", "text": plainText(faq.a) }
                                }))
                            })}
                        </script>
                    </Helmet>
                </div>
            )}
        </div>
    </section>
)

export default PageGuide
