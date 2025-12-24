import { categories, getCategoryByName, getTopCategories } from '@/data/categories';

describe('Categories Data', () => {
  describe('categories array', () => {
    it('should have categories', () => {
      expect(categories.length).toBeGreaterThan(0);
    });

    it('should have 16 categories', () => {
      expect(categories).toHaveLength(16);
    });

    it('should have required properties for each category', () => {
      categories.forEach((category) => {
        expect(category).toHaveProperty('id');
        expect(category).toHaveProperty('name');
        expect(category).toHaveProperty('icon');
        expect(category).toHaveProperty('jobCount');
        expect(category).toHaveProperty('description');
      });
    });

    it('should have unique ids', () => {
      const ids = categories.map((c) => c.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have unique names', () => {
      const names = categories.map((c) => c.name);
      const uniqueNames = new Set(names);
      expect(uniqueNames.size).toBe(names.length);
    });

    it('should have positive job counts', () => {
      categories.forEach((category) => {
        expect(category.jobCount).toBeGreaterThan(0);
      });
    });

    it('should have non-empty descriptions', () => {
      categories.forEach((category) => {
        expect(category.description.length).toBeGreaterThan(0);
      });
    });

    it('should contain Technology category', () => {
      const techCategory = categories.find((c) => c.name === 'Technology');
      expect(techCategory).toBeDefined();
      expect(techCategory?.icon).toBe('Monitor');
    });

    it('should contain Design category', () => {
      const designCategory = categories.find((c) => c.name === 'Design');
      expect(designCategory).toBeDefined();
      expect(designCategory?.icon).toBe('Palette');
    });

    it('should contain Healthcare category', () => {
      const healthCategory = categories.find((c) => c.name === 'Healthcare');
      expect(healthCategory).toBeDefined();
      expect(healthCategory?.icon).toBe('Heart');
    });

    it('should have valid icon names', () => {
      const validIcons = [
        'Monitor', 'Palette', 'Megaphone', 'TrendingUp', 'DollarSign',
        'Heart', 'GraduationCap', 'Wrench', 'Users', 'Headphones',
        'Scale', 'Settings', 'BarChart', 'Package', 'FileText', 'Briefcase'
      ];
      categories.forEach((category) => {
        expect(validIcons).toContain(category.icon);
      });
    });
  });

  describe('getCategoryByName', () => {
    it('should return category when name exists', () => {
      const result = getCategoryByName('Technology');
      expect(result).toBeDefined();
      expect(result?.name).toBe('Technology');
    });

    it('should return undefined when name does not exist', () => {
      const result = getCategoryByName('NonExistentCategory');
      expect(result).toBeUndefined();
    });

    it('should be case-sensitive', () => {
      const result = getCategoryByName('technology');
      expect(result).toBeUndefined();
    });

    it('should find Design category', () => {
      const result = getCategoryByName('Design');
      expect(result?.id).toBe('cat-2');
      expect(result?.icon).toBe('Palette');
    });

    it('should find Marketing category', () => {
      const result = getCategoryByName('Marketing');
      expect(result).toBeDefined();
      expect(result?.jobCount).toBeGreaterThan(0);
    });

    it('should find Other category', () => {
      const result = getCategoryByName('Other');
      expect(result).toBeDefined();
      expect(result?.icon).toBe('Briefcase');
    });
  });

  describe('getTopCategories', () => {
    it('should return categories sorted by job count descending', () => {
      const result = getTopCategories(16);
      for (let i = 0; i < result.length - 1; i++) {
        expect(result[i].jobCount).toBeGreaterThanOrEqual(result[i + 1].jobCount);
      }
    });

    it('should return default 8 categories', () => {
      const result = getTopCategories();
      expect(result).toHaveLength(8);
    });

    it('should return specified number of categories', () => {
      const result = getTopCategories(5);
      expect(result).toHaveLength(5);
    });

    it('should return all categories when limit exceeds total', () => {
      const result = getTopCategories(100);
      expect(result).toHaveLength(16);
    });

    it('should return empty array when limit is 0', () => {
      const result = getTopCategories(0);
      expect(result).toHaveLength(0);
    });

    it('should have Technology as one of top categories', () => {
      const result = getTopCategories(3);
      const names = result.map((c) => c.name);
      expect(names).toContain('Technology');
    });

    it('should not mutate original categories array', () => {
      const originalOrder = [...categories];
      getTopCategories(10);
      expect(categories).toEqual(originalOrder);
    });

    it('should return categories with highest job counts first', () => {
      const result = getTopCategories(1);
      const maxJobCount = Math.max(...categories.map((c) => c.jobCount));
      expect(result[0].jobCount).toBe(maxJobCount);
    });
  });
});
