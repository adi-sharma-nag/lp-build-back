import { memo } from 'react'
import { Handle, Position } from 'reactflow'

interface ToolNodeProps {
  data: {
    label: string
  }
}

function ToolNode({ data }: ToolNodeProps) {
  return (
    <div className="px-4 py-2 shadow-lg rounded-lg bg-[#2A2A2A] border border-[#3A3A3A]">
      <Handle type="target" position={Position.Left} />
      <div className="font-bold text-sm">{data.label}</div>
      <Handle type="source" position={Position.Right} />
    </div>
  )
}

export default memo(ToolNode)