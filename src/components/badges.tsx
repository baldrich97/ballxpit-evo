import type { DamageType, StatusEffect } from '../data/types'

/** "BabyBallSpawn" -> "Baby Ball Spawn" */
function humanize(value: string): string {
    return value.replace(/([a-z])([A-Z])/g, '$1 $2')
}

export function StatusBadge({ status }: { status: StatusEffect }) {
    return (
        <span className="inline-flex items-center rounded-full bg-[#3a241f] text-[#f1d9cf] px-2 py-0.5 text-xs font-medium">
            {humanize(status)}
        </span>
    )
}

export function DamageBadge({ damage }: { damage: DamageType }) {
    const isAOE = damage === 'AOE'
    return (
        <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                isAOE
                    ? 'bg-amber-200 text-amber-900'
                    : 'bg-stone-200 text-stone-800'
            }`}
        >
            {damage}
        </span>
    )
}

export function BadgeRow({
    damageTypes,
    statusEffects,
}: {
    damageTypes: DamageType[]
    statusEffects: StatusEffect[]
}) {
    if (!damageTypes.length && !statusEffects.length) return null
    return (
        <div className="flex flex-wrap gap-1.5">
            {damageTypes.map(d => (
                <DamageBadge key={d} damage={d} />
            ))}
            {statusEffects.map(s => (
                <StatusBadge key={s} status={s} />
            ))}
        </div>
    )
}
