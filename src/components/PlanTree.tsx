import BallIcon from './BallIcon'
import type { PlanNode } from '../engine/attainability'

function statusLabel(node: PlanNode): { text: string; cls: string } {
    if (node.unresolved)
        return { text: 'unreachable', cls: 'bg-red-200 text-red-900' }
    if (node.owned)
        return { text: 'owned', cls: 'bg-emerald-200 text-emerald-900' }
    if (node.tier === 'base')
        return { text: 'need', cls: 'bg-amber-200 text-amber-900' }
    return { text: 'craft', cls: 'bg-sky-200 text-sky-900' }
}

export default function PlanTree({ node }: { node: PlanNode }) {
    const status = statusLabel(node)

    return (
        <div className="border-l border-black/20 pl-3">
            <div className="flex items-center gap-2 py-1">
                <BallIcon
                    id={node.id}
                    name={node.name}
                    size="sm"
                    tooltip={false}
                />
                <span className="font-medium">{node.name}</span>
                <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${status.cls}`}
                >
                    {status.text}
                </span>
            </div>
            {node.inputs && node.inputs.length > 0 && (
                <div className="ml-2">
                    {node.inputs.map((child, i) => (
                        <PlanTree key={`${child.id}-${i}`} node={child} />
                    ))}
                </div>
            )}
        </div>
    )
}
