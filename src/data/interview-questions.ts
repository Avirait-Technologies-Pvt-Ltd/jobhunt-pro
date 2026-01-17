import {
  InterviewQuestion,
  QuestionCategory,
  DifficultyLevel,
  QuestionFilters,
  QuestionSortOption,
} from '@/types/interview-prep';

export const interviewQuestions: InterviewQuestion[] = [
  // BEHAVIORAL QUESTIONS
  {
    id: 'q-1',
    question: 'Tell me about a time when you had to deal with a difficult team member. How did you handle it?',
    category: 'behavioral',
    difficulty: 'medium',
    tags: ['teamwork', 'conflict-resolution', 'communication'],
    sampleAnswer: 'In my previous role, I worked with a colleague who often missed deadlines. I scheduled a private meeting to understand their challenges, discovered they were overwhelmed with tasks, and we worked together to prioritize and redistribute work. This improved our team dynamics and project delivery.',
    tips: [
      'Use the STAR method (Situation, Task, Action, Result)',
      'Focus on your actions and the positive outcome',
      'Avoid speaking negatively about the person',
    ],
    followUps: ['What would you do differently?', 'How did this experience change your approach to teamwork?'],
    timesAsked: 156,
    createdAt: '2024-01-15',
  },
  {
    id: 'q-2',
    question: 'Describe a situation where you had to meet a tight deadline. How did you manage your time?',
    category: 'behavioral',
    difficulty: 'easy',
    tags: ['time-management', 'pressure', 'prioritization'],
    sampleAnswer: 'During a product launch, we had only two weeks to complete a three-week project. I created a detailed task breakdown, identified critical path items, delegated effectively, and worked extra hours when needed. We delivered on time with all key features.',
    tips: [
      'Show your planning and organizational skills',
      'Mention specific strategies you used',
      'Highlight the successful outcome',
    ],
    followUps: ['What would you have done if you couldn\'t meet the deadline?'],
    timesAsked: 203,
    createdAt: '2024-01-10',
  },
  {
    id: 'q-3',
    question: 'Tell me about a time you failed. What did you learn from it?',
    category: 'behavioral',
    difficulty: 'hard',
    tags: ['failure', 'growth', 'self-awareness'],
    sampleAnswer: 'I once launched a feature without adequate user testing, which resulted in poor adoption. I learned the importance of user research and now always advocate for user testing phases. This failure made me a stronger product advocate.',
    tips: [
      'Be honest about a real failure',
      'Focus more on the learning than the failure itself',
      'Show how you\'ve applied this lesson since',
    ],
    followUps: ['How do you prevent similar failures now?'],
    timesAsked: 178,
    createdAt: '2024-01-08',
  },
  {
    id: 'q-4',
    question: 'Describe a time when you had to persuade someone to see things your way.',
    category: 'behavioral',
    difficulty: 'medium',
    company: 'Amazon',
    tags: ['influence', 'communication', 'leadership'],
    sampleAnswer: 'I proposed adopting a new testing framework that initially faced resistance. I created a proof-of-concept, demonstrated time savings with data, and addressed concerns individually. The team adopted it and reduced bug rates by 40%.',
    tips: [
      'Show empathy for the other perspective',
      'Use data and evidence in your argument',
      'Demonstrate collaborative problem-solving',
    ],
    timesAsked: 134,
    createdAt: '2024-01-05',
  },
  {
    id: 'q-5',
    question: 'Tell me about a time you went above and beyond for a customer or client.',
    category: 'behavioral',
    difficulty: 'easy',
    company: 'Amazon',
    tags: ['customer-focus', 'initiative', 'service'],
    sampleAnswer: 'A client needed an urgent feature for a demo the next day. I stayed late, coordinated with the team, and delivered a working solution by morning. The demo was successful and we secured a major contract.',
    tips: [
      'Show genuine care for customer success',
      'Highlight the extra effort you made',
      'Quantify the impact if possible',
    ],
    timesAsked: 189,
    createdAt: '2024-01-03',
  },
  {
    id: 'q-6',
    question: 'Describe a situation where you had to work with someone whose work style was very different from yours.',
    category: 'behavioral',
    difficulty: 'medium',
    tags: ['adaptability', 'teamwork', 'communication'],
    sampleAnswer: 'I paired with a developer who preferred detailed upfront planning while I favored iterative approaches. We compromised by doing brief planning sessions followed by short sprints. This hybrid approach improved our collaboration and delivery speed.',
    tips: [
      'Show flexibility and openness',
      'Focus on finding common ground',
      'Highlight what you learned from the experience',
    ],
    timesAsked: 112,
    createdAt: '2024-02-01',
  },
  {
    id: 'q-7',
    question: 'Tell me about a time you received critical feedback. How did you respond?',
    category: 'behavioral',
    difficulty: 'medium',
    tags: ['feedback', 'growth', 'self-improvement'],
    sampleAnswer: 'My manager noted my presentations lacked structure. I took a presentation skills course, practiced with colleagues, and sought feedback on improvements. My next quarterly review highlighted my improved communication as a strength.',
    tips: [
      'Show you can receive feedback gracefully',
      'Demonstrate concrete actions taken',
      'Share the positive outcome',
    ],
    timesAsked: 145,
    createdAt: '2024-02-05',
  },
  {
    id: 'q-8',
    question: 'Describe a time when you had to make a decision without all the information you needed.',
    category: 'behavioral',
    difficulty: 'hard',
    company: 'Google',
    tags: ['decision-making', 'ambiguity', 'judgment'],
    sampleAnswer: 'During a system outage, I had to choose between two potential fixes without full diagnostic data. I assessed risk levels, chose the safer option first, documented my reasoning, and prepared a rollback plan. The fix worked and we restored service quickly.',
    tips: [
      'Explain your decision-making framework',
      'Show how you managed risk',
      'Demonstrate learning from the outcome',
    ],
    timesAsked: 98,
    createdAt: '2024-02-10',
  },

  // TECHNICAL QUESTIONS
  {
    id: 'q-9',
    question: 'Explain the difference between REST and GraphQL. When would you choose one over the other?',
    category: 'technical',
    difficulty: 'medium',
    tags: ['api', 'architecture', 'web-development'],
    sampleAnswer: 'REST uses fixed endpoints returning predefined data structures, while GraphQL allows clients to request exactly the data they need. Choose REST for simple, cacheable APIs with stable requirements. Choose GraphQL when clients have varying data needs or you want to reduce over-fetching.',
    tips: [
      'Mention specific use cases for each',
      'Discuss trade-offs like caching and complexity',
      'Show practical experience if possible',
    ],
    timesAsked: 167,
    createdAt: '2024-01-20',
  },
  {
    id: 'q-10',
    question: 'What is the virtual DOM and how does it improve performance in React?',
    category: 'technical',
    difficulty: 'easy',
    tags: ['react', 'performance', 'frontend'],
    sampleAnswer: 'The virtual DOM is a lightweight JavaScript representation of the actual DOM. React compares the virtual DOM with the previous version (diffing), calculates the minimum changes needed, and batches updates to the real DOM. This minimizes expensive DOM operations.',
    tips: [
      'Explain the reconciliation process',
      'Mention the diffing algorithm',
      'Compare with direct DOM manipulation',
    ],
    timesAsked: 234,
    createdAt: '2024-01-18',
  },
  {
    id: 'q-11',
    question: 'Explain the concept of closures in JavaScript with an example.',
    category: 'technical',
    difficulty: 'medium',
    tags: ['javascript', 'fundamentals', 'scope'],
    sampleAnswer: 'A closure is a function that retains access to variables from its outer scope even after the outer function has returned. Example: A counter function that returns an increment function - the inner function "closes over" the count variable, maintaining its state between calls.',
    tips: [
      'Provide a clear, simple example',
      'Explain practical use cases like data privacy',
      'Mention common pitfalls like loop closures',
    ],
    timesAsked: 198,
    createdAt: '2024-01-16',
  },
  {
    id: 'q-12',
    question: 'What are the SOLID principles? Can you explain each one?',
    category: 'technical',
    difficulty: 'hard',
    tags: ['oop', 'design-principles', 'architecture'],
    sampleAnswer: 'SOLID: Single Responsibility (one reason to change), Open/Closed (open for extension, closed for modification), Liskov Substitution (subtypes must be substitutable), Interface Segregation (specific interfaces over general), Dependency Inversion (depend on abstractions). These principles lead to maintainable, flexible code.',
    tips: [
      'Give a brief example for each principle',
      'Explain why each matters in practice',
      'Mention how they work together',
    ],
    timesAsked: 156,
    createdAt: '2024-01-14',
  },
  {
    id: 'q-13',
    question: 'How would you optimize a slow database query?',
    category: 'technical',
    difficulty: 'hard',
    tags: ['database', 'performance', 'sql'],
    sampleAnswer: 'First, analyze with EXPLAIN to identify bottlenecks. Common optimizations: add appropriate indexes, avoid SELECT *, use query caching, denormalize if needed, partition large tables, optimize JOINs, and consider read replicas for heavy read loads.',
    tips: [
      'Start with diagnosis before optimization',
      'Mention indexing strategies',
      'Discuss trade-offs of each approach',
    ],
    timesAsked: 143,
    createdAt: '2024-01-12',
  },
  {
    id: 'q-14',
    question: 'Explain the difference between SQL and NoSQL databases. When would you use each?',
    category: 'technical',
    difficulty: 'medium',
    tags: ['database', 'architecture', 'data-modeling'],
    sampleAnswer: 'SQL databases are relational, use structured schemas, and excel at complex queries and transactions. NoSQL databases offer flexible schemas, horizontal scaling, and work well with unstructured data. Use SQL for complex relationships and ACID compliance; NoSQL for high-volume, schema-flexible, or distributed scenarios.',
    tips: [
      'Give specific database examples',
      'Discuss consistency vs availability trade-offs',
      'Mention hybrid approaches',
    ],
    timesAsked: 178,
    createdAt: '2024-02-08',
  },
  {
    id: 'q-15',
    question: 'What is the difference between authentication and authorization?',
    category: 'technical',
    difficulty: 'easy',
    tags: ['security', 'web-development', 'fundamentals'],
    sampleAnswer: 'Authentication verifies WHO you are (identity) - like logging in with username/password. Authorization determines WHAT you can do (permissions) - like accessing admin pages. Authentication comes first, then authorization checks if the authenticated user has permission for the requested action.',
    tips: [
      'Use clear real-world analogies',
      'Mention common implementation methods (JWT, OAuth)',
      'Discuss how they work together',
    ],
    timesAsked: 212,
    createdAt: '2024-02-12',
  },
  {
    id: 'q-16',
    question: 'Explain event-driven architecture and its benefits.',
    category: 'technical',
    difficulty: 'hard',
    company: 'Google',
    tags: ['architecture', 'microservices', 'scalability'],
    sampleAnswer: 'Event-driven architecture uses events to trigger and communicate between decoupled services. Benefits include loose coupling, scalability, real-time processing, and resilience. Components publish events without knowing consumers, enabling independent development and deployment.',
    tips: [
      'Mention specific technologies (Kafka, RabbitMQ)',
      'Discuss event sourcing and CQRS',
      'Address challenges like eventual consistency',
    ],
    timesAsked: 87,
    createdAt: '2024-02-15',
  },

  // SITUATIONAL QUESTIONS
  {
    id: 'q-17',
    question: 'Your team disagrees on the technical approach for a new feature. How would you handle it?',
    category: 'situational',
    difficulty: 'medium',
    tags: ['leadership', 'decision-making', 'teamwork'],
    sampleAnswer: 'I would facilitate a structured discussion where each approach is presented with pros/cons. We\'d evaluate against criteria like scalability, maintainability, and timeline. If no consensus, I\'d propose a small proof-of-concept for top options or escalate to a tech lead with our analysis.',
    tips: [
      'Show collaborative decision-making',
      'Mention objective evaluation criteria',
      'Have a backup plan for deadlocks',
    ],
    timesAsked: 134,
    createdAt: '2024-01-25',
  },
  {
    id: 'q-18',
    question: 'You discover a critical bug in production right before a major demo. What do you do?',
    category: 'situational',
    difficulty: 'hard',
    tags: ['crisis-management', 'decision-making', 'communication'],
    sampleAnswer: 'First, assess severity and impact scope. Immediately notify stakeholders with clear status. If fixable quickly, implement with proper testing. If not, prepare workarounds or feature flags to hide the issue. Document everything and conduct a post-mortem afterward.',
    tips: [
      'Prioritize communication',
      'Show calm under pressure',
      'Mention risk mitigation strategies',
    ],
    timesAsked: 112,
    createdAt: '2024-01-22',
  },
  {
    id: 'q-19',
    question: 'A stakeholder keeps changing requirements mid-sprint. How do you address this?',
    category: 'situational',
    difficulty: 'medium',
    tags: ['stakeholder-management', 'agile', 'communication'],
    sampleAnswer: 'I\'d request a meeting to understand their underlying needs. Explain the impact of changes on timeline and quality. Propose a change request process with clear trade-offs. Suggest maintaining a prioritized backlog where changes are evaluated for the next sprint rather than mid-sprint.',
    tips: [
      'Show empathy for stakeholder needs',
      'Explain agile principles diplomatically',
      'Offer constructive alternatives',
    ],
    timesAsked: 145,
    createdAt: '2024-01-28',
  },
  {
    id: 'q-20',
    question: 'You notice a senior colleague making a significant technical mistake. What do you do?',
    category: 'situational',
    difficulty: 'medium',
    tags: ['communication', 'professionalism', 'courage'],
    sampleAnswer: 'I\'d approach them privately and respectfully, framing it as a question: "I noticed X approach - I was thinking Y might cause Z issue. Could you help me understand the reasoning?" This opens dialogue without being confrontational, allowing them to either explain their logic or recognize the issue.',
    tips: [
      'Approach with humility and respect',
      'Use questions rather than accusations',
      'Focus on the code/decision, not the person',
    ],
    timesAsked: 98,
    createdAt: '2024-02-02',
  },
  {
    id: 'q-21',
    question: 'You\'re assigned to a project with outdated technology you\'re unfamiliar with. How do you approach it?',
    category: 'situational',
    difficulty: 'easy',
    tags: ['learning', 'adaptability', 'problem-solving'],
    sampleAnswer: 'I\'d start by reviewing documentation and existing codebase to understand patterns. Identify team members with experience for knowledge transfer. Set up a local environment to experiment safely. Create a learning plan with milestones, and be transparent about my learning curve while contributing where I can.',
    tips: [
      'Show eagerness to learn',
      'Mention specific learning strategies',
      'Balance learning with contributing value',
    ],
    timesAsked: 167,
    createdAt: '2024-02-06',
  },

  // SYSTEM DESIGN QUESTIONS
  {
    id: 'q-22',
    question: 'Design a URL shortening service like bit.ly.',
    category: 'system-design',
    difficulty: 'medium',
    company: 'Google',
    tags: ['scalability', 'database', 'api-design'],
    sampleAnswer: 'Key components: API Gateway for requests, application servers for URL generation, distributed database for mappings, cache layer (Redis) for frequent lookups. Use base62 encoding for short codes, consistent hashing for distribution. Consider rate limiting, analytics tracking, and CDN for redirects.',
    tips: [
      'Start with requirements clarification',
      'Discuss scale estimates',
      'Address data storage and retrieval patterns',
    ],
    followUps: ['How would you handle analytics?', 'How do you prevent abuse?'],
    timesAsked: 189,
    createdAt: '2024-01-30',
  },
  {
    id: 'q-23',
    question: 'Design a real-time chat application.',
    category: 'system-design',
    difficulty: 'hard',
    company: 'Meta',
    tags: ['real-time', 'websockets', 'scalability'],
    sampleAnswer: 'Use WebSockets for real-time bidirectional communication. Message queue (Kafka) for reliable delivery. Presence service for online status. Database partitioned by conversation ID. Cache recent messages. Consider read receipts, typing indicators, and offline message queuing.',
    tips: [
      'Discuss WebSocket vs polling trade-offs',
      'Address message ordering and delivery guarantees',
      'Consider group chat scaling challenges',
    ],
    followUps: ['How would you handle message encryption?', 'How do you sync across devices?'],
    timesAsked: 156,
    createdAt: '2024-02-03',
  },
  {
    id: 'q-24',
    question: 'Design a rate limiter for an API.',
    category: 'system-design',
    difficulty: 'medium',
    tags: ['api-design', 'algorithms', 'distributed-systems'],
    sampleAnswer: 'Options include token bucket, leaky bucket, fixed window, or sliding window algorithms. For distributed systems, use Redis with atomic operations. Consider per-user, per-IP, and global limits. Return appropriate headers (X-RateLimit-*) and 429 status codes.',
    tips: [
      'Compare different algorithms',
      'Discuss distributed challenges',
      'Mention graceful degradation strategies',
    ],
    timesAsked: 134,
    createdAt: '2024-02-07',
  },
  {
    id: 'q-25',
    question: 'Design a notification system for a social media platform.',
    category: 'system-design',
    difficulty: 'hard',
    company: 'Meta',
    tags: ['scalability', 'real-time', 'distributed-systems'],
    sampleAnswer: 'Event-driven architecture with message queues. Notification service processes events, determines recipients, and routes to delivery services (push, email, SMS, in-app). Priority queuing for time-sensitive notifications. User preference storage for notification settings. Aggregation for high-frequency events.',
    tips: [
      'Address different notification channels',
      'Discuss fanout challenges for popular users',
      'Consider notification preferences and batching',
    ],
    timesAsked: 112,
    createdAt: '2024-02-10',
  },

  // CASE STUDY QUESTIONS
  {
    id: 'q-26',
    question: 'How would you improve the checkout flow of an e-commerce website?',
    category: 'case-study',
    difficulty: 'medium',
    tags: ['product', 'ux', 'conversion'],
    sampleAnswer: 'Analyze current funnel data to identify drop-off points. Common improvements: guest checkout option, progress indicator, save cart functionality, multiple payment options, address auto-complete, trust signals, clear error messages, mobile optimization, and one-click purchase for returning users.',
    tips: [
      'Start with data analysis',
      'Prioritize based on impact',
      'Consider both UX and technical aspects',
    ],
    timesAsked: 145,
    createdAt: '2024-01-27',
  },
  {
    id: 'q-27',
    question: 'A key metric has dropped 20% week over week. How would you investigate?',
    category: 'case-study',
    difficulty: 'hard',
    company: 'Google',
    tags: ['analytics', 'problem-solving', 'data'],
    sampleAnswer: 'First, verify data accuracy and check for tracking issues. Segment by dimensions (device, region, user type) to isolate the drop. Check for recent changes (deployments, campaigns, external factors). Create hypotheses, prioritize by likelihood, and test each systematically. Document findings and recommend actions.',
    tips: [
      'Show structured problem-solving',
      'Consider internal and external factors',
      'Mention specific tools and techniques',
    ],
    timesAsked: 98,
    createdAt: '2024-02-04',
  },
  {
    id: 'q-28',
    question: 'How would you prioritize features for the next quarter?',
    category: 'case-study',
    difficulty: 'medium',
    tags: ['product', 'prioritization', 'strategy'],
    sampleAnswer: 'Gather input from stakeholders, customers, and data. Use a framework like RICE (Reach, Impact, Confidence, Effort) to score features. Align with company OKRs and strategic goals. Consider dependencies and technical debt. Present prioritized roadmap with clear rationale and trade-offs.',
    tips: [
      'Mention specific prioritization frameworks',
      'Balance short-term wins with long-term goals',
      'Show stakeholder management skills',
    ],
    timesAsked: 167,
    createdAt: '2024-02-09',
  },

  // CODING QUESTIONS
  {
    id: 'q-29',
    question: 'Implement a function to check if a string is a valid palindrome, considering only alphanumeric characters.',
    category: 'coding',
    difficulty: 'easy',
    tags: ['strings', 'two-pointers', 'algorithms'],
    sampleAnswer: 'Use two pointers from start and end. Skip non-alphanumeric characters. Compare characters (case-insensitive). Move pointers inward until they meet. Time: O(n), Space: O(1).',
    tips: [
      'Clarify what characters to consider',
      'Mention the two-pointer approach',
      'Discuss time and space complexity',
    ],
    timesAsked: 234,
    createdAt: '2024-01-19',
  },
  {
    id: 'q-30',
    question: 'Find the longest substring without repeating characters.',
    category: 'coding',
    difficulty: 'medium',
    company: 'Amazon',
    tags: ['strings', 'sliding-window', 'hash-map'],
    sampleAnswer: 'Use sliding window with a hash map to track character positions. When a repeat is found, move the left pointer past the previous occurrence. Track maximum length throughout. Time: O(n), Space: O(min(m,n)) where m is charset size.',
    tips: [
      'Explain the sliding window technique',
      'Discuss how to handle duplicates',
      'Mention optimization with array instead of hash map',
    ],
    timesAsked: 198,
    createdAt: '2024-01-21',
  },
  {
    id: 'q-31',
    question: 'Implement a LRU (Least Recently Used) Cache.',
    category: 'coding',
    difficulty: 'hard',
    company: 'Google',
    tags: ['data-structures', 'design', 'hash-map'],
    sampleAnswer: 'Use a hash map for O(1) lookups combined with a doubly-linked list for O(1) insertion/deletion. Map stores key to node reference. On access, move node to front. On insert, add to front and evict from back if at capacity. Time: O(1) for both get and put.',
    tips: [
      'Explain why both data structures are needed',
      'Walk through the operations step by step',
      'Discuss thread-safety considerations',
    ],
    timesAsked: 167,
    createdAt: '2024-01-23',
  },
  {
    id: 'q-32',
    question: 'Merge two sorted linked lists into one sorted list.',
    category: 'coding',
    difficulty: 'easy',
    tags: ['linked-list', 'recursion', 'two-pointers'],
    sampleAnswer: 'Create a dummy head node. Compare heads of both lists, append smaller to result, advance that pointer. Repeat until one list is exhausted, then append the remainder. Time: O(n+m), Space: O(1) iterative or O(n+m) recursive.',
    tips: [
      'Consider both iterative and recursive solutions',
      'Use a dummy node to simplify edge cases',
      'Handle empty list inputs',
    ],
    timesAsked: 212,
    createdAt: '2024-01-26',
  },
  {
    id: 'q-33',
    question: 'Find the kth largest element in an unsorted array.',
    category: 'coding',
    difficulty: 'medium',
    company: 'Amazon',
    tags: ['heap', 'quickselect', 'sorting'],
    sampleAnswer: 'Three approaches: 1) Sort and return index n-k: O(n log n). 2) Min heap of size k: O(n log k). 3) Quickselect (partition-based): O(n) average. Quickselect is optimal for single queries; heap is good for streaming data.',
    tips: [
      'Present multiple approaches',
      'Discuss trade-offs between them',
      'Mention when each approach is preferred',
    ],
    timesAsked: 178,
    createdAt: '2024-02-01',
  },

  // Additional questions to reach 50+
  {
    id: 'q-34',
    question: 'Tell me about yourself and your background.',
    category: 'behavioral',
    difficulty: 'easy',
    tags: ['introduction', 'background', 'career'],
    sampleAnswer: 'Structure: Present (current role and key achievements), Past (relevant experience that led here), Future (why this role/company). Keep it under 2 minutes, focusing on highlights relevant to the position.',
    tips: [
      'Keep it concise (1-2 minutes)',
      'Tailor to the role',
      'End with why you\'re excited about this opportunity',
    ],
    timesAsked: 567,
    createdAt: '2024-01-01',
  },
  {
    id: 'q-35',
    question: 'Why do you want to work at this company?',
    category: 'behavioral',
    difficulty: 'easy',
    tags: ['motivation', 'research', 'culture'],
    sampleAnswer: 'Research the company\'s mission, products, culture, and recent news. Connect your skills and interests to their specific needs. Show genuine enthusiasm based on concrete reasons, not generic praise.',
    tips: [
      'Do thorough company research',
      'Be specific, not generic',
      'Connect your goals to their mission',
    ],
    timesAsked: 445,
    createdAt: '2024-01-02',
  },
  {
    id: 'q-36',
    question: 'What are your greatest strengths?',
    category: 'behavioral',
    difficulty: 'easy',
    tags: ['self-awareness', 'strengths', 'examples'],
    sampleAnswer: 'Choose 2-3 strengths relevant to the role. For each, provide a specific example demonstrating the strength in action and its positive impact. Avoid clichés; be authentic.',
    tips: [
      'Match strengths to job requirements',
      'Use specific examples',
      'Quantify impact when possible',
    ],
    timesAsked: 389,
    createdAt: '2024-01-04',
  },
  {
    id: 'q-37',
    question: 'What is your greatest weakness?',
    category: 'behavioral',
    difficulty: 'medium',
    tags: ['self-awareness', 'growth', 'honesty'],
    sampleAnswer: 'Choose a genuine weakness that isn\'t critical for the role. Explain what you\'ve done to improve it. Show self-awareness and commitment to growth without disqualifying yourself.',
    tips: [
      'Be honest but strategic',
      'Show what you\'re doing to improve',
      'Avoid cliché answers like "I\'m a perfectionist"',
    ],
    timesAsked: 356,
    createdAt: '2024-01-06',
  },
  {
    id: 'q-38',
    question: 'Explain how HTTPS works and why it\'s important.',
    category: 'technical',
    difficulty: 'medium',
    tags: ['security', 'networking', 'web'],
    sampleAnswer: 'HTTPS uses TLS to encrypt HTTP traffic. Process: Client hello, server sends certificate, key exchange, symmetric encryption established. Provides confidentiality, integrity, and authentication. Prevents MITM attacks and data interception.',
    tips: [
      'Explain the TLS handshake steps',
      'Mention certificates and CAs',
      'Discuss the security benefits',
    ],
    timesAsked: 145,
    createdAt: '2024-02-11',
  },
  {
    id: 'q-39',
    question: 'What is the difference between TCP and UDP?',
    category: 'technical',
    difficulty: 'easy',
    tags: ['networking', 'protocols', 'fundamentals'],
    sampleAnswer: 'TCP: Connection-oriented, guaranteed delivery, ordered packets, flow control, slower. UDP: Connectionless, no delivery guarantee, unordered, faster. Use TCP for reliability (web, email), UDP for speed (streaming, gaming, DNS).',
    tips: [
      'Give clear comparisons',
      'Provide use case examples',
      'Mention the trade-offs',
    ],
    timesAsked: 178,
    createdAt: '2024-02-13',
  },
  {
    id: 'q-40',
    question: 'How would you handle a situation where you disagreed with your manager\'s decision?',
    category: 'situational',
    difficulty: 'medium',
    tags: ['conflict', 'communication', 'professionalism'],
    sampleAnswer: 'First, ensure I understand their reasoning fully by asking questions. If I still disagree, I\'d share my perspective respectfully with data or examples. Ultimately, I\'d commit to the decision once made, while documenting my concerns if appropriate.',
    tips: [
      'Show respect for authority',
      'Emphasize communication and understanding',
      'Demonstrate commitment to team decisions',
    ],
    timesAsked: 167,
    createdAt: '2024-02-14',
  },
  {
    id: 'q-41',
    question: 'Design a parking lot system.',
    category: 'system-design',
    difficulty: 'easy',
    tags: ['oop', 'design', 'modeling'],
    sampleAnswer: 'Classes: ParkingLot, Level, ParkingSpot (types: compact, regular, large), Vehicle (Car, Motorcycle, Bus). Key methods: parkVehicle(), removeVehicle(), getAvailableSpots(). Consider entry/exit gates, payment system, and real-time availability display.',
    tips: [
      'Start with class hierarchy',
      'Consider different vehicle types',
      'Discuss scalability for multi-level lots',
    ],
    timesAsked: 234,
    createdAt: '2024-02-16',
  },
  {
    id: 'q-42',
    question: 'Reverse a linked list.',
    category: 'coding',
    difficulty: 'easy',
    tags: ['linked-list', 'pointers', 'iteration'],
    sampleAnswer: 'Iterative: Use three pointers (prev, curr, next). For each node, save next, point curr to prev, advance prev and curr. Recursive: Base case is null or single node; recurse on rest, then adjust pointers. Time: O(n), Space: O(1) iterative, O(n) recursive.',
    tips: [
      'Draw out the pointer manipulations',
      'Handle edge cases (empty, single node)',
      'Know both iterative and recursive',
    ],
    timesAsked: 289,
    createdAt: '2024-02-17',
  },
  {
    id: 'q-43',
    question: 'What is the CAP theorem?',
    category: 'technical',
    difficulty: 'hard',
    tags: ['distributed-systems', 'database', 'architecture'],
    sampleAnswer: 'CAP states distributed systems can only guarantee two of three: Consistency (all nodes see same data), Availability (every request gets a response), Partition tolerance (system works despite network failures). Since partitions are inevitable, you choose between CP or AP.',
    tips: [
      'Give examples of CP vs AP systems',
      'Explain why you can\'t have all three',
      'Discuss real-world trade-offs',
    ],
    timesAsked: 112,
    createdAt: '2024-02-18',
  },
  {
    id: 'q-44',
    question: 'Describe a project you\'re most proud of.',
    category: 'behavioral',
    difficulty: 'easy',
    tags: ['experience', 'achievement', 'impact'],
    sampleAnswer: 'Choose a project with measurable impact. Explain the challenge, your specific contributions, technical decisions, collaboration involved, and quantified results. Show passion and learning.',
    tips: [
      'Choose something relevant to the role',
      'Highlight your specific contribution',
      'Quantify the impact',
    ],
    timesAsked: 312,
    createdAt: '2024-02-19',
  },
  {
    id: 'q-45',
    question: 'How do you stay updated with new technologies?',
    category: 'behavioral',
    difficulty: 'easy',
    tags: ['learning', 'growth', 'technology'],
    sampleAnswer: 'I follow tech blogs and newsletters, participate in online communities, take courses on platforms like Coursera, contribute to open source, attend meetups and conferences, and build side projects to experiment with new technologies.',
    tips: [
      'Be specific about your sources',
      'Show genuine curiosity',
      'Mention recent things you\'ve learned',
    ],
    timesAsked: 198,
    createdAt: '2024-02-20',
  },
  {
    id: 'q-46',
    question: 'Implement binary search on a sorted array.',
    category: 'coding',
    difficulty: 'easy',
    tags: ['arrays', 'search', 'divide-and-conquer'],
    sampleAnswer: 'Set left and right pointers. Calculate mid, compare with target. If equal, return mid. If target is smaller, search left half; otherwise search right half. Repeat until found or left > right. Time: O(log n), Space: O(1) iterative.',
    tips: [
      'Watch for integer overflow in mid calculation',
      'Handle edge cases (empty array, single element)',
      'Know both iterative and recursive versions',
    ],
    timesAsked: 267,
    createdAt: '2024-02-21',
  },
  {
    id: 'q-47',
    question: 'What is Big O notation and why is it important?',
    category: 'technical',
    difficulty: 'easy',
    tags: ['algorithms', 'complexity', 'fundamentals'],
    sampleAnswer: 'Big O describes the upper bound of an algorithm\'s time or space complexity as input grows. It helps compare algorithm efficiency, predict performance at scale, and make informed choices between approaches. Common complexities: O(1), O(log n), O(n), O(n log n), O(n²).',
    tips: [
      'Explain with concrete examples',
      'Mention common complexities',
      'Discuss why constants are dropped',
    ],
    timesAsked: 234,
    createdAt: '2024-02-22',
  },
  {
    id: 'q-48',
    question: 'Design an elevator system for a building.',
    category: 'system-design',
    difficulty: 'medium',
    tags: ['oop', 'scheduling', 'design'],
    sampleAnswer: 'Classes: ElevatorSystem, Elevator, Request, Button. Scheduling algorithms: FCFS, SCAN, LOOK. Consider multiple elevators, direction optimization, peak hours handling, priority for certain floors, and maintenance mode.',
    tips: [
      'Discuss different scheduling algorithms',
      'Consider edge cases (fire mode, overload)',
      'Think about optimization strategies',
    ],
    timesAsked: 156,
    createdAt: '2024-02-23',
  },
  {
    id: 'q-49',
    question: 'You have two weeks to deliver a feature but estimate it needs three weeks. What do you do?',
    category: 'situational',
    difficulty: 'medium',
    tags: ['estimation', 'communication', 'planning'],
    sampleAnswer: 'Immediately communicate the gap to stakeholders with clear reasoning. Propose options: reduce scope (MVP first), add resources, extend deadline, or work overtime (last resort). Collaborate on trade-offs and agree on a realistic plan.',
    tips: [
      'Communicate early, not at deadline',
      'Provide options, not just problems',
      'Be transparent about trade-offs',
    ],
    timesAsked: 145,
    createdAt: '2024-02-24',
  },
  {
    id: 'q-50',
    question: 'Detect if a linked list has a cycle.',
    category: 'coding',
    difficulty: 'medium',
    tags: ['linked-list', 'two-pointers', 'floyd'],
    sampleAnswer: 'Floyd\'s Tortoise and Hare: Use two pointers, slow moves 1 step, fast moves 2 steps. If they meet, there\'s a cycle. If fast reaches null, no cycle. To find cycle start: reset slow to head, move both 1 step until they meet. Time: O(n), Space: O(1).',
    tips: [
      'Explain why the algorithm works',
      'Know how to find the cycle start',
      'Compare with hash set approach',
    ],
    timesAsked: 189,
    createdAt: '2024-02-25',
  },
  {
    id: 'q-51',
    question: 'Where do you see yourself in 5 years?',
    category: 'behavioral',
    difficulty: 'easy',
    tags: ['career', 'goals', 'growth'],
    sampleAnswer: 'Focus on growth within the field and company. Mention skill development, leadership aspirations, and impact you want to make. Show ambition balanced with commitment to the role you\'re applying for.',
    tips: [
      'Show ambition but be realistic',
      'Align with growth opportunities at the company',
      'Focus on skills and impact, not just titles',
    ],
    timesAsked: 278,
    createdAt: '2024-02-26',
  },
  {
    id: 'q-52',
    question: 'Explain microservices architecture and its pros/cons.',
    category: 'technical',
    difficulty: 'medium',
    tags: ['architecture', 'microservices', 'distributed-systems'],
    sampleAnswer: 'Microservices decompose applications into small, independent services. Pros: scalability, technology flexibility, team autonomy, fault isolation. Cons: distributed system complexity, network latency, data consistency challenges, operational overhead.',
    tips: [
      'Compare with monolithic architecture',
      'Discuss when to use each',
      'Mention service discovery and API gateways',
    ],
    timesAsked: 167,
    createdAt: '2024-02-27',
  },
];

