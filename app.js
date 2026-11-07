/**
 * PPLUL Iron Tracker - Progressive Overload Gym Application
 * Core Application Logic, Secure Storage, Unit-Aware Analytics, Search Library & Dynamic Routine Memory
 */

// --- 0. SECURITY & HTML ESCAPING UTILITY ---
function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// --- 1. SEED HISTORICAL WORKOUT DATA (USER NOTEBOOK & SCREENSHOTS) ---
const INITIAL_SEED_HISTORY = [
  {
    id: "seed-log-1",
    date: "2026-09-07T21:58:00",
    routineKey: "push",
    routineName: "Push Day",
    exercises: [
      {
        name: "Machine Shoulder Press",
        category: "Shoulders",
        sets: [
          { setNum: 1, weight: 7, unit: "plates", reps: 14, completed: true },
          { setNum: 2, weight: 7, unit: "plates", reps: 8, completed: true },
          { setNum: 3, weight: 7, unit: "plates", reps: 8, completed: true }
        ]
      },
      {
        name: "Single Arm Lateral Raises",
        category: "Shoulders",
        sets: [
          { setNum: 1, weight: 2, unit: "plates", reps: 12, completed: true },
          { setNum: 2, weight: 2, unit: "plates", reps: 14, completed: true },
          { setNum: 3, weight: 2, unit: "plates", reps: 15, completed: true }
        ]
      },
      {
        name: "Single Arm Tricep Pushdowns",
        category: "Triceps",
        sets: [
          { setNum: 1, weight: 2, unit: "plates", reps: 25, completed: true },
          { setNum: 2, weight: 3, unit: "plates", reps: 15, completed: true },
          { setNum: 3, weight: 3, unit: "plates", reps: 13, completed: true }
        ]
      },
      {
        name: "Incline Chest Press",
        category: "Chest",
        sets: [
          { setNum: 1, weight: 65, unit: "kgs", reps: 6, completed: true },
          { setNum: 2, weight: 65, unit: "kgs", reps: 6, completed: true },
          { setNum: 3, weight: 45, unit: "kgs", reps: 7, completed: true }
        ]
      }
    ]
  },
  {
    id: "seed-log-2",
    date: "2026-09-08T22:28:00",
    routineKey: "pull",
    routineName: "Pull Day",
    exercises: [
      {
        name: "Latpulldown",
        category: "Back",
        sets: [
          { setNum: 1, weight: 10, unit: "plates", reps: 2, completed: true },
          { setNum: 2, weight: 7, unit: "plates", reps: 4, completed: true },
          { setNum: 3, weight: 7, unit: "plates", reps: 5, completed: true }
        ]
      },
      {
        name: "T-Bar Rows",
        category: "Back",
        sets: [
          { setNum: 1, weight: 25, unit: "kgs", reps: 12, completed: true },
          { setNum: 2, weight: 25, unit: "kgs", reps: 12, completed: true },
          { setNum: 3, weight: 25, unit: "kgs", reps: 14, completed: true }
        ]
      },
      {
        name: "Lat Pullovers",
        category: "Back",
        sets: [
          { setNum: 1, weight: 6, unit: "plates", reps: 7, completed: true },
          { setNum: 2, weight: 6, unit: "plates", reps: 7, completed: true },
          { setNum: 3, weight: 6, unit: "plates", reps: 6, completed: true }
        ]
      },
      {
        name: "Preacher Curls",
        category: "Biceps",
        sets: [
          { setNum: 1, weight: 4, unit: "plates", reps: 7, completed: true },
          { setNum: 2, weight: 4, unit: "plates", reps: 7, completed: true },
          { setNum: 3, weight: 2, unit: "plates", reps: 12, completed: true }
        ]
      },
      {
        name: "Incline Bicep Curls",
        category: "Biceps",
        sets: [
          { setNum: 1, weight: 3, unit: "plates", reps: 12, completed: true },
          { setNum: 2, weight: 5, unit: "plates", reps: 8, completed: true },
          { setNum: 3, weight: 4, unit: "plates", reps: 10, completed: true }
        ]
      },
      {
        name: "Hammer Curls",
        category: "Biceps",
        sets: [
          { setNum: 1, weight: 4, unit: "plates", reps: 8, completed: true }
        ]
      }
    ]
  },
  {
    id: "seed-log-3",
    date: "2026-09-10T19:15:00",
    routineKey: "legs",
    routineName: "Legs Day",
    exercises: [
      {
        name: "Leg Extensions",
        category: "Legs",
        sets: [
          { setNum: 1, weight: 4, unit: "plates", reps: 10, completed: true },
          { setNum: 2, weight: 4, unit: "plates", reps: 10, completed: true },
          { setNum: 3, weight: 4, unit: "plates", reps: 11, completed: true }
        ]
      },
      {
        name: "Leg Press",
        category: "Legs",
        sets: [
          { setNum: 1, weight: 120, unit: "kgs", reps: 14, completed: true },
          { setNum: 2, weight: 120, unit: "kgs", reps: 19, completed: true }
        ]
      }
    ]
  },
  {
    id: "seed-log-4",
    date: "2026-09-14T20:30:00",
    routineKey: "upper",
    routineName: "Upper Day",
    exercises: [
      {
        name: "Incline Chest Press",
        category: "Chest",
        sets: [
          { setNum: 1, weight: 65, unit: "kgs", reps: 9, completed: true },
          { setNum: 2, weight: 65, unit: "kgs", reps: 8, completed: true },
          { setNum: 3, weight: 65, unit: "kgs", reps: 5, completed: true }
        ]
      },
      {
        name: "Seated Cable Rows",
        category: "Back",
        sets: [
          { setNum: 1, weight: 6, unit: "plates", reps: 12, completed: true },
          { setNum: 2, weight: 6, unit: "plates", reps: 12, completed: true },
          { setNum: 3, weight: 7, unit: "plates", reps: 6, completed: true }
        ]
      },
      {
        name: "Incline Bicep Curls",
        category: "Biceps",
        sets: [
          { setNum: 1, weight: 5, unit: "plates", reps: 15, completed: true },
          { setNum: 2, weight: 6, unit: "plates", reps: 8, completed: true }
        ]
      },
      {
        name: "Machine Shoulder Press",
        category: "Shoulders",
        sets: [
          { setNum: 1, weight: 8, unit: "plates", reps: 14, completed: true }
        ]
      },
      {
        name: "Single Arm Tricep Pushdowns",
        category: "Triceps",
        sets: [
          { setNum: 1, weight: 3, unit: "plates", reps: 15, completed: true }
        ]
      }
    ]
  },
  {
    id: "seed-log-5",
    date: "2026-09-16T18:45:00",
    routineKey: "lower",
    routineName: "Lower Day",
    exercises: [
      {
        name: "Leg Extensions",
        category: "Legs",
        sets: [
          { setNum: 1, weight: 5, unit: "plates", reps: 13, completed: true },
          { setNum: 2, weight: 6, unit: "plates", reps: 7, completed: true },
          { setNum: 3, weight: 6, unit: "plates", reps: 8, completed: true }
        ]
      },
      {
        name: "Calf Raises",
        category: "Calves",
        sets: [
          { setNum: 1, weight: 50, unit: "kgs", reps: 14, completed: true }
        ]
      },
      {
        name: "Pendulum Squats",
        category: "Legs",
        sets: [
          { setNum: 1, weight: 30, unit: "kgs", reps: 8, completed: true },
          { setNum: 2, weight: 30, unit: "kgs", reps: 6, completed: true }
        ]
      },
      {
        name: "Lying Hamstring Curls",
        category: "Hamstrings",
        sets: [
          { setNum: 1, weight: 4, unit: "plates", reps: 8, completed: true }
        ]
      }
    ]
  },
  {
    id: "seed-log-6",
    date: "2026-09-22T20:10:00",
    routineKey: "push",
    routineName: "Push Day",
    exercises: [
      {
        name: "Incline Chest Press",
        category: "Chest",
        sets: [
          { setNum: 1, weight: 65, unit: "kgs", reps: 10, completed: true },
          { setNum: 2, weight: 65, unit: "kgs", reps: 5, completed: true },
          { setNum: 3, weight: 65, unit: "kgs", reps: 5, completed: true }
        ]
      },
      {
        name: "High to Low Cable Fly",
        category: "Chest",
        sets: [
          { setNum: 1, weight: 5, unit: "plates", reps: 8, completed: true },
          { setNum: 2, weight: 5, unit: "plates", reps: 9, completed: true },
          { setNum: 3, weight: 5, unit: "plates", reps: 4, completed: true }
        ]
      },
      {
        name: "Machine Shoulder Press",
        category: "Shoulders",
        sets: [
          { setNum: 1, weight: 9, unit: "plates", reps: 5, completed: true },
          { setNum: 2, weight: 9, unit: "plates", reps: 7, completed: true },
          { setNum: 3, weight: 9, unit: "plates", reps: 6, completed: true }
        ]
      },
      {
        name: "Single Arm Lateral Raises",
        category: "Shoulders",
        sets: [
          { setNum: 1, weight: 3, unit: "plates", reps: 12, completed: true },
          { setNum: 2, weight: 3, unit: "plates", reps: 12, completed: true }
        ]
      },
      {
        name: "Single Arm Tricep Pushdowns",
        category: "Triceps",
        sets: [
          { setNum: 1, weight: 4, unit: "plates", reps: 8, completed: true },
          { setNum: 2, weight: 4, unit: "plates", reps: 5, completed: true }
        ]
      },
      {
        name: "Overhead Tricep Pushovers",
        category: "Triceps",
        sets: [
          { setNum: 1, weight: 3, unit: "plates", reps: 8, completed: true },
          { setNum: 2, weight: 2, unit: "plates", reps: 10, completed: true }
        ]
      }
    ]
  },
  {
    id: "seed-log-7",
    date: "2026-09-29T19:50:00",
    routineKey: "legs",
    routineName: "Legs Day",
    exercises: [
      {
        name: "Leg Extensions",
        category: "Legs",
        sets: [
          { setNum: 1, weight: 60, unit: "kgs", reps: 13, completed: true },
          { setNum: 2, weight: 60, unit: "kgs", reps: 12, completed: true },
          { setNum: 3, weight: 70, unit: "kgs", reps: 9, completed: true }
        ]
      },
      {
        name: "Machine RDLs",
        category: "Hamstrings",
        sets: [
          { setNum: 1, weight: 40, unit: "kgs", reps: 9, completed: true },
          { setNum: 2, weight: 40, unit: "kgs", reps: 8, completed: true },
          { setNum: 3, weight: 40, unit: "kgs", reps: 10, completed: true }
        ]
      },
      {
        name: "Calf Raises",
        category: "Calves",
        sets: [
          { setNum: 1, weight: 15, unit: "kgs", reps: 14, completed: true }
        ]
      },
      {
        name: "Leg Press",
        category: "Legs",
        sets: [
          { setNum: 1, weight: 40, unit: "kgs", reps: 30, completed: true },
          { setNum: 2, weight: 70, unit: "kgs", reps: 30, completed: true }
        ]
      }
    ]
  },
  {
    id: "seed-log-8",
    date: "2026-10-06T20:20:00",
    routineKey: "pull",
    routineName: "Pull Day",
    exercises: [
      {
        name: "T-Bar Rows",
        category: "Back",
        sets: [
          { setNum: 1, weight: 36.5, unit: "kgs", reps: 14, completed: true },
          { setNum: 2, weight: 36.5, unit: "kgs", reps: 14, completed: true },
          { setNum: 3, weight: 36.5, unit: "kgs", reps: 19, completed: true }
        ]
      },
      {
        name: "Latpulldown",
        category: "Back",
        sets: [
          { setNum: 1, weight: 7, unit: "plates", reps: 7, completed: true },
          { setNum: 2, weight: 7, unit: "plates", reps: 8, completed: true },
          { setNum: 3, weight: 7, unit: "plates", reps: 9, completed: true }
        ]
      },
      {
        name: "Preacher Curls",
        category: "Biceps",
        sets: [
          { setNum: 1, weight: 4, unit: "plates", reps: 10, completed: true },
          { setNum: 2, weight: 4, unit: "plates", reps: 8, completed: true }
        ]
      }
    ]
  },
  {
    id: "seed-log-9",
    date: "2026-10-12T19:30:00",
    routineKey: "push",
    routineName: "Push Day",
    exercises: [
      {
        name: "Incline Chest Press",
        category: "Chest",
        sets: [
          { setNum: 1, weight: 65, unit: "kgs", reps: 8, completed: true },
          { setNum: 2, weight: 65, unit: "kgs", reps: 7, completed: true },
          { setNum: 3, weight: 65, unit: "kgs", reps: 4, completed: true }
        ]
      },
      {
        name: "High to Low Cable Fly",
        category: "Chest",
        sets: [
          { setNum: 1, weight: 4, unit: "plates", reps: 14, completed: true },
          { setNum: 2, weight: 5, unit: "plates", reps: 10, completed: true },
          { setNum: 3, weight: 5, unit: "plates", reps: 8, completed: true }
        ]
      },
      {
        name: "Machine Shoulder Press",
        category: "Shoulders",
        sets: [
          { setNum: 1, weight: 7, unit: "plates", reps: 8, completed: true },
          { setNum: 2, weight: 7, unit: "plates", reps: 9, completed: true },
          { setNum: 3, weight: 7, unit: "plates", reps: 12, completed: true }
        ]
      },
      {
        name: "Single Arm Lateral Raises",
        category: "Shoulders",
        sets: [
          { setNum: 1, weight: 3, unit: "plates", reps: 12, completed: true },
          { setNum: 2, weight: 3, unit: "plates", reps: 10, completed: true },
          { setNum: 3, weight: 3, unit: "plates", reps: 12, completed: true }
        ]
      },
      {
        name: "Overhead Tricep Pushovers",
        category: "Triceps",
        sets: [
          { setNum: 1, weight: 3, unit: "plates", reps: 20, completed: true },
          { setNum: 2, weight: 4, unit: "plates", reps: 14, completed: true },
          { setNum: 3, weight: 4, unit: "plates", reps: 14, completed: true }
        ]
      }
    ]
  }
];

