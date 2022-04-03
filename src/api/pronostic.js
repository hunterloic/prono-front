const loadGames = () => {
  return [
    {
      gameId: 1,
      startTime: 1647687600,
      category: {
        categoryId: 1,
        name: "Group A",
      },
      teams: [
        { teamId: 1, name: "France", code: "fr" }, // goals:1, pronostic:1
        { teamId: 2, name: "England", code: "gb-eng" }, // goals:1, pronostic:1
      ],
    },
    {
      gameId: 2,
      startTime: 1647687600,
      category: {
        categoryId: 1,
        name: "Group A",
      },
      teams: [
        { teamId: 3, name: "Spain", code: "es" },
        { teamId: 4, name: "Germany", code: "de" },
      ],
    },
    {
      gameId: 3,
      startTime: 1647687600,
      category: {
        categoryId: 2,
        name: "Group B",
      },
      teams: [
        { teamId: 3, name: "Spain", code: "es" },
        { teamId: 4, name: "Germany", code: "de" },
      ],
    },
    {
      gameId: 4,
      startTime: 1647687600,
      category: {
        categoryId: 3,
        name: "Group C",
      },
      teams: [
        { teamId: 3, name: "Spain", code: "es" },
        { teamId: 4, name: "Germany", code: "de" },
      ],
    },
    {
      gameId: 5,
      startTime: 1647687600,
      category: {
        categoryId: 3,
        name: "Group C",
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
