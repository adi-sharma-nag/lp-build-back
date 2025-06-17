import { memo } from 'react'
import { Handle, Position } from 'reactflow'

interface MemoryNodeProps {
  data: {
    label: string
  }
}

function MemoryNode({ data }: MemoryNodeProps) {
  return (
    <div className="px-4 py-2 shadow-lg rounded-lg bg-[#2A2A2A] border border-[#3A3A3A]">
      <Handle type="target" position={Position.Left} />
      <div className="font-bold text-sm">{data.label}</div>
      <div className="text-xs text-gray-400">Vector Store: Pinecone</div>
      <Handle type="source" position={Position.Right} />
    </div>
  )
}

export default memo(MemoryNode)