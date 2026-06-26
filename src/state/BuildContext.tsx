import {
    createContext,
    useContext,
    useMemo,
    type ReactNode,
} from 'react'
import { useLocalStorage } from './useLocalStorage'

export interface SavedBuild {
    id: string
    name: string
    inventory: string[]
    targetId: string | null
}

interface BuildContextValue {
    /** Balls held in the current (in-progress) run. */
    inventory: Set<string>
    targetId: string | null
    inInventory: (id: string) => boolean
    toggleInventory: (id: string) => void
    setInTarget: (id: string, value: boolean) => void
    setTarget: (id: string | null) => void
    resetRun: () => void
    savedBuilds: SavedBuild[]
    saveCurrent: (name: string) => void
    loadBuild: (id: string) => void
    deleteBuild: (id: string) => void
}

const BuildContext = createContext<BuildContextValue | null>(null)

const CURRENT_KEY = 'ballxpit:build:current'
const SAVED_KEY = 'ballxpit:build:saved'

interface CurrentState {
    inventory: string[]
    targetId: string | null
}

const EMPTY: CurrentState = { inventory: [], targetId: null }

export function BuildProvider({ children }: { children: ReactNode }) {
    const [current, setCurrent] = useLocalStorage<CurrentState>(
        CURRENT_KEY,
        EMPTY,
    )
    const [saved, setSaved] = useLocalStorage<SavedBuild[]>(SAVED_KEY, [])

    const value = useMemo<BuildContextValue>(() => {
        const inventory = new Set(current.inventory)

        return {
            inventory,
            targetId: current.targetId,
            inInventory: id => inventory.has(id),
            toggleInventory: id =>
                setCurrent(prev => ({
                    ...prev,
                    inventory: prev.inventory.includes(id)
                        ? prev.inventory.filter(x => x !== id)
                        : [...prev.inventory, id],
                })),
            setInTarget: (id, val) =>
                setCurrent(prev => {
                    const has = prev.inventory.includes(id)
                    if (val && !has)
                        return { ...prev, inventory: [...prev.inventory, id] }
                    if (!val && has)
                        return {
                            ...prev,
                            inventory: prev.inventory.filter(x => x !== id),
                        }
                    return prev
                }),
            setTarget: id => setCurrent(prev => ({ ...prev, targetId: id })),
            resetRun: () => setCurrent(EMPTY),
            savedBuilds: saved,
            saveCurrent: name =>
                setSaved(prev => [
                    ...prev,
                    {
                        id: `${Date.now()}`,
                        name: name.trim() || 'Untitled build',
                        inventory: current.inventory,
                        targetId: current.targetId,
                    },
                ]),
            loadBuild: id => {
                const build = saved.find(b => b.id === id)
                if (build)
                    setCurrent({
                        inventory: build.inventory,
                        targetId: build.targetId,
                    })
            },
            deleteBuild: id => setSaved(prev => prev.filter(b => b.id !== id)),
        }
    }, [current, saved, setCurrent, setSaved])

    return (
        <BuildContext.Provider value={value}>{children}</BuildContext.Provider>
    )
}

export function useBuild(): BuildContextValue {
    const ctx = useContext(BuildContext)
    if (!ctx) throw new Error('useBuild must be used within a BuildProvider')
    return ctx
}