// --- 2. MASTER EXERCISE LIBRARY FOR INSTANT SEARCH ---
const MASTER_EXERCISE_LIBRARY = [
  // Chest
  { name: "Incline Chest Press", category: "Chest", defaultUnit: "kgs" },
  { name: "High to Low Cable Fly", category: "Chest", defaultUnit: "plates" },
  { name: "Chest Fly", category: "Chest", defaultUnit: "kgs" },
  { name: "Flat Barbell Bench Press", category: "Chest", defaultUnit: "kgs" },
  { name: "Incline Dumbbell Press", category: "Chest", defaultUnit: "kgs" },
  { name: "Dumbbell Bench Press", category: "Chest", defaultUnit: "kgs" },
  { name: "Pec Deck Machine", category: "Chest", defaultUnit: "plates" },
  { name: "Dips (Chest Focus)", category: "Chest", defaultUnit: "kgs" },

  // Back
  { name: "Latpulldown", category: "Back", defaultUnit: "plates" },
  { name: "Wide Grip Latpulldown", category: "Back", defaultUnit: "kgs" },
  { name: "Close Grip Latpulldown", category: "Back", defaultUnit: "kgs" },
  { name: "T-Bar Rows", category: "Back", defaultUnit: "kgs" },
  { name: "Seated Cable Rows", category: "Back", defaultUnit: "plates" },
  { name: "Lat Pullovers", category: "Back", defaultUnit: "plates" },
  { name: "Barbell Bent-Over Row", category: "Back", defaultUnit: "kgs" },
  { name: "Single Arm Dumbbell Row", category: "Back", defaultUnit: "kgs" },
  { name: "Pull-Ups", category: "Back", defaultUnit: "kgs" },

  // Shoulders
  { name: "Machine Shoulder Press", category: "Shoulders", defaultUnit: "plates" },
  { name: "Dumbbell Shoulder Press", category: "Shoulders", defaultUnit: "kgs ES" },
  { name: "Single Arm Lateral Raises", category: "Shoulders", defaultUnit: "plates" },
  { name: "Dumbbell Lateral Raises", category: "Shoulders", defaultUnit: "kgs" },
  { name: "Cable Lateral Raises", category: "Shoulders", defaultUnit: "plates" },
  { name: "Overhead Barbell Press", category: "Shoulders", defaultUnit: "kgs" },
  { name: "Face Pulls", category: "Shoulders", defaultUnit: "plates" },
  { name: "Reverse Pec Deck (Rear Delts)", category: "Shoulders", defaultUnit: "plates" },

  // Legs & Calves
  { name: "Leg Extensions", category: "Legs", defaultUnit: "plates" },
  { name: "Leg Press", category: "Legs", defaultUnit: "kgs" },
  { name: "Pendulum Squats", category: "Legs", defaultUnit: "kgs" },
  { name: "Barbell Back Squat", category: "Legs", defaultUnit: "kgs" },
  { name: "Hack Squat", category: "Legs", defaultUnit: "kgs" },
  { name: "Bulgarian Split Squat", category: "Legs", defaultUnit: "kgs" },
  { name: "Machine RDLs", category: "Hamstrings", defaultUnit: "kgs" },
  { name: "Romanian Deadlift (Barbell)", category: "Hamstrings", defaultUnit: "kgs" },
  { name: "Lying Hamstring Curls", category: "Hamstrings", defaultUnit: "plates" },
  { name: "Seated Leg Curl", category: "Hamstrings", defaultUnit: "plates" },
  { name: "Calf Raises", category: "Calves", defaultUnit: "kgs" },
  { name: "Seated Calf Raise", category: "Calves", defaultUnit: "kgs" },

  // Biceps
  { name: "Preacher Curls", category: "Biceps", defaultUnit: "plates" },
  { name: "Incline Bicep Curls", category: "Biceps", defaultUnit: "plates" },
  { name: "Hammer Curls", category: "Biceps", defaultUnit: "plates" },
  { name: "Plate Loaded Bicep Curl", category: "Biceps", defaultUnit: "kgs ES" },
  { name: "Barbell Bicep Curl", category: "Biceps", defaultUnit: "kgs" },
  { name: "Cable Bicep Curl", category: "Biceps", defaultUnit: "plates" },

  // Triceps
  { name: "Overhead Tricep Pushovers", category: "Triceps", defaultUnit: "plates" },
  { name: "Single Arm Tricep Pushdowns", category: "Triceps", defaultUnit: "plates" },
  { name: "Tricep Rope Pushdowns", category: "Triceps", defaultUnit: "plates" },
  { name: "Skull Crushers", category: "Triceps", defaultUnit: "kgs" },
  { name: "Close Grip Bench Press", category: "Triceps", defaultUnit: "kgs" }
];

