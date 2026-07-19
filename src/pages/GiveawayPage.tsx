import React, { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Gift, Copy, Trophy, ShieldCheck, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import SpinningWheel from '../components/SpinningWheel'
import SEOHead from '../components/SEOHead'

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
            <SEOHead title={`Giveaway Winner: ${draw.winner} | SpinWheelHub`} description={`Verified giveaway result for "${draw.title}".`} noIndex />
            <div className="bg-white rounded-2xl shadow-xl border border-purple-100 max-w-md w-full p-8 text-center">
                <div className="flex justify-center mb-3"><Trophy className="w-14 h-14 text-yellow-500" /></div>
                <p className="text-sm text-gray-500 uppercase tracking-wide">{draw.title}</p>
                <h1 className="text-4xl font-bold text-purple-700 my-3 break-words">{draw.winner}</h1>
                <div className="flex items-center justify-center gap-2 text-green-600 text-sm font-medium mb-4">
                    <ShieldCheck className="w-4 h-4" /> Verified random draw
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

    const options: WheelOption[] = useMemo(() =>
        entries.slice(0, 200).map((text, i) => ({
            id: `${i}`, text, color: magicalColors[i % magicalColors.length]
        })), [entries])

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
                title="Giveaway Winner Picker — Spin to Pick a Random Winner | SpinWheelHub"
                description="Free giveaway winner picker. Paste your entries or comments, spin the wheel to choose a random winner, and get a verifiable proof link with a timestamp."
                keywords="giveaway winner picker, random winner generator, comment picker, raffle picker, instagram giveaway picker"
                schema={{
                    "@context": "https://schema.org", "@type": "WebApplication",
                    "name": "Giveaway Winner Picker - SpinWheelHub",
                    "description": "Spin a wheel to pick a random giveaway winner and record a verifiable result.",
                    "url": "https://spinwheelhub.vercel.app/giveaway",
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
                        verifiable proof link so everyone can see the draw was fair.
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
                        <p className="text-xs text-gray-500">{entries.length} entries{entries.length > 200 ? ' (showing first 200 on the wheel)' : ''}</p>

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
                        {options.length >= 2 ? (
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
        </div>
    )
}

const GiveawayPage: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    return id ? <GiveawayProof id={id} /> : <GiveawayHost />
}

export default GiveawayPage
