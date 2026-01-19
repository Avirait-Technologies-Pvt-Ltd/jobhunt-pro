import {
  SkillAssessment,
  AssessmentQuestion,
  AssessmentBadge,
  SkillCategory,
  AssessmentDifficulty,
  AssessmentFilters,
  AssessmentSortOption,
  UserAssessmentStats,
  AssessmentResult,
  CategoryPerformance,
  AssessmentHistory,
} from '@/types/skill-assessment';

// Assessment Badges
export const assessmentBadges: AssessmentBadge[] = [
  {
    id: 'badge-js-beginner',
    name: 'JavaScript Beginner',
    icon: 'code',
    color: 'yellow',
    description: 'Completed the JavaScript Fundamentals assessment',
  },
  {
    id: 'badge-js-intermediate',
    name: 'JavaScript Developer',
    icon: 'code-2',
    color: 'blue',
    description: 'Passed the JavaScript Intermediate assessment',
  },
  {
    id: 'badge-react-dev',
    name: 'React Developer',
    icon: 'component',
    color: 'cyan',
    description: 'Demonstrated proficiency in React fundamentals',
  },
  {
    id: 'badge-python-beginner',
    name: 'Python Beginner',
    icon: 'terminal',
    color: 'green',
    description: 'Completed the Python Basics assessment',
  },
  {
    id: 'badge-sql-master',
    name: 'SQL Master',
    icon: 'database',
    color: 'orange',
    description: 'Mastered SQL queries and database operations',
  },
  {
    id: 'badge-soft-skills',
    name: 'Communication Pro',
    icon: 'users',
    color: 'pink',
    description: 'Demonstrated excellent soft skills',
  },
  {
    id: 'badge-problem-solver',
    name: 'Problem Solver',
    icon: 'lightbulb',
    color: 'purple',
    description: 'Excelled in problem-solving challenges',
  },
  {
    id: 'badge-leader',
    name: 'Leadership Star',
    icon: 'star',
    color: 'indigo',
    description: 'Demonstrated strong leadership abilities',
  },
];

