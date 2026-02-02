import { EVOLVED_BALLS } from '../data/evolvedBalls'
import type { FusionRequirement } from '../data/types'

// --------------------
// Utilities
// --------------------

function recipeUsesBall(
    requires: FusionRequirement[],
    ballId: string
): boolean {
    return requires.some(req =>
        Array.isArray(req)
            ? req.includes(ballId)
            : req === ballId
    )
}

// --------------------
// Reverse lookups
// --------------------

/**
 * All evolved balls that directly use this ball
 */
export function getEvolutionsFromBall(ballId: string) {
    return EVOLVED_BALLS.filter(ball =>
        ball.recipes.some(recipe =>
            recipeUsesBall(recipe.requires, ballId)
        )
    )
}

/**
 * Map of base/evolved ball -> possible results
 */
export function buildEvolutionMap(): Record<string, string[]> {
    const map: Record<string, Set<string>> = {}

    for (const ball of EVOLVED_BALLS) {
        for (const recipe of ball.recipes) {
            for (const req of recipe.requires) {
                const ids = Array.isArray(req) ? req : [req]

                for (const id of ids) {
                    if (!map[id]) map[id] = new Set()
                    map[id].add(ball.id)
                }
            }
        }
    }

    // convert sets to arrays
    return Object.fromEntries(
        Object.entries(map).map(([k, v]) => [k, [...v]])
    )
}
