import { BASE_BALLS } from './baseBalls'
import { EVOLVED_BALLS } from './evolvedBalls'
import type {
    BaseBallDefinition,
    EvolvedBallDefinition,
} from './types'

export type Tier = 'base' | 'evolved'

export type AnyBall =
    | (BaseBallDefinition & { tier: 'base' })
    | (EvolvedBallDefinition & { tier: 'evolved' })

const baseTagged: AnyBall[] = BASE_BALLS.map(b => ({ ...b, tier: 'base' }))
const evolvedTagged: AnyBall[] = EVOLVED_BALLS.map(b => ({
    ...b,
    tier: 'evolved',
}))

/** Every ball in the game (base + evolved), tagged with its tier. */
export const ALL_BALLS: AnyBall[] = [...baseTagged, ...evolvedTagged]

const BALL_BY_ID: Record<string, AnyBall> = Object.fromEntries(
    ALL_BALLS.map(ball => [ball.id, ball]),
)

export function getBall(id: string): AnyBall | undefined {
    return BALL_BY_ID[id]
}

export function getBallName(id: string): string {
    return BALL_BY_ID[id]?.name ?? id
}

export function isBaseBall(id: string): boolean {
    return BALL_BY_ID[id]?.tier === 'base'
}

export function isEvolvedBall(id: string): boolean {
    return BALL_BY_ID[id]?.tier === 'evolved'
}
