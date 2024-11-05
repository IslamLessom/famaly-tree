import axios from "axios";
import dagre from "dagre";

const nodeWidth = 300; // Ширина узла
const nodeHeight = 300; // Высота узла
const horizontalSpacing = 300;
const verticalSpacing = 200;

interface FamilyMemberPartial {
  _id: string;
  mother: string | null;
  father: string | null;
}

interface PairPartial {
  spouse1: string;
  spouse2: string;
  isDivorced: boolean;
}

export async function getFamilyNodes() {
  try {
    const familyMembers = (await axios.get("http://localhost:8000/tree")).data;
    const pairs = (await axios.get("http://localhost:8000/pair")).data;

    const nodesRaw: any = [];
    const edges: any = [];
    const pairMap: { [memberId: string]: string[] } = {};
    pairs.forEach((pair: PairPartial) => {
      if (!pairMap[pair.spouse1]) pairMap[pair.spouse1] = [];
      if (!pairMap[pair.spouse2]) pairMap[pair.spouse2] = [];
      pairMap[pair.spouse1].push(pair.spouse2);
      pairMap[pair.spouse2].push(pair.spouse1);
    });

    // Найти корень дерева (familyMember без родителей и с наибольшим количеством spouse)
    const rootCandidates = familyMembers.filter(
      (member: FamilyMemberPartial) => !member.mother && !member.father
    );
    const root = rootCandidates.reduce(
      (prev: FamilyMemberPartial, curr: FamilyMemberPartial) =>
        (pairMap[curr._id]?.length || 0) > (pairMap[prev._id]?.length || 0)
          ? curr
          : prev
    );

    function findChildrenOfNodeById(nodeId: string) {
      return familyMembers.filter(
        (member: FamilyMemberPartial) =>
          member.mother == nodeId || member.father == nodeId
      );
    }

    function findNodeById(nodeId: string) {
      return familyMembers.find(
        (member: FamilyMemberPartial) => member._id == nodeId
      );
    }

    function getDivorcedStatus(
      firstSpouseId: string,
      secondSpouseId: string
    ): boolean {
      return pairs.find(
        (pair: PairPartial) =>
          (pair.spouse1 == firstSpouseId && pair.spouse2 == secondSpouseId) ||
          (pair.spouse2 == firstSpouseId && pair.spouse1 == secondSpouseId)
      ).isDivorced;
    }

    // Рекурсивная функция для построения дерева
    function addFamilyMember(node: FamilyMemberPartial) {
      const spouses = pairMap[node._id] || [];
      if (spouses.length > 1) {
        nodesRaw.push({
          id: node._id,
          data: { member: node },
          type: "defaultCustom",
        });
        spouses.forEach((spouse) => {
          nodesRaw.push({
            id: spouse,
            data: {
              member: findNodeById(spouse),
            },
            type: "defaultCustom",
          });
          const isDivorced = getDivorcedStatus(node._id, spouse);

          edges.push({
            id: `${node._id}-${spouse}`,
            source: node._id,
            target: spouse,
            label: isDivorced,
            animated: isDivorced,
          });
          const children = findChildrenOfNodeById(spouse);
          children.forEach((child: FamilyMemberPartial) => {
            edges.push({
              id: `${spouse}-${child._id}`,
              source: spouse,
              target: child._id,
              animated: isDivorced,
            });
            addFamilyMember(child);
          });
        });
      } else if (spouses.length == 1) {
        nodesRaw.push({
          id: node._id,
          data: { members: [node, findNodeById(spouses[0])] },
          type: "pair",
        });
        const children = findChildrenOfNodeById(node._id);
        children.forEach((child: FamilyMemberPartial) => {
          edges.push({
            id: `${node._id}-${child._id}`,
            source: node._id,
            target: child._id,
            animated: false,
          });
          addFamilyMember(child);
        });
      } else {
        nodesRaw.push({
          id: node._id,
          data: { member: node },
          type: "defaultCustom",
        });
      }
    }

    addFamilyMember(root);

    const nodes = getLayoutedElements(nodesRaw, edges);

    return [nodes, edges];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [[], []];
  }
}

const getLayoutedElements = (
  nodes: Array<{ id: string }>,
  edges: any[],
  customHorizontalSpacing: number = horizontalSpacing,
  customVerticalSpacing: number = verticalSpacing
) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setGraph({
    rankdir: "TB",
    nodesep: customHorizontalSpacing,
    ranksep: customVerticalSpacing,
  });
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const { x, y } = dagreGraph.node(node.id);
    return {
      ...node,
      position: { x: x, y },
    };
  });

  const childIndexMap: { [key: string]: number } = {};

  {
    /*edges.forEach((edge) => {
    const parentNode = layoutedNodes.find((node) => node.id === edge.source);
    const childNode = layoutedNodes.find((node) => node.id === edge.target);

    if (parentNode && childNode) {
      const parentY = parentNode.position.y;

      const currentChildIndex = childIndexMap[edge.source] || 0;

      childNode.position.x = parentNode.position.x;
      childNode.position.y =
        parentNode.position.y + nodeHeight + customVerticalSpacing;

      childIndexMap[edge.source] = currentChildIndex + 1;
    }
  });*/
  }

  return layoutedNodes;
};
