import { useCallback, useEffect } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  NodeChange,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import { CustomNode } from "../../shared/CustomNode/CustomNode";
import FloatingEdge from "../../shared/CustomEdge/FloatingEdge";
import { getFamilyNodes } from "./FamilyDataMapper";
import { PairNode } from "../../shared/CustomNode/PairNode";

const nodeTypes = {
  pair: PairNode,
  default: CustomNode,
};
const edgeTypes = {
  floating: FloatingEdge,
};

export const Flow = () => {
  const [familyNodes, setFamilyNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);

  const onNodesChange = useCallback(
    (changes: NodeChange<never>[]) =>
      setFamilyNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  async function getData() {
    const [nodes, edges] = await getFamilyNodes();
    setFamilyNodes(nodes);
    setEdges(edges);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div style={{ height: "100%" }}>
      <ReactFlow
        nodes={familyNodes}
        edges={edges}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};
