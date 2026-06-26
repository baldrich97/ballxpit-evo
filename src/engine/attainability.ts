import { EVOLVED_BALLS } from '../data/evolvedBalls'
import {
    getBall,
    getBallName,
    isEvolvedBall,
    type Tier,
} from '../data/registry'
import type { FusionRecipe, FusionRequirement } from '../data/types'

export type OwnedSet = ReadonlySet<string>

// --------------------
// Recipe satisfaction
// --------------------

/** A single requirement is satisfied if the (single) ball is owned, or - for
 *  an OR-group - at least one option is owned. */
export function requirementMet(
    req: FusionRequirement,
    owned: OwnedSet,
): boolean {
    if (Array.isArray(req)) {
        return req.some(id => owned.has(id))
    }
    return owned.has(req)
}

/** A recipe is craftable when *every* requirement is met. */
export function canCraft(recipe: FusionRecipe, owned: OwnedSet): boolean {
    return recipe.requires.every(req => requirementMet(req, owned))
}

/** Does the player have at least one recipe satisfied for this evolved ball? */
export function isCraftable(evolvedId: string, owned: OwnedSet): boolean {
    const ball = getBall(evolvedId)
    if (!ball || ball.tier !== 'evolved') return false
    return ball.recipes.some(recipe => canCraft(recipe, owned))
}

// --------------------
// Direct + transitive attainability
// --------------------

/** Evolved balls craftable right now from exactly what is owned (excludes
 *  things already owned). */
export function directlyCraftable(owned: OwnedSet): string[] {
    return EVOLVED_BALLS.filter(
        ball => !owned.has(ball.id) && isCraftable(ball.id, owned),
    ).map(ball => ball.id)
}

export interface AttainabilityResult {
    /** Everything you could eventually hold (owned + every reachable fusion). */
    reachable: Set<string>
    /** Newly reachable evolved balls (not initially owned). */
    newlyAttainable: string[]
}

/**
 * Transitive closure: repeatedly craft anything possible, treating each crafted
 * ball as now-owned so it can feed further fusions, until nothing new appears.
 */
export function transitivelyAttainable(owned: OwnedSet): AttainabilityResult {
    const reachable = new Set(owned)

    let changed = true
    while (changed) {
        changed = false
        for (const ball of EVOLVED_BALLS) {
            if (reachable.has(ball.id)) continue
            if (ball.recipes.some(recipe => canCraft(recipe, reachable))) {
                reachable.add(ball.id)
                changed = true
            }
        }
    }

    const newlyAttainable = [...reachable].filter(
        id => !owned.has(id) && isEvolvedBall(id),
    )

    return { reachable, newlyAttainable }
}

// --------------------
// "One ball away" analysis
// --------------------

export interface AlmostCraftable {
    evolvedId: string
    /** The single unmet requirement; any one of these ids unlocks the fusion. */
    missingOptions: string[]
}

/**
 * Evolved balls that are not craftable now but would be if the player obtained
 * exactly one more ball (one unmet requirement across some recipe).
 */
export function almostCraftable(owned: OwnedSet): AlmostCraftable[] {
    const result: AlmostCraftable[] = []

    for (const ball of EVOLVED_BALLS) {
        if (owned.has(ball.id) || isCraftable(ball.id, owned)) continue

        let best: string[] | null = null

        for (const recipe of ball.recipes) {
            const unmet = recipe.requires.filter(
                req => !requirementMet(req, owned),
            )
            if (unmet.length !== 1) continue

            const req = unmet[0]
            const options = (Array.isArray(req) ? req : [req]).filter(
                id => !owned.has(id),
            )
            if (best === null || options.length < best.length) {
                best = options
            }
        }

        if (best) {
            result.push({ evolvedId: ball.id, missingOptions: best })
        }
    }

    return result
}

// --------------------
// Build plan (gap analysis toward a target)
// --------------------