// Helper Functions

export function getQuestionById(id: string): InterviewQuestion | undefined {
  return interviewQuestions.find((q) => q.id === id);
}

export function getQuestionsByCategory(category: QuestionCategory): InterviewQuestion[] {
  return interviewQuestions.filter((q) => q.category === category);
}

export function getQuestionsByCompany(company: string): InterviewQuestion[] {
  return interviewQuestions.filter(
    (q) => q.company?.toLowerCase() === company.toLowerCase()
  );
}

export function getQuestionsByDifficulty(difficulty: DifficultyLevel): InterviewQuestion[] {
  return interviewQuestions.filter((q) => q.difficulty === difficulty);
}

export function filterQuestions(filters: QuestionFilters): InterviewQuestion[] {
  let result = [...interviewQuestions];

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    result = result.filter(
      (q) =>
        q.question.toLowerCase().includes(searchLower) ||
        q.tags.some((tag) => tag.toLowerCase().includes(searchLower)) ||
        q.company?.toLowerCase().includes(searchLower)
    );
  }

  if (filters.categories && filters.categories.length > 0) {
    result = result.filter((q) => filters.categories!.includes(q.category));
  }

  if (filters.difficulties && filters.difficulties.length > 0) {
    result = result.filter((q) => filters.difficulties!.includes(q.difficulty));
  }

  if (filters.company) {
    result = result.filter(
      (q) => q.company?.toLowerCase() === filters.company!.toLowerCase()
    );
  }

  if (filters.tags && filters.tags.length > 0) {
    result = result.filter((q) =>
      filters.tags!.some((tag) => q.tags.includes(tag))
    );
  }

  return result;
}

