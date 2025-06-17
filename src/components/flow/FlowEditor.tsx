import { useCallback } from 'react'
import ReactFlow, {
  Background,
  Controls,
  Node,
  Edge,
  Connection,
  addEdge,
  useNodesState,
  useEdgesState,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { usePersonaStore } from '../../stores/personaStore'
import AgentNode from './nodes/AgentNode'
import ToolNode from './nodes/ToolNode'
import MemoryNode from './nodes/MemoryNode'

const nodeTypes = {
  agent: AgentNode,
  tool: ToolNode,
  memory: MemoryNode,
}

interface FlowEditorProps {
  personaId: string
}

export default function FlowEditor({ personaId }: FlowEditorProps) {
  const { personas } = usePersonaStore()
  const persona = personas.find(p => p.id === personaId)

  const initialNodes: Node[] = [
    {
      id: 'input',
      type: 'input',
      data: { label: 'User Input' },
      position: { x: 0, y: 0 },
    },
    {
      id: 'agent',
      type: 'agent',
      data: { persona },
      position: { x: 250, y: 0 },
    },
    {
      id: 'memory',
      type: 'memory',
      data: { label: 'Memory Store' },
      position: { x: 500, y: -100 },
    },
    {
      id: 'context',
      type: 'tool',
      data: { label: 'Context Analyzer' },
      position: { x: 500, y: 100 },
    },
    {
      id: 'output',
      type: 'output',
      data: { label: 'Response' },
      position: { x: 750, y: 0 },
    },
  ]

  const initialEdges: Edge[] = [
    { id: 'input-agent', source: 'input', target: 'agent' },
    { id: 'agent-memory', source: 'agent', target: 'memory' },
    { id: 'agent-context', source: 'agent', target: 'context' },
    { id: 'memory-agent', source: 'memory', target: 'agent' },
    { id: 'context-agent', source: 'context', target: 'agent' },
    { id: 'agent-output', source: 'agent', target: 'output' },
  ]

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    (params: Connection) => setEdges(eds => addEdge(params, eds)),
    [setEdges]
  )

  return (
    <div className="h-full w-full bg-[#1A1A1A]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}