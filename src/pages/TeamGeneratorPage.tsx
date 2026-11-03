import React, { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Users, Shuffle, Copy, Check, Crown, Download, Minus, Plus } from 'lucide-react'
import SEOHead from '../components/SEOHead'
import NameListInput from '../components/NameListInput'
import { csvCell, downloadFile } from '../utils/names'
import { randomInt, shuffle } from '../utils/random'

const teamColors = [
    '#FF3B30', '#007AFF', '#34C759', '#FF9500', '#AF52DE', '#FF2D92',
    '#5AC8FA', '#FFCC02', '#30D158', '#BF5AF2', '#FF6482', '#0EA5E9'
]

const sampleNames = ['Alex', 'Jordan', 'Sam', 'Taylor', 'Morgan', 'Riley', 'Casey', 'Jamie', 'Avery', 'Quinn', 'Drew', 'Parker']

// Deal shuffled names round-robin so team sizes never differ by more than one
const makeTeams = (names: string[], teamCount: number): string[][] => {
    const teams: string[][] = Array.from({ length: teamCount }, () => [])
    shuffle(names).forEach((name, i) => teams[i % teamCount].push(name))
    return teams
}

const faqs = [
    { q: 'How does the random team generator work?', a: 'Enter one name per line, choose how many teams you want (or how many people per team), and click Generate Teams. The names are shuffled with the Fisher–Yates method and dealt out evenly, so every arrangement is equally likely.' },
    { q: 'Are the teams balanced?', a: 'Team sizes are balanced: no team will ever have more than one person more than another. Skill is not taken into account, because the split is completely random.' },
    { q: 'What is the difference between a random team generator and a random group generator?', a: 'They are the same tool. Teachers usually call them groups and coaches call them teams. Split a class into study groups or a party into game teams in exactly the same way.' },
    { q: 'Can I pick a captain or leader for each team?', a: 'Yes. Tick "Pick a random captain" and one person in each team is chosen at random and marked with a crown.' },
    { q: 'Is there a limit on the number of names?', a: 'No hard limit. You can split a few names or a few hundred, into as many teams as you have people.' },
    { q: 'Is my list of names saved or sent anywhere?', a: 'Your list is never uploaded. Teams are made in your browser, and the list is remembered only in this browser so it is still there next time. Press Clear to remove it.' },
    { q: 'Can I import a class list?', a: 'Yes. Press Import and choose a .txt file with one name per line, or a .csv file exported from a spreadsheet. A .csv uses its first column. You can also paste names separated by commas and press Tidy.' }
]

