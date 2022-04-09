const loadGames = () => {
  return [
    {
      gameId: 1,
      startTime: 1648991243,
      category: {
        categoryId: 1,
        name: "Group A",
        order: 1,
      },
      teams: [
        { teamId: 1, name: "France", code: "fr", goal: 1, pronostic: 1 }, // goals:1, pronostic:1
        { teamId: 2, name: "England", code: "gb-eng", goal: 0, pronostic: 0 }, // goals:1, pronostic:1
      ],
    },
    {
      gameId: 2,
      startTime: 1648991243,
      category: {
        categoryId: 1,
        name: "Group A",
        order: 1,
      },
      teams: [
        { teamId: 3, name: "Spain", code: "es", goal: 0 },
        { teamId: 4, name: "Germany", code: "de", goal: 0 },
      ],
    },
    {
      gameId: 3,
      startTime: 1648991243,
      category: {
        categoryId: 2,
        name: "Group B",
        order: 3,
      },
      teams: [
        { teamId: 3, name: "Spain", code: "es", pronostic: 1 },
        { teamId: 4, name: "Germany", code: "de", pronostic: 1 },
      ],
    },
    {
      gameId: 4,
      startTime: 1667469600,
      category: {
        categoryId: 3,
        name: "Group C",
        order: 2,
      },
      teams: [
        { teamId: 3, name: "Spain", code: "es" },
        { teamId: 4, name: "Germany", code: "de" },
      ],
    },
    {
      gameId: 5,
      startTime: 1667469600,
      category: {
        categoryId: 3,
        name: "Group C",
        order: 2,
      },
      teams: [
        { teamId: 3, name: "Spain", code: "es" },
        { teamId: 4, name: "France", code: "fr" },
      ],
    },
    {
      gameId: 6,
      startTime: 1667469600,
      category: {
        categoryId: 3,
        name: "Group C",
        order: 2,
      },
      teams: [
        { teamId: 3, name: "France", code: "fr" },
        { teamId: 4, name: "Germany", code: "de" },
      ],
    },
    {
      gameId: 7,
      startTime: 1667469600,
      category: {
        categoryId: 4,
        name: "Group D",
        order: 2,
      },
      teams: [
        { teamId: 3, name: "England", code: "gb-eng" },
        { teamId: 4, name: "Germany", code: "de" },
      ],
    },
  ];
};

export { loadGames };
