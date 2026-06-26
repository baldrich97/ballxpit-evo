import type { EvolvedBallDefinition } from './types'

export const EVOLVED_BALLS: EvolvedBallDefinition[] = [
    {
        id: 'assassin',
        name: 'Assassin',
        description:
            'Passes through the front of enemies, but not the back. Backstabs deal 30% bonus damage.',
        damageTypes: ['Base'],
        statusEffects: [],
        recipes: [
            { requires: ['iron', ['ghost', 'dark']] },
        ],
    },

    {
        id: 'banished_flame',
        name: 'Banished Flame',
        description:
            'Add 1 stack of darkflame on hit for 2 seconds (max 6 stacks). Darkflame deals 1-30 damage per stack per second. When the darkflame goes out, it deals 1-100 to the enemy.',
        damageTypes: ['Base'],
        statusEffects: ['Darkflame'],
        recipes: [
            { requires: ['dark', 'burn'] },
        ],
    },

    {
        id: 'berserk',
        name: 'Berserk',
        description:
            'Each hit has a 30% chance of causing enemies to go berserk for 6 seconds. Berserk enemies deal 15-24 damage to adjacent enemies every second',
        damageTypes: ['Base'],
        statusEffects: ['Berserk'],
        recipes: [
            { requires: ['charm', ['bleed', 'burn']] },
        ],
    },

    {
        id: 'black_hole',
        name: 'Black Hole',
        description:
            'Instantly kills the first non-boss enemy that it hits, but destroys itself afterwards. Has a 7 second cooldown before it can be shot again',
        damageTypes: ['Base'],
        statusEffects: ['InstantKill'],
        recipes: [
            { requires: ['dark', 'sun'] },
        ],
        cooldownSeconds: 7,
    },

    {
        id: 'blizzard',
        name: 'Blizzard',
        description:
            'Freezes all enemies within a 2 tile radius for 0.8 seconds, dealing 1-50 damage',
        damageTypes: ['Base', 'AOE'],
        statusEffects: ['Freeze'],
        recipes: [
            { requires: ['freeze', ['wind', 'lightning']] },
        ],
    },

    {
        id: 'bomb',
        name: 'Bomb',
        description:
            'Explodes when hitting an enemy, dealing 150-300 damage to nearby enemies. Has a 3 second cooldown before it can be shot again',
        damageTypes: ['AOE'],
        statusEffects: [],
        recipes: [
            { requires: ['burn', 'iron'] },
        ],
        cooldownSeconds: 3,
    },

    {
        id: 'brimstone',
        name: 'Brimstone',
        description:
            'Applies 1 stack of burn and poison every second to all enemies within a 2 tile radius (max 4 stacks). Burn deals 1-4 damage per stack per second and poison deals 2-3 damage per stack per second.',
        damageTypes: ['Base'],
        statusEffects: ['Burn', 'Poison'],
        recipes: [
            { requires: [['stone', 'poison'], 'burn'] },
        ],
    },

    {
        id: 'catapult',
        name: 'Catapult',
        description:
            'Launches 3-5 stone baby balls every 1.5 seconds, which are destroyed after hitting anything.',
        damageTypes: ['Base'],
        statusEffects: ['BabyBallSpawn'],
        recipes: [
            { requires: ['stone', 'egg_sac'] },
        ],
    },

    {
        id: 'fireworks',
        name: 'Fireworks',
        description:
            'Explodes into 3-6 fireworks. Fireworks target random enemies, dealing 20-30 damage and applying 1 stack of burn. Burnt units are dealt 7-11 damage per stack per second.',
        damageTypes: ['Base'],
        statusEffects: ['BabyBallSpawn', 'Burn'],
        recipes: [
            { requires: ['burn', 'egg_sac'] },
        ],
    },

    {
        id: 'flash',
        name: 'Flash',
        description:
            'Damage all enemies on screen for 1-3 damage after hitting an enemy and blind them for 2 seconds',
        damageTypes: ['Base', 'AOE'],
        statusEffects: ['Blind'],
        recipes: [
            { requires: ['lightning', 'light'] },
        ],
    },

    {
        id: 'flicker',
        name: 'Flicker',
        description:
            'Deals 1-7 damage to every enemy on screen every 1.4 seconds',
        damageTypes: ['Base', 'AOE'],
        statusEffects: [],
        recipes: [
            { requires: ['light', 'dark'] },
        ],
    },

    {
        id: 'freeze_ray',
        name: 'Freeze Ray',
        description:
            'Emits a freeze ray when hitting an enemy, dealing 20-50 to all enemies in its path, with a 10% chance of freezing them for 10.0 seconds',
        damageTypes: ['Base', 'AOE'],
        statusEffects: ['Freeze'],
        recipes: [
            { requires: ['freeze', ['laser_horizontal', 'laser_vertical']] },
        ],
    },

    {
        id: 'frozen_flame',
        name: 'Frozen Flame',
        description:
            'Add 1 stack of frostburn on hit for 20 seconds (max 4 stacks). Frostburnt units are dealt 8-12 damage per stack per second and receive 25% more damage from other sources',
        damageTypes: ['Base'],
        statusEffects: ['Frostburn'],
        recipes: [
            { requires: ['burn', 'freeze'] },
        ],
    },

    {
        id: 'glacier',
        name: 'Glacier',
        description:
            'Releases glacial spikes over time that deal 15-30 to enemies that touch them and freeze them for 2.0 seconds. This ball and its glacial spikes also deal 6-12 damage to nearby units',
        damageTypes: ['Base'],
        statusEffects: ['Freeze'],
        recipes: [
            { requires: ['freeze', 'earthquake'] },
        ],
    },

    {
        id: 'hemorrhage',
        name: 'Hemorrhage',
        description:
            'Inflicts 3 stacks of bleed. When hitting an enemy with 12 stacks of bleed or more, consumes all stacks of bleed to deal 20% of their current health',
        damageTypes: ['Base'],
        statusEffects: ['Bleed'],
        recipes: [
            { requires: ['bleed', 'iron'] },
        ],
    },

    {
        id: 'holy_laser',
        name: 'Holy Laser',
        description:
            'Deals 24-36 damage to all enemies in the same row and column',
        damageTypes: ['AOE'],
        statusEffects: [],
        recipes: [
            { requires: ['laser_horizontal', 'laser_vertical'] },
        ],
    },

    {
        id: 'incubus',
        name: 'Incubus',
        description:
            'Each hit has a 4% chance of charming the enemy for 9 seconds. Charmed enemies curse nearby enemies. Cursed enemies are dealt 100-200 after being hit 5 times',
        damageTypes: ['Base'],
        statusEffects: ['Charm', 'Curse'],
        recipes: [
            { requires: ['charm', 'dark'] },
        ],
    },

    {
        id: 'inferno',
        name: 'Inferno',
        description:
            'Applies 1 stack of burn every second to all enemies within a 2 tile radius. Burn lasts for 6 seconds, dealing 3-7 damage per stack per seconds',
        damageTypes: ['AOE'],
        statusEffects: ['Burn'],
        recipes: [
            { requires: ['burn', 'wind'] },
        ],
    },

    {
        id: 'landslide',
        name: 'Landslide',
        description:
            'Creates a landslide and destroys self upon hitting an enemy. The landslide lasts for 5 seconds and deals 20-30 damage per second to enemies within a 2 tile radius',
        damageTypes: ['Base', 'AOE'],
        statusEffects: ['Landslide'],
        recipes: [
            { requires: ['stone', 'earthquake'] },
        ],
    },

    {
        id: 'laser_beam',
        name: 'Laser Beam',
        description:
            'Emit a laser beam on hit that deals 30-42 damage and blinds enemies for 8 seconds',
        damageTypes: ['Base', 'AOE'],
        statusEffects: ['Blind'],
        recipes: [
            { requires: ['light', ['laser_horizontal', 'laser_vertical']] },
        ],
    },

    {
        id: 'laser_cutter',
        name: 'Laser Cutter',
        description:
            'Constantly emits a laser in front of it, which deals 100-150 damage per second.',
        damageTypes: ['Base', 'AOE'],
        statusEffects: [],
        recipes: [
            { requires: [['laser_horizontal', 'laser_vertical'], 'steel'] },
        ],
    },

    {
        id: 'leech',
        name: 'Leech',
        description:
            'Attaches up to 1 leech onto enemies it hits, which add 2 stacks of bleed per seconds (max 24 stacks)',
        damageTypes: ['Base'],
        statusEffects: ['Bleed'],
        recipes: [
            { requires: ['brood_mother', 'bleed'] },
        ],
    },

    {
        id: 'lightning_rod',
        name: 'Lightning Rod',
        description:
            'Plants a lightning rod into enemies it hits. These enemies are struck by lightning every 3.0 seconds, dealing 1-30 damage to up to 8 nearby enemies',
        damageTypes: ['Base', 'AOE'],
        statusEffects: ['LightningRod'],
        recipes: [
            { requires: ['lightning', 'iron'] },
        ],
    },

    {
        id: 'lovestruck',
        name: 'Lovestruck',
        description:
            'Inflicts lovestruck on hit enemies for 20 seconds. Lovestruck units have a 50% chance of healing you for 5 health when they attack',
        damageTypes: ['Base'],
        statusEffects: ['Lifesteal'],
        recipes: [
            { requires: ['charm', ['light', 'lightning']] },
        ],
    },

    {
        id: 'maggot',
        name: 'Maggot',
        description:
            'Infest enemies on hit with maggots. When they dies, they explode into 1-2 baby balls',
        damageTypes: ['Base'],
        statusEffects: ['Infest', 'BabyBallSpawn'],
        recipes: [
            { requires: ['brood_mother', 'cell'] },
        ],
    },

    {
        id: 'magma',
        name: 'Magma',
        description:
            'Emits lava blobs over time. Enemies who walk into lava blobs are dealt 15-30 damage and gain 1 stack of burn (max 3 stacks). Burn lasts for 3 seconds, dealing 3-8 damage per stack per second. This ball and its lava blobs also deal 6-12 damage to nearby units',
        damageTypes: ['Base', 'AOE'],
        statusEffects: ['Burn'],
        recipes: [
            { requires: ['burn', 'earthquake'] },
        ],
    },

    {
        id: 'mosquito_king',
        name: 'Mosquito King',
        description:
            'Spawns a mosquito each time it hits an enemy. Mosquitos attack a random enemy, dealing 80-120 damage each. If a mosquito kills an enemy, they steal 1 health',
        damageTypes: ['Base'],
        statusEffects: ['MosquitoSpawn', 'Lifesteal'],
        recipes: [
            { requires: ['vampire', 'brood_mother'] },
        ],
    },

    {
        id: 'mosquito_swarm',
        name: 'Mosquito Swarm',
        description:
            'Explodes into 3-6 mosquitos. Mosquitos attack random enemies, dealing 80-120 damage each. If a mosquito kills an enemy, they steal 1 health',
        damageTypes: ['Base'],
        statusEffects: ['MosquitoSpawn', 'Lifesteal'],
        recipes: [
            { requires: ['vampire', 'egg_sac'] },
        ],
    },

    {
        id: 'noxious',
        name: 'Noxious',
        description:
            'Passes through enemies and applies 3 stacks of poison to nearby enemies within a 2 tile radius. Poison lasts for 4 seconds and each stack deals 1-3 damage per second',
        damageTypes: ['Base'],
        statusEffects: ['Poison'],
        recipes: [
            { requires: ['wind', ['poison', 'dark']] },
        ],
    },

    {
        id: 'nuclear_bomb',
        name: 'Nuclear Bomb',
        description:
            'Explodes when hitting an enemy, dealing 300-500 damage to nearby enemies and applying 1 stack of radiation to everyone present indefinitely (max 5 stacks). Each stack of radiation increases damage received by 10%. Has a 3 second cooldown',
        damageTypes: ['AOE'],
        statusEffects: ['Radiation'],
        recipes: [
            { requires: ['bomb', 'poison'] },
        ],
        cooldownSeconds: 3,
    },

    {
        id: 'overgrowth',
        name: 'Overgrowth',
        description:
            'Applies 1 stack of overgrowth. Upon reaching 3, consume all stacks and deal 150-200 damage to all enemies in a 3x3 tile square',
        damageTypes: ['Base', 'AOE'],
        statusEffects: ['Overgrowth'],
        recipes: [
            { requires: ['earthquake', 'cell'] },
        ],
    },

    {
        id: 'phantom',
        name: 'Phantom',
        description:
            'Curse enemies on hit. Cursed enemies are dealt 100-200 damage after being hit 5 times',
        damageTypes: ['Base'],
        statusEffects: ['Curse'],
        recipes: [
            { requires: ['dark', 'ghost'] },
        ],
    },

    {
        id: 'radiation_beam',
        name: 'Radiation Beam',
        description:
            'Emit a radiation beam on hit that deals 24-48 damage and applies 1 stack of radiation (max 5 stacks). Radiation lasts for 15 seconds and cause enemies to receive 10% more damage from all sources per stack',
        damageTypes: ['Base', 'AOE'],
        statusEffects: ['Radiation'],
        recipes: [
            { requires: [['laser_horizontal', 'laser_vertical'], ['poison', 'cell']] },
        ],
    },

    {
        id: 'sacrifice',
        name: 'Sacrifice',
        description:
            'Inflicts 4 stacks of bleed (max 15 stacks) and applies curse to hit enemies. Cursed enemies are dealt 50-100 after being hit 5 times',
        damageTypes: ['Base'],
        statusEffects: ['Bleed', 'Curse'],
        recipes: [
            { requires: ['bleed', 'dark'] },
        ],
    },

    {
        id: 'sandstorm',
        name: 'Sandstorm',
        description:
            'Goes through enemies and is surrounded by a raging storm dealing 10-20 damage per second and blinding nearby enemies for 3 seconds',
        damageTypes: ['Base', 'AOE'],
        statusEffects: ['Blind'],
        recipes: [
            { requires: ['earthquake', 'wind'] },
        ],
    },

    {
        id: 'satan',
        name: 'Satan',
        description:
            'While active, add 1 stack of burn to all active enemies per second (max 5 stacks), dealing 10-20 damage per stack per second and make them go berserk, dealing 15-24 damage to adjacent enemies every second',
        damageTypes: ['Base'],
        statusEffects: ['Burn', 'Berserk'],
        recipes: [
            { requires: ['incubus', 'succubus'] },
        ],
    },

    {
        id: 'shotgun',
        name: 'Shotgun',
        description:
            'Shoots 3-7 iron baby balls after hitting a wall. Iron baby balls move at 200% speed but are destroyed upon hitting anything',
        damageTypes: ['Base'],
        statusEffects: ['BabyBallSpawn'],
        recipes: [
            { requires: ['iron', 'egg_sac'] },
        ],
    },

    {
        id: 'soul_sucker',
        name: 'Soul Sucker',
        description:
            'Passes through enemies and saps them, with a 30% chance of stealing 1 health and reducing their attack damage by 20%. Lifesteal chance only applies once per enemy',
        damageTypes: ['Base'],
        statusEffects: ['Lifesteal', 'AttackDown'],
        recipes: [
            { requires: ['vampire', 'ghost'] },
        ],
    },

    {
        id: 'spider_queen',
        name: 'Spider Queen',
        description:
            'Has a 25% chance of birthing an Egg Sac each time it hits an enemy',
        damageTypes: ['Base'],
        statusEffects: ['BabyBallSpawn'],
        recipes: [
            { requires: ['brood_mother', 'egg_sac'] },
        ],
    },

    {
        id: 'steel',
        name: 'Steel',
        description:
            'Initially deals double damage but moves 50% slower. Damage increases by 10% each time it hits an enemy (max 300%).',
        damageTypes: ['Base'],
        statusEffects: [],
        recipes: [
            { requires: ['iron', 'stone'] },
        ],
    },

    {
        id: 'storm',
        name: 'Storm',
        description:
            'Emits lightning to strike nearby enemies every second, dealing 1-40 damage',
        damageTypes: ['AOE'],
        statusEffects: [],
        recipes: [
            { requires: ['lightning', 'wind'] },
        ],
    },

    {
        id: 'succubus',
        name: 'Succubus',
        description:
            'Each hit has a 4% chance of charming the enemy for 9 seconds. Heals 1 when hitting a charmed enemy',
        damageTypes: ['Base'],
        statusEffects: ['Charm', 'Heal'],
        recipes: [
            { requires: ['charm', 'vampire'] },
        ],
    },

    {
        id: 'sun',
        name: 'Sun',
        description:
            'Blind all enemies in view and add 1 stack of burn every second (max 5 stacks). Burn lasts for 6 seconds and deals 6-12 damage per stack per second',
        damageTypes: ['Base'],
        statusEffects: ['Blind', 'Burn'],
        recipes: [
            { requires: ['burn', 'light'] },
        ],
    },

    {
        id: 'swamp',
        name: 'Swamp',
        description:
            'Leaves behind tar blobs over time. Enemies who walk into tar blobs are dealt 15-30, are slowed by 50% for 7 seconds and gain 1 stack of poison (max 8 stacks). Each stack of poison deals 1-3 damage per second. This ball and its tar blobs also deal 6-12 damage to nearby units',
        damageTypes: ['Base', 'AOE'],
        statusEffects: ['Slow', 'Poison'],
        recipes: [
            { requires: ['poison', 'earthquake'] },
        ],
    },

    {
        id: 'vampire_lord',
        name: 'Vampire Lord',
        description:
            'Each hit inflicts 3 stacks of bleed. Heals 1 health and consumes all stacks when hitting an enemy with at least 10 stacks of bleed',
        damageTypes: ['Base'],
        statusEffects: ['Bleed', 'Heal'],
        recipes: [
            { requires: ['vampire', ['bleed', 'dark']] },
        ],
    },

    {
        id: 'virus',
        name: 'Virus',
        description:
            'Applies 1 stack of disease to units it hits (max 8 stacks). Disease lasts for 6 seconds. Each stack of disease deals 3-6 damage per second and diseased units have a 15% chance of passing a stack to undiseased nearby enemies each second',
        damageTypes: ['Base'],
        statusEffects: ['Disease'],
        recipes: [
            { requires: ['poison', ['ghost', 'cell']] },
        ],
    },

    {
        id: 'voluptuous_egg_sac',
        name: 'Voluptuous Egg Sac',
        description:
            'Explodes into 2-3 egg sacs on hitting an enemy. Has a 3 second cooldown before it can be shot again',
        damageTypes: ['Base'],
        statusEffects: ['BabyBallSpawn'],
        recipes: [
            { requires: ['egg_sac', 'cell'] },
        ],
        cooldownSeconds: 3,
    },

    {
        id: 'wraith',
        name: 'Wraith',
        description:
            'Freezes any enemy it passes through for 0.8 seconds',
        damageTypes: ['Base'],
        statusEffects: ['Freeze'],
        recipes: [
            { requires: ['freeze', 'ghost'] },
        ],
    },
]
