import { EVOLVED_BALLS } from '../data/evolvedBalls'

interface Props {
    sourceId: string
    resultId: string
}

export default function FusionRow({ sourceId, resultId }: Props) {
    const result = EVOLVED_BALLS.find(b => b.id === resultId)
    if (!result) return null

    return (
        <div className="flex items-center gap-2 p-2 border bg-[#c89b8c] hover:bg-[#ddb2a5] cursor-pointer">
            {result.recipes.map((recipe, i) => (
                <div key={i} className="flex items-center gap-1">
                    {recipe.requires.map((req, j) => {
                        if (Array.isArray(req)) {
                            return (
                                <span key={j} className="italic opacity-80">
                                    ({req.join(' or ')})
                                </span>
                            )
                        }
                        return <span key={j}>{req}</span>
                    })}
                </div>
            ))}

            <span className="mx-2">→</span>
            <strong>{result.name}</strong>
        </div>
    )
}
