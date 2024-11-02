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
import FloatingEdge from "../../shared/CustomEdge/FloatingEdge";

const nodeWidth = 650; // Ширина узла
const nodeHeight = 400; // Высота узла
const horizontalSpacing = 50; // Горизонтальный отступ между узлами
const verticalSpacing = 100; // Вертикальный отступ между узлами

const nodeTypes = {
  custom: CustomNode,
};
const edgeTypes = {
  floating: FloatingEdge,
};

// Функция для компоновки узлов с использованием Dagre
const getLayoutedElements = (
  nodes: Array<{ id: string }>,
  edges: any[],
  direction: "TB" | "LR" = "TB"
) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setGraph({ rankdir: direction });
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  // Устанавливаем размеры узлов
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  // Добавляем рёбра
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  // Выполняем компоновку
  dagre.layout(dagreGraph);

  // Обновляем позиции узлов
  const layoutedNodes = nodes.map((node) => {
    const { x, y } = dagreGraph.node(node.id);
    return {
      ...node,
      position: { x: x - nodeWidth / 2, y }, // Центрируем по X
    };
  });

  // Корректируем позиции дочерних узлов
  const childIndexMap: { [key: string]: number } = {}; // Для отслеживания индекса дочернего узла

  edges.forEach((edge) => {
    const parentNode = layoutedNodes.find((node) => node.id === edge.source);
    const childNode = layoutedNodes.find((node) => node.id === edge.target);

    if (parentNode && childNode) {
      const parentY = parentNode.position.y;

      // Получаем количество дочерних узлов
      const count = edges.filter((e) => e.source === edge.source).length;
      const currentChildIndex = childIndexMap[edge.source] || 0;

      if (count === 1) {
        // Если только один дочерний узел, размещаем его рядом
        childNode.position.x = parentNode.position.x + 260 + horizontalSpacing; // Сдвигаем вправо с отступом
        childNode.position.y = parentY; // На одном уровне
      } else {
        // Если несколько дочерних узлов, размещаем их ниже с отступом
        childNode.position.x =
          parentNode.position.x / 2 +
          currentChildIndex * (nodeWidth + horizontalSpacing); // Сдвигаем вправо с отступом
        childNode.position.y = parentY + nodeHeight + verticalSpacing; // Сдвигаем вниз

        // Увеличиваем индекс для следующего дочернего узла
        childIndexMap[edge.source] = currentChildIndex + 1;
      }
    }
  });

  return layoutedNodes;
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
        const spousesResponse = await axios.get("http://localhost:8000/pair");
        console.log("Spouses:", spousesResponse.data); // Проверка данных о супругах

        const edgesData = spousesResponse.data.map(
          (spouse: {
            spouse1: string;
            spouse2: string;
            isDivorced: boolean;
          }) => ({
            id: `e-${spouse.spouse1}-${spouse.spouse2}`, // Уникальный ID для ребра
            source: spouse.spouse1,
            target: spouse.spouse2,
            label: spouse.isDivorced,
            type: "floating",
            animated: spouse.isDivorced,
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
