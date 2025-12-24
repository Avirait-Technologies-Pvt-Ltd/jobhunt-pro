import { BlogPost } from '@/types';

export const blogs: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'how-to-write-perfect-resume-2024',
    title: 'How to Write the Perfect Resume in 2024: A Complete Guide',
    excerpt: 'Learn the essential tips and strategies to create a resume that stands out to recruiters and passes ATS systems.',
    content: `
# How to Write the Perfect Resume in 2024

In today's competitive job market, your resume is your first impression. Here's how to make it count.

## 1. Start with a Strong Summary

Your professional summary should be 2-3 sentences that highlight your key qualifications and career goals. Make it specific to the role you're applying for.

**Example:**
"Results-driven software engineer with 5+ years of experience in full-stack development. Proven track record of delivering scalable applications that improved user engagement by 40%. Seeking to leverage expertise in React and Node.js at a forward-thinking tech company."

## 2. Tailor Your Experience

Don't just list job duties—highlight achievements with quantifiable results:
- Use action verbs (Developed, Implemented, Led, Achieved)
- Include metrics and percentages
- Focus on impact, not just tasks

## 3. Optimize for ATS

Most companies use Applicant Tracking Systems to filter resumes:
- Use standard section headings
- Include relevant keywords from the job description
- Avoid tables, graphics, and unusual fonts
- Save as PDF or Word document

## 4. Keep It Concise

- One page for less than 10 years of experience
- Two pages maximum for senior professionals
- Use bullet points, not paragraphs
- White space is your friend

## 5. Proofread Everything

Typos and grammatical errors can disqualify you immediately. Have someone else review your resume before submitting.

## Final Tips

- Update your resume for each application
- Include a skills section with relevant technologies
- List education and certifications
- Add links to your portfolio or LinkedIn

Remember, your resume is a marketing document for your career. Make every word count!
    `,
    author: {
      name: 'Sarah Mitchell',
      avatar: '/api/placeholder/100/100',
      bio: 'Career Coach with 10+ years helping professionals land their dream jobs.'
    },
    category: 'Resume Writing',
    tags: ['resume', 'job search', 'career advice', 'ATS'],
    image: '/api/placeholder/800/400',
    readTime: 8,
    publishedDate: '2024-12-15',
    featured: true
  },
  {
    id: 'blog-2',
    slug: 'ace-your-technical-interview',
    title: 'How to Ace Your Technical Interview: Tips from Hiring Managers',
    excerpt: 'Insider tips on how to prepare for and excel in technical interviews at top tech companies.',
    content: `
# How to Ace Your Technical Interview

Technical interviews can be intimidating, but with the right preparation, you can walk in with confidence.

## Before the Interview

### 1. Review the Fundamentals
- Data structures (arrays, linked lists, trees, graphs)
- Algorithms (sorting, searching, dynamic programming)
- Time and space complexity analysis

### 2. Practice Coding Problems
- Use platforms like LeetCode, HackerRank, or CodeSignal
- Practice 2-3 problems daily for at least 4 weeks
- Focus on medium-difficulty problems

### 3. Know the Company
- Research their tech stack
- Read their engineering blog
- Understand their products and challenges

## During the Interview

### Communication is Key
- Think out loud as you solve problems
- Ask clarifying questions
- Explain your approach before coding

### Problem-Solving Framework
1. Understand the problem completely
2. Work through examples
3. Discuss your approach
4. Write clean, readable code
5. Test your solution with edge cases

### Handle Pressure
- It's okay to take a moment to think
- If stuck, verbalize your thought process
- Accept hints gracefully

## Common Mistakes to Avoid
- Jumping into coding without understanding the problem
- Ignoring edge cases
- Writing sloppy code
- Getting defensive about feedback

## After the Interview
- Send a thank-you email
- Reflect on what went well and what to improve
- Continue practicing regardless of the outcome

Good luck with your interview!
    `,
    author: {
      name: 'David Park',
      avatar: '/api/placeholder/100/100',
      bio: 'Former Google engineer and technical interview coach.'
    },
    category: 'Interview Tips',
    tags: ['interview', 'coding', 'tech', 'preparation'],
    image: '/api/placeholder/800/400',
    readTime: 10,
    publishedDate: '2024-12-12',
    featured: true
  },
  {
    id: 'blog-3',
    slug: 'remote-work-productivity-tips',
    title: '15 Productivity Tips for Remote Workers in 2024',
    excerpt: 'Master the art of working from home with these proven strategies for staying productive and maintaining work-life balance.',
    content: `
# 15 Productivity Tips for Remote Workers

Remote work is here to stay. Here's how to make the most of it.

## Setting Up for Success

### 1. Create a Dedicated Workspace
Have a specific area for work, even if it's a corner of a room. This helps your brain switch into work mode.

### 2. Invest in Good Equipment
- Comfortable chair and desk
- External monitor
- Quality headphones
- Good lighting

### 3. Establish a Routine
Start and end work at consistent times. Include breaks and lunch in your schedule.

## Staying Focused

### 4. Use Time-Blocking
Dedicate specific hours to specific tasks. Protect deep work time from interruptions.

### 5. Try the Pomodoro Technique
Work for 25 minutes, take a 5-minute break. After 4 cycles, take a longer break.

### 6. Minimize Distractions
- Use website blockers during work hours
- Put your phone in another room
- Use noise-canceling headphones

## Communication & Collaboration

### 7. Over-Communicate
In remote work, it's better to share too much than too little.

### 8. Set Clear Boundaries
Let your team know your working hours and response time expectations.

### 9. Schedule Regular Check-ins
Weekly 1:1s and team meetings help maintain connection.

## Well-being

### 10. Take Real Breaks
Step away from your desk. Go outside. Move your body.

### 11. Separate Work and Personal Life
Close your laptop at the end of the day. Don't check emails after hours.

### 12. Stay Social
Join virtual coffee chats. Participate in team activities.

## Advanced Tips

### 13. Batch Similar Tasks
Group emails, meetings, and deep work into dedicated blocks.

### 14. Use Async Communication
Not everything needs a meeting. Use recorded videos and documents.

### 15. Review and Adjust
Regularly assess what's working and what's not. Iterate on your approach.

Remote work can be incredibly rewarding when done right!
    `,
    author: {
      name: 'Emma Wilson',
      avatar: '/api/placeholder/100/100',
      bio: 'Remote work consultant and productivity expert.'
    },
    category: 'Work-Life Balance',
    tags: ['remote work', 'productivity', 'work from home', 'tips'],
    image: '/api/placeholder/800/400',
    readTime: 7,
    publishedDate: '2024-12-10',
    featured: false
  },
  {
    id: 'blog-4',
    slug: 'salary-negotiation-strategies',
    title: 'Salary Negotiation: How to Get What You Deserve',
    excerpt: 'Learn proven strategies to negotiate your salary confidently and maximize your earning potential.',
    content: `
# Salary Negotiation: How to Get What You Deserve

Negotiating your salary can feel uncomfortable, but it's one of the most important skills for your career.

## Know Your Worth

### Research Market Rates
- Use Glassdoor, LinkedIn Salary, and Levels.fyi
- Network with peers to understand ranges
- Consider location, company size, and industry

### Calculate Your Total Value
- Factor in your skills and experience
- Consider your unique achievements
- Account for any specialized knowledge

## Timing is Everything

### Best Times to Negotiate
- After receiving a job offer
- During annual performance reviews
- After a major achievement or promotion
- When taking on new responsibilities

## The Negotiation Conversation

### Start High (But Reasonably)
Give yourself room to negotiate down. Start 10-15% above your target.

### Use Silence Strategically
After stating your number, wait. Don't fill the silence with justifications.

### Focus on Value
Emphasize what you bring to the company, not what you need personally.

### Consider the Full Package
- Base salary
- Bonus potential
- Stock options/equity
- Benefits
- Remote work flexibility
- Professional development budget

## Common Tactics and Responses

### "We can't afford that"
Response: "I understand budgets are tight. What flexibility do you have? Can we discuss a signing bonus or performance-based increase?"

### "This is our final offer"
Response: "I appreciate the offer. Can we revisit this after my 6-month review?"

### "That's above our range"
Response: "What would need to happen for me to reach that level? I'm committed to delivering exceptional results."

## After the Negotiation

- Get everything in writing
- Express enthusiasm about the role
- Deliver on your promises
- Document your achievements for the next negotiation

Remember: You'll never know if you don't ask!
    `,
    author: {
      name: 'Michael Torres',
      avatar: '/api/placeholder/100/100',
      bio: 'Compensation consultant and former HR director at Fortune 500 companies.'
    },
    category: 'Career Advice',
    tags: ['salary', 'negotiation', 'career growth', 'compensation'],
    image: '/api/placeholder/800/400',
    readTime: 9,
    publishedDate: '2024-12-08',
    featured: true
  },
  {
    id: 'blog-5',
    slug: 'linkedin-profile-optimization',
    title: 'Optimize Your LinkedIn Profile to Attract Recruiters',
    excerpt: 'Transform your LinkedIn profile into a recruiter magnet with these optimization strategies.',
    content: `
# Optimize Your LinkedIn Profile to Attract Recruiters

Your LinkedIn profile is your digital first impression. Make it count.

## Profile Photo

- Use a professional headshot
- Face should take up 60% of the frame
- Smile and look approachable
- Dress appropriately for your industry

## Headline

Don't just use your job title. Create a compelling headline:

**Instead of:** "Software Engineer at TechCorp"
**Try:** "Full-Stack Engineer | React & Node.js | Building Scalable Web Applications"

## About Section

Tell your story in 2-3 paragraphs:
- Who you are and what you do
- Key achievements and skills
- What you're looking for (if job searching)

Use first person and include keywords recruiters search for.

## Experience Section

For each role:
- Write achievement-focused bullet points
- Include metrics and results
- Add media (presentations, articles, projects)
- Use relevant keywords

## Skills & Endorsements

- Add at least 20 relevant skills
- Pin your top 3 skills
- Request endorsements from colleagues
- Endorse others to get endorsements back

## Recommendations

- Request recommendations from managers and colleagues
- Offer to write recommendations in exchange
- Aim for 3-5 quality recommendations

## Engagement

- Post content regularly (even just once a week)
- Comment thoughtfully on others' posts
- Share industry insights and articles
- Connect with people in your field

## Settings for Job Seekers

- Turn on "Open to Work" (visible to recruiters only)
- Set job preferences accurately
- Keep your profile updated

## Advanced Tips

- Use the Featured section for portfolio items
- Add certifications and courses
- Customize your URL (linkedin.com/in/yourname)
- Request skill assessments to earn badges

A great LinkedIn profile works for you 24/7!
    `,
    author: {
      name: 'Jennifer Adams',
      avatar: '/api/placeholder/100/100',
      bio: 'LinkedIn strategist and personal branding expert.'
    },
    category: 'Job Search',
    tags: ['LinkedIn', 'personal branding', 'networking', 'job search'],
    image: '/api/placeholder/800/400',
    readTime: 8,
    publishedDate: '2024-12-05',
    featured: false
  },
  {
    id: 'blog-6',
    slug: 'career-change-guide',
    title: 'Making a Career Change: A Step-by-Step Guide',
    excerpt: 'Thinking about switching careers? Here\'s everything you need to know to make a successful transition.',
    content: `
# Making a Career Change: A Step-by-Step Guide

Changing careers is a big decision. Here's how to do it right.

## Step 1: Self-Assessment

Ask yourself:
- What do you enjoy doing?
- What are you good at?
- What matters most to you (money, impact, flexibility)?
- What frustrates you about your current career?

## Step 2: Research New Fields

- Talk to people in your target industry
- Shadow professionals if possible
- Take introductory courses
- Attend industry events and meetups

## Step 3: Identify Transferable Skills

Skills that cross industries:
- Communication
- Project management
- Problem-solving
- Leadership
- Data analysis
- Customer relations

## Step 4: Fill Skill Gaps

Options for learning:
- Online courses (Coursera, Udemy, LinkedIn Learning)
- Bootcamps for quick skill acquisition
- Part-time degrees or certificates
- Self-study with projects

## Step 5: Build Experience

Even before switching:
- Take on relevant projects at your current job
- Volunteer or freelance
- Build a portfolio
- Contribute to open-source (for tech)

## Step 6: Update Your Brand

- Revise your resume to highlight transferable skills
- Update LinkedIn with your new direction
- Craft your career change story
- Network in your target industry

## Step 7: Apply Strategically

- Target companies known for valuing diverse backgrounds
- Look for roles that bridge your old and new fields
- Consider stepping stones rather than direct jumps
- Be open to entry-level or lateral moves initially

## Common Challenges

### Imposter Syndrome
Remember: Your unique background is an asset, not a liability.

### Salary Reduction
Plan financially for a potential temporary pay cut.

### Lack of Experience
Focus on skills and potential, not years in the field.

## Success Stories Are Everywhere

Many successful people changed careers:
- Teachers who became UX designers
- Lawyers who became tech entrepreneurs
- Military veterans who became project managers

Your career change story can be next!
    `,
    author: {
      name: 'Robert Hayes',
      avatar: '/api/placeholder/100/100',
      bio: 'Career transition coach who has helped hundreds of professionals change careers.'
    },
    category: 'Career Advice',
    tags: ['career change', 'career transition', 'job search', 'professional development'],
    image: '/api/placeholder/800/400',
    readTime: 11,
    publishedDate: '2024-12-02',
    featured: false
  },
  {
    id: 'blog-7',
    slug: 'networking-for-introverts',
    title: 'Networking Tips for Introverts: Building Connections Your Way',
    excerpt: 'Networking doesn\'t have to be draining. Learn strategies that work for introverted professionals.',
    content: `
# Networking Tips for Introverts

You don't have to be the life of the party to build meaningful professional connections.

## Reframe Networking

Networking isn't about collecting business cards or making small talk. It's about building genuine relationships that benefit both parties.

## Play to Your Strengths

### Deep Conversations Over Small Talk
- Skip the surface-level chat
- Ask thoughtful questions
- Listen actively (introverts excel at this!)
- Follow up with meaningful connections

### One-on-One Over Groups
- Prefer coffee meetings to large events
- Schedule informational interviews
- Join small group discussions or mastermind groups

### Written Communication
- Connect via email or LinkedIn messages
- Share articles and resources
- Write blog posts or comments

## Strategies That Work

### Prepare Conversation Starters
Have 3-5 questions ready:
- "What project are you most excited about?"
- "How did you get into this field?"
- "What's the best advice you've received?"

### Set Realistic Goals
At events, aim to have 2-3 quality conversations, not 20 superficial ones.

### Arrive Early
Fewer people means less overwhelming. You can also greet others as they arrive.

### Take Breaks
Step outside. Check your phone. Recharge as needed.

## Online Networking

Perfect for introverts:
- Engage in LinkedIn comments and posts
- Join Slack communities in your field
- Participate in virtual events with chat features
- Build a personal website or portfolio

## Following Up

- Send a personalized message within 24 hours
- Reference something specific from your conversation
- Offer value (share an article, make an introduction)
- Stay in touch periodically

## Building Your Network Over Time

You don't need 500 connections. Focus on quality:
- Colleagues and former colleagues
- Classmates and alumni
- Industry professionals you admire
- Mentors and mentees

Remember: Networking is a marathon, not a sprint. Build relationships authentically, at your own pace.
    `,
    author: {
      name: 'Amanda Chen',
      avatar: '/api/placeholder/100/100',
      bio: 'Self-proclaimed introvert who built a successful career through strategic networking.'
    },
    category: 'Professional Development',
    tags: ['networking', 'introverts', 'career', 'relationships'],
    image: '/api/placeholder/800/400',
    readTime: 7,
    publishedDate: '2024-11-28',
    featured: false
  },
  {
    id: 'blog-8',
    slug: 'future-of-work-2025',
    title: 'The Future of Work: Top Trends to Watch in 2025',
    excerpt: 'Stay ahead of the curve with insights into the workplace trends shaping the future of work.',
    content: `
# The Future of Work: Top Trends to Watch in 2025

The workplace is evolving rapidly. Here's what to expect.

## 1. AI as a Collaborative Tool

Artificial intelligence is transforming how we work:
- AI assistants for routine tasks
- Enhanced decision-making with data insights
- Automation of repetitive processes
- New roles focused on AI management

**What it means for you:** Develop AI literacy and learn to work alongside AI tools.

## 2. Hybrid Work is the New Normal

The office isn't going away, but it's changing:
- Flexible work arrangements
- Purpose-driven office visits
- Investment in collaboration technology
- Focus on outcomes over hours

**What it means for you:** Master both remote and in-person collaboration.

## 3. Skills Over Degrees

Employers are prioritizing skills:
- Rise of skills-based hiring
- Alternative credentials gaining acceptance
- Continuous learning as a requirement
- Project-based assessments in hiring

**What it means for you:** Focus on building demonstrable skills and portfolio.

## 4. Employee Well-being Takes Center Stage

Mental health and well-being are priorities:
- Mental health benefits and resources
- Flexible schedules for work-life balance
- Burnout prevention programs
- Four-day workweek experiments

**What it means for you:** Prioritize employers who value well-being.

## 5. The Gig Economy Grows Up

Freelancing and contracting continue to rise:
- More skilled professionals choosing freelance
- Platforms connecting talent with opportunities
- Benefits and protections improving
- Companies building flexible talent strategies

**What it means for you:** Consider portfolio careers and multiple income streams.

## 6. Green Jobs and Sustainability

Climate focus creates new opportunities:
- Renewable energy sector growth
- Sustainability roles in every industry
- Carbon accounting and ESG positions
- Green tech innovation

**What it means for you:** Understand sustainability in your industry.

## 7. Lifelong Learning Becomes Essential

The half-life of skills is shrinking:
- Continuous upskilling requirements
- Company-sponsored learning programs
- Micro-credentials and certifications
- Learning in the flow of work

**What it means for you:** Make learning a habit, not an event.

## Preparing for the Future

1. Stay curious and adaptable
2. Build a diverse skill set
3. Network across industries
4. Embrace change as an opportunity
5. Take care of your mental and physical health

The future of work is being written now. Be an author, not just a reader!
    `,
    author: {
      name: 'Daniel Foster',
      avatar: '/api/placeholder/100/100',
      bio: 'Future of work researcher and workplace innovation consultant.'
    },
    category: 'Industry Insights',
    tags: ['future of work', 'trends', 'AI', 'remote work', '2025'],
    image: '/api/placeholder/800/400',
    readTime: 10,
    publishedDate: '2024-11-25',
    featured: true
  },
  {
    id: 'blog-9',
    slug: 'cover-letter-mistakes',
    title: '10 Cover Letter Mistakes That Could Cost You the Job',
    excerpt: 'Avoid these common cover letter errors to improve your chances of landing an interview.',
    content: `
# 10 Cover Letter Mistakes That Could Cost You the Job

Your cover letter is your chance to tell your story. Don't blow it with these mistakes.

## 1. Using a Generic Template

**The Mistake:** "I am writing to apply for a position at your company..."

**The Fix:** Customize every cover letter. Mention the specific role, company, and why you're excited about both.

## 2. Repeating Your Resume

**The Mistake:** Listing the same bullet points from your resume.

**The Fix:** Use the cover letter to tell stories and provide context that your resume can't capture.

## 3. Making It All About You

**The Mistake:** "I want this job because it will help me grow my career..."

**The Fix:** Focus on what you can do for the company. Show you understand their challenges.

## 4. Being Too Long

**The Mistake:** Writing more than one page.

**The Fix:** Keep it to 3-4 paragraphs. Hiring managers are busy.

## 5. Not Proofreading

**The Mistake:** Typos, grammar errors, wrong company name.

**The Fix:** Read it aloud. Have someone else review it. Use spell-check but don't rely on it alone.

## 6. Weak Opening

**The Mistake:** "I found your job posting on Indeed..."

**The Fix:** Start with a hook. Lead with your most compelling qualification or a connection to the company.

## 7. No Call to Action

**The Mistake:** Ending weakly without asking for next steps.

**The Fix:** Express enthusiasm for an interview and provide your availability.

## 8. Wrong Tone

**The Mistake:** Too formal ("I humbly submit my application...") or too casual ("Hey, thought I'd apply...")

**The Fix:** Professional but personable. Write like you're talking to a respected colleague.

## 9. Ignoring the Job Description

**The Mistake:** Not addressing the specific requirements mentioned.

**The Fix:** Mirror the language from the job posting. Address their stated needs directly.

## 10. Forgetting to Attach It

**The Mistake:** Sending the email without the cover letter attached.

**The Fix:** Double-check attachments before hitting send. Use a consistent naming convention.

## A Better Approach

**Structure your cover letter like this:**

1. **Hook:** Why you're excited about this role
2. **Value:** What you bring and key achievements
3. **Fit:** Why you're right for this company specifically
4. **Close:** Call to action and contact info

Your cover letter should make them want to meet you. Make every word count!
    `,
    author: {
      name: 'Sarah Mitchell',
      avatar: '/api/placeholder/100/100',
      bio: 'Career Coach with 10+ years helping professionals land their dream jobs.'
    },
    category: 'Resume Writing',
    tags: ['cover letter', 'job search', 'application', 'mistakes'],
    image: '/api/placeholder/800/400',
    readTime: 6,
    publishedDate: '2024-11-20',
    featured: false
  },
  {
    id: 'blog-10',
    slug: 'first-90-days-new-job',
    title: 'How to Succeed in Your First 90 Days at a New Job',
    excerpt: 'Make a strong impression and set yourself up for long-term success with this 90-day plan.',
    content: `
# How to Succeed in Your First 90 Days at a New Job

The first 90 days are critical. Here's how to make them count.

## Days 1-30: Learn and Listen

### Week 1: Absorb Everything
- Complete all onboarding tasks
- Set up your workspace and tools
- Meet your immediate team
- Understand your role expectations

### Weeks 2-4: Go Deeper
- Learn the company culture and norms
- Understand team dynamics and relationships
- Map out key stakeholders
- Identify quick wins you can accomplish

### Key Actions
- Take copious notes
- Ask lots of questions
- Schedule 1:1s with teammates
- Don't try to change things yet

## Days 31-60: Contribute

### Start Adding Value
- Take on small projects
- Offer help to teammates
- Share ideas thoughtfully
- Begin building relationships outside your team

### Seek Feedback
- Ask your manager for regular check-ins
- Request feedback on your work
- Adjust your approach based on input
- Show you're coachable

### Key Actions
- Deliver your first wins
- Build credibility through reliability
- Start attending optional meetings
- Document your contributions

## Days 61-90: Lead and Grow

### Increase Your Impact
- Take on larger responsibilities
- Propose improvements and ideas
- Mentor newer team members
- Contribute to cross-functional projects

### Plan for the Future
- Set goals with your manager
- Identify skills to develop
- Build your internal network
- Position yourself for growth opportunities

### Key Actions
- Lead at least one initiative
- Present your 90-day accomplishments
- Discuss your career trajectory
- Establish yourself as a valuable team member

## Common Mistakes to Avoid

### Trying to Change Everything
Wait until you understand why things are done a certain way.

### Not Asking for Help
It's better to ask than to struggle silently.

### Overcommitting
Don't say yes to everything. Learn to manage expectations.

### Neglecting Relationships
Technical skills matter, but relationships make careers.

### Not Documenting Wins
Track your achievements from day one.

## 90-Day Review Conversation

Come prepared with:
- Your key accomplishments
- Feedback you've received
- Challenges you've faced
- Goals for the next quarter
- Questions about your growth

Your first 90 days set the foundation for your entire tenure. Make them count!
    `,
    author: {
      name: 'Michael Torres',
      avatar: '/api/placeholder/100/100',
      bio: 'Compensation consultant and former HR director at Fortune 500 companies.'
    },
    category: 'Career Advice',
    tags: ['new job', 'onboarding', 'success', 'career'],
    image: '/api/placeholder/800/400',
    readTime: 9,
    publishedDate: '2024-11-15',
    featured: false
  }
];

