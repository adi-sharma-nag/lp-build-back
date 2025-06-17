import { memo } from 'react'
import { Handle, Position } from 'reactflow'
import type { Persona } from '../../../types'

interface AgentNodeProps {
  data: {
    persona?: Persona
  }
}

function AgentNode({ data }: AgentNodeProps) {
  return (
    <div className="px-4 py-2 shadow-lg rounded-lg bg-[#2A2A2A] border border-[#3A3A3A]">
      <Handle type="target" position={Position.Left} />
      <div className="font-bold text-sm mb-2">Agent: {data.persona?.name}</div>
      <div className="text-xs text-gray-400">
        Model: GPT-4
        <br />
        Temperature: 0.7
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  )
}

export default memo(AgentNode)