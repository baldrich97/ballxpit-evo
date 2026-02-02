import BallIcon from './BallIcon'
import EvolutionCard from './EvolutionCard'
import type {
    BaseBallDefinition,
    EvolvedBallDefinition,
} from '../data/types'
import { getEvolutionsFromBall } from '../graph/lookup'
import {getUnlockText} from "../utils/unlockText.ts";

type Props =
    | { type: 'base'; ball: BaseBallDefinition }
    | { type: 'evolution'; ball: EvolvedBallDefinition }

export default function BallDetail(props: Props) {
    if (props.type === 'base') {
        const evolutions = getEvolutionsFromBall(props.ball.id)

        return (
            <div className="space-y-8">
                {/* Base card */}
                <div className="flex gap-4 p-4 border bg-[#c89b8c]">
                    <BallIcon
                        id={props.ball.id}
                        name={props.ball.name}
                        description={props.ball.description}
                    />

                    <div className="flex flex-col gap-2">
                        <h2 className="text-xl font-bold">
                            {props.ball.name}
                        </h2>

                        <p className="max-w-xl">
                            {props.ball.description}
                        </p>

                        {/* Unlock info */}
                        <div className="mt-2 text-sm italic opacity-80">
                            {getUnlockText(props.ball.unlockCondition)}
                        </div>
                    </div>
                </div>

                {/* Evolutions */}
                <section>
                    <h3 className="text-lg font-semibold mb-4">
                        Possible Evolutions
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                        {evolutions.map(evo => (
                            <EvolutionCard
                                evolution={evo}
                            />
                        ))}
                    </div>
                </section>
            </div>
        )
    }

    // ------------------------
    // Evolution → inverse view
    // ------------------------

    return (
        <div className="space-y-8">
            {/* Evolution card */}
            <div className="flex gap-4 p-4 border bg-[#c89b8c]">
                <BallIcon
                    id={props.ball.id}
                    name={props.ball.name}
                    description={props.ball.description}
                />
                <div>
                    <h2 className="text-xl font-bold">
                        {props.ball.name}
                    </h2>
                    <p className="mt-2 max-w-xl">
                        {props.ball.description}
                    </p>
                </div>
            </div>

            {/* Recipes */}
            <section>
                <h3 className="text-lg font-semibold mb-4">
                    How to Create
                </h3>

                <div className="grid grid-cols-2 gap-4">
                    {props.ball.recipes.map((_, idx) => (
                        <EvolutionCard
                            key={idx}
                            evolution={props.ball}
                        />
                    ))}
                </div>
            </section>
        </div>
    )
}
