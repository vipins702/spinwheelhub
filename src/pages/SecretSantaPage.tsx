import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Gift, Shuffle, Eye, EyeOff, Check, Copy, RotateCcw, Download, X, Plus } from 'lucide-react'
import SEOHead from '../components/SEOHead'
import NameListInput from '../components/NameListInput'
import { csvCell, downloadFile } from '../utils/names'
import { shuffle } from '../utils/random'

interface Pair {
    giver: string
    receiver: string
}

const sampleNames = ['Alex', 'Jordan', 'Sam', 'Taylor', 'Morgan', 'Riley']

const pairKey = (a: string, b: string) => `${a.toLowerCase()}|${b.toLowerCase()}`

// Shuffle receivers until nobody has themselves or a blocked person.
// Returns null if no valid draw is found (e.g. too many exclusions).
const drawNames = (names: string[], blocked: Set<string>): Pair[] | null => {
    for (let attempt = 0; attempt < 10000; attempt++) {
        const receivers = shuffle(names)
        const ok = names.every((giver, i) =>
            giver !== receivers[i] && !blocked.has(pairKey(giver, receivers[i]))
        )
        if (ok) return names.map((giver, i) => ({ giver, receiver: receivers[i] }))
    }
    return null
}

const faqs = [
    { q: 'How does the Secret Santa generator work?', a: 'Type everyone\'s name, one per line, and press Draw Names. Each person is matched with someone to buy a gift for. Nobody can draw their own name, and everyone gives and receives exactly one gift.' },
    { q: 'Can I stop couples from drawing each other?', a: 'Yes. Under "Keep people apart", choose two names and press Add. Those two will never be matched with each other in either direction.' },
    { q: 'How do people see who they got without the organizer seeing?', a: 'After the draw, pass your phone or laptop around. Each person taps their own name, reads who they are buying for, then taps "Hide" before handing it on. Only the person tapping sees their match.' },
    { q: 'Can the organizer see all the matches?', a: 'Yes, but only if they choose to. Press "Show all matches" and confirm. Use this if you are running the exchange for children or need a record of who has who.' },
    { q: 'What is the minimum number of people?', a: 'Three. With only two people, each would always get the other, so there is no secret.' },
    { q: 'Are the names saved or sent anywhere?', a: 'Nothing is uploaded. The draw happens in your browser. Your name list is remembered in this browser for next time, but the matches are not saved. If you close or refresh the page, the matches are gone, so make sure everyone has seen theirs first.' },
    { q: 'Can I import a list of names?', a: 'Yes. Press Import and choose a .txt file with one name per line, or a .csv file exported from a spreadsheet. You can also paste names separated by commas and press Tidy.' }
]

