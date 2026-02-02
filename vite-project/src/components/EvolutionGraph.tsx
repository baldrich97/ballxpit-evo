import { useMemo, useCallback } from 'react'
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

function styleNode(node: Node): Node {
    const isAOE = node.data?.damageTypes?.includes('AOE')

    return {
        ...node,
        style: {
            borderRadius: 8,
            padding: 8,
            border: '2px solid #333',
            background: isAOE ? '#1f2937' : '#111827',
            color: '#f9fafb',
            width: NODE_WIDTH,
            height: NODE_HEIGHT,
        },
    }
}


function layoutGraph(nodes: Node[], edges: Edge[]) {
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

        return styleNode({
            ...node,
            position: {
                x: pos.x - NODE_WIDTH / 2,
                y: pos.y - NODE_HEIGHT / 2,
            },
        })
    })
}


// --------------------
// Component
// --------------------

export default function EvolutionGraph() {
    const graph = useMemo(() => buildBallGraph(), [])

    const layoutedNodes = useMemo(
        () => layoutGraph(graph.nodes, graph.edges),
        [graph.nodes, graph.edges]
    )

    const [nodes, , onNodesChange] = useNodesState(layoutedNodes)
    const [edges, , onEdgesChange] = useEdgesState(graph.edges)

    // --------------------
    // Interaction hooks
    // --------------------

    const onNodeClick = useCallback((_: any, node: Node) => {
        console.log('Clicked:', node.id)
    }, [])

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