export function sortQuestions(
  questions: InterviewQuestion[],
  sortBy: QuestionSortOption
): InterviewQuestion[] {
  const sorted = [...questions];

  switch (sortBy) {
    case 'newest':
      return sorted.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    case 'oldest':
      return sorted.sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    case 'most-asked':
      return sorted.sort((a, b) => b.timesAsked - a.timesAsked);
    case 'difficulty-asc':
      const diffOrder = { easy: 1, medium: 2, hard: 3 };
      return sorted.sort(
        (a, b) => diffOrder[a.difficulty] - diffOrder[b.difficulty]
      );
    case 'difficulty-desc':
      const diffOrderDesc = { easy: 3, medium: 2, hard: 1 };
      return sorted.sort(
        (a, b) => diffOrderDesc[a.difficulty] - diffOrderDesc[b.difficulty]
      );
    default:
      return sorted;
  }
}

export function getRandomQuestions(
  count: number,
  filters?: QuestionFilters
): InterviewQuestion[] {
  let pool = filters ? filterQuestions(filters) : [...interviewQuestions];

  // Shuffle using Fisher-Yates algorithm
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  return pool.slice(0, Math.min(count, pool.length));
}

export function getPopularQuestions(limit: number = 10): InterviewQuestion[] {
  return [...interviewQuestions]
    .sort((a, b) => b.timesAsked - a.timesAsked)
    .slice(0, limit);
}

export function getUniqueCompanies(): string[] {
  const companies = interviewQuestions
    .map((q) => q.company)
    .filter((c): c is string => c !== undefined);
  return [...new Set(companies)].sort();
}

export function getUniqueTags(): string[] {
  const tags = interviewQuestions.flatMap((q) => q.tags);
  return [...new Set(tags)].sort();
}

export function getQuestionStats(): {
  total: number;
  byCategory: Record<QuestionCategory, number>;
  byDifficulty: Record<DifficultyLevel, number>;
} {
  const byCategory = {} as Record<QuestionCategory, number>;
  const byDifficulty = {} as Record<DifficultyLevel, number>;

  interviewQuestions.forEach((q) => {
    byCategory[q.category] = (byCategory[q.category] || 0) + 1;
    byDifficulty[q.difficulty] = (byDifficulty[q.difficulty] || 0) + 1;
  });

  return {
    total: interviewQuestions.length,
    byCategory,
    byDifficulty,
  };
}
