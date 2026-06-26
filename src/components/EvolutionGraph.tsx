import { useMemo, useCallback, useEffect } from 'react'
import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    type Node,
    type Edge,
    useNodesState,
    useEdgesState,
} from 'reactflow'
import 'reactflow/dist/style.css'

import dagre from 'dagre'

import { buildBallGraph } from '../graph/buildGraph'

// --------------------
// Layout config
// --------------------

const dagreGraph = new dagre.graphlib.Graph()
dagreGraph.setDefaultEdgeLabel(() => ({}))

const NODE_WIDTH = 220
const NODE_HEIGHT = 80

function styleNode(node: Node, owned?: ReadonlySet<string>): Node {
    const isAOE = node.data?.damageTypes?.includes('AOE')
    const isOwned = owned?.has(node.id) ?? false

    return {
        ...node,
        style: {
            borderRadius: 8,
            padding: 8,
            border: isOwned ? '2px solid #34d399' : '2px solid #333',
            background: isOwned ? '#064e3b' : isAOE ? '#1f2937' : '#111827',
            color: '#f9fafb',
            width: NODE_WIDTH,
            height: NODE_HEIGHT,
        },
    }
}


function layoutGraph(nodes: Node[], edges: Edge[], owned?: ReadonlySet<string>) {
    dagreGraph.setGraph({
        rankdir: 'LR',
        nodesep: 60,
        ranksep: 120,
    })

    nodes.forEach(node => {
        dagreGraph.setNode(node.id, {
            width: NODE_WIDTH,
            height: NODE_HEIGHT,
        })
    })

    edges.forEach(edge => {
        dagreGraph.setEdge(edge.source, edge.target)
    })

    dagre.layout(dagreGraph)

    return nodes.map(node => {
        const pos = dagreGraph.node(node.id)

        return styleNode(
            {
                ...node,
                position: {
                    x: pos.x - NODE_WIDTH / 2,
                    y: pos.y - NODE_HEIGHT / 2,
                },
            },
            owned,
        )
    })
}


// --------------------
// Component
// --------------------

interface Props {
    ownedIds?: ReadonlySet<string>
    onSelect?: (id: string) => void
}

export default function EvolutionGraph({ ownedIds, onSelect }: Props) {
    const graph = useMemo(() => buildBallGraph(), [])

    const layoutedNodes = useMemo(
        () => layoutGraph(graph.nodes, graph.edges, ownedIds),
        [graph.nodes, graph.edges, ownedIds]
    )

    const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes)
    const [edges, , onEdgesChange] = useEdgesState(graph.edges)

    useEffect(() => {
        setNodes(layoutedNodes)
    }, [layoutedNodes, setNodes])

    // --------------------
    // Interaction hooks
    // --------------------

    const onNodeClick = useCallback(
        (_: unknown, node: Node) => onSelect?.(node.id),
        [onSelect]
    )

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            fitView
            nodesDraggable={false}
            nodesConnectable={false}
            panOnScroll
        >
            <Background gap={24} />
            <Controls />
            <MiniMap zoomable pannable />
        </ReactFlow>
    )
}
