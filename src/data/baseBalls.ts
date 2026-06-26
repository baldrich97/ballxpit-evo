import type { BaseBallDefinition } from './types'

export const BASE_BALLS: BaseBallDefinition[] = [
    {
        id: 'bleed',
        name: 'Bleed',
        description:
            'Inflicts 2 stacks of bleed. Bleeding enemies receive 1 damage per stack when hit by a ball (max 8 stacks).',
        damageTypes: ['Base'],
        statusEffects: ['Bleed'],
        startingCharacters: ['The Warrior', 'The False Messiah'],
        unlockCondition: { type: 'default' },
    },

    {
        id: 'brood_mother',
        name: 'Brood Mother',
        description:
            'Has a 25% chance of birthing a baby ball each time it hits an enemy.',
        damageTypes: ['Base'],
        statusEffects: ['BabyBallSpawn'],
        startingCharacters: ['The Cohabitants'],
        unlockCondition: { type: 'default' },
        mechanics: {
            proc: {
                chancePercent: 25,
                description: 'Spawns a baby ball on hit',
            },
        },
    },

    {
        id: 'burn',
        name: 'Burn',
        description:
            'Adds 1 stack of burn on hit for 3 seconds (max 3 stacks). Burn deals 4–8 damage per stack per second.',
        damageTypes: ['Base'],
        statusEffects: ['Burn'],
        startingCharacters: ['The Itchy Finger'],
        unlockCondition: { type: 'default' },
    },

    {
        id: 'cell',
        name: 'Cell',
        description: 'Splits into a clone on hit up to 2 times.',
        damageTypes: ['Base'],
        statusEffects: ['Clone'],
        unlockCondition: {
            type: 'clear_pit',
            pitName: 'The FUNGALxFOREST',
        },
    },

    {
        id: 'charm',
        name: 'Charm',
        description:
            'Each hit has a 4% chance of charming the enemy for 5 seconds. Charmed units walk up the board and attack enemies.',
        damageTypes: ['Base'],
        statusEffects: ['Charm'],
        unlockCondition: {
            type: 'clear_pit',
            pitName: 'The HEAVENLYxGATES',
        },
        mechanics: {
            proc: {
                chancePercent: 4,
                description: 'Charm enemy for 5 seconds',
            },
        },
    },

    {
        id: 'dark',
        name: 'Dark',
        description:
            'Deals 3x damage but destroys itself after hitting an enemy. 3 second cooldown.',
        damageTypes: ['Base'],
        statusEffects: [],
        startingCharacters: ['The Shade'],
        unlockCondition: {
            type: 'clear_pit',
            pitName: 'The BONExYARD',
        },
        cooldownSeconds: 3,
    },

    {
        id: 'earthquake',
        name: 'Earthquake',
        description:
            'Deals 5–13 damage to nearby units in a 3x3 tile square.',
        damageTypes: ['Base', 'AOE'],
        statusEffects: [],
        startingCharacters: ['The Makeshift Sisyphus'],
        unlockCondition: { type: 'default' },
    },

    {
        id: 'egg_sac',
        name: 'Egg Sac',
        description:
            'Explodes into 2–4 baby balls on hit. 3 second cooldown.',
        damageTypes: ['Base'],
        statusEffects: ['BabyBallSpawn'],
        startingCharacters: ['The Flagellant'],
        unlockCondition: { type: 'default' },
        cooldownSeconds: 3,
    },

    {
        id: 'freeze',
        name: 'Freeze',
        description:
            '4% chance to freeze enemies for 5 seconds. Frozen enemies take 25% more damage.',
        damageTypes: ['Base'],
        statusEffects: ['Freeze'],
        startingCharacters: ['The Repentant'],
        unlockCondition: { type: 'default' },
    },

    {
        id: 'ghost',
        name: 'Ghost',
        description: 'Passes through enemies.',
        damageTypes: ['Base'],
        statusEffects: [],
        startingCharacters: ['The Empty Nester'],
        unlockCondition: { type: 'default' },
    },

    {
        id: 'iron',
        name: 'Iron',
        description:
            'Deals double damage but moves 40% slower.',
        damageTypes: ['Base'],
        statusEffects: [],
        startingCharacters: ['The Shieldbearer', 'The Tactician'],
        unlockCondition: { type: 'default' },
    },

    {
        id: 'laser_horizontal',
        name: 'Laser (Horizontal)',
        description:
            'Deals 9–18 damage to all enemies in the same row.',
        damageTypes: ['AOE'],
        statusEffects: [],
        unlockCondition: { type: 'default' },
    },

    {
        id: 'laser_vertical',
        name: 'Laser (Vertical)',
        description:
            'Deals 9–18 damage to all enemies in the same column.',
        damageTypes: ['AOE'],
        statusEffects: [],
        startingCharacters: ['The Cogitator'],
        unlockCondition: { type: 'default' },
    },

    {
        id: 'light',
        name: 'Light',
        description:
            'Blinds enemies on hit for 3 seconds. Blinded units have a hard time detecting you and have a 50% chance of missing when they attack.',
        damageTypes: ['Base'],
        statusEffects: ['Blind'],
        startingCharacters: ['The Physicist'],
        unlockCondition: {
            type: 'clear_pit',
            pitName: 'The LIMINALxDESERT',
        },
    },

    {
        id: 'lightning',
        name: 'Lightning',
        description:
            'Deals 1–20 damage to up to 3 nearby enemies.',
        damageTypes: ['AOE'],
        statusEffects: [],
        startingCharacters: ['The Juggler'],
        unlockCondition: { type: 'default' },
    },

    {
        id: 'stone',
        name: 'Stone',
        description:
            'Initially deals 300% damage. Damage erodes by 40% per hit (minimum 50%).',
        damageTypes: ['Base'],
        statusEffects: [],
        unlockCondition: {
            type: 'clear_pit',
            pitName: 'The SNOWYxSHORES',
        },
    },

    {
        id: 'poison',
        name: 'Poison',
        description:
            'Applies 1 stack of poison (max 5). Each stack deals 1–4 damage per second for 6 seconds.',
        damageTypes: ['Base'],
        statusEffects: ['Poison'],
        startingCharacters: ['The Embedded'],
        unlockCondition: { type: 'default' },
    },

    {
        id: 'vampire',
        name: 'Vampire',
        description:
            'Each hit has a 4.5% chance to heal 1 health.',
        damageTypes: ['Base'],
        statusEffects: ['Heal'],
        startingCharacters: ['The Spendthrift'],
        unlockCondition: { type: 'default' },
    },

    {
        id: 'wind',
        name: 'Wind',
        description:
            'Passes through enemies and slows them by 30% for 5 seconds, but deals 25% less damage.',
        damageTypes: ['Base'],
        statusEffects: ['Slow'],
        startingCharacters: ['The Radical'],
        unlockCondition: { type: 'default' },
    },
]
