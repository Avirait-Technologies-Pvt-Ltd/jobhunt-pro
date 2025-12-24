import {
  cn,
  formatSalary,
  formatDate,
  timeAgo,
  truncateText,
  generateId,
  slugify,
  getInitials,
  calculateProfileCompletion,
  debounce,
  formatDistanceToNow,
} from '@/lib/utils';

describe('cn (className utility)', () => {
  it('should merge class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('should handle conditional classes', () => {
    expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz');
  });

  it('should merge tailwind classes correctly', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4');
  });

  it('should handle arrays', () => {
    expect(cn(['foo', 'bar'])).toBe('foo bar');
  });

  it('should handle objects', () => {
    expect(cn({ foo: true, bar: false, baz: true })).toBe('foo baz');
  });

  it('should handle empty inputs', () => {
    expect(cn()).toBe('');
  });
});

describe('formatSalary', () => {
  it('should format salary range correctly', () => {
    expect(formatSalary(50000, 70000)).toBe('$50,000 - $70,000/yr');
  });

  it('should format single salary value', () => {
    expect(formatSalary(60000, 60000)).toBe('$60,000/yr');
  });

  it('should handle monthly period', () => {
    expect(formatSalary(5000, 7000, 'USD', 'monthly')).toBe('$5,000 - $7,000/mo');
  });

  it('should handle hourly period', () => {
    expect(formatSalary(25, 35, 'USD', 'hourly')).toBe('$25 - $35/hr');
  });

  it('should handle different currencies', () => {
    expect(formatSalary(50000, 70000, 'EUR')).toBe('€50,000 - €70,000/yr');
  });

  it('should handle large salary ranges', () => {
    expect(formatSalary(100000, 200000)).toBe('$100,000 - $200,000/yr');
  });
});

describe('formatDate', () => {
  it('should format date string correctly', () => {
    const result = formatDate('2024-01-15T10:00:00Z');
    expect(result).toBe('Jan 15, 2024');
  });

  it('should format Date object correctly', () => {
    const date = new Date('2024-06-20');
    const result = formatDate(date);
    expect(result).toBe('Jun 20, 2024');
  });

  it('should handle different months', () => {
    expect(formatDate('2024-12-25')).toBe('Dec 25, 2024');
    expect(formatDate('2024-03-01')).toBe('Mar 1, 2024');
  });
});

describe('timeAgo', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-15T12:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return "Just now" for recent times', () => {
    expect(timeAgo('2024-01-15T11:59:30Z')).toBe('Just now');
  });

  it('should return minutes ago', () => {
    expect(timeAgo('2024-01-15T11:55:00Z')).toBe('5 minutes ago');
  });

  it('should return hours ago', () => {
    expect(timeAgo('2024-01-15T09:00:00Z')).toBe('3 hours ago');
  });

  it('should return days ago', () => {
    expect(timeAgo('2024-01-12T12:00:00Z')).toBe('3 days ago');
  });

  it('should return weeks ago', () => {
    expect(timeAgo('2024-01-01T12:00:00Z')).toBe('2 weeks ago');
  });

  it('should return months ago', () => {
    expect(timeAgo('2023-11-15T12:00:00Z')).toBe('2 months ago');
  });

  it('should return years ago', () => {
    expect(timeAgo('2022-01-15T12:00:00Z')).toBe('2 years ago');
  });
});

describe('truncateText', () => {
  it('should return original text if shorter than maxLength', () => {
    expect(truncateText('Hello', 10)).toBe('Hello');
  });

  it('should truncate text and add ellipsis', () => {
    expect(truncateText('Hello World', 8)).toBe('Hello Wo...');
  });

  it('should handle exact length', () => {
    expect(truncateText('Hello', 5)).toBe('Hello');
  });

  it('should trim whitespace before adding ellipsis', () => {
    expect(truncateText('Hello World', 6)).toBe('Hello...');
  });

  it('should handle empty string', () => {
    expect(truncateText('', 10)).toBe('');
  });
});

describe('generateId', () => {
  it('should generate a string', () => {
    const id = generateId();
    expect(typeof id).toBe('string');
  });

  it('should generate unique ids', () => {
    const ids = new Set(Array.from({ length: 100 }, () => generateId()));
    expect(ids.size).toBe(100);
  });

  it('should generate ids of correct length', () => {
    const id = generateId();
    expect(id.length).toBe(7);
  });

  it('should only contain alphanumeric characters', () => {
    const id = generateId();
    expect(id).toMatch(/^[a-z0-9]+$/);
  });
});

