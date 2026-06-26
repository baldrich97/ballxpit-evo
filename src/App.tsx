import { CollectionProvider } from './state/CollectionContext'
import { BuildProvider } from './state/BuildContext'
import { useHashRoute } from './router/useHashRoute'
import NavBar from './components/NavBar'
import EncyclopediaPage from './pages/EncyclopediaPage'
import CollectionPage from './pages/CollectionPage'
import PlannerPage from './pages/PlannerPage'
import GraphPage from './pages/GraphPage'

function CurrentPage() {
    const route = useHashRoute()

    switch (route) {
        case 'collection':
            return <CollectionPage />
        case 'planner':
            return <PlannerPage />
        case 'graph':
            return <GraphPage />
        case 'encyclopedia':
        default:
            return <EncyclopediaPage />
    }
}

export default function App() {
    const route = useHashRoute()

    return (
        <CollectionProvider>
            <BuildProvider>
                <div className="flex h-screen flex-col bg-[#9b6a5f] text-stone-900">
                    <NavBar active={route} />
                    <main className="min-h-0 flex-1 overflow-y-auto">
                        <CurrentPage />
                    </main>
                </div>
            </BuildProvider>
        </CollectionProvider>
    )
}
