import BallIcon from './BallIcon'
import RecipeRow from './RecipeRow'
import { BadgeRow } from './badges'
import type { EvolvedBallDefinition, FusionRecipe } from '../data/types'

interface Props {
    evolution: EvolvedBallDefinition
    /** Which recipe to display. Defaults to the first. */
    recipe?: FusionRecipe
    owned?: ReadonlySet<string>
    onSelect?: (id: string) => void
}

export default function EvolutionCard({
    evolution,
    recipe,
    owned,
    onSelect,
}: Props) {
    const shown = recipe ?? evolution.recipes[0]

    return (
        <div className="flex flex-col gap-3 rounded-lg border border-black/20 bg-[#c89b8c] p-4">
            {shown && (
                <RecipeRow recipe={shown} owned={owned} onSelect={onSelect} />
            )}

            <div className="text-center text-xl font-bold opacity-70">=</div>

            <div className="flex flex-col items-center gap-2">
                <BallIcon
                    id={evolution.id}
                    name={evolution.name}
                    description={evolution.description}
                    onClick={onSelect ? () => onSelect(evolution.id) : undefined}
                />
                <strong>{evolution.name}</strong>
                <BadgeRow
                    damageTypes={evolution.damageTypes}
                    statusEffects={evolution.statusEffects}
                />
                <p className="text-center text-sm opacity-80">
                    {evolution.description}
                </p>
            </div>
        </div>
    )
}
