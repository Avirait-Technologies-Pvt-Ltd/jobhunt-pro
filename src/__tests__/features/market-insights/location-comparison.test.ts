/**
 * Location Comparison - Tests
 *
 * Tests for location comparison functionality and calculations.
 */

import {
  locationComparisons,
  compareLocations,
  getLocationsByRegion,
  getTopRemoteLocations,
  getLocationsByMinAdjustedSalary,
  getLocationById,
} from '@/data/market-insights';

import {
  filterLocationsByRegion,
  filterLocationsByMinSalary,
  sortLocationsByAdjustedSalary,
  sortLocationsByRemote,
  calculateLocationMetrics,
  calculateAdjustedSalary,
  compareLocationSalaries,
} from '@/lib/market-insights-utils';

describe('Location Comparison', () => {
  describe('Location Data Structure', () => {
    it('should have valid location data', () => {
      expect(locationComparisons.length).toBeGreaterThan(0);

      locationComparisons.forEach((location) => {
        expect(location).toHaveProperty('id');
        expect(location).toHaveProperty('location');
        expect(location).toHaveProperty('region');
        expect(location).toHaveProperty('avgSalary');
        expect(location).toHaveProperty('costOfLivingIndex');
        expect(location).toHaveProperty('adjustedSalary');
        expect(location).toHaveProperty('remoteJobPercentage');
        expect(location).toHaveProperty('topIndustries');
        expect(location).toHaveProperty('jobGrowthRate');
      });
    });

    it('should have positive salary values', () => {
      locationComparisons.forEach((location) => {
        expect(location.avgSalary).toBeGreaterThan(0);
        expect(location.adjustedSalary).toBeGreaterThan(0);
      });
    });

    it('should have valid cost of living index', () => {
      locationComparisons.forEach((location) => {
        expect(location.costOfLivingIndex).toBeGreaterThan(0);
      });
    });

    it('should have valid remote job percentage', () => {
      locationComparisons.forEach((location) => {
        expect(location.remoteJobPercentage).toBeGreaterThanOrEqual(0);
        expect(location.remoteJobPercentage).toBeLessThanOrEqual(100);
      });
    });

    it('should have top industries', () => {
      locationComparisons.forEach((location) => {
        expect(Array.isArray(location.topIndustries)).toBe(true);
        expect(location.topIndustries.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Query Helpers', () => {
    it('should compare two locations', () => {
      const result = compareLocations('san francisco', 'austin');
      expect(result.location1).toBeDefined();
      expect(result.location2).toBeDefined();

      if (result.location1 && result.location2) {
        expect(result.location1.location.toLowerCase()).toContain('san francisco');
        expect(result.location2.location.toLowerCase()).toContain('austin');
      }
    });

    it('should return undefined for non-existent location', () => {
      const result = compareLocations('san francisco', 'non-existent-city');
      expect(result.location1).toBeDefined();
      expect(result.location2).toBeUndefined();
    });

    it('should get locations by region', () => {
      const westCoast = getLocationsByRegion('West Coast');
      expect(westCoast.length).toBeGreaterThan(0);

      westCoast.forEach((location) => {
        expect(location.region).toBe('West Coast');
      });
    });

    it('should get top remote locations', () => {
      const topRemote = getTopRemoteLocations(3);
      expect(topRemote.length).toBeLessThanOrEqual(3);

      // Should be sorted by remote percentage descending
      for (let i = 1; i < topRemote.length; i++) {
        expect(topRemote[i - 1].remoteJobPercentage).toBeGreaterThanOrEqual(
          topRemote[i].remoteJobPercentage
        );
      }
    });

    it('should get locations by minimum adjusted salary', () => {
      const highSalary = getLocationsByMinAdjustedSalary(120000);

      highSalary.forEach((location) => {
        expect(location.adjustedSalary).toBeGreaterThanOrEqual(120000);
      });
    });

    it('should get location by ID', () => {
      const location = getLocationById('loc_001');
      expect(location).toBeDefined();
      expect(location?.id).toBe('loc_001');
    });
  });

  describe('Filter Functions', () => {
    it('should filter locations by region', () => {
      const filtered = filterLocationsByRegion(locationComparisons, ['West Coast']);
      expect(filtered.length).toBeGreaterThan(0);

      filtered.forEach((location) => {
        expect(location.region).toBe('West Coast');
      });
    });

    it('should filter locations by multiple regions', () => {
      const filtered = filterLocationsByRegion(locationComparisons, [
        'West Coast',
        'East Coast',
      ]);
      expect(filtered.length).toBeGreaterThan(0);

      filtered.forEach((location) => {
        expect(['West Coast', 'East Coast']).toContain(location.region);
      });
    });

    it('should return all locations when regions array is empty', () => {
      const filtered = filterLocationsByRegion(locationComparisons, []);
      expect(filtered.length).toBe(locationComparisons.length);
    });

    it('should filter locations by minimum salary', () => {
      const filtered = filterLocationsByMinSalary(locationComparisons, 100000);

      filtered.forEach((location) => {
        expect(location.adjustedSalary).toBeGreaterThanOrEqual(100000);
      });
    });
  });

  describe('Sort Functions', () => {
    it('should sort locations by adjusted salary descending', () => {
      const sorted = sortLocationsByAdjustedSalary(locationComparisons, true);

      for (let i = 1; i < sorted.length; i++) {
        expect(sorted[i - 1].adjustedSalary).toBeGreaterThanOrEqual(
          sorted[i].adjustedSalary
        );
      }
    });

    it('should sort locations by adjusted salary ascending', () => {
      const sorted = sortLocationsByAdjustedSalary(locationComparisons, false);

      for (let i = 1; i < sorted.length; i++) {
        expect(sorted[i - 1].adjustedSalary).toBeLessThanOrEqual(
          sorted[i].adjustedSalary
        );
      }
    });

    it('should sort locations by remote percentage descending', () => {
      const sorted = sortLocationsByRemote(locationComparisons, true);

      for (let i = 1; i < sorted.length; i++) {
        expect(sorted[i - 1].remoteJobPercentage).toBeGreaterThanOrEqual(
          sorted[i].remoteJobPercentage
        );
      }
    });

    it('should not mutate original array', () => {
      const original = [...locationComparisons];
      sortLocationsByAdjustedSalary(locationComparisons, true);
      expect(locationComparisons).toEqual(original);
    });
  });

  describe('Calculation Functions', () => {
    it('should calculate adjusted salary correctly', () => {
      // High COL (like San Francisco, ~189)
      // Adjusted = (salary / COL) * 100
      const adjustedHighCOL = calculateAdjustedSalary(180000, 189);
      expect(adjustedHighCOL).toBeLessThan(180000);
      expect(adjustedHighCOL).toBeGreaterThan(0);

      // COL of 120 is still above 100, so adjusted salary will be lower
      const adjustedMediumCOL = calculateAdjustedSalary(155000, 120);
      expect(adjustedMediumCOL).toBeLessThan(155000);
      expect(adjustedMediumCOL).toBeGreaterThan(0);

      // Low COL (below 100) - adjusted salary should be higher
      const adjustedLowCOL = calculateAdjustedSalary(100000, 80);
      expect(adjustedLowCOL).toBeGreaterThan(100000);

      // Neutral COL (100)
      const adjustedNeutral = calculateAdjustedSalary(100000, 100);
      expect(adjustedNeutral).toBe(100000);
    });

    it('should calculate location metrics', () => {
      const metrics = calculateLocationMetrics(locationComparisons);

      expect(metrics.length).toBe(locationComparisons.length);

      metrics.forEach((metric) => {
        expect(metric).toHaveProperty('location');
        expect(metric).toHaveProperty('totalJobs');
        expect(metric).toHaveProperty('avgSalary');
        expect(metric).toHaveProperty('colIndex');
        expect(metric).toHaveProperty('salaryToCOLRatio');
      });
    });

    it('should compare location salaries', () => {
      const sf = locationComparisons.find((loc) =>
        loc.location.includes('San Francisco')
      );
      const austin = locationComparisons.find((loc) =>
        loc.location.includes('Austin')
      );

      if (sf && austin) {
        const comparison = compareLocationSalaries(sf, austin);

        expect(comparison).toHaveProperty('salaryDifference');
        expect(comparison).toHaveProperty('adjustedSalaryDifference');
        expect(comparison).toHaveProperty('colDifference');
        expect(comparison).toHaveProperty('betterAdjusted');

        // San Francisco has higher nominal salary
        expect(comparison.salaryDifference).toBeGreaterThan(0);

        // Austin has higher adjusted salary due to lower COL
        expect(comparison.betterAdjusted).toBe(austin.location);
      }
    });
  });

  describe('Region Analysis', () => {
    it('should have multiple regions', () => {
      const regions = new Set(locationComparisons.map((loc) => loc.region));
      expect(regions.size).toBeGreaterThan(1);
    });

    it('should have Remote as a region', () => {
      const remoteLocation = locationComparisons.find(
        (loc) => loc.region === 'Remote'
      );
      expect(remoteLocation).toBeDefined();
    });

    it('should have 100% remote jobs for Remote region', () => {
      const remoteLocation = locationComparisons.find(
        (loc) => loc.region === 'Remote'
      );
      expect(remoteLocation?.remoteJobPercentage).toBe(100);
    });
  });

  describe('Cost of Living Analysis', () => {
    it('should identify highest COL locations', () => {
      const sorted = [...locationComparisons].sort(
        (a, b) => b.costOfLivingIndex - a.costOfLivingIndex
      );
      const highestCOL = sorted[0];

      // Major tech hubs typically have highest COL
      expect(['San Francisco', 'New York']).toContain(
        highestCOL.location.split(',')[0]
      );
    });

    it('should identify lowest COL locations', () => {
      const sorted = [...locationComparisons].sort(
        (a, b) => a.costOfLivingIndex - b.costOfLivingIndex
      );
      const lowestCOL = sorted[0];

      expect(lowestCOL.costOfLivingIndex).toBeLessThan(150);
    });

    it('should have accurate adjusted salary calculation in data', () => {
      locationComparisons.forEach((location) => {
        const calculatedAdjusted = calculateAdjustedSalary(
          location.avgSalary,
          location.costOfLivingIndex
        );

        // Should be close to the stored adjustedSalary (within 10% tolerance)
        const tolerance = location.adjustedSalary * 0.1;
        expect(Math.abs(calculatedAdjusted - location.adjustedSalary)).toBeLessThan(
          tolerance
        );
      });
    });
  });

  describe('Job Growth Analysis', () => {
    it('should identify fastest growing locations', () => {
      const sorted = [...locationComparisons].sort(
        (a, b) => b.jobGrowthRate - a.jobGrowthRate
      );
      const fastestGrowth = sorted[0];

      expect(fastestGrowth.jobGrowthRate).toBeGreaterThan(0);
    });

    it('should have positive job growth for most locations', () => {
      const positiveGrowth = locationComparisons.filter(
        (loc) => loc.jobGrowthRate > 0
      );
      expect(positiveGrowth.length).toBeGreaterThan(
        locationComparisons.length / 2
      );
    });
  });
});
