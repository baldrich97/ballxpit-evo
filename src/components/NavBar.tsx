import { navigate, type Route } from '../router/useHashRoute'

const ITEMS: { route: Route; label: string }[] = [
    { route: 'encyclopedia', label: 'Encyclopedia' },
    { route: 'collection', label: 'Collection' },
    { route: 'planner', label: 'Planner' },
    { route: 'graph', label: 'Graph' },
]

export default function NavBar({ active }: { active: Route }) {
    return (
        <header className="sticky top-0 z-30 border-b border-black/30 bg-[#7d5249] text-[#f7ece7]">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
                <span className="text-lg font-bold tracking-tight">
                    BALL x PIT
                    <span className="ml-1 font-normal opacity-70">Companion</span>
                </span>
                <nav className="flex flex-wrap gap-1">
                    {ITEMS.map(item => (
                        <button
                            key={item.route}
                            onClick={() => navigate(item.route)}
                            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                                active === item.route
                                    ? 'bg-[#f7ece7] text-[#7d5249]'
                                    : 'hover:bg-white/10'
                            }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>
            </div>
        </header>
    )
}
