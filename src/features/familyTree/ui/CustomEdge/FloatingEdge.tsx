import { getBezierPath, useInternalNode } from "@xyflow/react";

import { getEdgeParams } from "../../../../utils.ts";

function FloatingEdge({
  id,
  source,
  target,
  markerEnd,
  style,
  label,
  animated,
}: any) {
  const sourceNode = useInternalNode(source);
  const targetNode = useInternalNode(target);

  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
    sourceNode as any,
    targetNode as any
  );

  const [edgePath] = getBezierPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: sourcePos,
    targetPosition: targetPos,
    targetX: tx,
    targetY: ty,
  });
  const midX = (sx + tx) / 2;
  const midY = (sy + ty) / 2;

  return (
    <>
      <path
        id={id}
        className={`react-flow__edge-path ${animated ? "animated" : ""}`}
        d={edgePath}
        markerEnd={markerEnd}
        style={style}
      />
      <text
        x={midX}
        y={midY}
        fill="black" // Цвет текста
        fontSize="12" // Размер шрифта
        textAnchor="middle" // Центрируем текст по горизонтали
        dominantBaseline="middle" // Центрируем текст по вертикали
      >
        {label ? "Разведены" : ""}
      </text>{" "}
    </>
  );
}

export default FloatingEdge;
