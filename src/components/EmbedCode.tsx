import React, { useState } from 'react'
import { Check, Code2, Copy } from 'lucide-react'
import { trackEvent } from '../utils/track'

interface EmbedCodeProps {
    slug: string
    title: string
}

// The credit link sits outside the iframe so it is a normal link on the host page.
// Branded anchor text on purpose: keyword-rich widget links can count as link spam.
const EmbedCode: React.FC<EmbedCodeProps> = ({ slug, title }) => {
    const [copied, setCopied] = useState(false)
    const code = `<iframe src="https://spinwheelhub.org/embed/${slug}" title="${title} wheel" width="100%" height="680" style="border:0;max-width:600px" loading="lazy" allow="fullscreen"></iframe>
<p>Wheel by <a href="https://spinwheelhub.org/wheel/${slug}?utm_source=embed&utm_medium=referral&utm_campaign=credit_link">SpinWheelHub</a></p>`

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(code)
            trackEvent('embed_copy', { wheel: slug })
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch {
            setCopied(false)
        }
    }

    return (
        <section className="py-10 px-4 bg-white border-t border-gray-100">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Code2 className="w-6 h-6 text-purple-600" /> Put this wheel on your website
                </h2>
                <p className="text-gray-700 mb-4">
                    Teachers and bloggers can add this wheel to a class page or blog post. Copy the code and paste it into your page's HTML.
                </p>
                <textarea
                    readOnly
                    value={code}
                    rows={4}
                    aria-label="Embed code"
                    onFocus={(e) => e.target.select()}
                    className="w-full p-3 border border-gray-300 rounded-lg font-mono text-xs text-gray-800 bg-gray-50"
                />
                <button
                    onClick={copy}
                    className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700"
                >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied' : 'Copy embed code'}
                </button>
            </div>
        </section>
    )
}

export default EmbedCode
