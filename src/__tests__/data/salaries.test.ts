import {
  salaryData,
  cityLivingCosts,
  getSalaryByRole,
  getSalaryByLocation,
  compareCities,
  getAverageSalaryByCategory,
  roles,
  locations,
  categories,
} from '@/data/salaries';

describe('Salaries Data', () => {
  describe('salaryData', () => {
    it('should have salary data defined', () => {
      expect(salaryData).toBeDefined();
      expect(Array.isArray(salaryData)).toBe(true);
      expect(salaryData.length).toBeGreaterThan(0);
    });

    it('should have valid salary entries', () => {
      salaryData.forEach((entry) => {
        expect(entry).toHaveProperty('role');
        expect(entry).toHaveProperty('category');
        expect(entry).toHaveProperty('experienceLevel');
        expect(entry).toHaveProperty('location');
        expect(entry).toHaveProperty('salaryRange');
        expect(entry).toHaveProperty('median');
      });
    });

    it('should have valid salary ranges', () => {
      salaryData.forEach((entry) => {
        expect(entry.salaryRange.min).toBeLessThanOrEqual(entry.salaryRange.max);
        expect(entry.median).toBeGreaterThanOrEqual(entry.salaryRange.min);
        expect(entry.median).toBeLessThanOrEqual(entry.salaryRange.max);
      });
    });

    it('should have valid percentiles', () => {
      salaryData.forEach((entry) => {
        if (entry.percentile25 && entry.percentile75) {
          expect(entry.percentile25).toBeLessThanOrEqual(entry.percentile75);
          expect(entry.percentile25).toBeGreaterThanOrEqual(entry.salaryRange.min);
          expect(entry.percentile75).toBeLessThanOrEqual(entry.salaryRange.max);
        }
      });
    });
  });

  describe('cityLivingCosts', () => {
    it('should have city living costs defined', () => {
      expect(cityLivingCosts).toBeDefined();
      expect(Array.isArray(cityLivingCosts)).toBe(true);
      expect(cityLivingCosts.length).toBeGreaterThan(0);
    });

    it('should have valid city entries', () => {
      cityLivingCosts.forEach((city) => {
        expect(city).toHaveProperty('city');
        expect(city).toHaveProperty('country');
        expect(city).toHaveProperty('costIndex');
        expect(city).toHaveProperty('rentIndex');
        expect(city).toHaveProperty('groceriesIndex');
        expect(city).toHaveProperty('transportIndex');
      });
    });

    it('should have positive index values', () => {
      cityLivingCosts.forEach((city) => {
        expect(city.costIndex).toBeGreaterThan(0);
        expect(city.rentIndex).toBeGreaterThan(0);
        expect(city.groceriesIndex).toBeGreaterThan(0);
        expect(city.transportIndex).toBeGreaterThan(0);
      });
    });

    it('should have San Francisco as baseline (100)', () => {
      const sf = cityLivingCosts.find((c) => c.city === 'San Francisco');
      expect(sf).toBeDefined();
      expect(sf?.costIndex).toBe(100);
    });
  });

  describe('getSalaryByRole', () => {
    it('should return salaries for valid role', () => {
      const result = getSalaryByRole('Software Engineer');
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should return matching roles only', () => {
      const result = getSalaryByRole('Software Engineer');
      result.forEach((entry) => {
        expect(entry.role.toLowerCase()).toContain('software engineer');
      });
    });

    it('should be case insensitive', () => {
      const result1 = getSalaryByRole('software engineer');
      const result2 = getSalaryByRole('SOFTWARE ENGINEER');
      expect(result1.length).toBe(result2.length);
    });

    it('should return empty array for non-existent role', () => {
      const result = getSalaryByRole('nonexistentrole123');
      expect(result).toEqual([]);
    });
  });

  describe('getSalaryByLocation', () => {
    it('should return salaries for valid location', () => {
      const result = getSalaryByLocation('San Francisco');
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should return matching locations only', () => {
      const result = getSalaryByLocation('San Francisco');
      result.forEach((entry) => {
        expect(entry.location.toLowerCase()).toContain('san francisco');
      });
    });

    it('should be case insensitive', () => {
      const result1 = getSalaryByLocation('san francisco');
      const result2 = getSalaryByLocation('SAN FRANCISCO');
      expect(result1.length).toBe(result2.length);
    });

    it('should return empty array for non-existent location', () => {
      const result = getSalaryByLocation('nonexistentlocation123');
      expect(result).toEqual([]);
    });
  });

  describe('compareCities', () => {
    it('should return comparison for valid cities', () => {
      const result = compareCities('San Francisco', 'New York');
      expect(result).toHaveProperty('city1');
      expect(result).toHaveProperty('city2');
      expect(result.city1).toBeDefined();
      expect(result.city2).toBeDefined();
    });

    it('should return correct city data', () => {
      const result = compareCities('San Francisco', 'Austin');
      expect(result.city1?.city).toBe('San Francisco');
      expect(result.city2?.city).toBe('Austin');
    });

    it('should be case insensitive', () => {
      const result1 = compareCities('san francisco', 'new york');
      const result2 = compareCities('SAN FRANCISCO', 'NEW YORK');
      expect(result1.city1?.city).toBe(result2.city1?.city);
      expect(result1.city2?.city).toBe(result2.city2?.city);
    });

    it('should return undefined for non-existent cities', () => {
      const result = compareCities('NonexistentCity', 'AnotherFake');
      expect(result.city1).toBeUndefined();
      expect(result.city2).toBeUndefined();
    });

    it('should allow one valid and one invalid city', () => {
      const result = compareCities('San Francisco', 'FakeCity');
      expect(result.city1).toBeDefined();
      expect(result.city2).toBeUndefined();
    });
  });

  describe('getAverageSalaryByCategory', () => {
    it('should return average for valid category', () => {
      const result = getAverageSalaryByCategory('Technology');
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThan(0);
    });

    it('should return 0 for non-existent category', () => {
      const result = getAverageSalaryByCategory('NonexistentCategory');
      expect(result).toBe(0);
    });

    it('should return rounded value', () => {
      const result = getAverageSalaryByCategory('Technology');
      expect(Number.isInteger(result)).toBe(true);
    });

    it('should calculate median averages correctly', () => {
      const techSalaries = salaryData.filter((s) => s.category === 'Technology');
      const expectedAvg =
        techSalaries.length > 0
          ? Math.round(
              techSalaries.reduce((sum, s) => sum + s.median, 0) / techSalaries.length
            )
          : 0;
      const result = getAverageSalaryByCategory('Technology');
      expect(result).toBe(expectedAvg);
    });
  });

  describe('Exported arrays', () => {
    describe('roles', () => {
      it('should be an array of unique roles', () => {
        expect(Array.isArray(roles)).toBe(true);
        expect(roles.length).toBeGreaterThan(0);
        const uniqueRoles = [...new Set(roles)];
        expect(roles.length).toBe(uniqueRoles.length);
      });
    });

    describe('locations', () => {
      it('should be an array of unique locations', () => {
        expect(Array.isArray(locations)).toBe(true);
        expect(locations.length).toBeGreaterThan(0);
        const uniqueLocations = [...new Set(locations)];
        expect(locations.length).toBe(uniqueLocations.length);
      });
    });

    describe('categories', () => {
      it('should be an array of unique categories', () => {
        expect(Array.isArray(categories)).toBe(true);
        expect(categories.length).toBeGreaterThan(0);
        const uniqueCategories = [...new Set(categories)];
        expect(categories.length).toBe(uniqueCategories.length);
      });
    });
  });
});
