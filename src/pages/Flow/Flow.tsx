import { useCallback, useEffect } from "react";
import {
  ReactFlow,
  Controls,
  applyNodeChanges,
  NodeChange,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import { CustomNode } from "../../features/familyTree/ui/CustomNode/CustomNodeComponents/CustomNode";
import FloatingEdge from "../../features/familyTree/ui/CustomEdge/FloatingEdge";
import { getFamilyNodes } from "./FamilyDataMapper";
import { PairNode } from "../../features/familyTree/ui/CustomNode/PairNode/PairNode";
import DownloadButton from "../../widgets/Dowload/Dowload";
import Legends from "../../shared/ui/Legends/Legends";

const nodeTypes = {
  pair: PairNode,
  defaultCustom: CustomNode,
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
    <div style={{ height: "100%", backgroundColor: "#f8fafd" }}>
      <ReactFlow
        nodes={familyNodes}
        edges={edges}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
      >
        <Controls />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <DownloadButton />
          <Legends />
        </div>
      </ReactFlow>
    </div>
  );
};
