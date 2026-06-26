import BallIcon from './BallIcon'
import type { EvolvedBallDefinition } from '../data/types'

interface Props {
    evolution: EvolvedBallDefinition
}

export default function EvolutionCard({ evolution }: Props) {
    return (
        <div className="border p-3 bg-[#c89b8c] space-y-2">
            {/* Requirements */}
            <div className="flex items-center justify-center gap-2 text-sm">
                {evolution.recipes[0].requires.map((req, i) => {
                    if (Array.isArray(req)) {
                        return (
                            <div key={i} className="flex items-center gap-1">
                                {req.map((option, idx) => (
                                    <div key={option} className="flex items-center gap-1">
                                        <BallIcon
                                            id={option}
                                            name={option}
                                            description=""
                                        />
                                        {idx < req.length - 1 && (
                                            <span className="font-bold" style={{fontSize: 60}}>/</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )
                    }

                    return (
                        <>
                            <BallIcon
                                key={req}
                                id={req}
                                name={req}
                                description=""
                            />
                            {i === 0 && (<span className="font-bold" style={{fontSize: 60}}>+</span>)}
                        </>
                    )
                })}

            </div>

            <div className="text-center font-bold">=</div>

            {/* Result */}
            <div className="flex flex-col items-center gap-2">
                <BallIcon
                    id={evolution.id}
                    name={evolution.name}
                    description={evolution.description}
                />

                <strong>{evolution.name}</strong>

                <p className="text-sm text-center opacity-80">
                    {evolution.description}
                </p>
            </div>
        </div>
    )
}