describe('slugify', () => {
  it('should convert to lowercase', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('should replace spaces with hyphens', () => {
    expect(slugify('hello world')).toBe('hello-world');
  });

  it('should remove special characters', () => {
    expect(slugify('Hello, World!')).toBe('hello-world');
  });

  it('should handle multiple spaces', () => {
    expect(slugify('hello   world')).toBe('hello-world');
  });

  it('should remove leading and trailing hyphens', () => {
    expect(slugify(' hello world ')).toBe('hello-world');
  });

  it('should handle underscores', () => {
    expect(slugify('hello_world')).toBe('hello-world');
  });

  it('should handle complex strings', () => {
    expect(slugify('Senior Software Engineer - React/TypeScript')).toBe(
      'senior-software-engineer-reacttypescript'
    );
  });
});

describe('getInitials', () => {
  it('should return initials in uppercase', () => {
    expect(getInitials('John', 'Doe')).toBe('JD');
  });

  it('should handle lowercase names', () => {
    expect(getInitials('john', 'doe')).toBe('JD');
  });

  it('should handle single character names', () => {
    expect(getInitials('A', 'B')).toBe('AB');
  });

  it('should handle long names', () => {
    expect(getInitials('Alexander', 'Benjamin')).toBe('AB');
  });
});

describe('calculateProfileCompletion', () => {
  it('should return 0 for empty profile', () => {
    expect(calculateProfileCompletion({})).toBe(0);
  });

  it('should calculate correct percentage for partial profile', () => {
    const user = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
    };
    // 3 out of 11 fields = ~27%
    expect(calculateProfileCompletion(user)).toBe(27);
  });

  it('should return 100 for complete profile', () => {
    const user = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '555-1234',
      location: 'NYC',
      title: 'Developer',
      bio: 'A developer',
      avatar: 'avatar.jpg',
      skills: ['React'],
      experience: [{ company: 'Test' }],
      education: [{ school: 'Test U' }],
    };
    expect(calculateProfileCompletion(user)).toBe(100);
  });

  it('should handle empty arrays as incomplete', () => {
    const user = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      skills: [],
      experience: [],
      education: [],
    };
    // 3 out of 11 = ~27%
    expect(calculateProfileCompletion(user)).toBe(27);
  });
});

describe('debounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should delay function execution', () => {
    const fn = jest.fn();
    const debouncedFn = debounce(fn, 100);

    debouncedFn();
    expect(fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should only call once for multiple rapid calls', () => {
    const fn = jest.fn();
    const debouncedFn = debounce(fn, 100);

    debouncedFn();
    debouncedFn();
    debouncedFn();

    jest.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should pass arguments to the function', () => {
    const fn = jest.fn();
    const debouncedFn = debounce(fn, 100);

    debouncedFn('arg1', 'arg2');
    jest.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledWith('arg1', 'arg2');
  });

  it('should reset timer on new call', () => {
    const fn = jest.fn();
    const debouncedFn = debounce(fn, 100);

    debouncedFn();
    jest.advanceTimersByTime(50);
    debouncedFn();
    jest.advanceTimersByTime(50);

    expect(fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(50);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe('formatDistanceToNow', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-15T12:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return "just now" for recent times', () => {
    const date = new Date('2024-01-15T11:59:30Z');
    expect(formatDistanceToNow(date)).toBe('just now');
  });

  it('should return singular minute', () => {
    const date = new Date('2024-01-15T11:59:00Z');
    expect(formatDistanceToNow(date)).toBe('1 minute ago');
  });

  it('should return plural minutes', () => {
    const date = new Date('2024-01-15T11:55:00Z');
    expect(formatDistanceToNow(date)).toBe('5 minutes ago');
  });

  it('should return singular hour', () => {
    const date = new Date('2024-01-15T11:00:00Z');
    expect(formatDistanceToNow(date)).toBe('1 hour ago');
  });

  it('should return plural hours', () => {
    const date = new Date('2024-01-15T09:00:00Z');
    expect(formatDistanceToNow(date)).toBe('3 hours ago');
  });

  it('should return singular day', () => {
    const date = new Date('2024-01-14T12:00:00Z');
    expect(formatDistanceToNow(date)).toBe('1 day ago');
  });

  it('should return plural days', () => {
    const date = new Date('2024-01-12T12:00:00Z');
    expect(formatDistanceToNow(date)).toBe('3 days ago');
  });

  it('should return singular week', () => {
    const date = new Date('2024-01-08T12:00:00Z');
    expect(formatDistanceToNow(date)).toBe('1 week ago');
  });

  it('should return plural weeks', () => {
    const date = new Date('2024-01-01T12:00:00Z');
    expect(formatDistanceToNow(date)).toBe('2 weeks ago');
  });

  it('should return singular month', () => {
    const date = new Date('2023-12-15T12:00:00Z');
    expect(formatDistanceToNow(date)).toBe('1 month ago');
  });

  it('should return plural months', () => {
    const date = new Date('2023-11-15T12:00:00Z');
    expect(formatDistanceToNow(date)).toBe('2 months ago');
  });

  it('should return singular year', () => {
    const date = new Date('2023-01-15T12:00:00Z');
    expect(formatDistanceToNow(date)).toBe('1 year ago');
  });

  it('should return plural years', () => {
    const date = new Date('2022-01-15T12:00:00Z');
    expect(formatDistanceToNow(date)).toBe('2 years ago');
  });
});
