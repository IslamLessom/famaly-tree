import {
  BaseEdge,
  Edge,
  EdgeLabelRenderer,
  getStraightPath,
  useReactFlow,
} from "@xyflow/react";

export type EdgeProps<EdgeType extends Edge = Edge> = {
  id: string;
  animated: boolean;
  data: EdgeType["data"];
  style: React.CSSProperties;
  selected: boolean;
  source: string;
  target: string;
  sourceHandleId?: string | null;
  targetHandleId?: string | null;
  interactionWidth: number;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  label?: string | React.ReactNode;
  labelStyle?: React.CSSProperties;
  labelShowBg?: boolean;

  labelBgPadding?: [number, number];
  labelBgBorderRadius?: number;
  markerStart?: string;
  markerEnd?: string;
  pathOptions?: any;
};

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  label, // Accept data prop
}: EdgeProps) {
  // Extract isDivorced from data
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <button
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "all",
            border: "none",
            padding: "8px",
            borderRadius: "10px",
            backgroundColor: "red",
            color: "white",
          }}
          className="nodrag nopan"
        >
          {label}
        </button>
      </EdgeLabelRenderer>
    </>
  );
}