// Assessment Questions Pool
export const assessmentQuestions: AssessmentQuestion[] = [
  // JavaScript Beginner Questions
  {
    id: 'js-q-1',
    question: 'What is the correct way to declare a variable in JavaScript that cannot be reassigned?',
    type: 'multiple-choice',
    category: 'programming',
    difficulty: 'beginner',
    options: ['var x = 10', 'let x = 10', 'const x = 10', 'variable x = 10'],
    correctAnswer: 2,
    explanation: 'The const keyword is used to declare variables that cannot be reassigned after initialization.',
    points: 10,
    timeLimit: 30,
    tags: ['javascript', 'variables', 'fundamentals'],
  },
  {
    id: 'js-q-2',
    question: 'Which method is used to add an element to the end of an array?',
    type: 'multiple-choice',
    category: 'programming',
    difficulty: 'beginner',
    options: ['push()', 'pop()', 'shift()', 'unshift()'],
    correctAnswer: 0,
    explanation: 'The push() method adds one or more elements to the end of an array and returns the new length.',
    points: 10,
    timeLimit: 30,
    tags: ['javascript', 'arrays', 'methods'],
  },
  {
    id: 'js-q-3',
    question: 'What will console.log(typeof null) output?',
    type: 'multiple-choice',
    category: 'programming',
    difficulty: 'beginner',
    options: ['null', 'undefined', 'object', 'boolean'],
    correctAnswer: 2,
    explanation: 'This is a known bug in JavaScript. typeof null returns "object" due to legacy reasons.',
    points: 10,
    timeLimit: 30,
    tags: ['javascript', 'types', 'quirks'],
  },
  {
    id: 'js-q-4',
    question: 'JavaScript is a single-threaded programming language.',
    type: 'true-false',
    category: 'programming',
    difficulty: 'beginner',
    options: ['True', 'False'],
    correctAnswer: 0,
    explanation: 'JavaScript is single-threaded, meaning it executes code sequentially on a single thread, though it uses async mechanisms for concurrency.',
    points: 10,
    timeLimit: 20,
    tags: ['javascript', 'concepts', 'threading'],
  },
  {
    id: 'js-q-5',
    question: 'What is the output of: console.log(2 + "2")?',
    type: 'multiple-choice',
    category: 'programming',
    difficulty: 'beginner',
    options: ['4', '22', '"22"', 'NaN'],
    correctAnswer: 1,
    explanation: 'JavaScript performs type coercion. When a number is added to a string, the number is converted to a string, resulting in concatenation.',
    points: 10,
    timeLimit: 30,
    tags: ['javascript', 'type-coercion', 'operators'],
  },

  // JavaScript Intermediate Questions
  {
    id: 'js-q-6',
    question: 'What is a closure in JavaScript?',
    type: 'multiple-choice',
    category: 'programming',
    difficulty: 'intermediate',
    options: [
      'A function that has access to variables from its outer scope',
      'A function that is called immediately',
      'A method to close the browser window',
      'A way to end a loop early',
    ],
    correctAnswer: 0,
    explanation: 'A closure is a function that retains access to variables from its outer (enclosing) scope even after the outer function has returned.',
    points: 20,
    timeLimit: 45,
    tags: ['javascript', 'closures', 'scope'],
  },
  {
    id: 'js-q-7',
    question: 'Which statement correctly creates a Promise that resolves after 1 second?',
    type: 'multiple-choice',
    category: 'programming',
    difficulty: 'intermediate',
    options: [
      'new Promise(resolve => setTimeout(resolve, 1000))',
      'Promise.resolve(setTimeout(1000))',
      'new Promise(setTimeout(1000))',
      'Promise.timeout(1000)',
    ],
    correctAnswer: 0,
    explanation: 'A Promise is created with a callback that receives resolve and reject functions. setTimeout is used to delay the resolve call.',
    points: 20,
    timeLimit: 45,
    tags: ['javascript', 'promises', 'async'],
  },
  {
    id: 'js-q-8',
    question: 'What is the difference between == and === in JavaScript?',
    type: 'multiple-choice',
    category: 'programming',
    difficulty: 'intermediate',
    options: [
      'No difference, they are identical',
      '== compares values, === compares values and types',
      '=== compares values, == compares values and types',
      '== is for numbers, === is for strings',
    ],
    correctAnswer: 1,
    explanation: '== performs type coercion before comparison, while === (strict equality) compares both value and type without coercion.',
    points: 20,
    timeLimit: 45,
    tags: ['javascript', 'operators', 'comparison'],
  },
  {
    id: 'js-q-9',
    question: 'The event loop allows JavaScript to perform non-blocking operations.',
    type: 'true-false',
    category: 'programming',
    difficulty: 'intermediate',
    options: ['True', 'False'],
    correctAnswer: 0,
    explanation: 'The event loop enables JavaScript to handle asynchronous operations by processing callbacks when the call stack is empty.',
    points: 20,
    timeLimit: 20,
    tags: ['javascript', 'event-loop', 'async'],
  },
  {
    id: 'js-q-10',
    question: 'What does the spread operator (...) do when used with an array?',
    type: 'multiple-choice',
    category: 'programming',
    difficulty: 'intermediate',
    options: [
      'Removes all elements from the array',
      'Expands the array into individual elements',
      'Sorts the array in ascending order',
      'Reverses the array',
    ],
    correctAnswer: 1,
    explanation: 'The spread operator expands an iterable (like an array) into individual elements, useful for copying arrays or passing arguments.',
    points: 20,
    timeLimit: 45,
    tags: ['javascript', 'es6', 'operators'],
  },

  // React Questions
  {
    id: 'react-q-1',
    question: 'What hook is used to manage state in a functional React component?',
    type: 'multiple-choice',
    category: 'frontend',
    difficulty: 'beginner',
    options: ['useEffect', 'useState', 'useContext', 'useReducer'],
    correctAnswer: 1,
    explanation: 'useState is the primary hook for adding state to functional components. It returns a state value and a function to update it.',
    points: 10,
    timeLimit: 30,
    tags: ['react', 'hooks', 'state'],
  },
  {
    id: 'react-q-2',
    question: 'What is the purpose of the useEffect hook?',
    type: 'multiple-choice',
    category: 'frontend',
    difficulty: 'beginner',
    options: [
      'To create new components',
      'To handle side effects in functional components',
      'To manage routing',
      'To style components',
    ],
    correctAnswer: 1,
    explanation: 'useEffect is used for side effects like data fetching, subscriptions, or manually changing the DOM in functional components.',
    points: 10,
    timeLimit: 30,
    tags: ['react', 'hooks', 'effects'],
  },
  {
    id: 'react-q-3',
    question: 'What is JSX?',
    type: 'multiple-choice',
    category: 'frontend',
    difficulty: 'beginner',
    options: [
      'A JavaScript framework',
      'A syntax extension for JavaScript that looks like HTML',
      'A CSS preprocessor',
      'A testing library',
    ],
    correctAnswer: 1,
    explanation: 'JSX is a syntax extension that allows writing HTML-like code in JavaScript. It gets compiled to React.createElement calls.',
    points: 10,
    timeLimit: 30,
    tags: ['react', 'jsx', 'fundamentals'],
  },
  {
    id: 'react-q-4',
    question: 'In React, props are read-only and should not be modified by the component that receives them.',
    type: 'true-false',
    category: 'frontend',
    difficulty: 'beginner',
    options: ['True', 'False'],
    correctAnswer: 0,
    explanation: 'Props are immutable. A component should never modify its own props. This ensures predictable and maintainable code.',
    points: 10,
    timeLimit: 20,
    tags: ['react', 'props', 'concepts'],
  },
  {
    id: 'react-q-5',
    question: 'What is the virtual DOM in React?',
    type: 'multiple-choice',
    category: 'frontend',
    difficulty: 'intermediate',
    options: [
      'A direct copy of the browser DOM',
      'A lightweight JavaScript representation of the actual DOM',
      'A new HTML standard',
      'A React-specific browser',
    ],
    correctAnswer: 1,
    explanation: 'The virtual DOM is a lightweight copy of the actual DOM. React uses it to minimize direct DOM manipulations for better performance.',
    points: 20,
    timeLimit: 45,
    tags: ['react', 'virtual-dom', 'performance'],
  },

  // Python Questions
  {
    id: 'py-q-1',
    question: 'What is the correct way to create a list in Python?',
    type: 'multiple-choice',
    category: 'programming',
    difficulty: 'beginner',
    options: ['list = (1, 2, 3)', 'list = [1, 2, 3]', 'list = {1, 2, 3}', 'list = <1, 2, 3>'],
    correctAnswer: 1,
    explanation: 'Lists in Python are created using square brackets []. Parentheses create tuples, and curly braces create sets or dictionaries.',
    points: 10,
    timeLimit: 30,
    tags: ['python', 'lists', 'fundamentals'],
  },
  {
    id: 'py-q-2',
    question: 'Which keyword is used to define a function in Python?',
    type: 'multiple-choice',
    category: 'programming',
    difficulty: 'beginner',
    options: ['function', 'func', 'def', 'define'],
    correctAnswer: 2,
    explanation: 'The def keyword is used to define functions in Python, followed by the function name and parameters in parentheses.',
    points: 10,
    timeLimit: 30,
    tags: ['python', 'functions', 'fundamentals'],
  },
  {
    id: 'py-q-3',
    question: 'Python uses indentation to define code blocks.',
    type: 'true-false',
    category: 'programming',
    difficulty: 'beginner',
    options: ['True', 'False'],
    correctAnswer: 0,
    explanation: 'Unlike many languages that use braces, Python uses indentation (whitespace) to define code blocks and scope.',
    points: 10,
    timeLimit: 20,
    tags: ['python', 'syntax', 'fundamentals'],
  },
  {
    id: 'py-q-4',
    question: 'What does the len() function return when called on a string?',
    type: 'multiple-choice',
    category: 'programming',
    difficulty: 'beginner',
    options: [
      'The last character of the string',
      'The number of characters in the string',
      'The string in uppercase',
      'The memory address of the string',
    ],
    correctAnswer: 1,
    explanation: 'The len() function returns the number of characters (length) of a string, or the number of items in other sequences.',
    points: 10,
    timeLimit: 30,
    tags: ['python', 'strings', 'functions'],
  },
  {
    id: 'py-q-5',
    question: 'What is a Python decorator?',
    type: 'multiple-choice',
    category: 'programming',
    difficulty: 'intermediate',
    options: [
      'A way to add CSS to Python code',
      'A function that modifies the behavior of another function',
      'A method to create classes',
      'A type of loop',
    ],
    correctAnswer: 1,
    explanation: 'Decorators are functions that wrap other functions to extend or modify their behavior without changing their code.',
    points: 20,
    timeLimit: 45,
    tags: ['python', 'decorators', 'advanced'],
  },

  // SQL Questions
  {
    id: 'sql-q-1',
    question: 'Which SQL clause is used to filter records?',
    type: 'multiple-choice',
    category: 'database',
    difficulty: 'beginner',
    options: ['SELECT', 'WHERE', 'FROM', 'ORDER BY'],
    correctAnswer: 1,
    explanation: 'The WHERE clause is used to filter records based on specified conditions in SQL queries.',
    points: 10,
    timeLimit: 30,
    tags: ['sql', 'queries', 'filtering'],
  },
  {
    id: 'sql-q-2',
    question: 'What does the JOIN operation do in SQL?',
    type: 'multiple-choice',
    category: 'database',
    difficulty: 'beginner',
    options: [
      'Deletes records from a table',
      'Combines rows from two or more tables based on a related column',
      'Creates a new table',
      'Sorts the results',
    ],
    correctAnswer: 1,
    explanation: 'JOIN combines rows from two or more tables based on a related column between them.',
    points: 10,
    timeLimit: 30,
    tags: ['sql', 'joins', 'tables'],
  },
  {
    id: 'sql-q-3',
    question: 'Which SQL statement is used to insert new data into a database?',
    type: 'multiple-choice',
    category: 'database',
    difficulty: 'beginner',
    options: ['ADD', 'INSERT INTO', 'UPDATE', 'CREATE'],
    correctAnswer: 1,
    explanation: 'INSERT INTO is used to add new rows of data into a table in the database.',
    points: 10,
    timeLimit: 30,
    tags: ['sql', 'insert', 'fundamentals'],
  },
  {
    id: 'sql-q-4',
    question: 'A PRIMARY KEY constraint allows NULL values.',
    type: 'true-false',
    category: 'database',
    difficulty: 'beginner',
    options: ['True', 'False'],
    correctAnswer: 1,
    explanation: 'A PRIMARY KEY must be unique and cannot be NULL. It uniquely identifies each record in a table.',
    points: 10,
    timeLimit: 20,
    tags: ['sql', 'constraints', 'primary-key'],
  },
  {
    id: 'sql-q-5',
    question: 'What is the difference between INNER JOIN and LEFT JOIN?',
    type: 'multiple-choice',
    category: 'database',
    difficulty: 'intermediate',
    options: [
      'No difference, they are identical',
      'INNER JOIN returns only matching rows, LEFT JOIN returns all rows from left table',
      'LEFT JOIN is faster than INNER JOIN',
      'INNER JOIN works with more than 2 tables, LEFT JOIN does not',
    ],
    correctAnswer: 1,
    explanation: 'INNER JOIN returns only rows with matches in both tables. LEFT JOIN returns all rows from the left table and matched rows from the right.',
    points: 20,
    timeLimit: 45,
    tags: ['sql', 'joins', 'advanced'],
  },

  // Soft Skills Questions
  {
    id: 'soft-q-1',
    question: 'What is the most effective approach when receiving critical feedback from a colleague?',
    type: 'scenario-based',
    category: 'soft-skills',
    difficulty: 'beginner',
    options: [
      'Defend your actions immediately',
      'Listen actively, thank them, and reflect on the feedback',
      'Ignore the feedback if you disagree',
      'Complain to your manager about the colleague',
    ],
    correctAnswer: 1,
    explanation: 'Active listening and reflection show emotional intelligence. Feedback, even critical, is an opportunity for growth.',
    points: 10,
    timeLimit: 45,
    tags: ['communication', 'feedback', 'emotional-intelligence'],
  },
  {
    id: 'soft-q-2',
    question: 'Effective communication always requires speaking more than listening.',
    type: 'true-false',
    category: 'soft-skills',
    difficulty: 'beginner',
    options: ['True', 'False'],
    correctAnswer: 1,
    explanation: 'Effective communication often requires more listening than speaking. Active listening helps understand others and respond appropriately.',
    points: 10,
    timeLimit: 20,
    tags: ['communication', 'listening', 'skills'],
  },
  {
    id: 'soft-q-3',
    question: 'What is the best approach when working with a team member who has a different work style?',
    type: 'scenario-based',
    category: 'soft-skills',
    difficulty: 'intermediate',
    options: [
      'Insist they adapt to your work style',
      'Avoid working with them whenever possible',
      'Find common ground and leverage each other\'s strengths',
      'Report the differences to management',
    ],
    correctAnswer: 2,
    explanation: 'Diverse work styles can be complementary. Finding common ground and leveraging strengths leads to better collaboration.',
    points: 20,
    timeLimit: 45,
    tags: ['teamwork', 'collaboration', 'adaptability'],
  },
  {
    id: 'soft-q-4',
    question: 'What is the primary purpose of active listening in workplace communication?',
    type: 'multiple-choice',
    category: 'communication',
    difficulty: 'beginner',
    options: [
      'To prepare your response while the other person is talking',
      'To fully understand the message and show the speaker they are valued',
      'To identify mistakes in what the speaker is saying',
      'To end conversations quickly',
    ],
    correctAnswer: 1,
    explanation: 'Active listening focuses on understanding the complete message and making the speaker feel heard and valued.',
    points: 10,
    timeLimit: 30,
    tags: ['communication', 'listening', 'workplace'],
  },
  {
    id: 'soft-q-5',
    question: 'In a conflict situation, what is the most constructive first step?',
    type: 'scenario-based',
    category: 'soft-skills',
    difficulty: 'intermediate',
    options: [
      'Assert your position strongly to establish dominance',
      'Seek to understand the other person\'s perspective first',
      'Involve a third party immediately',
      'Avoid the conflict until it resolves itself',
    ],
    correctAnswer: 1,
    explanation: 'Understanding the other perspective helps identify the root cause and find mutually beneficial solutions.',
    points: 20,
    timeLimit: 45,
    tags: ['conflict-resolution', 'communication', 'empathy'],
  },

  // Leadership Questions
  {
    id: 'lead-q-1',
    question: 'What is the primary characteristic of a servant leadership style?',
    type: 'multiple-choice',
    category: 'leadership',
    difficulty: 'intermediate',
    options: [
      'Making all decisions without team input',
      'Prioritizing the growth and well-being of team members',
      'Delegating all responsibilities to the team',
      'Focusing primarily on achieving targets',
    ],
    correctAnswer: 1,
    explanation: 'Servant leadership focuses on serving the team first, helping them develop and perform at their best.',
    points: 20,
    timeLimit: 45,
    tags: ['leadership', 'management', 'styles'],
  },
  {
    id: 'lead-q-2',
    question: 'Effective leaders should never show vulnerability to their team.',
    type: 'true-false',
    category: 'leadership',
    difficulty: 'intermediate',
    options: ['True', 'False'],
    correctAnswer: 1,
    explanation: 'Showing appropriate vulnerability builds trust and creates psychological safety, enabling better team performance.',
    points: 20,
    timeLimit: 20,
    tags: ['leadership', 'vulnerability', 'trust'],
  },
  {
    id: 'lead-q-3',
    question: 'What is the best way to handle a high-performing team member who is negatively affecting team morale?',
    type: 'scenario-based',
    category: 'leadership',
    difficulty: 'advanced',
    options: [
      'Ignore the behavior as long as they deliver results',
      'Immediately remove them from the team',
      'Have a private conversation to address the behavior and set expectations',
      'Let the team handle it themselves',
    ],
    correctAnswer: 2,
    explanation: 'Addressing behavior directly while acknowledging contributions gives the person a chance to improve while protecting team morale.',
    points: 30,
    timeLimit: 60,
    tags: ['leadership', 'management', 'difficult-conversations'],
  },

  // Problem Solving Questions
  {
    id: 'prob-q-1',
    question: 'What is the first step in the problem-solving process?',
    type: 'multiple-choice',
    category: 'problem-solving',
    difficulty: 'beginner',
    options: [
      'Implement a solution immediately',
      'Define and understand the problem clearly',
      'Assign blame for the problem',
      'Create a project timeline',
    ],
    correctAnswer: 1,
    explanation: 'Understanding the problem fully is crucial. Rushing to solutions without clarity often leads to solving the wrong problem.',
    points: 10,
    timeLimit: 30,
    tags: ['problem-solving', 'methodology', 'analysis'],
  },
  {
    id: 'prob-q-2',
    question: 'Root cause analysis is only useful for technical problems.',
    type: 'true-false',
    category: 'problem-solving',
    difficulty: 'beginner',
    options: ['True', 'False'],
    correctAnswer: 1,
    explanation: 'Root cause analysis is applicable to any problem - technical, process, or people-related - to find underlying causes.',
    points: 10,
    timeLimit: 20,
    tags: ['problem-solving', 'root-cause', 'analysis'],
  },
  {
    id: 'prob-q-3',
    question: 'Which approach is most effective for complex problems with many variables?',
    type: 'multiple-choice',
    category: 'problem-solving',
    difficulty: 'intermediate',
    options: [
      'Solving everything at once to save time',
      'Breaking the problem into smaller, manageable parts',
      'Ignoring less critical variables',
      'Waiting for more information before starting',
    ],
    correctAnswer: 1,
    explanation: 'Decomposing complex problems into smaller parts makes them manageable and allows systematic progress.',
    points: 20,
    timeLimit: 45,
    tags: ['problem-solving', 'decomposition', 'complexity'],
  },

  // Backend Questions
  {
    id: 'back-q-1',
    question: 'What does REST stand for in RESTful APIs?',
    type: 'multiple-choice',
    category: 'backend',
    difficulty: 'beginner',
    options: [
      'Representational State Transfer',
      'Remote Execution Standard Technology',
      'Resource Efficient Server Transfer',
      'Relational Entity State Transfer',
    ],
    correctAnswer: 0,
    explanation: 'REST stands for Representational State Transfer, an architectural style for designing networked applications.',
    points: 10,
    timeLimit: 30,
    tags: ['backend', 'rest', 'api'],
  },
  {
    id: 'back-q-2',
    question: 'Which HTTP method is typically used to update an existing resource?',
    type: 'multiple-choice',
    category: 'backend',
    difficulty: 'beginner',
    options: ['GET', 'POST', 'PUT', 'DELETE'],
    correctAnswer: 2,
    explanation: 'PUT is typically used to update an existing resource. PATCH can also be used for partial updates.',
    points: 10,
    timeLimit: 30,
    tags: ['backend', 'http', 'methods'],
  },
  {
    id: 'back-q-3',
    question: 'HTTP is a stateless protocol.',
    type: 'true-false',
    category: 'backend',
    difficulty: 'beginner',
    options: ['True', 'False'],
    correctAnswer: 0,
    explanation: 'HTTP is stateless, meaning each request is independent. State is maintained through mechanisms like sessions and cookies.',
    points: 10,
    timeLimit: 20,
    tags: ['backend', 'http', 'concepts'],
  },
  {
    id: 'back-q-4',
    question: 'What is the purpose of middleware in a web application?',
    type: 'multiple-choice',
    category: 'backend',
    difficulty: 'intermediate',
    options: [
      'To style the frontend',
      'To process requests between receiving them and sending responses',
      'To store data in the database',
      'To manage DNS records',
    ],
    correctAnswer: 1,
    explanation: 'Middleware functions process requests and responses, handling tasks like authentication, logging, and error handling.',
    points: 20,
    timeLimit: 45,
    tags: ['backend', 'middleware', 'architecture'],
  },
  {
    id: 'back-q-5',
    question: 'What HTTP status code indicates a successful resource creation?',
    type: 'multiple-choice',
    category: 'backend',
    difficulty: 'intermediate',
    options: ['200 OK', '201 Created', '204 No Content', '301 Moved Permanently'],
    correctAnswer: 1,
    explanation: '201 Created indicates that a request was successful and a new resource was created as a result.',
    points: 20,
    timeLimit: 30,
    tags: ['backend', 'http', 'status-codes'],
  },
];

