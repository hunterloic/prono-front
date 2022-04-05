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
        { teamId: 2, name: "England", code: "gb-eng", goal: 2, pronostic: 3 }, // goals:1, pronostic:1
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
        { teamId: 4, name: "Germany", code: "de" },
      ],
    },
  ];
};

const loadResults = () => {
  return [
    {
      gameId: 1,
      results: [
        { teamId: 1, result: 1 },
        { teamId: 2, result: 2 },
      ],
    },
    {
      gameId: 2,
      results: [
        { teamId: 3, result: 3 },
        { teamId: 4, result: 4 },
      ],
    },
  ];
};

const loadPronotics = () => {
  return [
    {
      gameId: 1,
      results: [
        { teamId: 1, result: 1 },
        { teamId: 2, result: 2 },
      ],
    },
    {
      gameId: 2,
      results: [
        { teamId: 3, result: 3 },
        { teamId: 4, result: 4 },
      ],
    },
  ];
};

export { loadGames, loadResults, loadPronotics };
