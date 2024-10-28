import React, { useCallback, useEffect, useState } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  NodeChange,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import dagre from "dagre";
import axios from "axios";
import { CustomNode } from "../../shared/CustomNode/CustomNode";
import CustomEdge from "../../shared/CustomEdge/CustomEdge";

const nodeWidth = 500; // Ширина узла
const nodeHeight = 400; // Высота узла

const nodeTypes = {
  custom: CustomNode,
};
const edgeTypes = {
  custom: CustomEdge,
};
// Функция для компоновки узлов с использованием Dagre
const getLayoutedElements = (nodes: any[], edges: any[], direction = "TB") => {
  const isHorizontal = direction === "LR";
  const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  return nodes.map((node) => {
    const { x, y } = dagreGraph.node(node.id);
    return {
      ...node,
      position: { x: x - nodeWidth / 2, y: y - nodeHeight / 2 },
    };
  });
};

export const Flow = () => {
  const [familyMembers, setFamilyMembers] = useState([]);
  const [familyNodes, setFamilyNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);

  const onNodesChange = useCallback(
    (changes: NodeChange<never>[]) =>
      setFamilyNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Получаем данные о членах семьи
        const membersResponse = await axios.get("http://localhost:8000/tree");
        console.log("Family Members:", membersResponse.data); // Проверка данных
        setFamilyMembers(membersResponse.data);

        // Преобразование данных в узлы
        const nodes = membersResponse.data.map(
          (node: { [x: string]: any; _id: any; __v: any }) => {
            const { _id, __v, ...rest } = node;
            return {
              id: _id,
              data: { ...rest },
              type: "custom",
            };
          }
        );

        console.log("Nodes:", nodes); // Проверка преобразованных узлов

        // Получаем данные о супругах (edges)
        const spousesResponse = await axios.get(
          "http://localhost:8000/spouses"
        );
        console.log("Spouses:", spousesResponse.data); // Проверка данных о супругах

        const edgesData = spousesResponse.data.map(
          (spouse: {
            spouse1: string;
            spouse2: string;
            isDivorced: string;
          }) => ({
            id: `e-${spouse.spouse1}-${spouse.spouse2}`, // Уникальный ID для ребра
            source: spouse.spouse1,
            target: spouse.spouse2,
            label: spouse.isDivorced,
            type: "custom",
          })
        );

        console.log("Edges Data:", edgesData); // Проверка преобразованных рёбер

        // Получение расположенных узлов
        const layoutedNodes = getLayoutedElements(nodes, edgesData);
        setFamilyNodes(layoutedNodes);
        setEdges(edgesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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
