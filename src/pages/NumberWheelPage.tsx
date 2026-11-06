import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Hash, Shuffle } from 'lucide-react'
import SpinningWheel from '../components/SpinningWheel'
import SEOHead from '../components/SEOHead'
import PageGuide from '../components/PageGuide'
import { randomInt } from '../utils/random'

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

// A wheel with more slices than this is too crowded to read. Bigger ranges are drawn without the wheel.
const MAX_SLICES = 200
const MAX_RANGE = 1_000_000_000

const guideSections = [
    {
        heading: 'How the random number wheel works',
        paragraphs: [
            'Pick one of the quick ranges (1 to 10, 1 to 100, 1 to 6 for a dice, 0 to 9, or 1 to 50), or type your own minimum and maximum. The wheel gets one slice for every number in the range. Click Spin and it stops on one of them. Every slice is the same size, so every number has the same chance. Each spin is separate from the last one, so a number can come up twice in a row.',
            'A wheel can show up to 200 numbers and still be readable. If your range is bigger than that, the page hides the wheel and gives you a Pick a number button that draws one number from the whole range.'
        ]
    },
    {
        heading: 'What people use it for',
        paragraphs: [
            'The most common use is raffle tickets: spin 1 to 100 and read out the winning ticket number. There is also a ready-made [raffle wheel](/wheel/raffle-number-1-100). Teachers use number wheels for turn order and for calling on question numbers. A range of 1 to 6 works as a [dice roll](/wheel/dice-roll), and 0 to 1 works like a [coin flip](/wheel/coin-flip). Some people just use it to pick a lucky number.'
        ]
    },
    {
        heading: 'Wheel or plain number generator?',
        paragraphs: [
            'A wheel is slower than a plain generator, and that is the point when people are watching. Everyone sees the spin land, which makes a draw easier to trust at a party, in a classroom or on a stream. If you only need a number quickly for yourself, a plain generator is faster.'
        ]
    }
]

const guideFaqs = [
    {
        q: 'Can the same number come up twice?',
        a: 'Yes. Every spin is separate, so a number can repeat. If you need numbers without repeats, use the [custom wheel](/custom-wheel-of-names) with the Exclude switch turned on, or write each result down and spin again.'
    },
    {
        q: 'Is it random enough for a raffle?',
        a: "It uses your browser's random number function, which is fine for games, classrooms and raffles among friends. Do not use it for anything that needs certified randomness, such as a regulated lottery. If you want a saved record of a draw, the [giveaway picker](/giveaway) stores the winner with a time stamp."
    },
    {
        q: 'What is the biggest range I can use?',
        a: 'The wheel works up to 200 numbers. Above that, the Pick a number button draws from the whole range, up to one billion numbers.'
    },
    {
        q: 'Can I use negative numbers, or a range that does not start at 1?',
        a: 'Yes. Set any minimum and maximum, such as -5 to 5 or 100 to 150.'
    }
]

const NumberWheelPage: React.FC = () => {
    const [min, setMin] = useState(1)
    const [max, setMax] = useState(10)
    const [lastResult, setLastResult] = useState<WheelOption | null>(null)

    const lo = Math.round(Math.min(min, max))
    const hi = Math.round(Math.max(min, max))
    const count = hi - lo + 1
    const bigRange = count > MAX_SLICES
    const rangeTooHuge = count > MAX_RANGE

    const options: WheelOption[] = useMemo(() => {
        if (count > MAX_SLICES) return []
        return Array.from({ length: count }, (_, i) => ({
            id: `${i}`,
            text: String(lo + i),
            color: magicalColors[i % magicalColors.length],
        }))
    }, [lo, count])

    const pickFromRange = () => {
        if (rangeTooHuge) return
        setLastResult({ id: 'pick', text: String(lo + randomInt(count)) })
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
            <SEOHead
                title="Random Number Wheel: Spin a Number from 1 to 100 | SpinWheelHub"
                description="Free random number wheel. Spin to pick a number from 1 to 10, 1 to 100, a dice roll, or any custom range. Fair, visual and instant."
                keywords="random number wheel, number picker wheel, random number generator, spin a number, 1 to 100 wheel, number spinner"
                schema={{
                    "@context": "https://schema.org",
                    "@type": "WebApplication",
                    "name": "Random Number Wheel - SpinWheelHub",
                    "description": "Spin a wheel to pick a random number in any custom range.",
                    "url": "https://spinwheelhub.org/number-wheel",
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
                            {bigRange && !rangeTooHuge && (
                                <p className="text-[11px] text-amber-600 mt-2">
                                    That is more than {MAX_SLICES} numbers, so there is no wheel. Use Pick a number to draw from the whole range.
                                </p>
                            )}
                            {rangeTooHuge && (
                                <p className="text-[11px] text-red-600 mt-2">
                                    Use a range of one billion numbers or fewer.
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

                    {/* Wheel, or a plain draw when the range is too big for a readable wheel */}
                    <div className="flex justify-center">
                        {bigRange ? (
                            <div className="text-center bg-white rounded-xl border border-dashed border-gray-300 px-8 py-16 max-w-md">
                                <Hash className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                <p className="text-gray-600 mb-4">
                                    This range has {count.toLocaleString()} numbers, which is too many for a readable wheel.
                                </p>
                                <button
                                    onClick={pickFromRange}
                                    disabled={rangeTooHuge}
                                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Pick a number
                                </button>
                            </div>
                        ) : (
                            <SpinningWheel
                                options={options}
                                size={Math.min(520, typeof window !== 'undefined' ? window.innerWidth - 60 : 520)}
                                onSpinComplete={(r) => setLastResult(r)}
                            />
                        )}
                    </div>
                </div>
            </div>

            <PageGuide sections={guideSections} faqs={guideFaqs} />
        </div>
    )
}

export default NumberWheelPage
