import type { Node, Edge } from 'reactflow'
import { BASE_BALLS } from '../data/baseBalls'
import { EVOLVED_BALLS } from '../data/evolvedBalls'
import type { FusionRecipe } from '../data/types'

// --------------------
// Helpers
// --------------------

const nodeId = (id: string) => id

const edgeId = (from: string, to: string) => `${from}->${to}`

// --------------------
// Nodes
// --------------------

export function buildBallNodes(): Node[] {
    const baseNodes: Node[] = BASE_BALLS.map(ball => ({
        id: nodeId(ball.id),
        type: 'default',
        position: { x: 0, y: 0 }, // layout engine handles later
        data: {
            label: ball.name,
            kind: 'base',
            name: ball.name,
            description: ball.description,
            damageTypes: ball.damageTypes,
            statusEffects: ball.statusEffects,
        },
    }))

    const evolvedNodes: Node[] = EVOLVED_BALLS.map(ball => ({
        id: nodeId(ball.id),
        type: 'default',
        position: { x: 0, y: 0 },
        data: {
            label: ball.name,
            kind: 'evolved',
            name: ball.name,
            description: ball.description,
            damageTypes: ball.damageTypes,
            statusEffects: ball.statusEffects,
        },
    }))

    return [...baseNodes, ...evolvedNodes]
}

// --------------------
// Edges (fusion inputs)
// --------------------

function edgesFromRecipe(
    recipe: FusionRecipe,
    resultId: string
): Edge[] {
    const edges: Edge[] = []

    for (const req of recipe.requires) {
        // OR condition → multiple edges
        if (Array.isArray(req)) {
            for (const option of req) {
                edges.push({
                    id: edgeId(option, resultId),
                    source: option,
                    target: resultId,
                    type: 'smoothstep',
                    data: { orGroup: true },
                })
            }
        } else {
            edges.push({
                id: edgeId(req, resultId),
                source: req,
                target: resultId,
                type: 'smoothstep',
            })
        }
    }

    return edges
}

export function buildFusionEdges(): Edge[] {
    const edges: Edge[] = []

    for (const ball of EVOLVED_BALLS) {
        for (const recipe of ball.recipes) {
            edges.push(...edgesFromRecipe(recipe, ball.id))
        }
    }

    return edges
}

// --------------------
// Full graph
// --------------------

export function buildBallGraph() {
    return {
        nodes: buildBallNodes(),
        edges: buildFusionEdges(),
    }
}
