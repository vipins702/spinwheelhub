import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Copy, Loader2, Settings, Share2 } from 'lucide-react'
import toast from 'react-hot-toast'
import SpinningWheel from '../components/SpinningWheel'
import SEOHead from '../components/SEOHead'

interface WheelOption {
    id: string
    text: string
    color?: string
}

interface SharedWheel {
    id: string
    title: string
    entries: { text: string; color?: string }[]
    views: number
    spins: number
}

const magicalColors = [
    '#FF3B30', '#34C759', '#007AFF', '#FFD60A', '#FF9500', '#AF52DE',
    '#FF2D92', '#5AC8FA', '#FFCC02', '#30D158', '#BF5AF2', '#FF6482'
]

const SharedWheelPage: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const [wheel, setWheel] = useState<SharedWheel | null>(null)
    const [options, setOptions] = useState<WheelOption[]>([])
    const [error, setError] = useState<string | null>(null)
    const [lastResult, setLastResult] = useState<WheelOption | null>(null)

    useEffect(() => {
        if (!id) return
        fetch(`/api/wheels?id=${encodeURIComponent(id)}`)
            .then(async (res) => {
                if (!res.ok) throw new Error((await res.json()).error || 'Failed to load wheel')
                return res.json()
            })
            .then((data: SharedWheel) => {
                setWheel(data)
                setOptions(data.entries.map((e, i) => ({
                    id: `${i + 1}`,
                    text: e.text,
                    color: e.color || magicalColors[i % magicalColors.length]
                })))
            })
            .catch((err) => setError(err.message))
    }, [id])

    const handleSpinComplete = (result: WheelOption) => {
        setLastResult(result)
        // fire-and-forget spin counter
        fetch('/api/wheels', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'spin', id })
        }).catch(() => { })
    }

    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href)
        toast.success('Link copied — share it with anyone!')
    }

    const customizeUrl = wheel
        ? `/custom-wheel-of-names?title=${encodeURIComponent(wheel.title)}&options=${wheel.entries.map(e => encodeURIComponent(e.text)).join(',')}`
        : '/custom-wheel-of-names'

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 text-center">
                <SEOHead title="Wheel Not Found | SpinWheelHub" noIndex />
                <h1 className="text-3xl font-bold text-gray-800">Wheel not found</h1>
                <p className="text-gray-600">This shared wheel doesn't exist or was removed.</p>
                <Link to="/custom-wheel-of-names" className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors">
                    Create your own wheel
                </Link>
            </div>
        )
    }

    if (!wheel) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <SEOHead title="Loading Wheel… | SpinWheelHub" noIndex />
                <Loader2 className="h-10 w-10 animate-spin text-purple-600" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
            <SEOHead
                title={`${wheel.title} — Spin the Wheel | SpinWheelHub`}
                description={`Spin "${wheel.title}" — a shared wheel with ${wheel.entries.length} options: ${wheel.entries.slice(0, 5).map(e => e.text).join(', ')}${wheel.entries.length > 5 ? '…' : ''}. Spin it or make your own free custom wheel.`}
            />
            <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col items-center gap-4">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">{wheel.title}</h1>
                <p className="text-sm text-gray-500">
                    Shared wheel · {wheel.entries.length} options · spun {wheel.spins.toLocaleString()} times
                </p>

                <SpinningWheel
                    options={options}
                    onSpinComplete={handleSpinComplete}
                    size={Math.min(550, typeof window !== 'undefined' ? window.innerWidth - 40 : 550)}
                />

                {lastResult && (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="px-8 py-4 bg-white rounded-2xl shadow-lg border-2 border-purple-200 text-center"
                    >
                        <p className="text-sm text-gray-500 mb-1">Result</p>
                        <p className="text-2xl font-bold text-purple-700">{lastResult.text}</p>
                    </motion.div>
                )}

                <div className="flex flex-wrap gap-3 justify-center mt-2">
                    <button
                        onClick={copyLink}
                        className="flex items-center gap-2 px-5 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors"
                    >
                        <Copy className="h-4 w-4" /> Copy Link
                    </button>
                    <Link
                        to={customizeUrl}
                        className="flex items-center gap-2 px-5 py-3 bg-white text-purple-700 border-2 border-purple-300 rounded-xl font-semibold hover:bg-purple-50 transition-colors"
                    >
                        <Settings className="h-4 w-4" /> Customize This Wheel
                    </Link>
                    <Link
                        to="/custom-wheel-of-names"
                        className="flex items-center gap-2 px-5 py-3 bg-white text-gray-700 border-2 border-gray-200 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                    >
                        <Share2 className="h-4 w-4" /> Make Your Own
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SharedWheelPage
