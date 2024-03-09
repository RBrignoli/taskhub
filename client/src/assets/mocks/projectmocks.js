
const mockedProjectsData = [
  {
    id: 1,
    name: "Project One",
    description: "A web development project using React and Node.js",
    owner: {
      id: 101,
      name: "John Doe",
      email: "john.doe@example.com",
    },
    columns: {
      name: "coluna 1",
      id: "1",
    }
  },
  {
    id: 2,
    name: "Project Two",
    description: "An e-commerce website built with React and Express",
    owner: {
      id: 102,
      name: "Jane Smith",
      email: "jane.smith@example.com",
    },
  },
  {
    id: 3,
    name: "Project Three",
    description: "Mobile app development using React Native",
    owner: {
      id: 103,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
    },
  },
];

const mockedUsersListData = [
  {
    id: "1",
    name: "User 1",
  },
  {
    id: "2",
    name: "User 2",
  },
];

const mockedColumnsData = [
  { id: 1, title: "To Do" },
  { id: 2, title: "In Progress" },
  { id: 3, title: "In Review" },
  { id: 4, title: "Done" },
];

const mockedTasksData = [
  {
    id: 1,
    title: "Task 1",
    responsible: "John Doe",
    hoursRemaining: 8,
    priority: "high",
    col_id: 1,
  },
  {
    id: 2,
    title: "Task 2",
    responsible: "Jane Smith",
    hoursRemaining: 3,
    priority: "low",
    col_id: 5,
  },
  {
    id: 3,
    title: "Task 3",
    responsible: "Bob Johnson",
    hoursRemaining: 5,
    priority: "medium",
    col_id: 1,
  },
  {
    id: 4,
    title: "Task 4",
    responsible: "Alice Williams",
    hoursRemaining: 12,
    priority: "high",
    col_id: 3,
  },
  {
    id: 5,
    title: "Task 5",
    responsible: "Charlie Brown",
    hoursRemaining: 1,
    priority: "low",
    col_id: 4,
  },
  {
    id: 6,
    title: "Task 6",
    responsible: "David Miller",
    hoursRemaining: 7,
    priority: "medium",
    col_id: 3,
  },
  {
    id: 7,
    title: "Task 7",
    responsible: "Eva Davis",
    hoursRemaining: 10,
    priority: "high",
    col_id: 2,
  },
  {
    id: 8,
    title: "Task 8",
    responsible: "Frank Clark",
    hoursRemaining: 2,
    priority: "low",
    col_id: 3,
  },
  {
    id: 9,
    title: "Task 9",
    responsible: "Grace Lewis",
    hoursRemaining: 6,
    priority: "medium",
    col_id: 0,
  },
];

const mockedCommentsData = [
  {
    id: "1",
    taskId: "65e4af36286144ca42080f31",
    content: "This is the first comment.",
    createdAt: new Date("2023-03-22T15:00:00.000Z"),
    updatedAt: new Date("2023-03-22T15:00:00.000Z"),
    user: { id: "1", name: "John Doe" },
  },
  {
    id: "2",
    taskId: "65e4af36286144ca42080f31",
    content: "This is the second comment.",
    createdAt: new Date("2023-03-22T16:00:00.000Z"),
    updatedAt: new Date("2023-03-22T16:00:00.000Z"),
    user: { id: "2", name: "Jane Doe" },
  },
  {
    id: "3",
    taskId: "65e4af36286144ca42080f31",
    content: "This is the third comment.",
    createdAt: new Date("2023-03-22T17:00:00.000Z"),
    updatedAt: new Date("2023-03-22T17:00:00.000Z"),
    user: { id: "3", name: "Jim Smith" },
  },
];

export {
  mockedProjectsData,
  mockedUsersListData,
  mockedColumnsData,
  mockedTasksData,
  mockedCommentsData,
};
