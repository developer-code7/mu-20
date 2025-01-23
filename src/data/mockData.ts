export const mockData = {
  schools: [
    { id: "sch_001", name: "Delhi Public School" },
    { id: "sch_002", name: "Ryan International School" },
    { id: "sch_003", name: "St. Xavier's School" },
    { id: "sch_004", name: "Modern School" },
    { id: "sch_005", name: "The Shri Ram School" },
    { id: "sch_006", name: "Amity International School" },
  ],
  
  challenges: [
    { id: "ch_001", name: "OxfordMUN India- Pre Challenge" },
    { id: "ch_002", name: "Craft the Future Challenge" },
    { id: "ch_003", name: "Global Innovation Summit" },
    { id: "ch_004", name: "Youth Leadership Program" },
  ],

  committees: {
    "ch_001": [
      {
        id: "com_001",
        name: "United Nations Security Council",
        portfolios: [
          { id: "port_001", name: "President" },
          { id: "port_002", name: "Vice President" },
          { id: "port_003", name: "Secretary" },
          { id: "port_004", name: "Member State Representative" },
        ],
      },
      {
        id: "com_002",
        name: "World Health Organization",
        portfolios: [
          { id: "port_005", name: "Director-General" },
          { id: "port_006", name: "Executive Board Member" },
          { id: "port_007", name: "Regional Director" },
          { id: "port_008", name: "Technical Expert" },
        ],
      },
    ],
    "ch_002": [
      {
        id: "com_003",
        name: "Innovation Committee",
        portfolios: [
          { id: "port_009", name: "Lead Innovator" },
          { id: "port_010", name: "Technical Architect" },
          { id: "port_011", name: "Design Specialist" },
          { id: "port_012", name: "Project Manager" },
        ],
      },
      {
        id: "com_004",
        name: "Sustainability Council",
        portfolios: [
          { id: "port_013", name: "Environmental Expert" },
          { id: "port_014", name: "Resource Manager" },
          { id: "port_015", name: "Policy Advisor" },
          { id: "port_016", name: "Impact Analyst" },
        ],
      },
    ],
    "ch_003": [
      {
        id: "com_005",
        name: "Technology Panel",
        portfolios: [
          { id: "port_017", name: "Tech Lead" },
          { id: "port_018", name: "Innovation Strategist" },
          { id: "port_019", name: "Digital Transformation Expert" },
          { id: "port_020", name: "AI Specialist" },
        ],
      },
    ],
    "ch_004": [
      {
        id: "com_006",
        name: "Leadership Council",
        portfolios: [
          { id: "port_021", name: "Team Leader" },
          { id: "port_022", name: "Project Coordinator" },
          { id: "port_023", name: "Community Manager" },
          { id: "port_024", name: "Strategy Director" },
        ],
      },
    ],
  },

  // Demo users for team member selection (per school)
  schoolUsers: {
    "sch_001": [
      { id: "usr_001", name: "John Doe", email: "john@example.com" },
      { id: "usr_002", name: "Jane Smith", email: "jane@example.com" },
      { id: "usr_003", name: "Alex Johnson", email: "alex@example.com" },
    ],
    "sch_002": [
      { id: "usr_004", name: "Sarah Wilson", email: "sarah@example.com" },
      { id: "usr_005", name: "Mike Brown", email: "mike@example.com" },
      { id: "usr_006", name: "Emily Davis", email: "emily@example.com" },
    ],
  },
};