const TeamGeneratorPage: React.FC = () => {
    const [input, setInput] = useState(sampleNames.join('\n'))
    const [mode, setMode] = useState<'teams' | 'size'>('teams')
    const [count, setCount] = useState(3)
    const [pickCaptains, setPickCaptains] = useState(false)
    const [teams, setTeams] = useState<string[][]>([])
    const [captains, setCaptains] = useState<number[]>([])
    const [copied, setCopied] = useState(false)
    const resultsRef = useRef<HTMLDivElement>(null)

    const names = useMemo(
        () => input.split('\n').map(n => n.trim()).filter(Boolean),
        [input]
    )

    // In "people per team" mode, leftover people join existing teams rather than forming a short team
    const teamCount = mode === 'teams' ? count : Math.max(1, Math.floor(names.length / Math.max(count, 1)))

    let error = ''
    if (names.length < 2) error = 'Add at least 2 names, one per line.'
    else if (count < 1) error = 'Enter a number of 1 or more.'
    else if (mode === 'teams' && count > names.length) error = `You have ${names.length} names, so you can make at most ${names.length} teams.`
    else if (teamCount < 2) error = `With ${names.length} names and ${count} per team, everyone would be on one team. Choose a smaller team size.`

    const generate = () => {
        if (error) return
        const result = makeTeams(names, teamCount)
        setTeams(result)
        setCaptains(result.map(t => randomInt(t.length)))
        setCopied(false)
        // On phones the results are below the form, so bring them into view
        setTimeout(() => {
            if (window.innerWidth < 1024) resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 50)
    }

    const downloadCsv = () => {
        const rows = [['Team', 'Name', 'Captain'].map(csvCell).join(',')]
        teams.forEach((team, i) => team.forEach((name, j) => {
            rows.push([`Team ${i + 1}`, name, pickCaptains && j === captains[i] ? 'Yes' : ''].map(csvCell).join(','))
        }))
        downloadFile('teams.csv', rows.join('\n'), 'text/csv')
    }

    const copyResults = async () => {
        const text = teams
            .map((team, i) => `Team ${i + 1}:\n` + team.map((n, j) => (pickCaptains && j === captains[i] ? `${n} (captain)` : n)).join('\n'))
            .join('\n\n')
        try {
            await navigator.clipboard.writeText(text)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch {
            setCopied(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
            <SEOHead
                title="Random Team Generator: Split Names into Groups | SpinWheelHub"
                description="Free random team generator and random group generator. Paste a list of names, choose the number of teams or people per team, and get fair, balanced groups instantly."
                keywords="random team generator, random group generator, team picker, group maker, split into teams, random teams"
                schema={[
                    {
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        "name": "Random Team Generator - SpinWheelHub",
                        "description": "Split a list of names into random, balanced teams or groups.",
                        "url": "https://spinwheelhub.org/team-generator",
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

            <div className="max-w-6xl mx-auto px-4 py-6">
                <Link to="/hub" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium mb-4">
                    <ArrowLeft className="w-4 h-4" /> All Wheels
                </Link>

                <div className="text-center mb-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center justify-center gap-2">
                        <Users className="w-8 h-8 text-purple-600" /> Random Team Generator
                    </h1>
                    <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                        Split any list of names into random, balanced teams or groups in one click.
                        Use it for classrooms, sports, games and work.
                    </p>
                </div>

                <div className="grid lg:grid-cols-[340px_1fr] gap-6 items-start">
                    {/* Controls */}
                    <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 space-y-4">
                        <NameListInput
                            id="names"
                            label="1. Who's playing? (one name per line)"
                            value={input}
                            onChange={setInput}
                            storageKey="swh_team_names"
                            exportName="team-names.txt"
                        />

                        <div>
                            <h3 className="text-sm font-bold text-gray-900 mb-2">2. How do you want to split them?</h3>
                            <div className="grid grid-cols-2 gap-1 p-1 bg-gray-100 rounded-lg">
                                {([['teams', 'Number of teams'], ['size', 'People per team']] as const).map(([value, label]) => (
                                    <button
                                        key={value}
                                        onClick={() => setMode(value)}
                                        aria-pressed={mode === value}
                                        className={`px-2 py-2 rounded-md text-sm font-medium transition-all ${mode === value ? 'bg-white text-purple-700 shadow' : 'text-gray-600 hover:text-gray-900'}`}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                            <div className="flex items-center gap-2 mt-3">
                                <button onClick={() => setCount(c => Math.max(1, c - 1))} aria-label="One fewer" className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 text-gray-700 hover:border-purple-400">
                                    <Minus className="w-4 h-4" />
                                </button>
                                <input
                                    type="number"
                                    min={1}
                                    value={count}
                                    aria-label={mode === 'teams' ? 'How many teams' : 'How many people in each team'}
                                    onChange={(e) => setCount(Math.max(0, Math.floor(Number(e.target.value))))}
                                    className="flex-1 min-w-0 h-10 px-3 text-center text-lg font-bold text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                />
                                <button onClick={() => setCount(c => c + 1)} aria-label="One more" className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 text-gray-700 hover:border-purple-400">
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="flex gap-2 mt-2">
                                {[2, 3, 4, 5, 6].map(n => (
                                    <button
                                        key={n}
                                        onClick={() => setCount(n)}
                                        aria-pressed={count === n}
                                        className={`flex-1 py-1.5 rounded-md text-sm font-medium border transition-all ${count === n ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-gray-200 text-gray-600 hover:border-purple-300'}`}
                                    >
                                        {n}
                                    </button>
                                ))}
                            </div>
                            <p className="text-[11px] text-gray-500 mt-2">
                                {!error && (mode === 'teams'
                                    ? `About ${Math.floor(names.length / teamCount)} people in each team.`
                                    : `Makes ${teamCount} teams. Leftover people join existing teams, so nobody is left alone.`)}
                            </p>
                        </div>

                        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={pickCaptains}
                                onChange={(e) => setPickCaptains(e.target.checked)}
                                className="w-4 h-4 accent-purple-600"
                            />
                            Pick a random captain for each team
                        </label>

                        {error && <p className="text-xs text-amber-600">{error}</p>}

                        <button
                            onClick={generate}
                            disabled={!!error}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold flex items-center justify-center gap-2 shadow-md"
                        >
                            <Shuffle className="w-4 h-4" />
                            {teams.length > 0 ? 'Shuffle Again' : 'Generate Teams'}
                        </button>
                    </div>

                    {/* Results */}
                    <div ref={resultsRef} className="scroll-mt-20">
                        {teams.length === 0 ? (
                            <div className="bg-white/70 rounded-xl border-2 border-dashed border-purple-200 p-10 text-center text-gray-500">
                                <Users className="w-10 h-10 mx-auto mb-3 text-purple-300" />
                                Your teams will appear here. Add names and click <strong>Generate Teams</strong>.
                            </div>
                        ) : (
                            <>
                                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                                    <h2 className="text-lg font-bold text-gray-900">
                                        {teams.length} teams · {teams.reduce((sum, t) => sum + t.length, 0)} people
                                    </h2>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={copyResults}
                                            className="inline-flex items-center gap-1 px-3 py-2 bg-white rounded-lg shadow-md text-sm font-medium text-gray-700 hover:text-purple-700"
                                        >
                                            {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                                            {copied ? 'Copied' : 'Copy'}
                                        </button>
                                        <button
                                            onClick={downloadCsv}
                                            className="inline-flex items-center gap-1 px-3 py-2 bg-white rounded-lg shadow-md text-sm font-medium text-gray-700 hover:text-purple-700"
                                        >
                                            <Download className="w-4 h-4" /> Download CSV
                                        </button>
                                    </div>
                                </div>
                                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                                    {teams.map((team, i) => (
                                        <motion.div
                                            key={`${i}-${team.join()}`}
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.25, delay: Math.min(i, 8) * 0.04 }}
                                            className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
                                        >
                                            <div className="px-4 py-2 text-white font-bold flex items-center justify-between" style={{ backgroundColor: teamColors[i % teamColors.length] }}>
                                                <span>Team {i + 1}</span>
                                                <span className="text-xs font-medium opacity-90">{team.length} people</span>
                                            </div>
                                            <ul className="p-3 space-y-1">
                                                {team.map((name, j) => (
                                                    <li key={j} className="flex items-center gap-2 text-sm text-gray-900 px-2 py-1 rounded bg-gray-50">
                                                        {pickCaptains && j === captains[i] && <Crown className="w-4 h-4 text-yellow-500 flex-shrink-0" aria-label="Captain" />}
                                                        <span className="truncate">{name}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* SEO content */}
                <div className="mt-16 max-w-3xl mx-auto space-y-10">
                    <section>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">How to use the random team generator</h2>
                        <div className="space-y-4 text-gray-700 leading-relaxed">
                            <p>1. Paste or type your names, one per line, or press Import to load a .txt or .csv file. 2. Choose whether to split by <strong>number of teams</strong> or by <strong>people per team</strong>. 3. Click Generate Teams. Not happy? Click Shuffle Again for a completely new split.</p>
                            <p>Names are shuffled using the Fisher–Yates method with your browser's secure random number generator, then dealt out one at a time like cards. That keeps every team the same size, give or take one person, and makes every possible split equally likely.</p>
                        </div>
                    </section>
                    <section>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">A random group generator for classrooms</h2>
                        <div className="space-y-4 text-gray-700 leading-relaxed">
                            <p>Teachers use the random group generator to make study groups, lab partners and project teams. It's quick, and nobody gets picked last. Paste your class list once and reshuffle every lesson.</p>
                            <p>Need pairs? Choose "People per team" and enter 2. Odd number of students? The generator makes one group of three so nobody works alone.</p>
                        </div>
                    </section>
                    <section>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Fair teams for sports, games and work</h2>
                        <div className="space-y-4 text-gray-700 leading-relaxed">
                            <p>Picking teams for pickup basketball, five-a-side football, trivia night or a game of paintball? A random split is the quickest way to avoid arguments. Tick "Pick a random captain" to choose a leader for each side too.</p>
                            <p>At work, use it for breakout rooms, hackathon teams, workshop tables and icebreaker activities.</p>
                        </div>
                    </section>
                    <section>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Pick one person instead?</h2>
                        <p className="text-gray-700 leading-relaxed">
                            To choose a single winner or volunteer, spin the <Link to="/custom-wheel-of-names" className="text-purple-600 font-semibold hover:underline">custom wheel of names</Link>.
                            For a quick decision, try the <Link to="/wheel/yes-no" className="text-purple-600 font-semibold hover:underline">yes or no wheel</Link>.
                        </p>
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

export default TeamGeneratorPage
