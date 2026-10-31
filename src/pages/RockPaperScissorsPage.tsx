import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, RotateCcw, Trophy } from 'lucide-react'
import SEOHead from '../components/SEOHead'
import { randomInt } from '../utils/random'

type Move = 'rock' | 'paper' | 'scissors'
type Outcome = 'win' | 'lose' | 'draw'

const moves: { id: Move; label: string; emoji: string; key: string }[] = [
    { id: 'rock', label: 'Rock', emoji: '✊', key: 'r' },
    { id: 'paper', label: 'Paper', emoji: '✋', key: 'p' },
    { id: 'scissors', label: 'Scissors', emoji: '✌️', key: 's' }
]

const beats: Record<Move, Move> = { rock: 'scissors', paper: 'rock', scissors: 'paper' }

const getOutcome = (player: Move, computer: Move): Outcome =>
    player === computer ? 'draw' : beats[player] === computer ? 'win' : 'lose'

const outcomeText: Record<Outcome, string> = { win: 'You win!', lose: 'You lose', draw: 'Draw' }
const outcomeColor: Record<Outcome, string> = { win: 'text-green-600', lose: 'text-red-600', draw: 'text-gray-600' }

const matchModes = [
    { label: 'Free play', target: 0 },
    { label: 'Best of 3', target: 2 },
    { label: 'Best of 5', target: 3 }
]

const faqs = [
    { q: 'What are the rules of rock paper scissors?', a: 'Rock beats scissors, scissors beats paper, and paper beats rock. If both players pick the same thing, it\'s a draw and you play again.' },
    { q: 'Is the computer really random?', a: 'Yes. The computer picks rock, paper or scissors at random with an equal chance each time, using your browser\'s random number generator. It never looks at what you chose.' },
    { q: 'Can I play with the keyboard?', a: 'Yes. Press R for rock, P for paper and S for scissors.' },
    { q: 'What does best of 3 mean?', a: 'The first player to win 2 rounds wins the match. In best of 5, you need 3 wins. Draws don\'t count toward either side.' },
    { q: 'Is there a strategy to win?', a: 'Against a random computer, no. Every choice has the same one-in-three chance. Against people, it helps to watch for habits, because most people don\'t play randomly.' }
]

