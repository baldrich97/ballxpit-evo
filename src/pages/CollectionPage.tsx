import { useMemo, useState } from 'react'
import { BASE_BALLS } from '../data/baseBalls'
import { EVOLVED_BALLS } from '../data/evolvedBalls'
import {
    getBall,
    getBallName,
    isBaseBall,
    type AnyBall,
} from '../data/registry'
import {
    transitivelyAttainable,
    almostCraftable,
} from '../engine/attainability'
import BallGrid from '../components/BallGrid'
import BallDetail from '../components/BallDetail'
import BallIcon from '../components/BallIcon'
import { useCollection } from '../state/CollectionContext'
import { isUnlockedByDefault } from '../utils/unlockText'

const BASE_TAGGED: AnyBall[] = BASE_BALLS.map(b => ({ ...b, tier: 'base' }))
const EVOLVED_TAGGED: AnyBall[] = EVOLVED_BALLS.map(b => ({
    ...b,
    tier: 'evolved',
}))

export default function CollectionPage() {
    const { owned, setOwned, toggle, addMany, clear } = useCollection()
    const [selectedId, setSelectedId] = useState<string | null>(null)

    const { reachableEvolved, suggestions } = useMemo(() => {
        const { reachable } = transitivelyAttainable(owned)
        const reachableEvolved = new Set(
            EVOLVED_BALLS.filter(b => reachable.has(b.id)).map(b => b.id),
        )

        // Aggregate "one ball away" gaps by the base ball that would unlock them.
        const almost = almostCraftable(reachable)
        const byBall = new Map<string, Set<string>>()
        for (const { evolvedId, missingOptions } of almost) {
            for (const opt of missingOptions) {
                if (!isBaseBall(opt) || owned.has(opt)) continue
                if (!byBall.has(opt)) byBall.set(opt, new Set())
                byBall.get(opt)!.add(evolvedId)
            }
        }
        const suggestions = [...byBall.entries()]
            .map(([ballId, evos]) => ({ ballId, count: evos.size }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 6)

        return { reachableEvolved, suggestions }
    }, [owned])

    const ownedBaseCount = BASE_BALLS.filter(b => owned.has(b.id)).length
    const selected = selectedId ? getBall(selectedId) : undefined

    const markDefaults = () =>
        addMany(
            BASE_BALLS.filter(b => isUnlockedByDefault(b.unlockCondition)).map(
                b => b.id,
            ),
        )

    return (
        <div className="mx-auto max-w-6xl space-y-6 p-4">
            {/* Stats */}
            <div className="flex flex-wrap items-center gap-3">
                <Stat label="Base balls owned" value={`${ownedBaseCount}/${BASE_BALLS.length}`} />
                <Stat
                    label="Attainable evolutions"
                    value={`${reachableEvolved.size}/${EVOLVED_BALLS.length}`}
                />
                <div className="ml-auto flex gap-2">
                    <button
                        onClick={markDefaults}
                        className="rounded-md bg-black/10 px-3 py-1.5 text-sm font-medium hover:bg-black/20"
                    >
                        Mark default unlocks
                    </button>
                    <button
                        onClick={clear}
                        className="rounded-md bg-black/10 px-3 py-1.5 text-sm font-medium hover:bg-black/20"
                    >
                        Clear all
                    </button>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-6">
                    <section>
                        <h3 className="mb-1 text-lg font-semibold">
                            Your Base Balls
                        </h3>
                        <p className="mb-3 text-sm opacity-70">
                            Tap a ball to toggle whether you've unlocked it.
                        </p>
                        <div className="rounded-lg bg-black/5 p-3">
                            <BallGrid
                                balls={BASE_TAGGED}
                                selectedId={selectedId}
                                onSelect={toggle}
                                ownedIds={owned}
                                dimUnowned
                            />
                        </div>
                    </section>

                    <section>
                        <h3 className="mb-1 text-lg font-semibold">
                            Unlock Next
                        </h3>
                        <p className="mb-3 text-sm opacity-70">
                            Base balls that would open up the most new evolutions.
                        </p>
                        {suggestions.length === 0 ? (
                            <p className="opacity-70">
                                No single ball unlocks new evolutions right now.
                            </p>
                        ) : (
                            <ul className="space-y-2">
                                {suggestions.map(s => (
                                    <li
                                        key={s.ballId}
                                        className="flex items-center gap-3 rounded-lg bg-black/5 p-2"
                                    >
                                        <BallIcon
                                            id={s.ballId}
                                            name={getBallName(s.ballId)}
                                            size="sm"
                                            onClick={() => setOwned(s.ballId, true)}
                                        />
                                        <span className="flex-1 font-medium">
                                            {getBallName(s.ballId)}
                                        </span>
                                        <span className="text-sm opacity-80">
                                            +{s.count} evolution
                                            {s.count === 1 ? '' : 's'}
                                        </span>
                                        <button
                                            onClick={() =>
                                                setOwned(s.ballId, true)
                                            }
                                            className="rounded-md bg-emerald-600 px-2.5 py-1 text-sm font-medium text-white hover:bg-emerald-700"
                                        >
                                            Unlock
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                </div>

                <div className="space-y-6">
                    <section>
                        <h3 className="mb-1 text-lg font-semibold">
                            Attainable Evolutions
                        </h3>
                        <p className="mb-3 text-sm opacity-70">
                            Green ring = you can build it from what you own.
                        </p>
                        <div className="rounded-lg bg-black/5 p-3">
                            <BallGrid
                                balls={EVOLVED_TAGGED}
                                selectedId={selectedId}
                                onSelect={setSelectedId}
                                attainableIds={reachableEvolved}
                            />
                        </div>
                    </section>

                    {selected && (
                        <section>
                            {selected.tier === 'base' ? (
                                <BallDetail
                                    type="base"
                                    ball={selected}
                                    owned={owned}
                                    onToggleOwned={setOwned}
                                    onSelect={setSelectedId}
                                />
                            ) : (
                                <BallDetail
                                    type="evolution"
                                    ball={selected}
                                    owned={owned}
                                    onSelect={setSelectedId}
                                />
                            )}
                        </section>
                    )}
                </div>
            </div>
        </div>
    )
}

function Stat({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-lg bg-black/10 px-4 py-2">
            <div className="text-2xl font-bold leading-tight">{value}</div>
            <div className="text-xs uppercase tracking-wide opacity-70">
                {label}
            </div>
        </div>
    )
}
