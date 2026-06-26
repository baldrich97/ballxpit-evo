import EvolutionGraph from '../components/EvolutionGraph'
import { useCollection } from '../state/CollectionContext'

export default function GraphPage() {
    const { owned, toggle } = useCollection()

    return (
        <div className="relative h-full w-full">
            <div className="pointer-events-none absolute left-3 top-3 z-10 rounded-md bg-black/60 px-3 py-1.5 text-xs text-white">
                Green = owned. Click a node to mark it.
            </div>
            <EvolutionGraph ownedIds={owned} onSelect={toggle} />
        </div>
    )
}
