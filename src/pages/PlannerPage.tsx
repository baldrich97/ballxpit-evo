import { useMemo, useState } from 'react'
import { BASE_BALLS } from '../data/baseBalls'
import { EVOLVED_BALLS } from '../data/evolvedBalls'
import { getBall, getBallName, type AnyBall } from '../data/registry'
import {
    buildPlan,
    directlyCraftable,
    planFusionOrder,
    planShoppingList,
    planFeasible,
} from '../engine/attainability'
import BallGrid from '../components/BallGrid'
import BallIcon from '../components/BallIcon'
import RecipeRow from '../components/RecipeRow'
import PlanTree from '../components/PlanTree'
import { useBuild } from '../state/BuildContext'

const ALL_TAGGED: AnyBall[] = [
    ...BASE_BALLS.map(b => ({ ...b, tier: 'base' as const })),
    ...EVOLVED_BALLS.map(b => ({ ...b, tier: 'evolved' as const })),
]
const EVOLVED_TAGGED: AnyBall[] = EVOLVED_BALLS.map(b => ({
    ...b,
    tier: 'evolved',
}))

export default function PlannerPage() {
    const {
        inventory,
        targetId,
        toggleInventory,
        setTarget,
        resetRun,
        savedBuilds,
        saveCurrent,
        loadBuild,
        deleteBuild,
    } = useBuild()
    const [buildName, setBuildName] = useState('')

    const craftableNow = useMemo(
        () => new Set(directlyCraftable(inventory)),
        [inventory],
    )

    const target = targetId ? getBall(targetId) : undefined
    const plan = useMemo(
        () => (targetId ? buildPlan(targetId, inventory) : null),
        [targetId, inventory],
    )
    const shopping = plan ? planShoppingList(plan) : []
    const fusionOrder = plan ? planFusionOrder(plan) : []
    const feasible = plan ? planFeasible(plan) : false

    return (
        <div className="mx-auto max-w-6xl space-y-6 p-4">
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Inventory */}
                <div className="space-y-4">
                    <section>
                        <div className="mb-1 flex items-center justify-between">
                            <h3 className="text-lg font-semibold">
                                Run Inventory ({inventory.size})
                            </h3>
                            <button
                                onClick={resetRun}
                                className="rounded-md bg-black/10 px-2.5 py-1 text-sm font-medium hover:bg-black/20"
                            >
                                Reset
                            </button>
                        </div>
                        <p className="mb-3 text-sm opacity-70">
                            Tap balls you currently hold this run. Check marks =
                            in inventory.
                        </p>
                        <div className="max-h-[40vh] overflow-y-auto rounded-lg bg-black/5 p-3">
                            <BallGrid
                                balls={ALL_TAGGED}
                                onSelect={toggleInventory}
                                ownedIds={inventory}
                                attainableIds={craftableNow}
                                dimUnowned
                            />
                        </div>
                        <p className="mt-2 text-xs opacity-70">
                            Green ring = craftable right now from your inventory.
                        </p>
                    </section>

                    <section>
                        <h3 className="mb-2 text-lg font-semibold">
                            Craftable Now ({craftableNow.size})
                        </h3>
                        {craftableNow.size === 0 ? (
                            <p className="text-sm opacity-70">
                                Add a couple of balls to see what you can fuse.
                            </p>
                        ) : (
                            <div className="rounded-lg bg-black/5 p-3">
                                <BallGrid
                                    balls={EVOLVED_TAGGED.filter(b =>
                                        craftableNow.has(b.id),
                                    )}
                                    onSelect={setTarget}
                                />
                            </div>
                        )}
                    </section>

                    <section>
                        <h3 className="mb-2 text-lg font-semibold">
                            Saved Builds
                        </h3>
                        <div className="mb-2 flex gap-2">
                            <input
                                value={buildName}
                                onChange={e => setBuildName(e.target.value)}
                                placeholder="Name this build"
                                className="flex-1 rounded-md border border-black/20 bg-[#c89b8c] px-3 py-1.5 text-sm placeholder:text-black/50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                            <button
                                onClick={() => {
                                    saveCurrent(buildName)
                                    setBuildName('')
                                }}
                                className="rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-700"
                            >
                                Save
                            </button>
                        </div>
                        {savedBuilds.length === 0 ? (
                            <p className="text-sm opacity-70">
                                No saved builds yet.
                            </p>
                        ) : (
                            <ul className="space-y-1">
                                {savedBuilds.map(b => (
                                    <li
                                        key={b.id}
                                        className="flex items-center gap-2 rounded-md bg-black/5 px-3 py-1.5 text-sm"
                                    >
                                        <span className="flex-1 font-medium">
                                            {b.name}
                                        </span>
                                        <span className="opacity-60">
                                            {b.inventory.length} balls
                                        </span>
                                        <button
                                            onClick={() => loadBuild(b.id)}
                                            className="rounded bg-black/10 px-2 py-0.5 hover:bg-black/20"
                                        >
                                            Load
                                        </button>
                                        <button
                                            onClick={() => deleteBuild(b.id)}
                                            className="rounded bg-black/10 px-2 py-0.5 hover:bg-black/20"
                                        >
                                            Delete
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                </div>

                {/* Target plan */}
                <div className="space-y-4">
                    <section>
                        <h3 className="mb-2 text-lg font-semibold">Target</h3>
                        <select
                            value={targetId ?? ''}
                            onChange={e => setTarget(e.target.value || null)}
                            className="w-full rounded-md border border-black/20 bg-[#c89b8c] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        >
                            <option value="">Choose a ball to plan for...</option>
                            {[...EVOLVED_BALLS]
                                .sort((a, b) => a.name.localeCompare(b.name))
                                .map(b => (
                                    <option key={b.id} value={b.id}>
                                        {b.name}
                                    </option>
                                ))}
                        </select>
                    </section>

                    {target && target.tier === 'evolved' && plan && (
                        <>
                            <section className="rounded-lg border border-black/20 bg-[#c89b8c] p-4">
                                <div className="flex items-center gap-3">
                                    <BallIcon
                                        id={target.id}
                                        name={target.name}
                                        description={target.description}
                                        size="lg"
                                        tooltip={false}
                                    />
                                    <div>
                                        <h4 className="text-xl font-bold">
                                            {target.name}
                                        </h4>
                                        <p
                                            className={`text-sm font-semibold ${
                                                feasible
                                                    ? 'text-emerald-800'
                                                    : 'text-red-800'
                                            }`}
                                        >
                                            {feasible
                                                ? shopping.length === 0
                                                    ? 'Ready to fuse with your current inventory!'
                                                    : `Need ${shopping.length} more base ball type(s)`
                                                : 'Cannot be built (data issue)'}
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h4 className="mb-2 font-semibold">
                                    Shopping List
                                </h4>
                                {shopping.length === 0 ? (
                                    <p className="text-sm opacity-70">
                                        You already hold everything you need.
                                    </p>
                                ) : (
                                    <ul className="flex flex-wrap gap-2">
                                        {shopping.map(item => (
                                            <li
                                                key={item.id}
                                                className="flex items-center gap-2 rounded-lg bg-black/5 px-2 py-1"
                                            >
                                                <BallIcon
                                                    id={item.id}
                                                    name={item.name}
                                                    size="sm"
                                                    onClick={() =>
                                                        toggleInventory(item.id)
                                                    }
                                                />
                                                <span className="text-sm font-medium">
                                                    {item.name}
                                                    {item.count > 1 &&
                                                        ` ×${item.count}`}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </section>

                            <section>
                                <h4 className="mb-2 font-semibold">
                                    Fusion Steps ({fusionOrder.length})
                                </h4>
                                <ol className="space-y-2">
                                    {fusionOrder.map((step, i) => (
                                        <li
                                            key={`${step.id}-${i}`}
                                            className="rounded-lg bg-black/5 p-3"
                                        >
                                            <div className="mb-1 text-sm font-semibold opacity-70">
                                                Step {i + 1}: {step.name}
                                            </div>
                                            <div className="flex flex-wrap items-center gap-2">
                                                {step.inputs?.map((inp, j) => (
                                                    <span
                                                        key={`${inp.id}-${j}`}
                                                        className="flex items-center gap-1"
                                                    >
                                                        {j > 0 && (
                                                            <span className="font-bold opacity-70">
                                                                +
                                                            </span>
                                                        )}
                                                        <BallIcon
                                                            id={inp.id}
                                                            name={getBallName(
                                                                inp.id,
                                                            )}
                                                            size="sm"
                                                        />
                                                    </span>
                                                ))}
                                                <span className="mx-1 font-bold opacity-70">
                                                    =
                                                </span>
                                                <BallIcon
                                                    id={step.id}
                                                    name={step.name}
                                                    size="sm"
                                                />
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            </section>

                            <section>
                                <h4 className="mb-2 font-semibold">
                                    Full Tree
                                </h4>
                                <div className="rounded-lg bg-black/5 p-3 text-sm">
                                    <PlanTree node={plan} />
                                </div>
                            </section>

                            {target.recipes.length > 1 && (
                                <section>
                                    <h4 className="mb-2 font-semibold">
                                        All Recipes
                                    </h4>
                                    <div className="space-y-3">
                                        {target.recipes.map((r, i) => (
                                            <div
                                                key={i}
                                                className="rounded-lg border border-black/20 bg-[#c89b8c] p-3"
                                            >
                                                <RecipeRow
                                                    recipe={r}
                                                    owned={inventory}
                                                    onSelect={toggleInventory}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
