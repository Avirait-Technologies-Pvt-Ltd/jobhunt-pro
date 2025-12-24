import { faqs, getFaqsByCategory, getFaqCategories, searchFaqs, faqCategories } from '@/data/faq';

describe('FAQ Data', () => {
  describe('faqs array', () => {
    it('should have faqs', () => {
      expect(faqs.length).toBeGreaterThan(0);
    });

    it('should have 28 faqs', () => {
      expect(faqs).toHaveLength(28);
    });

    it('should have required properties for each faq', () => {
      faqs.forEach((faq) => {
        expect(faq).toHaveProperty('id');
        expect(faq).toHaveProperty('question');
        expect(faq).toHaveProperty('answer');
        expect(faq).toHaveProperty('category');
      });
    });

    it('should have unique ids', () => {
      const ids = faqs.map((f) => f.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have questions ending with ?', () => {
      faqs.forEach((faq) => {
        expect(faq.question.endsWith('?')).toBe(true);
      });
    });

    it('should have non-empty answers', () => {
      faqs.forEach((faq) => {
        expect(faq.answer.length).toBeGreaterThan(0);
      });
    });

    it('should have non-empty categories', () => {
      faqs.forEach((faq) => {
        expect(faq.category.length).toBeGreaterThan(0);
      });
    });

    it('should contain "What is JobHunt Pro?" question', () => {
      const whatIsQuestion = faqs.find((f) => f.question.includes('What is JobHunt Pro'));
      expect(whatIsQuestion).toBeDefined();
    });

    it('should have General category faqs', () => {
      const generalFaqs = faqs.filter((f) => f.category === 'General');
      expect(generalFaqs.length).toBeGreaterThan(0);
    });

    it('should have Job Search category faqs', () => {
      const jobSearchFaqs = faqs.filter((f) => f.category === 'Job Search');
      expect(jobSearchFaqs.length).toBeGreaterThan(0);
    });

    it('should have Support category faqs', () => {
      const supportFaqs = faqs.filter((f) => f.category === 'Support');
      expect(supportFaqs.length).toBeGreaterThan(0);
    });
  });

  describe('getFaqsByCategory', () => {
    it('should return faqs for General category', () => {
      const result = getFaqsByCategory('General');
      expect(result.length).toBeGreaterThan(0);
      result.forEach((faq) => {
        expect(faq.category).toBe('General');
      });
    });

    it('should return faqs for Job Search category', () => {
      const result = getFaqsByCategory('Job Search');
      expect(result.length).toBeGreaterThan(0);
      result.forEach((faq) => {
        expect(faq.category).toBe('Job Search');
      });
    });

    it('should return faqs for Profile & Resume category', () => {
      const result = getFaqsByCategory('Profile & Resume');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should return faqs for Applications category', () => {
      const result = getFaqsByCategory('Applications');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should return faqs for Account & Security category', () => {
      const result = getFaqsByCategory('Account & Security');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should return faqs for Companies category', () => {
      const result = getFaqsByCategory('Companies');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should return empty array for non-existent category', () => {
      const result = getFaqsByCategory('NonExistentCategory');
      expect(result).toHaveLength(0);
    });

    it('should be case-sensitive', () => {
      const result = getFaqsByCategory('general');
      expect(result).toHaveLength(0);
    });
  });

  describe('getFaqCategories', () => {
    it('should return array of category strings', () => {
      const result = getFaqCategories();
      expect(Array.isArray(result)).toBe(true);
      result.forEach((category) => {
        expect(typeof category).toBe('string');
      });
    });

    it('should return unique categories', () => {
      const result = getFaqCategories();
      const uniqueCategories = new Set(result);
      expect(uniqueCategories.size).toBe(result.length);
    });

    it('should contain General category', () => {
      const result = getFaqCategories();
      expect(result).toContain('General');
    });

    it('should contain Job Search category', () => {
      const result = getFaqCategories();
      expect(result).toContain('Job Search');
    });

    it('should contain Support category', () => {
      const result = getFaqCategories();
      expect(result).toContain('Support');
    });

    it('should have expected number of categories', () => {
      const result = getFaqCategories();
      expect(result.length).toBeGreaterThanOrEqual(6);
    });
  });

  describe('searchFaqs', () => {
    it('should find faqs by question keyword', () => {
      const result = searchFaqs('account');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should find faqs by answer keyword', () => {
      const result = searchFaqs('email');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should be case-insensitive', () => {
      const resultLower = searchFaqs('job');
      const resultUpper = searchFaqs('JOB');
      expect(resultLower.length).toBe(resultUpper.length);
    });

    it('should return empty array for no matches', () => {
      const result = searchFaqs('xyznonexistentquery');
      expect(result).toHaveLength(0);
    });

    it('should find faqs containing "password"', () => {
      const result = searchFaqs('password');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should find faqs containing "resume"', () => {
      const result = searchFaqs('resume');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should find faqs containing "free"', () => {
      const result = searchFaqs('free');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should handle partial word matches', () => {
      const result = searchFaqs('app');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should return all faqs containing common word', () => {
      const result = searchFaqs('you');
      expect(result.length).toBeGreaterThan(5);
    });
  });

  describe('faqCategories constant', () => {
    it('should be an array', () => {
      expect(Array.isArray(faqCategories)).toBe(true);
    });

    it('should contain "All"', () => {
      expect(faqCategories).toContain('All');
    });

    it('should contain "General"', () => {
      expect(faqCategories).toContain('General');
    });

    it('should contain "Job Search"', () => {
      expect(faqCategories).toContain('Job Search');
    });

    it('should contain "Support"', () => {
      expect(faqCategories).toContain('Support');
    });

    it('should have "All" as first item', () => {
      expect(faqCategories[0]).toBe('All');
    });
  });
});
