import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuthProvider } from '@/context/AuthContext';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/blog',
}));

// Mock the blogs data
jest.mock('@/data/blogs', () => ({
  blogs: [
    {
      id: 'blog-1',
      slug: 'how-to-write-resume',
      title: 'How to Write a Perfect Resume',
      excerpt: 'Learn the best practices for writing a resume that gets noticed.',
      content: 'Full content here...',
      author: {
        name: 'John Doe',
        avatar: '/authors/john.jpg',
        role: 'Career Coach',
      },
      category: 'Resume Tips',
      tags: ['resume', 'career', 'tips'],
      publishedDate: '2024-01-10',
      readTime: 5,
      image: '/blog/resume.jpg',
      featured: true,
    },
    {
      id: 'blog-2',
      slug: 'interview-tips',
      title: 'Top 10 Interview Tips',
      excerpt: 'Ace your next interview with these proven strategies.',
      content: 'Full content here...',
      author: {
        name: 'Jane Smith',
        avatar: '/authors/jane.jpg',
        role: 'HR Manager',
      },
      category: 'Interview',
      tags: ['interview', 'tips', 'career'],
      publishedDate: '2024-01-08',
      readTime: 7,
      image: '/blog/interview.jpg',
      featured: false,
    },
  ],
  blogCategories: ['All', 'Resume Tips', 'Interview', 'Career Growth'],
  getBlogBySlug: jest.fn(),
  getBlogCategories: jest.fn(() => ['Resume Tips', 'Interview', 'Career Growth']),
  getFeaturedBlogs: jest.fn(() => []),
}));

const renderWithAuth = (ui: React.ReactElement) => {
  return render(<AuthProvider>{ui}</AuthProvider>);
};

describe('Blog Page', () => {
  let BlogPage: React.ComponentType;

  beforeAll(async () => {
    const module = await import('@/app/blog/page');
    BlogPage = module.default;
  });

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    renderWithAuth(<BlogPage />);
    expect(document.body).toBeDefined();
  });

  it('should have main content', () => {
    const { container } = renderWithAuth(<BlogPage />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render heading elements', () => {
    renderWithAuth(<BlogPage />);
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
  });

  it('should contain blog or resources text', () => {
    renderWithAuth(<BlogPage />);
    const blogElements = screen.getAllByText(/blog|resources|articles|career/i);
    expect(blogElements.length).toBeGreaterThan(0);
  });

  it('should have links to blog posts', () => {
    renderWithAuth(<BlogPage />);
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });
});