// Skill Assessments
export const skillAssessments: SkillAssessment[] = [
  {
    id: 'assessment-js-beginner',
    title: 'JavaScript Fundamentals',
    description: 'Test your knowledge of JavaScript basics including variables, types, arrays, and functions.',
    category: 'programming',
    difficulty: 'beginner',
    questions: assessmentQuestions.filter(
      (q) => q.tags.includes('javascript') && q.difficulty === 'beginner'
    ),
    passingScore: 70,
    timeLimit: 300, // 5 minutes
    totalPoints: 50,
    badge: assessmentBadges.find((b) => b.id === 'badge-js-beginner')!,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
  },
  {
    id: 'assessment-js-intermediate',
    title: 'JavaScript Intermediate',
    description: 'Advanced JavaScript concepts including closures, promises, async/await, and ES6+ features.',
    category: 'programming',
    difficulty: 'intermediate',
    questions: assessmentQuestions.filter(
      (q) => q.tags.includes('javascript') && q.difficulty === 'intermediate'
    ),
    passingScore: 70,
    timeLimit: 600, // 10 minutes
    totalPoints: 100,
    badge: assessmentBadges.find((b) => b.id === 'badge-js-intermediate')!,
    prerequisites: ['assessment-js-beginner'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
  },
  {
    id: 'assessment-react-fundamentals',
    title: 'React Fundamentals',
    description: 'Test your understanding of React basics including components, hooks, props, and state management.',
    category: 'frontend',
    difficulty: 'beginner',
    questions: assessmentQuestions.filter((q) => q.tags.includes('react')),
    passingScore: 70,
    timeLimit: 450, // 7.5 minutes
    totalPoints: 70,
    badge: assessmentBadges.find((b) => b.id === 'badge-react-dev')!,
    createdAt: '2024-01-05',
    updatedAt: '2024-01-20',
  },
  {
    id: 'assessment-python-basics',
    title: 'Python Basics',
    description: 'Fundamental Python concepts including syntax, data structures, and functions.',
    category: 'programming',
    difficulty: 'beginner',
    questions: assessmentQuestions.filter((q) => q.tags.includes('python')),
    passingScore: 70,
    timeLimit: 300, // 5 minutes
    totalPoints: 60,
    badge: assessmentBadges.find((b) => b.id === 'badge-python-beginner')!,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-25',
  },
  {
    id: 'assessment-sql-fundamentals',
    title: 'SQL Fundamentals',
    description: 'Essential SQL skills including queries, joins, and database operations.',
    category: 'database',
    difficulty: 'beginner',
    questions: assessmentQuestions.filter((q) => q.tags.includes('sql')),
    passingScore: 70,
    timeLimit: 450, // 7.5 minutes
    totalPoints: 70,
    badge: assessmentBadges.find((b) => b.id === 'badge-sql-master')!,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-30',
  },
  {
    id: 'assessment-soft-skills',
    title: 'Workplace Soft Skills',
    description: 'Evaluate your communication, collaboration, and interpersonal skills in professional settings.',
    category: 'soft-skills',
    difficulty: 'intermediate',
    questions: assessmentQuestions.filter(
      (q) => q.category === 'soft-skills' || q.category === 'communication'
    ),
    passingScore: 70,
    timeLimit: 600, // 10 minutes
    totalPoints: 90,
    badge: assessmentBadges.find((b) => b.id === 'badge-soft-skills')!,
    createdAt: '2024-02-01',
    updatedAt: '2024-02-15',
  },
  {
    id: 'assessment-leadership',
    title: 'Leadership Skills Assessment',
    description: 'Assess your leadership capabilities including decision-making, team management, and communication.',
    category: 'leadership',
    difficulty: 'advanced',
    questions: assessmentQuestions.filter((q) => q.category === 'leadership'),
    passingScore: 75,
    timeLimit: 600, // 10 minutes
    totalPoints: 70,
    badge: assessmentBadges.find((b) => b.id === 'badge-leader')!,
    createdAt: '2024-02-10',
    updatedAt: '2024-02-25',
  },
  {
    id: 'assessment-problem-solving',
    title: 'Problem Solving Skills',
    description: 'Test your analytical thinking and problem-solving abilities across various scenarios.',
    category: 'problem-solving',
    difficulty: 'intermediate',
    questions: assessmentQuestions.filter((q) => q.category === 'problem-solving'),
    passingScore: 70,
    timeLimit: 450, // 7.5 minutes
    totalPoints: 40,
    badge: assessmentBadges.find((b) => b.id === 'badge-problem-solver')!,
    createdAt: '2024-02-15',
    updatedAt: '2024-03-01',
  },
  {
    id: 'assessment-backend-fundamentals',
    title: 'Backend Development Basics',
    description: 'Test your knowledge of backend concepts including REST APIs, HTTP, and middleware.',
    category: 'backend',
    difficulty: 'beginner',
    questions: assessmentQuestions.filter((q) => q.category === 'backend'),
    passingScore: 70,
    timeLimit: 450, // 7.5 minutes
    totalPoints: 70,
    badge: {
      id: 'badge-backend-dev',
      name: 'Backend Developer',
      icon: 'server',
      color: 'green',
      description: 'Demonstrated backend development knowledge',
    },
    createdAt: '2024-03-01',
    updatedAt: '2024-03-15',
  },
];

// Sample User Assessment Stats (mock data)
export const sampleUserAssessmentStats: UserAssessmentStats = {
  totalAssessmentsCompleted: 5,
  totalAssessmentsPassed: 4,
  totalPointsEarned: 380,
  averageScore: 82.5,
  totalTimeSpent: 2400, // 40 minutes
  badgesEarned: [
    assessmentBadges[0], // JS Beginner
    assessmentBadges[2], // React
    assessmentBadges[3], // Python
  ],
  categoryPerformance: [
    {
      category: 'programming',
      assessmentsCompleted: 3,
      averageScore: 85,
      bestScore: 92,
      totalQuestionsPracticed: 15,
      correctAnswers: 13,
      trend: 'improving',
    },
    {
      category: 'frontend',
      assessmentsCompleted: 1,
      averageScore: 78,
      bestScore: 78,
      totalQuestionsPracticed: 5,
      correctAnswers: 4,
      trend: 'stable',
    },
    {
      category: 'soft-skills',
      assessmentsCompleted: 1,
      averageScore: 70,
      bestScore: 70,
      totalQuestionsPracticed: 5,
      correctAnswers: 3,
      trend: 'stable',
    },
  ],
  recentResults: [],
  streak: 3,
  lastAssessmentDate: '2024-03-10',
};

// Sample Assessment History
export const sampleAssessmentHistory: AssessmentHistory[] = [
  {
    assessmentId: 'assessment-js-beginner',
    assessmentTitle: 'JavaScript Fundamentals',
    category: 'programming',
    attempts: [
      {
        id: 'attempt-1',
        sessionId: 'session-1',
        score: 40,
        percentage: 80,
        passed: true,
        timeSpent: 240,
        completedAt: '2024-03-01T10:30:00Z',
      },
      {
        id: 'attempt-2',
        sessionId: 'session-2',
        score: 46,
        percentage: 92,
        passed: true,
        timeSpent: 200,
        completedAt: '2024-03-05T14:15:00Z',
      },
    ],
    bestScore: 92,
    lastAttemptDate: '2024-03-05T14:15:00Z',
    hasPassed: true,
    earnedBadge: assessmentBadges[0],
  },
  {
    assessmentId: 'assessment-react-fundamentals',
    assessmentTitle: 'React Fundamentals',
    category: 'frontend',
    attempts: [
      {
        id: 'attempt-3',
        sessionId: 'session-3',
        score: 55,
        percentage: 78,
        passed: true,
        timeSpent: 380,
        completedAt: '2024-03-08T09:00:00Z',
      },
    ],
    bestScore: 78,
    lastAttemptDate: '2024-03-08T09:00:00Z',
    hasPassed: true,
    earnedBadge: assessmentBadges[2],
  },
];

// Helper Functions

/**
 * Get all assessments
 */
export function getAllAssessments(): SkillAssessment[] {
  return skillAssessments;
}

/**
 * Get assessment by ID
 */
export function getAssessmentById(id: string): SkillAssessment | undefined {
  return skillAssessments.find((a) => a.id === id);
}

/**
 * Get assessments by category
 */
export function getAssessmentsByCategory(category: SkillCategory): SkillAssessment[] {
  return skillAssessments.filter((a) => a.category === category);
}

/**
 * Get assessments by difficulty
 */
export function getAssessmentsByDifficulty(difficulty: AssessmentDifficulty): SkillAssessment[] {
  return skillAssessments.filter((a) => a.difficulty === difficulty);
}

/**
 * Filter assessments based on criteria
 */
export function filterAssessments(filters: AssessmentFilters): SkillAssessment[] {
  let result = [...skillAssessments];

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    result = result.filter(
      (a) =>
        a.title.toLowerCase().includes(searchLower) ||
        a.description.toLowerCase().includes(searchLower)
    );
  }

  if (filters.categories && filters.categories.length > 0) {
    result = result.filter((a) => filters.categories!.includes(a.category));
  }

  if (filters.difficulties && filters.difficulties.length > 0) {
    result = result.filter((a) => filters.difficulties!.includes(a.difficulty));
  }

  return result;
}