const RockPaperScissorsPage: React.FC = () => {
    const [score, setScore] = useState({ win: 0, lose: 0, draw: 0 })
    const [last, setLast] = useState<{ player: Move; computer: Move; outcome: Outcome } | null>(null)
    const [history, setHistory] = useState<Outcome[]>([])
    const [modeIndex, setModeIndex] = useState(0)

    const target = matchModes[modeIndex].target
    const matchWinner = target > 0 && (score.win >= target ? 'you' : score.lose >= target ? 'computer' : null)

    const play = useCallback((player: Move) => {
        if (matchWinner) return
        const computer = moves[randomInt(3)].id
        const outcome = getOutcome(player, computer)
        setLast({ player, computer, outcome })
        setScore(s => ({ ...s, [outcome]: s[outcome] + 1 }))
        setHistory(h => [outcome, ...h].slice(0, 20))
    }, [matchWinner])

    const reset = () => {
        setScore({ win: 0, lose: 0, draw: 0 })
        setLast(null)
        setHistory([])
    }

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
            const move = moves.find(m => m.key === e.key.toLowerCase())
            if (move) play(move.id)
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [play])

    const emojiFor = (m: Move) => moves.find(x => x.id === m)!.emoji

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
            <SEOHead
                title="Rock Paper Scissors Online: Play vs Computer | SpinWheelHub"
                description="Play rock paper scissors online against the computer. Free, no download. Keep score, play best of 3 or best of 5, and use R, P and S on your keyboard."
                keywords="rock paper scissors online, rock paper scissors, play rock paper scissors, rock paper scissors game, rock paper scissors vs computer"
                schema={[
                    {
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        "name": "Rock Paper Scissors Online - SpinWheelHub",
                        "description": "Play rock paper scissors against the computer with a scoreboard and best-of matches.",
                        "url": "https://spinwheelhub.org/rock-paper-scissors",
                        "applicationCategory": "GameApplication",
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

            <div className="max-w-3xl mx-auto px-4 py-6">
                <Link to="/hub" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium mb-4">
                    <ArrowLeft className="w-4 h-4" /> All Wheels
                </Link>

                <div className="text-center mb-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Rock Paper Scissors Online</h1>
                    <p className="text-gray-600 mt-2">Pick your move. The computer picks at the same time. Rock beats scissors, scissors beats paper, paper beats rock.</p>
                </div>

                {/* Match mode */}
                <div className="flex justify-center gap-2 mb-5">
                    {matchModes.map((m, i) => (
                        <button
                            key={m.label}
                            onClick={() => { setModeIndex(i); reset() }}
                            className={`px-3 py-2 rounded-lg text-sm font-medium border-2 transition-all ${modeIndex === i ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-gray-200 hover:border-purple-300 text-gray-700 bg-white'}`}
                        >
                            {m.label}
                        </button>
                    ))}
                </div>

                {/* Scoreboard */}
                <div className="grid grid-cols-3 gap-3 mb-5 text-center">
                    <div className="bg-white rounded-xl p-3 shadow-md">
                        <p className="text-xs text-gray-500">You</p>
                        <p className="text-3xl font-bold text-green-600">{score.win}</p>
                    </div>
                    <div className="bg-white rounded-xl p-3 shadow-md">
                        <p className="text-xs text-gray-500">Draws</p>
                        <p className="text-3xl font-bold text-gray-600">{score.draw}</p>
                    </div>
                    <div className="bg-white rounded-xl p-3 shadow-md">
                        <p className="text-xs text-gray-500">Computer</p>
                        <p className="text-3xl font-bold text-red-600">{score.lose}</p>
                    </div>
                </div>

                {/* Result */}
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center mb-5 min-h-[180px] flex flex-col justify-center" aria-live="polite">
                    {matchWinner ? (
                        <>
                            <Trophy className={`w-12 h-12 mx-auto mb-2 ${matchWinner === 'you' ? 'text-yellow-500' : 'text-gray-400'}`} />
                            <p className="text-2xl font-bold text-gray-900">
                                {matchWinner === 'you' ? 'You won the match!' : 'The computer won the match.'}
                            </p>
                            <p className="text-gray-600 mt-1">Final score {score.win} – {score.lose}</p>
                            <button onClick={reset} className="mt-4 mx-auto inline-flex items-center gap-2 bg-purple-600 text-white px-5 py-2 rounded-lg font-bold hover:bg-purple-700">
                                <RotateCcw className="w-4 h-4" /> Play again
                            </button>
                        </>
                    ) : last ? (
                        <>
                            <div className="flex justify-center items-center gap-8 text-6xl">
                                <div>
                                    <div>{emojiFor(last.player)}</div>
                                    <p className="text-xs text-gray-500 mt-1">You</p>
                                </div>
                                <span className="text-xl text-gray-400 font-bold">vs</span>
                                <div>
                                    <div>{emojiFor(last.computer)}</div>
                                    <p className="text-xs text-gray-500 mt-1">Computer</p>
                                </div>
                            </div>
                            <p className={`text-2xl font-bold mt-3 ${outcomeColor[last.outcome]}`}>{outcomeText[last.outcome]}</p>
                        </>
                    ) : (
                        <p className="text-gray-500">Choose rock, paper or scissors to start.</p>
                    )}
                </div>

                {/* Moves */}
                <div className="grid grid-cols-3 gap-3">
                    {moves.map(m => (
                        <button
                            key={m.id}
                            onClick={() => play(m.id)}
                            disabled={!!matchWinner}
                            className="bg-white rounded-xl py-4 shadow-lg border-2 border-transparent hover:border-purple-400 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <div className="text-5xl">{m.emoji}</div>
                            <div className="font-bold text-gray-900 mt-1">{m.label}</div>
                            <div className="text-[11px] text-gray-400 hidden sm:block">press {m.key.toUpperCase()}</div>
                        </button>
                    ))}
                </div>

                {history.length > 0 && (
                    <div className="mt-5 flex flex-wrap items-center gap-1 justify-center">
                        <span className="text-xs text-gray-500 mr-1">Last rounds:</span>
                        {history.map((o, i) => (
                            <span
                                key={i}
                                title={outcomeText[o]}
                                className={`w-6 h-6 rounded-full text-[11px] font-bold text-white flex items-center justify-center ${o === 'win' ? 'bg-green-500' : o === 'lose' ? 'bg-red-500' : 'bg-gray-400'}`}
                            >
                                {o === 'win' ? 'W' : o === 'lose' ? 'L' : 'D'}
                            </span>
                        ))}
                        <button onClick={reset} className="ml-2 text-xs text-gray-500 hover:text-purple-700 underline">Reset score</button>
                    </div>
                )}

                {/* SEO content */}
                <div className="mt-16 space-y-10">
                    <section>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">How to play rock paper scissors</h2>
                        <div className="space-y-4 text-gray-700 leading-relaxed">
                            <p>Each player picks one of three moves at the same time. Rock crushes scissors. Scissors cut paper. Paper covers rock. If you both pick the same move, it's a draw.</p>
                            <p>Here you play against the computer. Click a hand, or press R, P or S on your keyboard. The computer makes its choice at random, and the scoreboard keeps track of wins, losses and draws.</p>
                        </div>
                    </section>
                    <section>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Best of 3 and best of 5</h2>
                        <div className="space-y-4 text-gray-700 leading-relaxed">
                            <p>Want a proper match instead of endless rounds? Choose Best of 3 and the first to win 2 rounds takes it. Best of 5 needs 3 wins. Draws are replayed and don't count.</p>
                        </div>
                    </section>
                    <section>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">A quick way to settle things</h2>
                        <div className="space-y-4 text-gray-700 leading-relaxed">
                            <p>People have used rock paper scissors to settle small arguments for a long time. The game came from China and became popular in Japan, where it's called jan-ken, before spreading around the world.</p>
                            <p>Need to decide something between more than two people? Spin the <Link to="/custom-wheel-of-names" className="text-purple-600 font-semibold hover:underline">wheel of names</Link>, flip a coin with the <Link to="/wheel/coin-flip" className="text-purple-600 font-semibold hover:underline">coin flip wheel</Link>, or ask the <Link to="/wheel/yes-no" className="text-purple-600 font-semibold hover:underline">yes or no wheel</Link>.</p>
                        </div>
                    </section>
                </div>

                {/* FAQ */}
                <section className="mt-16">
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

export default RockPaperScissorsPage
