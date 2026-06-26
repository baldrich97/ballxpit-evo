import { useEffect, useState } from 'react'

export const ROUTES = ['encyclopedia', 'collection', 'planner', 'graph'] as const
export type Route = (typeof ROUTES)[number]

const DEFAULT_ROUTE: Route = 'encyclopedia'

function parseHash(): Route {
    const raw = window.location.hash.replace(/^#\/?/, '').split('?')[0]
    return (ROUTES as readonly string[]).includes(raw)
        ? (raw as Route)
        : DEFAULT_ROUTE
}

export function navigate(route: Route): void {
    window.location.hash = `#/${route}`
}

/** Tiny dependency-free hash router. */
export function useHashRoute(): Route {
    const [route, setRoute] = useState<Route>(parseHash)

    useEffect(() => {
        const onChange = () => setRoute(parseHash())
        window.addEventListener('hashchange', onChange)
        return () => window.removeEventListener('hashchange', onChange)
    }, [])

    return route
}