const SecretSantaPage: React.FC = () => {
    const [namesInput, setNamesInput] = useState(sampleNames.join('\n'))
    const [exclusions, setExclusions] = useState<[string, string][]>([])
    const [pairA, setPairA] = useState('')
    const [pairB, setPairB] = useState('')
    const [budget, setBudget] = useState('')
    const [exchangeDate, setExchangeDate] = useState('')
    const [pairs, setPairs] = useState<Pair[]>([])
    const [drawError, setDrawError] = useState('')
    const [viewing, setViewing] = useState<string | null>(null)
    const [seen, setSeen] = useState<Set<string>>(new Set())
    const [showAll, setShowAll] = useState(false)
    const [copied, setCopied] = useState(false)

    const names = useMemo(
        () => namesInput.split('\n').map(n => n.trim()).filter(Boolean),
        [namesInput]
    )

    const lowerNames = names.map(n => n.toLowerCase())
    const duplicate = names.find((n, i) => lowerNames.indexOf(n.toLowerCase()) !== i)

    // Pairs whose names were later removed from the list no longer apply
    const activeExclusions = exclusions.filter(([a, b]) => names.includes(a) && names.includes(b))
    const blocked = new Set(activeExclusions.flatMap(([a, b]) => [pairKey(a, b), pairKey(b, a)]))

    const addExclusion = () => {
        if (!pairA || !pairB || pairA === pairB || blocked.has(pairKey(pairA, pairB))) return
        setExclusions(prev => [...prev, [pairA, pairB]])
        setPairA('')
        setPairB('')
    }

    let inputError = ''
    if (names.length < 3) inputError = 'Add at least 3 names, one per line.'
    else if (duplicate) inputError = `"${duplicate}" is on the list twice. Add a last initial so every name is different.`

    const draw = () => {
        if (inputError) return
        const result = drawNames(names, blocked)
        if (!result) {
            setPairs([])
            setDrawError('No draw works with these rules. Remove some of the "keep apart" pairs and try again.')
            return
        }
        setPairs(result)
        setDrawError('')
        setViewing(null)
        setSeen(new Set())
        setShowAll(false)
        setCopied(false)
    }

    const startOver = () => {
        if (!window.confirm('Start over? The current matches will be lost.')) return
        setPairs([])
        setViewing(null)
        setSeen(new Set())
        setShowAll(false)
    }

    const hideMatch = () => {
        if (viewing) setSeen(prev => new Set(prev).add(viewing))
        setViewing(null)
    }

    const revealAll = () => {
        if (window.confirm('Show every match? Anyone looking at the screen will see who has who.')) setShowAll(true)
    }

    const copyAll = async () => {
        const lines = pairs.map(p => `${p.giver} → ${p.receiver}`)
        if (budget) lines.push('', `Budget: ${budget}`)
        if (exchangeDate) lines.push(`Gift exchange: ${exchangeDate}`)
        try {
            await navigator.clipboard.writeText(lines.join('\n'))
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch {
            setCopied(false)
        }
    }

    const downloadCsv = () => {
        const rows = [['Giver', 'Buys for'].map(csvCell).join(',')]
        pairs.forEach(p => rows.push([p.giver, p.receiver].map(csvCell).join(',')))
        downloadFile('secret-santa.csv', rows.join('\n'), 'text/csv')
    }

    const viewingPair = pairs.find(p => p.giver === viewing)
    const step = pairs.length === 0 ? 1 : seen.size < pairs.length ? 2 : 3

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50">
            <SEOHead
                title="Secret Santa Generator: Free Name Draw Online | SpinWheelHub"
                description="Free Secret Santa generator. Enter names, block couples from drawing each other, then pass the phone around so each person sees only their match. No sign-up."
                keywords="secret santa generator, secret santa name drawer, secret santa picker, draw names online, gift exchange generator, secret santa"
                schema={[
                    {
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        "name": "Secret Santa Generator - SpinWheelHub",
                        "description": "Draw names for a Secret Santa gift exchange, with exclusions and private reveals.",
                        "url": "https://spinwheelhub.org/secret-santa",
                        "applicationCategory": "UtilityApplication",
                        "operatingSystem": "Any",
                        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
                    },
                    {
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": faqs.map(faq => (
                            { "@type": "Question", "name": faq.q, "acceptedAnswer": { "@type": "Answer", "text": faq.a } }
                        ))
                    }
                ]}
            />

            <div className="max-w-5xl mx-auto px-4 py-6">
                <Link to="/hub" className="inline-flex items-center gap-2 text-red-600 hover:text-red-800 font-medium mb-4">
                    <ArrowLeft className="w-4 h-4" /> All Wheels
                </Link>

                <div className="text-center mb-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center justify-center gap-2">
                        <Gift className="w-8 h-8 text-red-600" /> Secret Santa Generator
                    </h1>
                    <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                        Draw names for your gift exchange. Nobody gets themselves, couples can be kept apart,
                        and everyone sees only their own match.
                    </p>
                </div>

                <ol className="flex items-center justify-center gap-2 sm:gap-4 mb-6 text-xs sm:text-sm" aria-label="Progress">
                    {['Add names', 'Draw and reveal', 'All done'].map((label, i) => (
                        <li key={label} aria-current={step === i + 1 ? 'step' : undefined} className={`flex items-center gap-1.5 font-medium ${step >= i + 1 ? 'text-red-700' : 'text-gray-400'}`}>
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white ${step > i + 1 ? 'bg-green-600' : step === i + 1 ? 'bg-red-600' : 'bg-gray-300'}`}>
                                {step > i + 1 ? <Check className="w-3.5 h-3.5" /> : i + 1}
                            </span>
                            {label}
                        </li>
                    ))}
                </ol>

                {pairs.length === 0 ? (
                    /* Step 1: set up */
                    <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-100 max-w-2xl mx-auto space-y-5">
                        <NameListInput
                            id="santa-names"
                            label="1. Who is taking part? (one name per line)"
                            value={namesInput}
                            onChange={setNamesInput}
                            storageKey="swh_santa_names"
                            exportName="secret-santa-names.txt"
                            rows={8}
                        />

                        <div>
                            <h3 className="text-sm font-bold text-gray-900 mb-1">2. Keep people apart (optional)</h3>
                            <p className="text-xs text-gray-500 mb-2">Good for couples and people who live together. They won't draw each other.</p>
                            <div className="flex flex-col sm:flex-row gap-2">
                                {([[pairA, setPairA, pairB, 'First person'], [pairB, setPairB, pairA, 'Second person']] as const).map(([value, setValue, other, label]) => (
                                    <select
                                        key={label}
                                        value={value}
                                        aria-label={label}
                                        onChange={(e) => setValue(e.target.value)}
                                        className="flex-1 min-w-0 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:ring-2 focus:ring-red-500 outline-none"
                                    >
                                        <option value="">{label}</option>
                                        {names.filter(n => n !== other).map(n => <option key={n} value={n}>{n}</option>)}
                                    </select>
                                ))}
                                <button
                                    onClick={addExclusion}
                                    disabled={!pairA || !pairB}
                                    className="inline-flex items-center justify-center gap-1 px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    <Plus className="w-4 h-4" /> Add
                                </button>
                            </div>
                            {activeExclusions.length > 0 && (
                                <ul className="flex flex-wrap gap-2 mt-3">
                                    {activeExclusions.map(([a, b]) => (
                                        <li key={`${a}|${b}`} className="inline-flex items-center gap-1 pl-3 pr-1 py-1 rounded-full bg-red-50 text-red-800 text-xs font-medium">
                                            {a} and {b}
                                            <button
                                                onClick={() => setExclusions(prev => prev.filter(([x, y]) => !(x === a && y === b)))}
                                                aria-label={`Remove ${a} and ${b}`}
                                                className="p-1 rounded-full hover:bg-red-100"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="grid sm:grid-cols-2 gap-3">
                            <label className="block">
                                <span className="block text-sm font-bold text-gray-900 mb-1">3. Budget (optional)</span>
                                <input
                                    type="text"
                                    value={budget}
                                    onChange={(e) => setBudget(e.target.value)}
                                    placeholder="$25"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-sm"
                                />
                            </label>
                            <label className="block">
                                <span className="block text-sm font-bold text-gray-900 mb-1">Exchange date (optional)</span>
                                <input
                                    type="text"
                                    value={exchangeDate}
                                    onChange={(e) => setExchangeDate(e.target.value)}
                                    placeholder="Dec 20"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-sm"
                                />
                            </label>
                        </div>

                        {(inputError || drawError) && <p className="text-sm text-amber-600">{inputError || drawError}</p>}

                        <button
                            onClick={draw}
                            disabled={!!inputError}
                            className="w-full bg-gradient-to-r from-red-600 to-green-600 text-white px-4 py-3 rounded-lg hover:from-red-700 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold flex items-center justify-center gap-2 shadow-md"
                        >
                            <Shuffle className="w-4 h-4" /> Draw Names
                        </button>
                    </div>
                ) : (
                    /* Step 2: reveal */
                    <div className="max-w-3xl mx-auto space-y-5">
                        {viewingPair ? (
                            <div className="bg-white rounded-xl p-8 shadow-xl border-2 border-red-200 text-center">
                                <p className="text-gray-600">Hi <strong>{viewingPair.giver}</strong>! You are the Secret Santa for:</p>
                                <p className="text-4xl md:text-5xl font-bold text-red-600 my-5">{viewingPair.receiver}</p>
                                {(budget || exchangeDate) && (
                                    <p className="text-sm text-gray-600 mb-5">
                                        {budget && <>Budget: <strong>{budget}</strong></>}
                                        {budget && exchangeDate && ' · '}
                                        {exchangeDate && <>Exchange: <strong>{exchangeDate}</strong></>}
                                    </p>
                                )}
                                <p className="text-xs text-gray-500 mb-4">Remember the name, then hide it before you pass the screen on.</p>
                                <button
                                    onClick={hideMatch}
                                    className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-700"
                                >
                                    <EyeOff className="w-4 h-4" /> Got it, hide
                                </button>
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-100">
                                <h2 className="text-lg font-bold text-gray-900 mb-1">Names drawn. Now pass the screen around.</h2>
                                <p className="text-sm text-gray-600 mb-4">
                                    Each person taps their own name, reads who they got, then taps "Hide".
                                </p>
                                <div className="mb-4">
                                    <div className="flex justify-between text-xs font-medium text-gray-600 mb-1">
                                        <span>{seen.size} of {pairs.length} have looked</span>
                                        {seen.size === pairs.length && <span className="text-green-700">Everyone has their match!</span>}
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden" role="progressbar" aria-valuemin={0} aria-valuemax={pairs.length} aria-valuenow={seen.size} aria-label="People who have seen their match">
                                        <div className="h-full bg-green-500 transition-all duration-300" style={{ width: `${(seen.size / pairs.length) * 100}%` }} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {pairs.map(p => (
                                        <button
                                            key={p.giver}
                                            onClick={() => setViewing(p.giver)}
                                            className={`px-3 py-3 rounded-lg border-2 font-medium text-sm flex items-center justify-center gap-2 transition-all ${seen.has(p.giver) ? 'border-green-300 bg-green-50 text-green-800' : 'border-red-200 hover:border-red-400 text-gray-900'}`}
                                        >
                                            {seen.has(p.giver) ? <Check className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            <span className="truncate">{p.giver}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {!viewingPair && (
                            <div className="bg-white/80 rounded-xl p-4 border border-gray-200">
                                <div className="flex flex-wrap gap-2 justify-between items-center">
                                    <span className="text-sm font-bold text-gray-900">Organizer tools</span>
                                    <div className="flex flex-wrap gap-2">
                                        {!showAll && (
                                            <button onClick={revealAll} className="px-3 py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium inline-flex items-center gap-1">
                                                <Eye className="w-4 h-4" /> Show all matches
                                            </button>
                                        )}
                                        <button onClick={startOver} className="px-3 py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium inline-flex items-center gap-1">
                                            <RotateCcw className="w-4 h-4" /> Start over
                                        </button>
                                    </div>
                                </div>
                                {showAll && (
                                    <div className="mt-4">
                                        <ul className="divide-y divide-gray-100 bg-white rounded-lg border border-gray-100">
                                            {pairs.map(p => (
                                                <li key={p.giver} className="flex justify-between px-4 py-2 text-sm text-gray-900">
                                                    <span>{p.giver}</span>
                                                    <span className="text-gray-500">buys for <strong className="text-gray-900">{p.receiver}</strong></span>
                                                </li>
                                            ))}
                                        </ul>
                                        <button onClick={copyAll} className="mt-3 inline-flex items-center gap-1 px-3 py-2 text-sm rounded-lg bg-white shadow text-gray-700 font-medium hover:text-red-700">
                                            {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                                            {copied ? 'Copied' : 'Copy list'}
                                        </button>
                                        <button onClick={downloadCsv} className="mt-3 ml-2 inline-flex items-center gap-1 px-3 py-2 text-sm rounded-lg bg-white shadow text-gray-700 font-medium hover:text-red-700">
                                            <Download className="w-4 h-4" /> Download CSV
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* SEO content */}
                <div className="mt-16 max-w-3xl mx-auto space-y-10">
                    <section>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">How to draw names for Secret Santa</h2>
                        <div className="space-y-4 text-gray-700 leading-relaxed">
                            <p>1. Type the name of everyone joining the gift exchange, one per line, or press Import to load a list. 2. If two people shouldn't get each other, like a married couple, add them under "Keep people apart". 3. Set a budget and date if you want them shown with each match. 4. Press Draw Names.</p>
                            <p>Then pass your phone or laptop around the room. Each person taps their name, sees who they are buying for, and taps "Hide" before handing it to the next person. The names turn green once someone has looked, so you know who is still left.</p>
                        </div>
                    </section>
                    <section>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Why use a Secret Santa name generator?</h2>
                        <div className="space-y-4 text-gray-700 leading-relaxed">
                            <p>Drawing names out of a hat works, until someone pulls their own name and you have to start again. Or the only name left at the end is the person holding the hat. This generator checks every draw for you, so nobody ever gets themselves.</p>
                            <p>It also handles the awkward cases. Keep partners and roommates apart, run a draw for a big office party, or set up a family exchange where the kids shouldn't get their own parents.</p>
                        </div>
                    </section>
                    <section>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Tips for a good gift exchange</h2>
                        <div className="space-y-4 text-gray-700 leading-relaxed">
                            <p>Agree on a budget everyone is comfortable with. Somewhere between $15 and $50 is common for offices and friend groups.</p>
                            <p>Pick the exchange date before you draw names so people know how long they have to shop. Ask everyone to write a short wish list, even just three ideas, to make shopping easier.</p>
                            <p>Doing a White Elephant or gift game instead? Try our <Link to="/team-generator" className="text-red-600 font-semibold hover:underline">random team generator</Link> to split the group, or the <Link to="/custom-wheel-of-names" className="text-red-600 font-semibold hover:underline">wheel of names</Link> to decide who opens a gift first.</p>
                        </div>
                    </section>
                </div>

                {/* FAQ */}
                <section className="mt-16 max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-white p-5 rounded-xl shadow-md">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.q}</h3>
                                <p className="text-gray-700">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default SecretSantaPage
