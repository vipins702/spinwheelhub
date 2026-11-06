import React, { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Gift, Copy, Trophy, ShieldCheck, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import SpinningWheel from '../components/SpinningWheel'
import SEOHead from '../components/SEOHead'
import PageGuide from '../components/PageGuide'
import { trackEvent } from '../utils/track'
import { randomInt } from '../utils/random'

// A wheel with more slices than this is too crowded to read, so longer lists are drawn without the wheel
const MAX_WHEEL_ENTRIES = 200

const guideSections = [
    {
        heading: 'How to pick a giveaway winner',
        paragraphs: [
            'Paste your entries into the box, one per line. For a social media giveaway, copy the usernames from the comments into the list first, because this tool does not read comments from Instagram or any other site. Then spin the wheel. When it stops, press Record & Get Proof Link to save the result.',
            'Each line is one slice. If a person should only count once, remove their extra lines before you spin, since a name that appears twice gets two chances.'
        ]
    },
    {
        heading: 'What the proof link shows',
        paragraphs: [
            'The proof page shows the name of your giveaway, the winner, how many entries were in the draw, and the date and time the result was saved. It does not list every entry. Think of it as a saved record you can share with your followers, not an independent audit. The page is kept out of search results, so only people with the link will see it.'
        ]
    },
    {
        heading: 'How the winner is chosen',
        paragraphs: [
            `Up to ${MAX_WHEEL_ENTRIES} entries go on the wheel, and every slice is the same size. The browser picks a random stopping point, so every entry has the same chance. With more than ${MAX_WHEEL_ENTRIES} entries the wheel would be too crowded to read, so the page shows a Pick a winner button instead. It uses your browser's secure random generator to choose one line from the full list, so no entry is left out.`,
            'Read the rules of the platform where you run your giveaway before you start. Each one has its own rules for promotions.'
        ]
    }
]

const guideFaqs = [
    {
        q: 'Is the giveaway picker free?',
        a: 'Yes. There is no sign-up. You paste your entries, spin, and save the result if you want a proof link.'
    },
    {
        q: 'Can I pick more than one winner?',
        a: "Yes. Delete the first winner's line from the list and spin again, so the same person cannot win twice. Record each draw separately if you want a proof link for each winner."
    },
    {
        q: 'Does it pull comments from Instagram or YouTube?',
        a: 'No. You copy the usernames or comments into the box yourself.'
    },
    {
        q: 'Who can see my proof link?',
        a: 'Anyone who has the link. It is not listed on the site or in search results.'
    },
    {
        q: 'Is a random spin fair enough for a prize?',
        a: "Every entry has the same chance, and the proof link records the winner and the time. For a big prize, also show the spin live or record your screen, and follow the rules of the platform you are using. For a plain number draw, try the [number wheel](/number-wheel)."
    }
]

interface WheelOption {
    id: string
    text: string
    color?: string
}

const magicalColors = [
    '#FF3B30', '#34C759', '#007AFF', '#FFD60A', '#FF9500', '#AF52DE',
    '#FF2D92', '#5AC8FA', '#FFCC02', '#30D158', '#BF5AF2', '#FF6482'
]

// ---- Proof view (/giveaway/:id) ----
const GiveawayProof: React.FC<{ id: string }> = ({ id }) => {
    const [draw, setDraw] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetch(`/api/giveaway?id=${encodeURIComponent(id)}`)
            .then(async (r) => {
                if (!r.ok) throw new Error((await r.json()).error || 'Not found')
                return r.json()
            })
            .then(setDraw)
            .catch((e) => setError(e.message))
    }, [id])

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 text-center">
                <SEOHead title="Giveaway Result Not Found | SpinWheelHub" noIndex />
                <h1 className="text-3xl font-bold text-gray-800">Result not found</h1>
                <Link to="/giveaway" className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold">Host a giveaway</Link>
            </div>
        )
    }
    if (!draw) {
        return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-10 w-10 animate-spin text-purple-600" /></div>
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center p-4">
            <SEOHead title={`Giveaway Winner: ${draw.winner} | SpinWheelHub`} description={`Recorded giveaway result for "${draw.title}".`} noIndex />
            <div className="bg-white rounded-2xl shadow-xl border border-purple-100 max-w-md w-full p-8 text-center">
                <div className="flex justify-center mb-3"><Trophy className="w-14 h-14 text-yellow-500" /></div>
                <p className="text-sm text-gray-500 uppercase tracking-wide">{draw.title}</p>
                <h1 className="text-4xl font-bold text-purple-700 my-3 break-words">{draw.winner}</h1>
                <div className="flex items-center justify-center gap-2 text-green-600 text-sm font-medium mb-4">
                    <ShieldCheck className="w-4 h-4" /> Draw recorded on SpinWheelHub
                </div>
                <div className="text-sm text-gray-500 space-y-1">
                    <p>Drawn from <strong>{draw.entry_count}</strong> entries</p>
                    <p>{new Date(draw.created_at).toLocaleString()}</p>
                </div>
                <Link to="/giveaway" className="inline-block mt-6 px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700">
                    Host your own giveaway
                </Link>
            </div>
        </div>
    )
}