// --- 3. PPLUL SPLIT TEMPLATES ---
const DEFAULT_ROUTINES = {
  push: {
    key: "push",
    name: "Push Day",
    dayName: "Monday",
    dayIndex: 1,
    muscles: "Chest, Shoulders & Triceps",
    exercises: [
      { name: "Incline Chest Press", category: "Chest", defaultUnit: "kgs", defaultSets: 3 },
      { name: "High to Low Cable Fly", category: "Chest", defaultUnit: "plates", defaultSets: 3 },
      { name: "Machine Shoulder Press", category: "Shoulders", defaultUnit: "plates", defaultSets: 3 },
      { name: "Single Arm Lateral Raises", category: "Shoulders", defaultUnit: "plates", defaultSets: 3 },
      { name: "Overhead Tricep Pushovers", category: "Triceps", defaultUnit: "plates", defaultSets: 3 },
      { name: "Single Arm Tricep Pushdowns", category: "Triceps", defaultUnit: "plates", defaultSets: 3 }
    ]
  },
  pull: {
    key: "pull",
    name: "Pull Day",
    dayName: "Tuesday",
    dayIndex: 2,
    muscles: "Back & Biceps Focus",
    exercises: [
      { name: "Latpulldown", category: "Back", defaultUnit: "plates", defaultSets: 3 },
      { name: "T-Bar Rows", category: "Back", defaultUnit: "kgs", defaultSets: 3 },
      { name: "Seated Cable Rows", category: "Back", defaultUnit: "plates", defaultSets: 3 },
      { name: "Preacher Curls", category: "Biceps", defaultUnit: "plates", defaultSets: 3 },
      { name: "Incline Bicep Curls", category: "Biceps", defaultUnit: "plates", defaultSets: 3 },
      { name: "Hammer Curls", category: "Biceps", defaultUnit: "plates", defaultSets: 2 }
    ]
  },
  legs: {
    key: "legs",
    name: "Legs Day",
    dayName: "Wednesday",
    dayIndex: 3,
    muscles: "Quads, Hamstrings & Calves",
    exercises: [
      { name: "Leg Extensions", category: "Legs", defaultUnit: "plates", defaultSets: 3 },
      { name: "Leg Press", category: "Legs", defaultUnit: "kgs", defaultSets: 2 },
      { name: "Machine RDLs", category: "Hamstrings", defaultUnit: "kgs", defaultSets: 3 },
      { name: "Pendulum Squats", category: "Legs", defaultUnit: "kgs", defaultSets: 2 },
      { name: "Calf Raises", category: "Calves", defaultUnit: "kgs", defaultSets: 2 },
      { name: "Lying Hamstring Curls", category: "Hamstrings", defaultUnit: "plates", defaultSets: 2 }
    ]
  },
  rest_thu: {
    key: "rest_thu",
    name: "Rest & Recovery",
    dayName: "Thursday",
    dayIndex: 4,
    muscles: "Growth & Muscular Recovery (Nothing scheduled)",
    isRest: true,
    exercises: []
  },
  upper: {
    key: "upper",
    name: "Upper Day",
    dayName: "Friday",
    dayIndex: 5,
    muscles: "Upper Body Hypertrophy (Chest, Back, Arms)",
    exercises: [
      { name: "Incline Chest Press", category: "Chest", defaultUnit: "kgs", defaultSets: 3 },
      { name: "Seated Cable Rows", category: "Back", defaultUnit: "plates", defaultSets: 3 },
      { name: "Latpulldown", category: "Back", defaultUnit: "plates", defaultSets: 3 },
      { name: "Machine Shoulder Press", category: "Shoulders", defaultUnit: "plates", defaultSets: 2 },
      { name: "Incline Bicep Curls", category: "Biceps", defaultUnit: "plates", defaultSets: 2 },
      { name: "Single Arm Tricep Pushdowns", category: "Triceps", defaultUnit: "plates", defaultSets: 2 }
    ]
  },
  lower: {
    key: "lower",
    name: "Lower Day",
    dayName: "Saturday",
    dayIndex: 6,
    muscles: "Legs & Lower Posterior Chain",
    exercises: [
      { name: "Leg Extensions", category: "Legs", defaultUnit: "plates", defaultSets: 3 },
      { name: "Pendulum Squats", category: "Legs", defaultUnit: "kgs", defaultSets: 2 },
      { name: "Lying Hamstring Curls", category: "Hamstrings", defaultUnit: "plates", defaultSets: 2 },
      { name: "Calf Raises", category: "Calves", defaultUnit: "kgs", defaultSets: 2 },
      { name: "Leg Press", category: "Legs", defaultUnit: "kgs", defaultSets: 2 }
    ]
  },
  rest_sun: {
    key: "rest_sun",
    name: "Rest Day",
    dayName: "Sunday",
    dayIndex: 0,
    muscles: "Full Rest & Nutrition Recharge",
    isRest: true,
    exercises: []
  }
};

// --- 4. APPLICATION STATE & STORAGE ENGINE ---
class AppState {
  constructor() {
    this.history = [];
    this.routines = JSON.parse(JSON.stringify(DEFAULT_ROUTINES));
    this.currentRoutineKey = "push";
    this.currentWorkout = null;
    this.isDraftLoaded = false;
    this.timer = {
      remaining: 90,
      total: 90,
      intervalId: null,
      isRunning: false
    };
    this.analytics = {
      selectedExercise: "",
      selectedMetric: "weight" // "weight", "1rm", "reps"
    };
    this.search = {
      query: "",
      muscleFilter: "all"
    };
    this.audioCtx = null;
    this.init();
  }

  init() {
    this.loadFromStorage();
    this.detectTodayRoutine();
    this.setupActiveWorkout(this.currentRoutineKey);
  }

  loadFromStorage() {
    try {
      const isInitialized = localStorage.getItem("pplul_gym_initialized");
      const storedHistory = localStorage.getItem("pplul_gym_history");

      if (isInitialized === "true") {
        this.history = storedHistory ? JSON.parse(storedHistory) : [];
      } else {
        this.history = JSON.parse(JSON.stringify(INITIAL_SEED_HISTORY));
        this.saveHistory();
        localStorage.setItem("pplul_gym_initialized", "true");
      }

      const storedRoutines = localStorage.getItem("pplul_gym_routines");
      if (storedRoutines) {
        this.routines = JSON.parse(storedRoutines);
      }
    } catch (e) {
      console.error("Storage loading error:", e);
      this.history = [];
    }
  }

  saveHistory() {
    try {
      localStorage.setItem("pplul_gym_history", JSON.stringify(this.history));
      localStorage.setItem("pplul_gym_initialized", "true");
    } catch (e) {
      console.error("Save history error:", e);
    }
  }

  saveRoutines() {
    try {
      localStorage.setItem("pplul_gym_routines", JSON.stringify(this.routines));
    } catch (e) {
      console.error("Save routines error:", e);
    }
  }

  saveDraft() {
    if (!this.currentWorkout) return;
    try {
      localStorage.setItem("pplul_gym_active_draft", JSON.stringify(this.currentWorkout));
    } catch (e) {
      console.error("Draft save failed:", e);
    }
  }

  loadDraft() {
    try {
      const draftJson = localStorage.getItem("pplul_gym_active_draft");
      if (!draftJson) return null;
      const draft = JSON.parse(draftJson);
      const hasMeaningfulData = draft.exercises && draft.exercises.some(ex =>
        ex.sets && ex.sets.some(s => s.completed || s.weight > 0)
      );
      return hasMeaningfulData ? draft : null;
    } catch (e) {
      return null;
    }
  }

  clearDraft() {
    try {
      localStorage.removeItem("pplul_gym_active_draft");
    } catch (e) {}
    this.isDraftLoaded = false;
  }

  detectTodayRoutine() {
    const todayIndex = new Date().getDay();
    const dayMap = {
      1: "push",
      2: "pull",
      3: "legs",
      4: "rest_thu",
      5: "upper",
      6: "lower",
      0: "rest_sun"
    };
    this.currentRoutineKey = dayMap[todayIndex] || "push";
  }

  setupActiveWorkout(routineKey, forceNew = false) {
    this.currentRoutineKey = routineKey;

    if (!forceNew) {
      const draft = this.loadDraft();
      if (draft && draft.routineKey === routineKey) {
        this.currentWorkout = draft;
        this.isDraftLoaded = true;
        return;
      }
    }

    this.isDraftLoaded = false;
    const routine = this.routines[routineKey] || this.routines["push"];

    // Populate active workout based on current dynamic routine exercises
    this.currentWorkout = {
      routineKey: routine.key,
      routineName: routine.name,
      muscles: routine.muscles,
      startedAt: new Date().toISOString(),
      exercises: routine.exercises.map(ex => {
        const prev = this.getPreviousExercisePerformance(ex.name);
        const setNumCount = ex.defaultSets || (prev ? prev.sets.length : 3);
        
        const sets = [];
        for (let i = 1; i <= setNumCount; i++) {
          const prevSet = prev && prev.sets[i - 1];
          sets.push({
            setNum: i,
            weight: prevSet ? prevSet.weight : 0,
            unit: prevSet ? prevSet.unit : ex.defaultUnit || "kgs",
            reps: prevSet ? prevSet.reps : 10,
            completed: false
          });
        }

        return {
          name: ex.name,
          category: ex.category || "General",
          sets: sets
        };
      })
    };
  }

  getPreviousExercisePerformance(exerciseName) {
    if (!this.history || this.history.length === 0) return null;

    const sorted = [...this.history].sort((a, b) => new Date(b.date) - new Date(a.date));
    for (const log of sorted) {
      const match = log.exercises.find(e => e.name.toLowerCase().trim() === exerciseName.toLowerCase().trim());
      if (match && match.sets && match.sets.length > 0) {
        return {
          date: log.date,
          routineName: log.routineName,
          sets: match.sets
        };
      }
    }
    return null;
  }

