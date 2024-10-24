const position = { x: 0, y: 0 };

export const initialNodes = [
  {
    id: "3a",
    data: {
      label: "Мария",
      age: "1979г - 2020г",
      married_status: "в браке",
      images:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThXkfHk_xOwxKDy5gS_JvraVX-jP8KE3uplVzrChIVjC4vO-XDSfjBwY4ZmVSJXGc3FPA&usqp=CAU",
      spouse: {
        label: "Игорь",
        married_status: "в браке",
        age: "1979г - 2020г",
        images:
          "https://dazezo.com/wp-content/uploads/2023/11/Foto-muzhika-v-ochkah-na-avu_01.jpg",
      },
      divorced: [
        {
          id: "2di",
          label: "Сергей",
          age: "1979г - 2020г",
          married_status: "разведены",
          images:
            "https://dazezo.com/wp-content/uploads/2023/11/Foto-muzhika-v-ochkah-na-avu_01.jpg",
        },
      ],
    },
    position,
    type: "custom",
  },
];

export const initialEdges = [
  { id: "e12", source: "1", target: "2", type: "smoothstep" },
  { id: "e13", source: "1", target: "3", type: "smoothstep" },
  {
    id: "e22a",
    source: "2",
    target: "2a",
    type: "smoothstep",
    sourceHandle: "c",
    targetHandle: "a",
  },
  {
    id: "e22anew",
    source: "2",
    target: "2anew",
    type: "smoothstep",
    sourceHandle: "e",
    targetHandle: "a",
  },
  {
    id: "e22anews",
    source: "2",
    target: "2anews",
    type: "smoothstep",
    sourceHandle: "d",
    targetHandle: "a",
  },
  {
    id: "e22b",
    source: "2",
    target: "2b",
    type: "smoothstep",
    sourceHandle: "c",
    targetHandle: "a",
  },
  {
    id: "e22c",
    source: "2",
    target: "2c",
    type: "smoothstep",
    sourceHandle: "c",
    targetHandle: "a",
  },
  {
    id: "e2c2d",
    source: "2c",
    target: "2d",
    type: "smoothstep",
    sourceHandle: "c",
    targetHandle: "a",
  },
  { id: "e45", source: "4", target: "5", type: "smoothstep" },
  { id: "e56", source: "5", target: "6", type: "smoothstep" },
  { id: "e57", source: "5", target: "7", type: "smoothstep" },
  { id: "e57", source: "3", target: "3a", type: "smoothstep" },
  { id: "e57w", source: "3", target: "2di", type: "smoothstep" },
];
