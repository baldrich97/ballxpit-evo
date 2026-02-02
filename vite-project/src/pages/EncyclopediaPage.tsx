import { useState } from 'react'
import { BASE_BALLS } from '../data/baseBalls'
import { EVOLVED_BALLS } from '../data/evolvedBalls'
import BallDetail from '../components/BallDetail'
import BallIcon from '../components/BallIcon'

type Tab = 'base' | 'evolved'

export default function EncyclopediaPage() {
    const [tab, setTab] = useState<Tab>('base')
    const [selectedBallId, setSelectedBallId] = useState<string | null>(null)


    const selectedBase = BASE_BALLS.find(b => b.id === selectedBallId)
    const selectedEvolution = EVOLVED_BALLS.find(b => b.id === selectedBallId)

    return (
        <div className="h-screen flex bg-[#9b6a5f]">
            {/* LEFT: Encyclopedia */}
            <aside className="w-80 border-r border-black p-4 overflow-y-auto">
                <div className="flex mb-4">
                    <button
                        className={`flex-1 ${tab === 'base' ? 'font-bold' : ''}`}
                        onClick={() => setTab('base')}
                    >
                        Base
                    </button>
                    <button
                        className={`flex-1 ${tab === 'evolved' ? 'font-bold' : ''}`}
                        onClick={() => setTab('evolved')}
                    >
                        Evolutions
                    </button>
                </div>

                <div className="grid grid-cols-4 gap-2">
                    {(tab === 'base' ? BASE_BALLS : EVOLVED_BALLS).map(ball => (
                        <BallIcon
                            key={ball.id}
                            id={ball.id}
                            name={ball.name}
                            description={ball.description}
                            selected={ball.id === selectedBallId}
                            onClick={() => setSelectedBallId(ball.id)}
                        />
                    ))}
                </div>
            </aside>

            {/* RIGHT: Details */}
            <main className="flex-1 p-6 overflow-y-auto">
                {!selectedBallId && (
                    <div className="opacity-60 text-lg">
                        Select a ball to see details
                    </div>
                )}

                {selectedBase && (
                    <BallDetail type="base" ball={selectedBase} />
                )}

                {selectedEvolution && (
                    <BallDetail type="evolution" ball={selectedEvolution} />
                )}
            </main>
        </div>
    )
}