// ---- Host view (/giveaway) ----
const GiveawayHost: React.FC = () => {
    const [title, setTitle] = useState('My Giveaway')
    const [raw, setRaw] = useState('')
    const [winner, setWinner] = useState<WheelOption | null>(null)
    const [proofUrl, setProofUrl] = useState<string | null>(null)
    const [saving, setSaving] = useState(false)

    const entries = useMemo(
        () => raw.split('\n').map(s => s.trim()).filter(Boolean),
        [raw]
    )

    const tooManyForWheel = entries.length > MAX_WHEEL_ENTRIES
    const options: WheelOption[] = useMemo(() =>
        tooManyForWheel ? [] : entries.map((text, i) => ({
            id: `${i}`, text, color: magicalColors[i % magicalColors.length]
        })), [entries, tooManyForWheel])

    // Long lists skip the wheel and draw from every entry, so nobody past entry 200 is left out
    const pickFromAll = () => {
        setWinner({ id: 'pick', text: entries[randomInt(entries.length)] })
        setProofUrl(null)
    }

    const recordWinner = async () => {
        if (!winner) return
        setSaving(true)
        try {
            const res = await fetch('/api/giveaway', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, winner: winner.text, entryCount: entries.length, entries })
            })
            if (!res.ok) throw new Error((await res.json()).error || 'Failed to record')
            const { url } = await res.json()
            const full = `${window.location.origin}${url}`
            setProofUrl(full)
            await navigator.clipboard.writeText(full)
            trackEvent('giveaway_proof', { entries: entries.length })
            toast.success('Winner recorded! Proof link copied.')
        } catch (e) {
            toast.error(e instanceof Error ? e.message : 'Could not record winner')
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
            <SEOHead
                title="Giveaway Winner Picker: Spin to Pick a Random Winner | SpinWheelHub"
                description="Free giveaway winner picker. Paste your entries or comments, spin the wheel to choose a random winner, and save a proof link with a time stamp."
                keywords="giveaway winner picker, random winner generator, comment picker, raffle picker, instagram giveaway picker"
                schema={{
                    "@context": "https://schema.org", "@type": "WebApplication",
                    "name": "Giveaway Winner Picker - SpinWheelHub",
                    "description": "Spin a wheel to pick a random giveaway winner and record a verifiable result.",
                    "url": "https://spinwheelhub.org/giveaway",
                    "applicationCategory": "UtilityApplication", "operatingSystem": "Any",
                    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
                }}
            />
            <div className="max-w-5xl mx-auto px-4 py-6">
                <Link to="/hub" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium mb-4">
                    <ArrowLeft className="w-4 h-4" /> All Wheels
                </Link>
                <div className="text-center mb-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center justify-center gap-2">
                        <Gift className="w-8 h-8 text-pink-600" /> Giveaway Winner Picker
                    </h1>
                    <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                        Paste your entries or comments, spin to pick a random winner, then save a
                        proof link with the time of the draw that you can share with your followers.
                    </p>
                </div>

                <div className="grid lg:grid-cols-[340px_1fr] gap-6 items-start">
                    <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 space-y-4">
                        <label className="block">
                            <span className="text-sm font-bold text-gray-900">Giveaway name</span>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                            />
                        </label>
                        <label className="block">
                            <span className="text-sm font-bold text-gray-900">Entries (one per line)</span>
                            <textarea
                                value={raw}
                                onChange={(e) => setRaw(e.target.value)}
                                rows={8}
                                placeholder={"@alice\n@bob\n@charlie"}
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none font-mono text-sm"
                            />
                        </label>
                        <p className="text-xs text-gray-500">{entries.length} entries{tooManyForWheel ? ` (more than ${MAX_WHEEL_ENTRIES}, so use Pick a winner instead of the wheel)` : ''}</p>

                        {winner && (
                            <div className="bg-purple-50 rounded-xl p-3 border border-purple-100 text-center">
                                <p className="text-xs text-gray-500">Winner</p>
                                <p className="text-2xl font-bold text-purple-700 break-words">{winner.text}</p>
                                {!proofUrl ? (
                                    <button
                                        onClick={recordWinner}
                                        disabled={saving}
                                        className="mt-3 w-full py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                                        {saving ? 'Saving…' : 'Record & Get Proof Link'}
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => { navigator.clipboard.writeText(proofUrl); toast.success('Proof link copied') }}
                                        className="mt-3 w-full py-2 bg-green-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2"
                                    >
                                        <Copy className="w-4 h-4" /> Copy Proof Link
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="flex justify-center">
                        {tooManyForWheel ? (
                            <div className="text-center bg-white rounded-xl border border-dashed border-gray-300 px-8 py-16 max-w-md">
                                <Gift className="w-12 h-12 mx-auto mb-3 text-pink-300" />
                                <p className="text-gray-600 mb-4">
                                    {entries.length.toLocaleString()} entries is too many for a readable wheel. The button below picks one line from the whole list.
                                </p>
                                <button
                                    onClick={pickFromAll}
                                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold"
                                >
                                    Pick a winner
                                </button>
                            </div>
                        ) : options.length >= 2 ? (
                            <SpinningWheel
                                options={options}
                                size={Math.min(520, typeof window !== 'undefined' ? window.innerWidth - 60 : 520)}
                                onSpinComplete={(r) => { setWinner(r); setProofUrl(null) }}
                            />
                        ) : (
                            <div className="text-center text-gray-500 py-20 px-8 bg-white rounded-xl border border-dashed border-gray-300">
                                <Gift className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                Add at least 2 entries on the left to build your giveaway wheel.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <PageGuide sections={guideSections} faqs={guideFaqs} />
        </div>
    )
}

const GiveawayPage: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    return id ? <GiveawayProof id={id} /> : <GiveawayHost />
}

export default GiveawayPage
