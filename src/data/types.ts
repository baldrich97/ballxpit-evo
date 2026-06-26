// --------------------
// Enums / Unions
// --------------------

export type DamageType =
    | 'Base'
    | 'AOE'

export type StatusEffect =
    | 'Bleed'
    | 'Burn'
    | 'Poison'
    | 'Freeze'
    | 'Charm'
    | 'Blind'
    | 'Slow'
    | 'Heal'
    | 'Clone'
    | 'BabyBallSpawn'
    | 'Berserk'
    | 'InstantKill'
    | 'Curse'
    | 'Darkflame'
    | 'Landslide'
    | 'Frostburn'
    | 'Radiation'
    | 'Overgrowth'
    | 'Disease'
    | 'AttackDown'
    | 'Lifesteal'
    | 'LightningRod'
    | 'Infest'
    | 'MosquitoSpawn'
    | 'VampireBatSpawn'

// --------------------
// Fusion recipes
// --------------------

/**
 * One fusion recipe:
 *  - every entry in `requires` must be present
 *  - inner arrays represent OR conditions
 *
 * Example:
 * Iron + (Ghost OR Dark)
 */
export type FusionRequirement = string | string[]

export interface FusionRecipe {
    requires: FusionRequirement[]
}

// --------------------
// Evolved Ball
// --------------------

export interface EvolvedBallDefinition {
    id: string
    name: string
    description: string

    damageTypes: DamageType[]
    statusEffects: StatusEffect[]

    recipes: FusionRecipe[]

    cooldownSeconds?: number
}

// --------------------
// Unlock Conditions
// --------------------

export interface UnlockCondition {
    type: 'default' | 'clear_pit'
    pitName?: string
}

// --------------------
// Proc / Chance model
// --------------------

export interface ProcChance {
    chancePercent: number
    description: string
}

// --------------------
// Main Ball Definition
// --------------------

export interface BaseBallDefinition {
    id: string
    name: string
    description: string

    damageTypes: DamageType[]
    statusEffects: StatusEffect[]

    startingCharacters?: string[]

    unlockCondition: UnlockCondition

    cooldownSeconds?: number

    mechanics?: {
        proc?: ProcChance
        notes?: string
    }
}
