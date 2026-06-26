import { useMemo, useState } from 'react'
import { BASE_BALLS } from '../data/baseBalls'
import { EVOLVED_BALLS } from '../data/evolvedBalls'
import { ALL_BALLS, getBall, type AnyBall } from '../data/registry'
import BallGrid from '../components/BallGrid'
import BallDetail from '../components/BallDetail'
import { useCollection } from '../state/CollectionContext'

type Tab = 'base' | 'evolved' | 'all'

const TABS: { id: Tab; label: string }[] = [
    { id: 'base', label: 'Base' },
    { id: 'evolved', label: 'Evolutions' },
    { id: 'all', label: 'All' },
]

export default function EncyclopediaPage() {
    const [tab, setTab] = useState<Tab>('base')
    const [query, setQuery] = useState('')
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const { owned, setOwned } = useCollection()

    const source: AnyBall[] = useMemo(() => {
        const base = BASE_BALLS.map(b => ({ ...b, tier: 'base' as const }))
        const evolved = EVOLVED_BALLS.map(b => ({
            ...b,
            tier: 'evolved' as const,
        }))
        if (tab === 'base') return base
        if (tab === 'evolved') return evolved
        return ALL_BALLS
    }, [tab])

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase()
        if (!q) return source
        return source.filter(b => b.name.toLowerCase().includes(q))
    }, [source, query])

    const selected = selectedId ? getBall(selectedId) : undefined

    return (
        <div className="mx-auto flex max-w-6xl flex-col gap-6 p-4 lg:flex-row">
            <aside className="lg:w-96 lg:shrink-0">
                <div className="mb-3 flex gap-1">
                    {TABS.map(t => (
                        <button
                            key={t.id}
                            onClick={() => setTab(t.id)}
                            className={`flex-1 rounded-md px-2 py-1.5 text-sm font-medium transition-colors ${
                                tab === t.id
                                    ? 'bg-black/20 font-bold'
                                    : 'hover:bg-black/10'
                            }`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

                <input
                    type="search"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search balls..."
                    className="mb-3 w-full rounded-md border border-black/20 bg-[#c89b8c] px-3 py-2 text-sm placeholder:text-black/50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />

                <div className="max-h-[60vh] overflow-y-auto rounded-lg bg-black/5 p-2 lg:max-h-[calc(100vh-12rem)]">
                    <BallGrid
                        balls={filtered}
                        selectedId={selectedId}
                        onSelect={setSelectedId}
                        ownedIds={owned}
                    />
                </div>
            </aside>

            <main className="min-w-0 flex-1">
                {!selected && (
                    <div className="rounded-lg border border-dashed border-black/20 p-8 text-center text-lg opacity-60">
                        Select a ball to see its details
                    </div>
                )}

                {selected?.tier === 'base' && (
                    <BallDetail
                        type="base"
                        ball={selected}
                        owned={owned}
                        onToggleOwned={setOwned}
                        onSelect={setSelectedId}
                    />
                )}

                {selected?.tier === 'evolved' && (
                    <BallDetail
                        type="evolution"
                        ball={selected}
                        owned={owned}
                        onToggleOwned={setOwned}
                        onSelect={setSelectedId}
                    />
                )}
            </main>
        </div>
    )
}
