import {
    createContext,
    useContext,
    useMemo,
    type ReactNode,
} from 'react'
import { useLocalStorage } from './useLocalStorage'

interface CollectionContextValue {
    /** Ids of balls the player has permanently unlocked. */
    owned: Set<string>
    has: (id: string) => boolean
    toggle: (id: string) => void
    setOwned: (id: string, owned: boolean) => void
    addMany: (ids: string[]) => void
    clear: () => void
}

const CollectionContext = createContext<CollectionContextValue | null>(null)

const STORAGE_KEY = 'ballxpit:collection'

export function CollectionProvider({ children }: { children: ReactNode }) {
    const [ids, setIds] = useLocalStorage<string[]>(STORAGE_KEY, [])

    const value = useMemo<CollectionContextValue>(() => {
        const owned = new Set(ids)

        return {
            owned,
            has: id => owned.has(id),
            toggle: id =>
                setIds(prev =>
                    prev.includes(id)
                        ? prev.filter(x => x !== id)
                        : [...prev, id],
                ),
            setOwned: (id, isOwned) =>
                setIds(prev => {
                    const has = prev.includes(id)
                    if (isOwned && !has) return [...prev, id]
                    if (!isOwned && has) return prev.filter(x => x !== id)
                    return prev
                }),
            addMany: newIds =>
                setIds(prev => [...new Set([...prev, ...newIds])]),
            clear: () => setIds([]),
        }
    }, [ids, setIds])

    return (
        <CollectionContext.Provider value={value}>
            {children}
        </CollectionContext.Provider>
    )
}

export function useCollection(): CollectionContextValue {
    const ctx = useContext(CollectionContext)
    if (!ctx) {
        throw new Error('useCollection must be used within a CollectionProvider')
    }
    return ctx
}
