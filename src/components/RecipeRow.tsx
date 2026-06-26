import { Fragment } from 'react'
import BallIcon from './BallIcon'
import { getBall } from '../data/registry'
import type { FusionRecipe, FusionRequirement } from '../data/types'

type Size = 'sm' | 'md'

interface Props {
    recipe: FusionRecipe
    size?: Size
    /** When provided, ingredients not in this set are dimmed. */
    owned?: ReadonlySet<string>
    onSelect?: (id: string) => void
}

function Ingredient({
    id,
    size,
    owned,
    onSelect,
}: {
    id: string
    size: Size
    owned?: ReadonlySet<string>
    onSelect?: (id: string) => void
}) {
    const ball = getBall(id)
    return (
        <BallIcon
            id={id}
            name={ball?.name ?? id}
            description={ball?.description}
            size={size === 'sm' ? 'sm' : 'md'}
            dimmed={owned ? !owned.has(id) : false}
            onClick={onSelect ? () => onSelect(id) : undefined}
        />
    )
}

/** Renders a single fusion recipe: A + (B / C) style. */
export default function RecipeRow({ recipe, size = 'md', owned, onSelect }: Props) {
    return (
        <div className="flex flex-wrap items-center justify-center gap-2">
            {recipe.requires.map((req: FusionRequirement, i) => {
                const options = Array.isArray(req) ? req : [req]
                return (
                    <Fragment key={i}>
                        {i > 0 && (
                            <span className="text-2xl font-bold opacity-70">
                                +
                            </span>
                        )}
                        <div className="flex items-center gap-1">
                            {options.map((opt, idx) => (
                                <Fragment key={opt}>
                                    {idx > 0 && (
                                        <span className="text-lg font-semibold opacity-60">
                                            /
                                        </span>
                                    )}
                                    <Ingredient
                                        id={opt}
                                        size={size}
                                        owned={owned}
                                        onSelect={onSelect}
                                    />
                                </Fragment>
                            ))}
                        </div>
                    </Fragment>
                )
            })}
        </div>
    )
}
