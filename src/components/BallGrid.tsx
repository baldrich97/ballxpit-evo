import BallIcon from './BallIcon'
import { CheckBadge } from './OwnedToggle'
import type { AnyBall } from '../data/registry'

interface Props {
    balls: AnyBall[]
    selectedId?: string | null
    onSelect?: (id: string) => void
    /** Owned balls get a check badge and stay fully opaque. */
    ownedIds?: ReadonlySet<string>
    /** Craftable-now balls get an emerald ring. */
    attainableIds?: ReadonlySet<string>
    /** One-ball-away balls get an amber ring. */
    almostIds?: ReadonlySet<string>
    /** Dim balls that aren't owned (collection-style view). */
    dimUnowned?: boolean
}

export default function BallGrid({
    balls,
    selectedId,
    onSelect,
    ownedIds,
    attainableIds,
    almostIds,
    dimUnowned,
}: Props) {
    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(3.5rem,1fr))] gap-2">
            {balls.map(ball => {
                const owned = ownedIds?.has(ball.id) ?? false
                const attainable = attainableIds?.has(ball.id) ?? false
                const almost = almostIds?.has(ball.id) ?? false

                const ring = attainable
                    ? 'ring-2 ring-emerald-500 rounded-md'
                    : almost
                      ? 'ring-2 ring-amber-400 rounded-md'
                      : ''

                return (
                    <div key={ball.id} className={ring}>
                        <BallIcon
                            id={ball.id}
                            name={ball.name}
                            description={ball.description}
                            selected={ball.id === selectedId}
                            dimmed={dimUnowned ? !owned : false}
                            onClick={
                                onSelect ? () => onSelect(ball.id) : undefined
                            }
                            badge={owned ? <CheckBadge /> : undefined}
                        />
                    </div>
                )
            })}
        </div>
    )
}
