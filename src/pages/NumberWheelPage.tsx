import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Hash, Shuffle } from 'lucide-react'
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

const presets = [
    { label: '1–10', min: 1, max: 10 },
    { label: '1–100', min: 1, max: 100 },
    { label: '1–6 (Dice)', min: 1, max: 6 },
    { label: '0–9', min: 0, max: 9 },
    { label: '1–50', min: 1, max: 50 },
]

const NumberWheelPage: React.FC = () => {
    const [min, setMin] = useState(1)
    const [max, setMax] = useState(10)
    const [lastResult, setLastResult] = useState<WheelOption | null>(null)

    const options: WheelOption[] = useMemo(() => {
        const lo = Math.min(min, max)
        const hi = Math.max(min, max)
        // Cap the number of slices so huge ranges stay spinnable/legible.
        const count = hi - lo + 1
        const maxSlices = 60
        let values: number[]
        if (count <= maxSlices) {
            values = Array.from({ length: count }, (_, i) => lo + i)
        } else {
            // Sample evenly across the range when it's very large
            values = Array.from({ length: maxSlices }, (_, i) =>
                Math.round(lo + (i * (hi - lo)) / (maxSlices - 1))
            )
        }
        return values.map((n, i) => ({
            id: `${i}`,
            text: String(n),
            color: magicalColors[i % magicalColors.length],
        }))
    }, [min, max])

    const rangeTooLarge = Math.abs(max - min) + 1 > 60

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
            <SEOHead
                title="Random Number Wheel — Spin a Number Generator (1–100 & Custom) | SpinWheelHub"
                description="Free random number wheel. Pick a random number by spinning — choose 1–10, 1–100, dice rolls, or set any custom range. Fair, visual, and instant."
                keywords="random number wheel, number picker wheel, random number generator, spin a number, 1 to 100 wheel, number spinner"
                schema={{
                    "@context": "https://schema.org",
                    "@type": "WebApplication",
                    "name": "Random Number Wheel - SpinWheelHub",
                    "description": "Spin a wheel to pick a random number in any custom range.",
                    "url": "https://spinwheelhub.vercel.app/number-wheel",
                    "applicationCategory": "UtilityApplication",
                    "operatingSystem": "Any",
                    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
                }}
            />

            <div className="max-w-5xl mx-auto px-4 py-6">
                <Link to="/hub" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium mb-4">
                    <ArrowLeft className="w-4 h-4" /> All Wheels
                </Link>

                <div className="text-center mb-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center justify-center gap-2">
                        <Hash className="w-8 h-8 text-purple-600" /> Random Number Wheel
                    </h1>
                    <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                        Spin the wheel to pick a random number. Choose a preset or set your own range —
                        great for games, raffles, giveaways, and classroom activities.
                    </p>
                </div>

                <div className="grid lg:grid-cols-[320px_1fr] gap-6 items-start">
                    {/* Controls */}
                    <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 space-y-4">
                        <div>
                            <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                                <Shuffle className="w-4 h-4 text-purple-600" /> Quick Ranges
                            </h3>
                            <div className="grid grid-cols-2 gap-2">
                                {presets.map(p => (
                                    <button
                                        key={p.label}
                                        onClick={() => { setMin(p.min); setMax(p.max) }}
                                        className={`px-2 py-2 rounded-lg text-sm font-medium border-2 transition-all ${min === p.min && max === p.max ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-gray-200 hover:border-purple-300 text-gray-700'}`}
                                    >
                                        {p.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold text-gray-900 mb-2">Custom Range</h3>
                            <div className="flex items-center gap-3">
                                <label className="flex-1">
                                    <span className="block text-xs text-gray-500 mb-1">Min</span>
                                    <input
                                        type="number"
                                        value={min}
                                        onChange={(e) => setMin(Number(e.target.value))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                    />
                                </label>
                                <label className="flex-1">
                                    <span className="block text-xs text-gray-500 mb-1">Max</span>
                                    <input
                                        type="number"
                                        value={max}
                                        onChange={(e) => setMax(Number(e.target.value))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                    />
                                </label>
                            </div>
                            {rangeTooLarge && (
                                <p className="text-[11px] text-amber-600 mt-2">
                                    Large range — showing 60 evenly-sampled numbers so the wheel stays readable.
                                </p>
                            )}
                        </div>

                        {lastResult && (
                            <div className="text-center bg-purple-50 rounded-xl py-3 border border-purple-100">
                                <p className="text-xs text-gray-500">Last result</p>
                                <p className="text-3xl font-bold text-purple-700">{lastResult.text}</p>
                            </div>
                        )}
                    </div>

                    {/* Wheel */}
                    <div className="flex justify-center">
                        <SpinningWheel
                            options={options}
                            size={Math.min(520, typeof window !== 'undefined' ? window.innerWidth - 60 : 520)}
                            onSpinComplete={(r) => setLastResult(r)}
                        />
                    </div>
                </div>

                {/* SEO content */}
                <div className="mt-16 max-w-3xl mx-auto prose prose-lg text-gray-600">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">How the Random Number Wheel Works</h2>
                    <p>
                        Set a minimum and maximum, then spin. The wheel picks a truly random number from your
                        range — every number has an equal chance. Use it as a fair alternative to a plain
                        random number generator when you want a visual, shareable spin instead of just a digit.
                    </p>
                    <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Popular Uses</h3>
                    <ul className="space-y-2">
                        <li>Raffle and giveaway winner numbers (e.g. 1–100)</li>
                        <li>Classroom games and randomly numbered turns</li>
                        <li>Dice replacement (1–6) or coin-style picks (0–1)</li>
                        <li>Picking lottery-style or lucky numbers for fun</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NumberWheelPage