export interface PlanNode {
    id: string
    name: string
    tier: Tier
    owned: boolean
    /** True when the ball id doesn't resolve / a cycle made it unreachable. */
    unresolved?: boolean
    /** Chosen recipe inputs (only for evolved balls that must be crafted). */
    inputs?: PlanNode[]
}

interface PlanWithCost {
    node: PlanNode
    cost: number
}

const COST_PER_FUSION = 0.001

function planFor(
    id: string,
    owned: OwnedSet,
    visiting: Set<string>,
): PlanWithCost {
    const ball = getBall(id)

    if (!ball) {
        return {
            node: { id, name: id, tier: 'base', owned: false, unresolved: true },
            cost: Number.POSITIVE_INFINITY,
        }
    }

    if (owned.has(id)) {
        return {
            node: { id, name: ball.name, tier: ball.tier, owned: true },
            cost: 0,
        }
    }

    if (ball.tier === 'base') {
        // Base balls are acquirable during a run: one "shopping" unit.
        return {
            node: { id, name: ball.name, tier: 'base', owned: false },
            cost: 1,
        }
    }

    // Evolved ball: must be crafted from one of its recipes.
    if (visiting.has(id)) {
        return {
            node: {
                id,
                name: ball.name,
                tier: 'evolved',
                owned: false,
                unresolved: true,
            },
            cost: Number.POSITIVE_INFINITY,
        }
    }

    visiting.add(id)

    let bestInputs: PlanNode[] | null = null
    let bestCost = Number.POSITIVE_INFINITY

    for (const recipe of ball.recipes) {
        const inputs: PlanNode[] = []
        let cost = COST_PER_FUSION

        for (const req of recipe.requires) {
            const options = Array.isArray(req) ? req : [req]

            // Pick the cheapest option for an OR-group.
            let chosen: PlanWithCost | null = null
            for (const opt of options) {
                const sub = planFor(opt, owned, visiting)
                if (chosen === null || sub.cost < chosen.cost) chosen = sub
            }

            if (chosen) {
                inputs.push(chosen.node)
                cost += chosen.cost
            }
        }

        if (cost < bestCost) {
            bestCost = cost
            bestInputs = inputs
        }
    }

    visiting.delete(id)

    return {
        node: {
            id,
            name: ball.name,
            tier: 'evolved',
            owned: false,
            inputs: bestInputs ?? [],
        },
        cost: bestCost,
    }
}

/** Build the cheapest plan tree to obtain `targetId` given what is owned. */
export function buildPlan(targetId: string, owned: OwnedSet): PlanNode {
    return planFor(targetId, owned, new Set()).node
}

export interface ShoppingItem {
    id: string
    name: string
    count: number
}

/** Flatten a plan into the not-yet-owned base balls needed (with multiplicity). */
export function planShoppingList(node: PlanNode): ShoppingItem[] {
    const counts = new Map<string, number>()

    const walk = (n: PlanNode) => {
        if (n.owned) return
        if (n.tier === 'base') {
            counts.set(n.id, (counts.get(n.id) ?? 0) + 1)
            return
        }
        n.inputs?.forEach(walk)
    }
    walk(node)

    return [...counts.entries()].map(([id, count]) => ({
        id,
        name: getBallName(id),
        count,
    }))
}

/**
 * Ordered list of fusions to perform (dependencies first), de-duplicated by
 * result id. The target itself is the last entry.
 */
export function planFusionOrder(node: PlanNode): PlanNode[] {
    const order: PlanNode[] = []
    const seen = new Set<string>()

    const walk = (n: PlanNode) => {
        if (n.owned || n.tier !== 'evolved') return
        n.inputs?.forEach(walk)
        if (!seen.has(n.id)) {
            seen.add(n.id)
            order.push(n)
        }
    }
    walk(node)

    return order
}

/** A plan is feasible when no node is unresolved (every leaf is obtainable). */
export function planFeasible(node: PlanNode): boolean {
    if (node.unresolved) return false
    return (node.inputs ?? []).every(planFeasible)
}
