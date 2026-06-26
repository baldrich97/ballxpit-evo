// Lightweight, dependency-free self-test for the attainability engine.
//
// A full test runner (vitest/jest) isn't installed, so these assertions run in
// the browser console during dev (`npm run dev`) via main.tsx. Replace with a
// proper test suite once a runner is added.

import {
    canCraft,
    directlyCraftable,
    transitivelyAttainable,
    almostCraftable,
    buildPlan,
    planShoppingList,
    planFusionOrder,
    planFeasible,
} from './attainability'

function assert(label: string, cond: boolean, fails: string[]) {
    if (!cond) fails.push(label)
}

export function runEngineSelfTest(): void {
    const fails: string[] = []
    const owned = (...ids: string[]) => new Set(ids)

    // Assassin = Iron + (Ghost OR Dark)
    const assassinRecipe = { requires: ['iron', ['ghost', 'dark']] }
    assert(
        'assassin craftable with iron+ghost',
        canCraft(assassinRecipe, owned('iron', 'ghost')),
        fails,
    )
    assert(
        'assassin NOT craftable with iron only',
        !canCraft(assassinRecipe, owned('iron')),
        fails,
    )

    assert(
        'directlyCraftable includes assassin',
        directlyCraftable(owned('iron', 'ghost')).includes('assassin'),
        fails,
    )

    // Steel = Iron + Stone; transitive closure should pick up both steel & assassin
    const closure = transitivelyAttainable(owned('iron', 'ghost', 'stone'))
    assert(
        'closure reaches steel',
        closure.reachable.has('steel'),
        fails,
    )
    assert(
        'closure reaches assassin',
        closure.reachable.has('assassin'),
        fails,
    )
    assert(
        'newlyAttainable excludes owned base balls',
        !closure.newlyAttainable.includes('iron'),
        fails,
    )

    // almostCraftable: iron alone is one ball away from steel (needs stone)
    const almost = almostCraftable(owned('iron'))
    const steelGap = almost.find(a => a.evolvedId === 'steel')
    assert('steel is one ball away from iron', !!steelGap, fails)
    assert(
        'steel gap is stone',
        !!steelGap && steelGap.missingOptions.includes('stone'),
        fails,
    )

    // Plan for sniper (chain: sniper <- shotgun + assassin)
    const sniperPlan = buildPlan('sniper', owned())
    assert('sniper plan feasible', planFeasible(sniperPlan), fails)
    const order = planFusionOrder(sniperPlan).map(n => n.id)
    assert('sniper fusion order ends with sniper', order[order.length - 1] === 'sniper', fails)
    assert('sniper plan crafts shotgun', order.includes('shotgun'), fails)
    assert('sniper plan crafts assassin', order.includes('assassin'), fails)
    const shopping = planShoppingList(sniperPlan).map(s => s.id)
    assert('sniper shopping needs iron', shopping.includes('iron'), fails)
    assert('sniper shopping needs egg_sac', shopping.includes('egg_sac'), fails)

    // 3-ingredient evolution: Nosferatu
    const nosferatuPlan = buildPlan('nosferatu', owned())
    assert('nosferatu plan feasible', planFeasible(nosferatuPlan), fails)
    const nosfOrder = planFusionOrder(nosferatuPlan).map(n => n.id)
    assert(
        'nosferatu fusion order ends with nosferatu',
        nosfOrder[nosfOrder.length - 1] === 'nosferatu',
        fails,
    )

    if (fails.length) {
        console.error(
            `[ballxpit engine] ${fails.length} self-test failure(s):\n` +
                fails.map(f => `  - ${f}`).join('\n'),
        )
    } else {
        console.info('[ballxpit engine] self-test passed')
    }
}
