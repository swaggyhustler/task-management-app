export type Task = {
  id: number;
  title: string;
  completed: boolean;
  priority: "High" | "Medium" | "Low";
  date: string;
  status: "InProgress" | "InReview" | "OnHold" | "Completed";
};

export const data: Task[] = [
  {
    "id": 1,
    "title": "Dashboard design of admin",
    "completed": true,
    "priority": "High",
    "date": "21/03/12",
    "status": "Completed"
  },
  {
    "id": 2,
    "title": "Implement login API",
    "completed": false,
    "priority": "Medium",
    "date": "21/03/15",
    "status": "InProgress"
  },
  {
    "id": 3,
    "title": "Create user profile page",
    "completed": false,
    "priority": "High",
    "date": "21/03/18",
    "status": "InReview"
  },
  {
    "id": 4,
    "title": "Set up database schema",
    "completed": true,
    "priority": "Low",
    "date": "21/03/10",
    "status": "Completed"
  },
  {
    "id": 5,
    "title": "Integrate payment gateway",
    "completed": false,
    "priority": "High",
    "date": "21/03/20",
    "status": "OnHold"
  },
  {
    "id": 6,
    "title": "Write unit tests",
    "completed": false,
    "priority": "Medium",
    "date": "21/03/22",
    "status": "InProgress"
  },
  {
    "id": 7,
    "title": "Design notification system",
    "completed": true,
    "priority": "Low",
    "date": "21/03/08",
    "status": "Completed"
  },
  {
    "id": 8,
    "title": "Optimize app performance",
    "completed": false,
    "priority": "High",
    "date": "21/03/25",
    "status": "InReview"
  },
  {
    "id": 9,
    "title": "Fix login bugs",
    "completed": true,
    "priority": "Medium",
    "date": "21/03/14",
    "status": "Completed"
  },
  {
    "id": 10,
    "title": "Deploy app to production",
    "completed": false,
    "priority": "High",
    "date": "21/03/30",
    "status": "OnHold"
  }
]