/**
 * Sort assessments
 */
export function sortAssessments(
  assessments: SkillAssessment[],
  sortBy: AssessmentSortOption
): SkillAssessment[] {
  const sorted = [...assessments];

  switch (sortBy) {
    case 'title-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'title-desc':
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    case 'difficulty-asc':
      const difficultyOrder = { beginner: 0, intermediate: 1, advanced: 2 };
      return sorted.sort(
        (a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
      );
    case 'difficulty-desc':
      const difficultyOrderDesc = { beginner: 0, intermediate: 1, advanced: 2 };
      return sorted.sort(
        (a, b) => difficultyOrderDesc[b.difficulty] - difficultyOrderDesc[a.difficulty]
      );
    case 'newest':
      return sorted.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    case 'oldest':
      return sorted.sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    default:
      return sorted;
  }
}

/**
 * Get questions for an assessment
 */
export function getQuestionsForAssessment(assessmentId: string): AssessmentQuestion[] {
  const assessment = getAssessmentById(assessmentId);
  return assessment?.questions || [];
}

/**
 * Get random questions from the pool
 */
export function getRandomQuestions(
  count: number,
  category?: SkillCategory,
  difficulty?: AssessmentDifficulty
): AssessmentQuestion[] {
  let pool = [...assessmentQuestions];

  if (category) {
    pool = pool.filter((q) => q.category === category);
  }

  if (difficulty) {
    pool = pool.filter((q) => q.difficulty === difficulty);
  }

  // Shuffle and take the requested count
  const shuffled = pool.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

/**
 * Get assessment statistics
 */
export function getAssessmentStats(): {
  total: number;
  byCategory: Record<SkillCategory, number>;
  byDifficulty: Record<AssessmentDifficulty, number>;
  totalQuestions: number;
} {
  const byCategory = {} as Record<SkillCategory, number>;
  const byDifficulty = {} as Record<AssessmentDifficulty, number>;

  skillAssessments.forEach((assessment) => {
    byCategory[assessment.category] = (byCategory[assessment.category] || 0) + 1;
    byDifficulty[assessment.difficulty] = (byDifficulty[assessment.difficulty] || 0) + 1;
  });

  return {
    total: skillAssessments.length,
    byCategory,
    byDifficulty,
    totalQuestions: assessmentQuestions.length,
  };
}

/**
 * Get question by ID
 */
export function getQuestionById(id: string): AssessmentQuestion | undefined {
  return assessmentQuestions.find((q) => q.id === id);
}

/**
 * Get all badges
 */
export function getAllBadges(): AssessmentBadge[] {
  return assessmentBadges;
}

/**
 * Get badge by ID
 */
export function getBadgeById(id: string): AssessmentBadge | undefined {
  return assessmentBadges.find((b) => b.id === id);
}
