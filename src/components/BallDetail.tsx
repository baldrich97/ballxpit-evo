import BallIcon from './BallIcon'
import EvolutionCard from './EvolutionCard'
import RecipeRow from './RecipeRow'
import { BadgeRow } from './badges'
import OwnedToggle from './OwnedToggle'
import type {
    BaseBallDefinition,
    EvolvedBallDefinition,
} from '../data/types'
import { getEvolutionsFromBall } from '../graph/lookup'
import { getUnlockText } from '../utils/unlockText'

type Props = (
    | { type: 'base'; ball: BaseBallDefinition }
    | { type: 'evolution'; ball: EvolvedBallDefinition }
) & {
    owned?: ReadonlySet<string>
    onToggleOwned?: (id: string, owned: boolean) => void
    onSelect?: (id: string) => void
}

export default function BallDetail(props: Props) {
    const { ball, owned, onToggleOwned, onSelect } = props
    const isOwned = owned?.has(ball.id) ?? false

    const header = (
        <div className="flex flex-wrap items-start gap-4 rounded-lg border border-black/20 bg-[#c89b8c] p-4">
            <BallIcon
                id={ball.id}
                name={ball.name}
                description={ball.description}
                size="lg"
                tooltip={false}
            />
            <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="flex items-center justify-between gap-3">
                    <h2 className="text-2xl font-bold">{ball.name}</h2>
                    {onToggleOwned && (
                        <OwnedToggle
                            owned={isOwned}
                            onChange={val => onToggleOwned(ball.id, val)}
                        />
                    )}
                </div>
                <BadgeRow
                    damageTypes={ball.damageTypes}
                    statusEffects={ball.statusEffects}
                />
                <p className="max-w-2xl">{ball.description}</p>
                {props.type === 'base' && (
                    <div className="mt-1 text-sm italic opacity-80">
                        {getUnlockText(props.ball.unlockCondition)}
                    </div>
                )}
            </div>
        </div>
    )

    if (props.type === 'base') {
        const evolutions = getEvolutionsFromBall(props.ball.id)

        return (
            <div className="space-y-8">
                {header}
                <section>
                    <h3 className="mb-4 text-lg font-semibold">
                        Used In ({evolutions.length})
                    </h3>
                    {evolutions.length === 0 ? (
                        <p className="opacity-70">
                            This ball isn't part of any evolution recipe.
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            {evolutions.map(evo => (
                                <EvolutionCard
                                    key={evo.id}
                                    evolution={evo}
                                    owned={owned}
                                    onSelect={onSelect}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {header}
            <section>
                <h3 className="mb-4 text-lg font-semibold">
                    How to Create
                    {props.ball.recipes.length > 1 &&
                        ` (${props.ball.recipes.length} recipes)`}
                </h3>
                <div className="space-y-4">
                    {props.ball.recipes.map((recipe, idx) => (
                        <div
                            key={idx}
                            className="rounded-lg border border-black/20 bg-[#c89b8c] p-4"
                        >
                            <RecipeRow
                                recipe={recipe}
                                owned={owned}
                                onSelect={onSelect}
                            />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