  playBeep(freq = 880, duration = 0.15) {
    try {
      if (!this.audioCtx) {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
      gain.gain.setValueAtTime(0.3, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (e) {}
  }

  triggerVibration(pattern = [200, 100, 200]) {
    if ("vibrate" in navigator) {
      try { navigator.vibrate(pattern); } catch (e) {}
    }
  }
}

const state = new AppState();

// --- 5. DATA SANITY & DRAFT CHECKS ---
function isWorkoutDirty() {
  if (!state.currentWorkout || !state.currentWorkout.exercises) return false;
  return state.currentWorkout.exercises.some(ex =>
    ex.sets && ex.sets.some(s => s.completed || (s.weight > 0 && s.reps > 0))
  );
}

// --- 6. RENDER ACTIVE WORKOUT ---
function renderWorkoutView() {
  const container = document.getElementById("workout-exercises-list");
  const draftAlertEl = document.getElementById("draft-recovery-alert");
  const routine = state.routines[state.currentRoutineKey] || state.routines["push"];
  
  // Header Banner
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const todayName = dayNames[new Date().getDay()];
  document.getElementById("current-day-label").innerText = `${todayName} • ${escapeHtml(routine.name)}`;
  document.getElementById("routine-name-title").innerText = routine.name;
  document.getElementById("routine-muscles-text").innerText = routine.muscles;

  // Sync quick pills
  document.querySelectorAll("#routine-quick-pills .split-pill").forEach(pill => {
    pill.classList.toggle("active", pill.dataset.routine === state.currentRoutineKey);
  });

  // Draft Alert Banner
  if (state.isDraftLoaded && isWorkoutDirty()) {
    draftAlertEl.innerHTML = `
      <div class="draft-banner">
        <span>⚡ Resumed in-progress workout draft</span>
        <button class="btn-discard-draft" onclick="discardCurrentDraft()">Discard Draft</button>
      </div>
    `;
  } else {
    draftAlertEl.innerHTML = "";
  }

  // Rest day state
  if (!state.currentWorkout || state.currentWorkout.exercises.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 20px; background: var(--bg-card); border-radius: 16px; border: 1px dashed var(--border-color);">
        <div style="font-size: 2.5rem; margin-bottom: 10px;">🛌</div>
        <h3 style="font-size: 1.2rem; font-weight: 800; color: #fff;">Rest & Recovery Day</h3>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 6px;">
          Muscles rebuild and grow during rest! Stay hydrated, hit your protein goals and sleep well.
        </p>
        <button class="btn-copy-prev" style="margin-top: 16px; padding: 8px 16px; font-size: 0.85rem;" onclick="switchRoutine('push')">
          Train Anyway / Switch Routine
        </button>
      </div>
    `;
    return;
  }

  let html = "";

  state.currentWorkout.exercises.forEach((ex, exIndex) => {
    const prev = state.getPreviousExercisePerformance(ex.name);
    
    let prevSetsHtml = "";
    if (prev) {
      prevSetsHtml = prev.sets.map(s => `
        <span class="prev-set-chip">
          Set ${s.setNum}: <b>${s.weight} ${escapeHtml(s.unit)}</b> × <b>${s.reps}</b>
        </span>
      `).join("");
    } else {
      prevSetsHtml = `<span style="font-size: 0.78rem; color: var(--text-muted);">No prior records found. First time logging this!</span>`;
    }

    const prevDateFormatted = prev ? new Date(prev.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : '';

    html += `
      <div class="exercise-card" data-exercise-index="${exIndex}">
        <!-- Header -->
        <div class="exercise-card-header">
          <div class="exercise-info">
            <span class="exercise-category">${escapeHtml(ex.category)}</span>
            <div class="exercise-name">${escapeHtml(ex.name)}</div>
          </div>
          <div class="exercise-actions">
            <button class="btn-icon-subtle" onclick="removeExercise(${exIndex})" title="Remove Exercise from this and future sessions">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Previous Performance Box -->
        <div class="prev-session-box">
          <div class="prev-session-header">
            <span class="prev-session-title">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
              Previous Target
            </span>
            ${prev ? `<span class="prev-session-date">Last: ${prevDateFormatted}</span>` : ''}
          </div>
          <div class="prev-sets-list">
            ${prevSetsHtml}
          </div>
          ${prev ? `
            <button class="btn-copy-prev" onclick="copyPreviousSets(${exIndex})">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              Copy Last Session
            </button>
          ` : ''}
        </div>

        <!-- Sets Table -->
        <div class="sets-table-container">
          <div class="sets-header-row">
            <div>Set</div>
            <div>Prev</div>
            <div>Unit</div>
            <div>Weight</div>
            <div>Reps</div>
            <div>Done</div>
          </div>

          <div class="sets-body">
            ${ex.sets.map((set, setIndex) => {
              const prevSet = prev && prev.sets[setIndex];
              const prevText = prevSet ? `${prevSet.weight} × ${prevSet.reps}` : '--';
              
              let badgeHtml = "";
              if (prevSet && set.completed) {
                if (set.unit === prevSet.unit) {
                  const weightDiff = parseFloat((set.weight - prevSet.weight).toFixed(1));
                  const repsDiff = set.reps - prevSet.reps;
                  
                  if (weightDiff > 0) {
                    badgeHtml = `<div class="progression-badge prog-pr">🚀 +${weightDiff} ${escapeHtml(set.unit)} Overload!</div>`;
                  } else if (weightDiff === 0 && repsDiff > 0) {
                    badgeHtml = `<div class="progression-badge prog-up">🔥 +${repsDiff} Reps Progress!</div>`;
                  } else if (weightDiff === 0 && repsDiff === 0) {
                    badgeHtml = `<div class="progression-badge prog-same">🎯 Matched Last Time</div>`;
                  } else if (weightDiff < 0 || repsDiff < 0) {
                    badgeHtml = `<div class="progression-badge prog-down">⚠️ Deload / -${Math.abs(repsDiff)} reps</div>`;
                  }
                }
              }

              return `
                <div class="set-row ${set.completed ? 'completed' : ''}" id="set-row-${exIndex}-${setIndex}">
                  <div class="set-num">${set.setNum}</div>
                  <div class="set-prev-hint" title="${escapeHtml(prevText)}">${escapeHtml(prevText)}</div>
                  
                  <select class="unit-select" onchange="updateSetUnit(${exIndex}, ${setIndex}, this.value)">
                    <option value="kgs" ${set.unit === 'kgs' ? 'selected' : ''}>kgs</option>
                    <option value="plates" ${set.unit === 'plates' ? 'selected' : ''}>plates</option>
                    <option value="kgs ES" ${set.unit === 'kgs ES' ? 'selected' : ''}>kg ES</option>
                    <option value="lbs" ${set.unit === 'lbs' ? 'selected' : ''}>lbs</option>
                  </select>

                  <div class="stepper-container">
                    <button class="stepper-btn" onclick="stepWeight(${exIndex}, ${setIndex}, -1)">-</button>
                    <input type="number" step="any" inputmode="decimal" class="stepper-input" value="${set.weight}" 
                      onchange="updateSetWeight(${exIndex}, ${setIndex}, this.value)">
                    <button class="stepper-btn" onclick="stepWeight(${exIndex}, ${setIndex}, 1)">+</button>
                  </div>

                  <div class="stepper-container">
                    <button class="stepper-btn" onclick="stepReps(${exIndex}, ${setIndex}, -1)">-</button>
                    <input type="number" step="1" inputmode="numeric" pattern="[0-9]*" class="stepper-input" value="${set.reps}" 
                      onchange="updateSetReps(${exIndex}, ${setIndex}, this.value)">
                    <button class="stepper-btn" onclick="stepReps(${exIndex}, ${setIndex}, 1)">+</button>
                  </div>

                  <button class="btn-check-set ${set.completed ? 'checked' : ''}" 
                    onclick="toggleSetComplete(${exIndex}, ${setIndex})" title="Mark set complete">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </button>

                  ${badgeHtml}
                </div>
              `;
            }).join("")}
          </div>
        </div>

        <!-- Card Footer -->
        <div class="card-bottom-actions">
          <button class="btn-add-set" onclick="addSetToExercise(${exIndex})">
            + Add Set
          </button>
          ${ex.sets.length > 1 ? `
            <button class="btn-remove-set" onclick="removeSetFromExercise(${exIndex})">
              Remove Last Set
            </button>
          ` : ''}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Routine Switching with Draft Protection
function switchRoutine(routineKey) {
  if (routineKey === state.currentRoutineKey) return;
  
  if (isWorkoutDirty()) {
    if (!confirm("You have an unsaved workout in progress! Switching routines will discard your current draft. Do you want to continue?")) {
      document.querySelectorAll("#routine-quick-pills .split-pill").forEach(pill => {
        pill.classList.toggle("active", pill.dataset.routine === state.currentRoutineKey);
      });
      return;
    }
  }

  state.clearDraft();
  state.setupActiveWorkout(routineKey, true);
  renderWorkoutView();
}

function discardCurrentDraft() {
  if (confirm("Discard this active draft and reset to default?")) {
    state.clearDraft();
    state.setupActiveWorkout(state.currentRoutineKey, true);
    renderWorkoutView();
  }
}

function copyPreviousSets(exIndex) {
  const ex = state.currentWorkout.exercises[exIndex];
  const prev = state.getPreviousExercisePerformance(ex.name);
  if (!prev || !prev.sets) return;

  ex.sets = prev.sets.map((s, i) => ({
    setNum: i + 1,
    weight: s.weight,
    unit: s.unit,
    reps: s.reps,
    completed: false
  }));

  state.saveDraft();
  renderWorkoutView();
}

function updateSetUnit(exIndex, setIndex, unit) {
  state.currentWorkout.exercises[exIndex].sets[setIndex].unit = unit;
  state.saveDraft();
}

function updateSetWeight(exIndex, setIndex, val) {
  state.currentWorkout.exercises[exIndex].sets[setIndex].weight = Math.max(0, parseFloat(val) || 0);
  state.saveDraft();
  renderWorkoutView();
}

function updateSetReps(exIndex, setIndex, val) {
  state.currentWorkout.exercises[exIndex].sets[setIndex].reps = Math.max(0, parseInt(val) || 0);
  state.saveDraft();
  renderWorkoutView();
}

function stepWeight(exIndex, setIndex, delta) {
  const set = state.currentWorkout.exercises[exIndex].sets[setIndex];
  const step = set.unit === "plates" ? 1 : 2.5;
  set.weight = Math.max(0, parseFloat((set.weight + (delta * step)).toFixed(1)));
  state.saveDraft();
  renderWorkoutView();
}

function stepReps(exIndex, setIndex, delta) {
  const set = state.currentWorkout.exercises[exIndex].sets[setIndex];
  set.reps = Math.max(0, set.reps + delta);
  state.saveDraft();
  renderWorkoutView();
}

function toggleSetComplete(exIndex, setIndex) {
  const set = state.currentWorkout.exercises[exIndex].sets[setIndex];
  set.completed = !set.completed;
  
  if (set.completed) {
    state.playBeep(987, 0.12);
    state.triggerVibration([100]);
    startRestTimer(90);
  }

  state.saveDraft();
  renderWorkoutView();
}

function addSetToExercise(exIndex) {
  const ex = state.currentWorkout.exercises[exIndex];
  const lastSet = ex.sets[ex.sets.length - 1];
  ex.sets.push({
    setNum: ex.sets.length + 1,
    weight: lastSet ? lastSet.weight : 0,
    unit: lastSet ? lastSet.unit : "kgs",
    reps: lastSet ? lastSet.reps : 10,
    completed: false
  });
  state.saveDraft();
  renderWorkoutView();
}

function removeSetFromExercise(exIndex) {
  const ex = state.currentWorkout.exercises[exIndex];
  if (ex.sets.length > 1) {
    ex.sets.pop();
    state.saveDraft();
    renderWorkoutView();
  }
}

// DYNAMIC ROUTINE REMOVAL: Removes from today AND updates routine template so it won't appear next workout!
function removeExercise(exIndex) {
  const ex = state.currentWorkout.exercises[exIndex];
  const routineName = state.currentWorkout.routineName;

  if (confirm(`Remove "${ex.name}" from today's workout and future ${routineName} sessions?`)) {
    const exName = ex.name;
    state.currentWorkout.exercises.splice(exIndex, 1);

    // Update routine template so it doesn't appear next time!
    const currentKey = state.currentWorkout.routineKey;
    if (state.routines[currentKey] && state.routines[currentKey].exercises) {
      state.routines[currentKey].exercises = state.routines[currentKey].exercises.filter(
        e => e.name.toLowerCase().trim() !== exName.toLowerCase().trim()
      );
      state.saveRoutines();
    }

    state.saveDraft();
    renderWorkoutView();
    renderSplitView();
  }
}

// Add an exercise into current session & save into routine template
function addExerciseToActiveWorkout(name, category, defaultUnit) {
  const alreadyInWorkout = state.currentWorkout.exercises.some(
    e => e.name.toLowerCase().trim() === name.toLowerCase().trim()
  );
  if (alreadyInWorkout) {
    alert(`"${name}" is already in your current workout session!`);
    return;
  }

  const prev = state.getPreviousExercisePerformance(name);
  const setCount = prev && prev.sets ? prev.sets.length : 3;
  const sets = [];
  for (let i = 1; i <= setCount; i++) {
    const ps = prev && prev.sets[i - 1];
    sets.push({
      setNum: i,
      weight: ps ? ps.weight : 0,
      unit: ps ? ps.unit : defaultUnit,
      reps: ps ? ps.reps : 10,
      completed: false
    });
  }

  state.currentWorkout.exercises.push({
    name: name,
    category: category,
    sets: sets
  });

  // Automatically remember in this routine template for next workout!
  const currentKey = state.currentWorkout.routineKey;
  if (state.routines[currentKey] && state.routines[currentKey].exercises) {
    const inRoutine = state.routines[currentKey].exercises.some(
      e => e.name.toLowerCase().trim() === name.toLowerCase().trim()
    );
    if (!inRoutine) {
      state.routines[currentKey].exercises.push({
        name: name,
        category: category,
        defaultUnit: defaultUnit,
        defaultSets: setCount
      });
      state.saveRoutines();
    }
  }

  state.saveDraft();
  closeModal("modal-add-exercise");
  renderWorkoutView();
  renderSplitView();
}

// Calculate True All-Time PRs for Celebration
function calculateTruePRs(completedExercises) {
  let truePrCount = 0;
  
  completedExercises.forEach(ex => {
    ex.sets.forEach(s => {
      let maxHistoricalWeight = 0;
      let maxHistoricalReps = 0;

      state.history.forEach(log => {
        const pastMatch = log.exercises.find(e => e.name.toLowerCase().trim() === ex.name.toLowerCase().trim());
        if (pastMatch && pastMatch.sets) {
          pastMatch.sets.forEach(ps => {
            if (ps.unit === s.unit) {
              if (ps.weight > maxHistoricalWeight) {
                maxHistoricalWeight = ps.weight;
                maxHistoricalReps = ps.reps;
              } else if (ps.weight === maxHistoricalWeight && ps.reps > maxHistoricalReps) {
                maxHistoricalReps = ps.reps;
              }
            }
          });
        }
      });

      if (maxHistoricalWeight > 0) {
        if (s.weight > maxHistoricalWeight || (s.weight === maxHistoricalWeight && s.reps > maxHistoricalReps)) {
          truePrCount++;
        }
      } else {
        truePrCount++;
      }
    });
  });

  return truePrCount;
}

// Finish & Save Workout
function finishWorkout() {
  if (!state.currentWorkout) return;

  const completedSetsCount = state.currentWorkout.exercises.reduce((acc, ex) => acc + ex.sets.filter(s => s.completed).length, 0);
  const enteredSetsCount = state.currentWorkout.exercises.reduce((acc, ex) => acc + ex.sets.filter(s => s.weight > 0 && s.reps > 0).length, 0);

  if (completedSetsCount === 0) {
    if (enteredSetsCount > 0) {
      if (confirm(`You have entered numbers for ${enteredSetsCount} sets, but none were checked as Done (✓). Would you like to mark them as completed and save?`)) {
        state.currentWorkout.exercises.forEach(ex => {
          ex.sets.forEach(s => {
            if (s.weight > 0 && s.reps > 0) s.completed = true;
          });
        });
      } else {
        return;
      }
    } else {
      alert("Please complete at least one set before saving your workout!");
      return;
    }
  }

  // Only extract sets that were actually completed!
  const validExercises = state.currentWorkout.exercises
    .map(ex => ({
      name: ex.name,
      category: ex.category,
      sets: ex.sets.filter(s => s.completed).map(s => ({
        setNum: s.setNum,
        weight: s.weight,
        unit: s.unit,
        reps: s.reps,
        completed: true
      }))
    }))
    .filter(ex => ex.sets.length > 0);

  if (validExercises.length === 0) {
    alert("No completed sets to save.");
    return;
  }

  const totalSets = validExercises.reduce((acc, ex) => acc + ex.sets.length, 0);
  const prsAchieved = calculateTruePRs(validExercises);

  const newLog = {
    id: "log-" + Date.now(),
    date: new Date().toISOString(),
    routineKey: state.currentWorkout.routineKey,
    routineName: state.currentWorkout.routineName,
    exercises: validExercises
  };

  state.history.unshift(newLog);
  state.saveHistory();
  state.clearDraft();

  // DYNAMIC WORKOUT ADAPTATION:
  // Automatically sync this routine's template to what you actually trained today!
  // If you didn't do Pendulum Squats, it will NOT appear in your next session!
  const currentKey = state.currentWorkout.routineKey;
  if (state.routines[currentKey] && !state.routines[currentKey].isRest) {
    state.routines[currentKey].exercises = validExercises.map(ex => ({
      name: ex.name,
      category: ex.category,
      defaultUnit: ex.sets[0] ? ex.sets[0].unit : "kgs",
      defaultSets: ex.sets.length
    }));
    state.saveRoutines();
  }

  // Show celebration modal
  document.getElementById("summary-exercises-count").innerText = validExercises.length;
  document.getElementById("summary-sets-count").innerText = totalSets;
  document.getElementById("summary-prs-count").innerText = prsAchieved;
  openModal("modal-celebration");

  // Reinitialize fresh active workout for next time
  state.setupActiveWorkout(state.currentRoutineKey, true);
  renderWorkoutView();
  renderHistoryView();
  renderAnalyticsView();
  renderSplitView();
}

// --- 7. EXERCISE SEARCH & LIBRARY ENGINE ---
function getCombinedExerciseLibrary() {
  const map = new Map();

  // Add default master library
  MASTER_EXERCISE_LIBRARY.forEach(ex => {
    map.set(ex.name.toLowerCase().trim(), ex);
  });

  // Add all exercises from workout history
  state.history.forEach(log => {
    log.exercises.forEach(ex => {
      const key = ex.name.toLowerCase().trim();
      if (!map.has(key)) {
        map.set(key, {
          name: ex.name,
          category: ex.category || "General",
          defaultUnit: ex.sets[0] ? ex.sets[0].unit : "kgs"
        });
      }
    });
  });

  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
}

function renderExerciseLibrary() {
  const container = document.getElementById("search-library-results");
  const query = state.search.query.toLowerCase().trim();
  const muscleFilter = state.search.muscleFilter;

  const library = getCombinedExerciseLibrary();
  const filtered = library.filter(ex => {
    const matchesQuery = !query || ex.name.toLowerCase().includes(query) || ex.category.toLowerCase().includes(query);
    const matchesMuscle = muscleFilter === "all" || ex.category.toLowerCase().includes(muscleFilter.toLowerCase()) || 
      (muscleFilter === "Arms" && (ex.category.toLowerCase().includes("bicep") || ex.category.toLowerCase().includes("tricep")));
    return matchesQuery && matchesMuscle;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; color: var(--text-muted); padding: 20px 10px; font-size: 0.85rem;">
        No library exercises match "${escapeHtml(state.search.query)}".<br>
        <span style="color: var(--accent-amber);">Click below to create it as a custom lift!</span>
      </div>
    `;
    // Auto-open custom form with pre-filled name
    const customForm = document.getElementById("custom-exercise-form");
    if (customForm) {
      customForm.style.display = "block";
      document.getElementById("new-ex-name").value = state.search.query;
    }
    return;
  }

  container.innerHTML = filtered.map(ex => {
    const prev = state.getPreviousExercisePerformance(ex.name);
    let prevBadge = "";
    if (prev && prev.sets && prev.sets.length > 0) {
      const topSet = prev.sets[0];
      prevBadge = `<span class="search-item-prev">⚡ Last: ${topSet.weight} ${escapeHtml(topSet.unit)} × ${topSet.reps}</span>`;
    }

    return `
      <div class="search-library-item" onclick="addExerciseToActiveWorkout('${escapeHtml(ex.name).replace(/'/g, "\\'")}', '${escapeHtml(ex.category)}', '${escapeHtml(ex.defaultUnit || 'kgs')}')">
        <div class="search-item-info">
          <span class="search-item-name">${escapeHtml(ex.name)}</span>
          <div class="search-item-meta">
            <span class="search-item-tag">${escapeHtml(ex.category)}</span>
            ${prevBadge}
          </div>
        </div>
        <div class="search-item-add-btn">+</div>
      </div>
    `;
  }).join("");
}

// --- 8. REST TIMER ENGINE ---
function startRestTimer(seconds) {
  if (state.timer.intervalId) {
    clearInterval(state.timer.intervalId);
  }

  state.timer.remaining = seconds;
  state.timer.total = seconds;
  state.timer.isRunning = true;

  const bar = document.getElementById("floating-timer");
  bar.classList.add("visible");

  const headerBtn = document.getElementById("header-timer-btn");
  headerBtn.classList.add("active");

  updateTimerDisplays();

  state.timer.intervalId = setInterval(() => {
    if (!state.timer.isRunning) return;

    state.timer.remaining--;
    updateTimerDisplays();

    if (state.timer.remaining === 3 || state.timer.remaining === 2 || state.timer.remaining === 1) {
      state.playBeep(750, 0.08);
      state.triggerVibration([50]);
    }

    if (state.timer.remaining <= 0) {
      clearInterval(state.timer.intervalId);
      state.timer.intervalId = null;
      state.timer.isRunning = false;
      
      state.playBeep(1200, 0.3);
      setTimeout(() => state.playBeep(1500, 0.4), 250);
      state.triggerVibration([300, 150, 400]);

      headerBtn.classList.remove("active");
      document.getElementById("header-timer-display").innerText = "Rest";
      
      setTimeout(() => {
        bar.classList.remove("visible");
      }, 3500);
    }
  }, 1000);
}

function updateTimerDisplays() {
  const m = Math.floor(state.timer.remaining / 60);
  const s = state.timer.remaining % 60;
  const timeStr = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  
  document.getElementById("floating-timer-digits").innerText = timeStr;
  document.getElementById("header-timer-display").innerText = timeStr;
}

function toggleTimerPause() {
  state.timer.isRunning = !state.timer.isRunning;
  document.getElementById("btn-timer-toggle-pause").innerText = state.timer.isRunning ? "Pause" : "Resume";
}

function dismissRestTimer() {
  if (state.timer.intervalId) {
    clearInterval(state.timer.intervalId);
    state.timer.intervalId = null;
  }
  state.timer.isRunning = false;
  document.getElementById("floating-timer").classList.remove("visible");
  document.getElementById("header-timer-btn").classList.remove("active");
  document.getElementById("header-timer-display").innerText = "Rest";
}

// --- 9. SPLIT SCHEDULE VIEW WITH ROUTINE RESET ---
function renderSplitView() {
  const container = document.getElementById("split-grid-container");
  const routineKeys = ["push", "pull", "legs", "rest_thu", "upper", "lower", "rest_sun"];
  const todayDayIndex = new Date().getDay();

  let html = "";
  routineKeys.forEach(key => {
    const r = state.routines[key];
    const isToday = r.dayIndex === todayDayIndex;

    html += `
      <div class="split-day-card ${isToday ? 'today-highlight' : ''}">
        <div class="split-day-header">
          <div class="split-day-title">
            <span>${escapeHtml(r.dayName)}</span>
            <span style="font-size: 0.95rem; font-weight: 700; color: ${isToday ? 'var(--accent-amber)' : 'var(--text-secondary)'};">
              • ${escapeHtml(r.name)}
            </span>
          </div>
          ${isToday ? `<span class="split-day-tag tag-active-day">Today</span>` : ''}
          ${r.isRest ? `<span class="split-day-tag tag-rest">Rest Day</span>` : ''}
        </div>
        <p style="font-size: 0.8rem; color: var(--text-muted);">${escapeHtml(r.muscles)}</p>
        
        ${r.exercises && r.exercises.length > 0 ? `
          <div class="split-exercise-chips">
            ${r.exercises.map(e => `<span class="split-ex-chip">${escapeHtml(e.name)}</span>`).join("")}
          </div>
          <div style="display: flex; gap: 8px; margin-top: 10px; align-items: center;">
            <button class="btn-copy-prev" onclick="loadRoutineDirectly('${r.key}')">
              Start Workout ➔
            </button>
            <button class="btn-remove-set" style="font-size: 0.72rem;" onclick="resetRoutineToDefault('${r.key}')" title="Revert exercises to original template">
              Reset Template
            </button>
          </div>
        ` : ''}
      </div>
    `;
  });

  container.innerHTML = html;
}

function resetRoutineToDefault(key) {
  if (confirm(`Reset ${DEFAULT_ROUTINES[key].name} back to original default exercises?`)) {
    state.routines[key] = JSON.parse(JSON.stringify(DEFAULT_ROUTINES[key]));
    state.saveRoutines();
    if (state.currentRoutineKey === key) {
      state.clearDraft();
      state.setupActiveWorkout(key, true);
      renderWorkoutView();
    }
    renderSplitView();
  }
}

function loadRoutineDirectly(key) {
  switchRoutine(key);
  switchTab("tab-workout");
}

// --- 10. WORKOUT HISTORY VIEW ---
function renderHistoryView(filter = "all") {
  const container = document.getElementById("history-logs-container");
  
  let logs = state.history;
  if (filter !== "all") {
    logs = logs.filter(l => l.routineKey === filter);
  }

  if (logs.length === 0) {
    container.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 30px;">No workout logs found for this filter.</div>`;
    return;
  }

  let html = "";
  logs.forEach((log) => {
    const dateFormatted = new Date(log.date).toLocaleDateString(undefined, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    html += `
      <div class="history-card">
        <div class="history-card-header">
          <div>
            <div class="history-title">${escapeHtml(log.routineName)}</div>
            <div class="history-date">${dateFormatted}</div>
          </div>
          <button class="btn-icon-subtle" onclick="deleteHistoryLog('${log.id}')" title="Delete Log">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>

        <div class="history-ex-list">
          ${log.exercises.map(ex => `
            <div class="history-ex-item">
              <div class="history-ex-name">
                <span>${escapeHtml(ex.name)}</span>
                <span style="font-size: 0.75rem; color: var(--accent-cyan);">${escapeHtml(ex.category)}</span>
              </div>
              <div class="history-ex-sets">
                ${ex.sets.map(s => `Set ${s.setNum}: <b>${s.weight} ${escapeHtml(s.unit)}</b> × <b>${s.reps}</b> reps`).join(" • ")}
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function deleteHistoryLog(id) {
  if (confirm("Delete this historical workout log?")) {
    state.history = state.history.filter(l => l.id !== id);
    state.saveHistory();
    renderHistoryView();
    renderAnalyticsView();
  }
}

// --- 11. UNIT-AWARE ANALYTICS & PRs ---
function renderAnalyticsView() {
  const select = document.getElementById("analytics-exercise-select");
  const searchInput = document.getElementById("analytics-search-input");
  
  if (!state.history || state.history.length === 0) {
    select.innerHTML = `<option value="">No workouts logged</option>`;
    document.getElementById("stat-max-weight").innerText = "--";
    document.getElementById("stat-best-reps").innerText = "--";
    document.getElementById("stat-total-sessions").innerText = "0";
    document.getElementById("exercise-progress-chart").innerHTML = `
      <text x="50%" y="50%" text-anchor="middle" fill="#64748b" font-size="14">No workout history logged yet.</text>
    `;
    document.getElementById("pr-records-container").innerHTML = `
      <div style="color: var(--text-muted); font-size: 0.85rem; text-align: center; padding: 20px;">No PRs recorded yet. Finish a workout to establish your first records!</div>
    `;
    return;
  }

  const exerciseSet = new Set();
  state.history.forEach(log => {
    log.exercises.forEach(ex => exerciseSet.add(ex.name));
  });

  let exerciseList = Array.from(exerciseSet).sort();
  if (exerciseList.length === 0) return;

  // Filter dropdown if search text present
  const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
  if (query) {
    const matched = exerciseList.filter(name => name.toLowerCase().includes(query));
    if (matched.length > 0) {
      exerciseList = matched;
    }
  }

  if (!state.analytics.selectedExercise || !exerciseList.includes(state.analytics.selectedExercise)) {
    state.analytics.selectedExercise = exerciseList[0];
  }

  select.innerHTML = exerciseList.map(name => `
    <option value="${escapeHtml(name)}" ${name === state.analytics.selectedExercise ? 'selected' : ''}>${escapeHtml(name)}</option>
  `).join("");

  drawExerciseProgressChart(state.analytics.selectedExercise, state.analytics.selectedMetric);
  renderPRBoard();
}

function calculate1RM(weight, reps) {
  if (reps <= 1) return weight;
  return parseFloat((weight * (1 + reps / 30)).toFixed(1));
}

function drawExerciseProgressChart(exerciseName, metric = "weight") {
  const sorted = [...state.history].sort((a, b) => new Date(a.date) - new Date(b.date));
  const rawPoints = [];

  sorted.forEach(log => {
    const match = log.exercises.find(e => e.name.toLowerCase().trim() === exerciseName.toLowerCase().trim());
    if (match && match.sets && match.sets.length > 0) {
      let maxWeight = 0;
      let topReps = 0;
      let top1RM = 0;
      let unit = "kgs";

      match.sets.forEach(s => {
        const est1RM = calculate1RM(s.weight, s.reps);
        if (s.weight > maxWeight) {
          maxWeight = s.weight;
          topReps = s.reps;
          unit = s.unit;
        } else if (s.weight === maxWeight && s.reps > topReps) {
          topReps = s.reps;
          unit = s.unit;
        }
        if (est1RM > top1RM) {
          top1RM = est1RM;
        }
      });

      rawPoints.push({
        date: new Date(log.date),
        weight: maxWeight,
        unit: unit,
        reps: topReps,
        oneRM: top1RM
      });
    }
  });

  const statVal1 = document.getElementById("stat-max-weight");
  const statVal2 = document.getElementById("stat-best-reps");
  const statSessions = document.getElementById("stat-total-sessions");
  const statLabel1 = document.getElementById("stat-label-1");
  const statLabel2 = document.getElementById("stat-label-2");

  if (rawPoints.length === 0) {
    statVal1.innerText = "--";
    statVal2.innerText = "--";
    statSessions.innerText = "0";
    document.getElementById("exercise-progress-chart").innerHTML = `
      <text x="50%" y="50%" text-anchor="middle" fill="#64748b" font-size="14">No data logged yet for this exercise.</text>
    `;
    return;
  }

  const unitCounts = {};
  rawPoints.forEach(p => { unitCounts[p.unit] = (unitCounts[p.unit] || 0) + 1; });
  const dominantUnit = Object.keys(unitCounts).reduce((a, b) => unitCounts[a] > unitCounts[b] ? a : b);

  const points = rawPoints.filter(p => p.unit === dominantUnit);

  const allMaxWeight = Math.max(...points.map(p => p.weight));
  const allBestReps = Math.max(...points.map(p => p.reps));
  const allBest1RM = Math.max(...points.map(p => p.oneRM));

  statLabel1.innerText = metric === "1rm" ? "Best Est. 1RM" : (metric === "reps" ? "Best Reps" : "Max Load");
  statLabel2.innerText = metric === "reps" ? "Heaviest Load" : "Top Reps";

  if (metric === "1rm") {
    statVal1.innerText = `${allBest1RM} ${dominantUnit}`;
    statVal2.innerText = `${allBestReps} reps`;
  } else if (metric === "reps") {
    statVal1.innerText = `${allBestReps} reps`;
    statVal2.innerText = `${allMaxWeight} ${dominantUnit}`;
  } else {
    statVal1.innerText = `${allMaxWeight} ${dominantUnit}`;
    statVal2.innerText = `${allBestReps} reps`;
  }
  statSessions.innerText = points.length;

  const svg = document.getElementById("exercise-progress-chart");
  const w = svg.clientWidth || 360;
  const h = 200;
  svg.setAttribute("viewBox", `0 0 ${w} ${h}`);

  const padLeft = 40;
  const padRight = 20;
  const padTop = 30;
  const padBottom = 30;

  const innerW = w - padLeft - padRight;
  const innerH = h - padTop - padBottom;

  const getPointMetric = (p) => {
    if (metric === "1rm") return p.oneRM;
    if (metric === "reps") return p.reps;
    return p.weight;
  };

  const values = points.map(getPointMetric);
  const minVal = Math.min(...values) * 0.85;
  const maxVal = Math.max(...values) * 1.15;
  const range = maxVal - minVal || 1;

  const coords = points.map((p, i) => {
    const val = getPointMetric(p);
    const x = points.length === 1 ? padLeft + innerW / 2 : padLeft + (i / (points.length - 1)) * innerW;
    const y = padTop + innerH - ((val - minVal) / range) * innerH;
    return { x, y, p, val };
  });

  let dPath = `M ${coords[0].x} ${coords[0].y}`;
  for (let i = 1; i < coords.length; i++) {
    dPath += ` L ${coords[i].x} ${coords[i].y}`;
  }

  const dArea = `${dPath} L ${coords[coords.length - 1].x} ${padTop + innerH} L ${coords[0].x} ${padTop + innerH} Z`;

  let svgContent = `
    <line x1="${padLeft}" y1="${padTop}" x2="${w - padRight}" y2="${padTop}" stroke="#1e293b" stroke-dasharray="3,3" />
    <line x1="${padLeft}" y1="${padTop + innerH / 2}" x2="${w - padRight}" y2="${padTop + innerH / 2}" stroke="#1e293b" stroke-dasharray="3,3" />
    <line x1="${padLeft}" y1="${padTop + innerH}" x2="${w - padRight}" y2="${padTop + innerH}" stroke="#334155" />

    <defs>
      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="#f59e0b" stop-opacity="0.0"/>
      </linearGradient>
    </defs>

    <path d="${dArea}" fill="url(#chartGradient)" />
    <path d="${dPath}" fill="none" stroke="#f59e0b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
  `;

  coords.forEach((c) => {
    const dateLabel = c.p.date.toLocaleDateString(undefined, { month: 'numeric', day: 'numeric' });
    svgContent += `
      <circle cx="${c.x}" cy="${c.y}" r="5" fill="#f59e0b" stroke="#0a0f1d" stroke-width="2" />
      <text x="${c.x}" y="${c.y - 10}" text-anchor="middle" fill="#f8fafc" font-size="11" font-weight="700">
        ${c.val}
      </text>
      <text x="${c.x}" y="${padTop + innerH + 18}" text-anchor="middle" fill="#64748b" font-size="10">
        ${dateLabel}
      </text>
    `;
  });

  svg.innerHTML = svgContent;
}

// PR Hall of Fame - Unit-Safe & Muscle-Grouped
function renderPRBoard() {
  const container = document.getElementById("pr-records-container");
  const prMap = {};

  state.history.forEach(log => {
    log.exercises.forEach(ex => {
      ex.sets.forEach(s => {
        const key = `${ex.name}___${s.unit}`;
        if (!prMap[key]) {
          prMap[key] = {
            name: ex.name,
            category: ex.category || "General",
            weight: s.weight,
            unit: s.unit,
            reps: s.reps,
            oneRM: calculate1RM(s.weight, s.reps),
            date: log.date
          };
        } else {
          const current = prMap[key];
          if (s.weight > current.weight || (s.weight === current.weight && s.reps > current.reps)) {
            current.weight = s.weight;
            current.reps = s.reps;
            current.oneRM = calculate1RM(s.weight, s.reps);
            current.date = log.date;
          }
        }
      });
    });
  });

  const records = Object.values(prMap);
  if (records.length === 0) {
    container.innerHTML = `<div style="color: var(--text-muted); font-size: 0.85rem; text-align: center; padding: 20px;">No PRs recorded yet.</div>`;
    return;
  }

  const categories = ["Chest", "Back", "Shoulders", "Legs", "Hamstrings", "Calves", "Biceps", "Triceps"];
  let html = "";

  categories.forEach(cat => {
    const catRecords = records.filter(r => r.category.toLowerCase().includes(cat.toLowerCase()));
    if (catRecords.length > 0) {
      catRecords.sort((a, b) => b.weight - a.weight);
      html += `
        <div class="pr-group-title">
          <span>⚡ ${escapeHtml(cat)} Records</span>
        </div>
      `;
      catRecords.forEach(r => {
        const est1rmText = (r.unit === 'kgs' || r.unit === 'lbs') ? ` • 1RM ~${r.oneRM} ${r.unit}` : '';
        html += `
          <div class="pr-card">
            <div class="pr-left">
              <span class="pr-name">${escapeHtml(r.name)}</span>
              <span class="pr-category">${escapeHtml(r.category)}</span>
            </div>
            <div class="pr-right">
              <div class="pr-weight">${r.weight} ${escapeHtml(r.unit)}</div>
              <div class="pr-reps">${r.reps} reps${est1rmText}</div>
            </div>
          </div>
        `;
      });
    }
  });

  container.innerHTML = html;
}

// --- 12. BACKUP VALIDATION & SAFE RESTORATION ---
function validateBackupData(data) {
  if (!data || typeof data !== "object") {
    throw new Error("Backup file must be a valid JSON object.");
  }
  if (!Array.isArray(data.history)) {
    throw new Error("Backup must contain a 'history' array.");
  }

  const validUnits = new Set(["kgs", "plates", "kgs ES", "lbs"]);

  data.history.forEach((log, logIdx) => {
    if (!log || typeof log !== "object") {
      throw new Error(`Log #${logIdx + 1} is not a valid object.`);
    }
    if (typeof log.date !== "string" || isNaN(Date.parse(log.date))) {
      throw new Error(`Log #${logIdx + 1} has an invalid date timestamp.`);
    }
    if (!Array.isArray(log.exercises)) {
      throw new Error(`Log #${logIdx + 1} is missing its exercises list.`);
    }

    log.exercises.forEach((ex, exIdx) => {
      if (!ex || typeof ex !== "object" || typeof ex.name !== "string" || !ex.name.trim()) {
        throw new Error(`Log #${logIdx + 1}, Exercise #${exIdx + 1} has an invalid name.`);
      }
      if (!Array.isArray(ex.sets)) {
        throw new Error(`Exercise '${ex.name}' in Log #${logIdx + 1} is missing its sets array.`);
      }

      ex.sets.forEach((set, setIdx) => {
        if (!set || typeof set !== "object") {
          throw new Error(`Exercise '${ex.name}', Set #${setIdx + 1} is malformed.`);
        }
        const weight = Number(set.weight);
        const reps = Number(set.reps);
        if (isNaN(weight) || weight < 0) {
          throw new Error(`Exercise '${ex.name}', Set #${setIdx + 1} has an invalid weight value.`);
        }
        if (isNaN(reps) || reps < 0) {
          throw new Error(`Exercise '${ex.name}', Set #${setIdx + 1} has an invalid reps value.`);
        }
        if (!validUnits.has(set.unit)) {
          set.unit = "kgs";
        }
      });
    });
  });

  return true;
}

function exportBackup() {
  const data = {
    version: 1,
    exportedAt: new Date().toISOString(),
    history: state.history,
    routines: state.routines
  };

  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement("a");
  a.href = url;
  const dateStr = new Date().toISOString().split("T")[0];
  a.download = `pplul_gym_backup_${dateStr}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// --- EXCEL / SPREADSHEET (CSV) EXPORT ENGINE ---
function generateWorkoutCsv(historyLogs, title = "PPLUL_Progress") {
  // UTF-8 Byte Order Mark (BOM) ensures Microsoft Excel & Google Sheets parse UTF-8 characters cleanly
  const BOM = "\uFEFF";
  
  const headers = [
    "Date",
    "Routine Day",
    "Routine Name",
    "Exercise Name",
    "Muscle Group",
    "Set Number",
    "Weight / Load",
    "Unit",
    "Reps",
    "Estimated 1RM",
    "Total Volume",
    "Completed"
  ];

  const rows = [headers];

  historyLogs.forEach(log => {
    const dateFormatted = log.date ? log.date.split("T")[0] : "";
    const routineKey = (log.routineKey || "").toUpperCase();
    const routineName = log.routineName || routineKey;

    if (Array.isArray(log.exercises)) {
      log.exercises.forEach(ex => {
        const exName = ex.name || "Unknown Exercise";
        const category = ex.category || "General";

        if (Array.isArray(ex.sets)) {
          ex.sets.forEach((set, idx) => {
            const setNum = idx + 1;
            const weight = set.weight !== undefined && set.weight !== "" ? set.weight : 0;
            const unit = set.unit || "kgs";
            const reps = set.reps !== undefined && set.reps !== "" ? set.reps : 0;
            
            // Calculate Estimated 1RM if numeric and > 0
            let est1RM = "--";
            const numWeight = parseFloat(weight);
            const numReps = parseInt(reps, 10);
            if (!isNaN(numWeight) && !isNaN(numReps) && numReps > 0 && numWeight > 0) {
              if (numReps === 1) {
                est1RM = `${numWeight} ${unit}`;
              } else {
                // Brzycki standard 1RM estimate
                const calculated = Math.round(numWeight * (1 + numReps / 30) * 10) / 10;
                est1RM = `${calculated} ${unit}`;
              }
            }

            // Total volume for this set
            let volume = "--";
            if (!isNaN(numWeight) && !isNaN(numReps)) {
              volume = `${Math.round(numWeight * numReps * 10) / 10} ${unit}`;
            }

            const completed = set.completed !== false ? "Yes" : "No";

            rows.push([
              dateFormatted,
              routineKey,
              routineName,
              exName,
              category,
              setNum,
              weight,
              unit,
              reps,
              est1RM,
              volume,
              completed
            ]);
          });
        }
      });
    }
  });

  // Convert rows into RFC 4180 compliant CSV string
  const csvContent = BOM + rows.map(row => 
    row.map(cell => {
      const cellStr = String(cell === null || cell === undefined ? "" : cell);
      if (cellStr.includes(",") || cellStr.includes('"') || cellStr.includes("\n") || cellStr.includes("\r")) {
        return `"${cellStr.replace(/"/g, '""')}"`;
      }
      return cellStr;
    }).join(",")
  ).join("\r\n");

  return csvContent;
}

function downloadCsvFile(filename, csvContent) {
  // 1. Android Native App Integration: If running inside WebView with native Android bridge
  if (window.AndroidApp && typeof window.AndroidApp.saveCsv === "function") {
    try {
      window.AndroidApp.saveCsv(filename, csvContent);
      return;
    } catch (err) {
      console.warn("Android native save error, falling back to browser download:", err);
    }
  }

  // 2. Standard Browser / PWA blob download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

function exportMonthToExcel() {
  if (!state.history || state.history.length === 0) {
    alert("No workout history recorded yet to export.");
    return;
  }

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  thirtyDaysAgo.setHours(0, 0, 0, 0);

  // Filter logs within past 30 days
  const recentLogs = state.history.filter(log => {
    if (!log.date) return false;
    const logDate = new Date(log.date);
    return logDate >= thirtyDaysAgo;
  });

  if (recentLogs.length === 0) {
    const proceed = confirm("No workouts found in the past 30 days. Would you like to export your entire workout history to Excel instead?");
    if (proceed) {
      exportAllToExcel();
    }
    return;
  }

  const dateStr = new Date().toISOString().split("T")[0];
  const filename = `PPLUL_Progress_Past_30_Days_${dateStr}.csv`;
  const csv = generateWorkoutCsv(recentLogs, "Past 30 Days");
  downloadCsvFile(filename, csv);
}

function exportAllToExcel() {
  if (!state.history || state.history.length === 0) {
    alert("No workout history recorded yet to export.");
    return;
  }

  const dateStr = new Date().toISOString().split("T")[0];
  const filename = `PPLUL_Progress_All_Time_${dateStr}.csv`;
  const csv = generateWorkoutCsv(state.history, "All Time");
  downloadCsvFile(filename, csv);
}

function importBackup(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const parsed = JSON.parse(e.target.result);
      
      validateBackupData(parsed);

      state.history = parsed.history;
      state.saveHistory();

      if (parsed.routines && typeof parsed.routines === "object") {
        state.routines = parsed.routines;
        state.saveRoutines();
      }

      alert("Workout database successfully verified and restored!");
      state.init();
      renderWorkoutView();
      renderHistoryView();
      renderAnalyticsView();
      renderSplitView();
    } catch (err) {
      alert("Restore Failed: " + err.message);
    }
  };
  reader.readAsText(file);
}

// --- 13. MODAL UTILITIES ---
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add("active");
  if (id === "modal-add-exercise") {
    // Reset search inputs & render library
    const searchInput = document.getElementById("exercise-search-input");
    if (searchInput) {
      searchInput.value = "";
      state.search.query = "";
      state.search.muscleFilter = "all";
      document.querySelectorAll("#search-category-pills .search-filter-pill").forEach(p => {
        p.classList.toggle("active", p.dataset.muscle === "all");
      });
      renderExerciseLibrary();
      setTimeout(() => searchInput.focus(), 150);
    }
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove("active");
}

function switchTab(tabId) {
  document.querySelectorAll(".tab-view").forEach(tab => tab.classList.remove("active"));
  document.querySelectorAll(".nav-item").forEach(item => item.classList.remove("active"));

  const targetTab = document.getElementById(tabId);
  if (targetTab) targetTab.classList.add("active");

  const targetNav = document.querySelector(`.nav-item[data-tab="${tabId}"]`);
  if (targetNav) targetNav.classList.add("active");

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (tabId === "tab-workout") renderWorkoutView();
  if (tabId === "tab-split") renderSplitView();
  if (tabId === "tab-history") renderHistoryView();
  if (tabId === "tab-analytics") renderAnalyticsView();
}

// --- 14. INITIALIZATION & EVENT LISTENERS ---
document.addEventListener("DOMContentLoaded", () => {
  // Setup Dynamic Mobile URL & QR Code
  const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
  const lanUrl = "http://192.168.100.89" + window.location.pathname;
  const activeUrl = isLocalhost ? lanUrl : window.location.href;

  const ipLinkEl = document.getElementById("mobile-ip-link");
  if (ipLinkEl) {
    ipLinkEl.innerText = activeUrl;
  }
  document.querySelectorAll(".current-app-url").forEach(el => {
    el.innerText = activeUrl;
  });

  try {
    const qrContainer = document.getElementById("settings-qrcode-box");
    if (qrContainer && typeof QRCode !== "undefined") {
      new QRCode(qrContainer, {
        text: activeUrl,
        width: 140,
        height: 140,
        colorDark: "#0f172a",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.M
      });
    }
  } catch (err) {
    console.error("QR Code error:", err);
  }

  // Navigation Tabs
  document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", () => {
      switchTab(item.dataset.tab);
      window.location.hash = item.dataset.tab;
    });
  });

  // Support direct linking via hash (e.g. #tab-history or #tab-settings)
  if (window.location.hash) {
    const requested = window.location.hash.replace("#", "");
    if (document.getElementById(requested)) {
      switchTab(requested);
    }
  }

  // Routine Quick Pills
  document.querySelectorAll("#routine-quick-pills .split-pill").forEach(pill => {
    pill.addEventListener("click", () => switchRoutine(pill.dataset.routine));
  });

  // Switch Routine Dropdown
  document.getElementById("btn-switch-routine").addEventListener("click", () => {
    const keys = ["push", "pull", "legs", "upper", "lower", "rest_thu"];
    const names = ["Push (Mon)", "Pull (Tue)", "Legs (Wed)", "Upper (Fri)", "Lower (Sat)", "Rest Day"];
    const choice = prompt("Select Routine:\n" + names.map((n, i) => `${i + 1}. ${n}`).join("\n"));
    const num = parseInt(choice);
    if (num >= 1 && num <= keys.length) {
      switchRoutine(keys[num - 1]);
    }
  });

  // Add Exercise Trigger: Opens Exercise Library Search Modal
  document.getElementById("btn-add-exercise-trigger").addEventListener("click", () => {
    openModal("modal-add-exercise");
  });

  // Live Exercise Library Search Input
  const searchInput = document.getElementById("exercise-search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.search.query = e.target.value;
      renderExerciseLibrary();
    });
  }

  // Search Muscle Filter Pills
  document.querySelectorAll("#search-category-pills .search-filter-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      document.querySelectorAll("#search-category-pills .search-filter-pill").forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      state.search.muscleFilter = pill.dataset.muscle;
      renderExerciseLibrary();
    });
  });

  // Toggle Custom Exercise Panel
  const customToggle = document.getElementById("custom-exercise-toggle");
  const customForm = document.getElementById("custom-exercise-form");
  if (customToggle && customForm) {
    customToggle.addEventListener("click", () => {
      const isHidden = customForm.style.display === "none";
      customForm.style.display = isHidden ? "block" : "none";
      customToggle.querySelector("span:last-child").innerText = isHidden ? "▴" : "▾";
      if (isHidden) {
        document.getElementById("new-ex-name").focus();
      }
    });
  }

  // Save Custom Exercise Button
  document.getElementById("btn-save-new-exercise").addEventListener("click", () => {
    const name = document.getElementById("new-ex-name").value.trim();
    const category = document.getElementById("new-ex-category").value;
    const unit = document.getElementById("new-ex-unit").value;

    if (!name) {
      alert("Please enter an exercise name!");
      return;
    }

    addExerciseToActiveWorkout(name, category, unit);
    document.getElementById("new-ex-name").value = "";
  });

  // Finish Workout Button
  document.getElementById("btn-finish-workout").addEventListener("click", finishWorkout);

  // Reset Workout Button
  document.getElementById("btn-reset-current-workout").addEventListener("click", () => {
    if (confirm("Reset current inputs to blank / previous defaults?")) {
      state.clearDraft();
      state.setupActiveWorkout(state.currentRoutineKey, true);
      renderWorkoutView();
    }
  });

  // Header Rest Timer Button
  document.getElementById("header-timer-btn").addEventListener("click", () => {
    const bar = document.getElementById("floating-timer");
    if (bar.classList.contains("visible")) {
      bar.classList.remove("visible");
    } else {
      bar.classList.add("visible");
      if (!state.timer.isRunning) {
        startRestTimer(90);
      }
    }
  });

  // Timer Preset Buttons
  document.querySelectorAll(".timer-preset-btn[data-time]").forEach(btn => {
    btn.addEventListener("click", () => startRestTimer(parseInt(btn.dataset.time)));
  });

  document.getElementById("btn-timer-toggle-pause").addEventListener("click", toggleTimerPause);
  document.getElementById("btn-close-timer").addEventListener("click", dismissRestTimer);

  // History Filter Buttons
  document.querySelectorAll("[data-history-filter]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-history-filter]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderHistoryView(btn.dataset.historyFilter);
    });
  });

  // Analytics Metric Toggles
  document.querySelectorAll("#analytics-metric-toggles .analytics-toggle-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#analytics-metric-toggles .analytics-toggle-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.analytics.selectedMetric = btn.dataset.metric;
      drawExerciseProgressChart(state.analytics.selectedExercise, state.analytics.selectedMetric);
    });
  });

  // Analytics Live Search Input
  const analyticsSearchInput = document.getElementById("analytics-search-input");
  if (analyticsSearchInput) {
    analyticsSearchInput.addEventListener("input", (e) => {
      renderAnalyticsView();
    });
  }

  // Analytics Exercise Select
  document.getElementById("analytics-exercise-select").addEventListener("change", (e) => {
    state.analytics.selectedExercise = e.target.value;
    drawExerciseProgressChart(state.analytics.selectedExercise, state.analytics.selectedMetric);
  });

  // History View Excel Export Buttons
  const histExportMonth = document.getElementById("btn-history-export-month");
  if (histExportMonth) histExportMonth.addEventListener("click", exportMonthToExcel);

  const histExportAll = document.getElementById("btn-history-export-all");
  if (histExportAll) histExportAll.addEventListener("click", exportAllToExcel);

  // Settings Buttons
  const setExportMonth = document.getElementById("btn-export-excel-month");
  if (setExportMonth) setExportMonth.addEventListener("click", exportMonthToExcel);

  const setExportAll = document.getElementById("btn-export-excel-all");
  if (setExportAll) setExportAll.addEventListener("click", exportAllToExcel);

  document.getElementById("btn-export-backup").addEventListener("click", exportBackup);
  
  const importTrigger = document.getElementById("btn-import-backup-trigger");
  const fileInput = document.getElementById("import-file-input");
  importTrigger.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", (e) => {
    if (e.target.files.length > 0) {
      importBackup(e.target.files[0]);
    }
  });

  document.getElementById("btn-reset-seed-data").addEventListener("click", () => {
    if (confirm("Reload original workout logs from your notes? (This will restore your push, pull, legs data)")) {
      state.history = JSON.parse(JSON.stringify(INITIAL_SEED_HISTORY));
      state.routines = JSON.parse(JSON.stringify(DEFAULT_ROUTINES));
      state.saveHistory();
      state.saveRoutines();
      state.clearDraft();
      state.setupActiveWorkout(state.currentRoutineKey, true);
      renderWorkoutView();
      renderHistoryView();
      renderAnalyticsView();
      renderSplitView();
      alert("Reloaded original workout logs and default routines!");
    }
  });

  document.getElementById("btn-clear-all-data").addEventListener("click", () => {
    if (confirm("Are you sure you want to delete ALL data? All workout logs and drafts will be wiped. (Make a JSON backup first!)")) {
      localStorage.clear();
      localStorage.setItem("pplul_gym_initialized", "true");
      state.history = [];
      state.saveHistory();
      state.clearDraft();
      state.setupActiveWorkout(state.currentRoutineKey, true);
      renderWorkoutView();
      renderHistoryView();
      renderAnalyticsView();
      renderSplitView();
      alert("All workout logs and data cleared. You now have a clean slate.");
    }
  });

  const iosGuideBtn = document.getElementById("btn-show-ios-guide");
  if (iosGuideBtn) iosGuideBtn.addEventListener("click", () => openModal("modal-ios-guide"));

  document.getElementById("btn-show-install-guide").addEventListener("click", () => openModal("modal-install-guide"));
  document.getElementById("btn-show-apk-guide").addEventListener("click", () => openModal("modal-apk-guide"));

  // Modal Closers
  document.querySelectorAll("[data-close-modal]").forEach(btn => {
    btn.addEventListener("click", () => closeModal(btn.dataset.closeModal));
  });

  document.querySelectorAll(".modal-overlay").forEach(overlay => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        closeModal(overlay.id);
      }
    });
  });

  // Service Worker for Offline Gym Use
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js")
      .then(reg => console.log("Service Worker active for offline gym use", reg))
      .catch(err => console.warn("SW notice: Offline worker ready, requires localhost or HTTPS origin.", err));
  }

  // Initial Renders
  renderWorkoutView();
  renderSplitView();
  renderHistoryView();
  renderAnalyticsView();
  renderExerciseLibrary();
});