export const getBlogBySlug = (slug: string): BlogPost | undefined => {
  return blogs.find(blog => blog.slug === slug);
};

export const getFeaturedBlogs = (limit: number = 3): BlogPost[] => {
  return blogs.filter(blog => blog.featured).slice(0, limit);
};

export const getRecentBlogs = (limit: number = 6): BlogPost[] => {
  return [...blogs]
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
    .slice(0, limit);
};

export const getBlogsByCategory = (category: string): BlogPost[] => {
  return blogs.filter(blog => blog.category === category);
};

export const searchBlogs = (query: string): BlogPost[] => {
  const lowerQuery = query.toLowerCase();
  return blogs.filter(
    blog =>
      blog.title.toLowerCase().includes(lowerQuery) ||
      blog.excerpt.toLowerCase().includes(lowerQuery) ||
      blog.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

export const getBlogCategories = (): string[] => {
  const categories = new Set(blogs.map(blog => blog.category));
  return Array.from(categories);
};

export const getRelatedBlogs = (blogId: string, category: string, limit: number = 3): BlogPost[] => {
  return blogs
    .filter(blog => blog.id !== blogId && blog.category === category)
    .slice(0, limit);
};

export const blogCategories = [
  'All',
  'Resume Writing',
  'Interview Tips',
  'Work-Life Balance',
  'Career Advice',
  'Job Search',
  'Professional Development',
  'Industry Insights',
];
