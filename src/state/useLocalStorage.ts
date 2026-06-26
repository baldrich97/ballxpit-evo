import { useCallback, useEffect, useState } from 'react'

/**
 * useState backed by localStorage. Reads once on mount and writes on change.
 * Falls back gracefully if storage is unavailable (e.g. private mode).
 */
export function useLocalStorage<T>(
    key: string,
    initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
    const [value, setValue] = useState<T>(() => {
        try {
            const raw = localStorage.getItem(key)
            return raw === null ? initialValue : (JSON.parse(raw) as T)
        } catch {
            return initialValue
        }
    })

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value))
        } catch {
            /* ignore write failures */
        }
    }, [key, value])

    const set = useCallback(
        (next: T | ((prev: T) => T)) => setValue(next),
        [],
    )

    return [value, set]
}
