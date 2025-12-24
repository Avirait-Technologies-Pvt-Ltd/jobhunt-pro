import {
  companies,
  getCompanyById,
  getCompaniesByIndustry,
  getFeaturedCompanies,
  searchCompanies,
} from '@/data/companies';

describe('Companies Data', () => {
  describe('companies array', () => {
    it('should have companies defined', () => {
      expect(companies).toBeDefined();
      expect(Array.isArray(companies)).toBe(true);
    });

    it('should have at least 10 companies', () => {
      expect(companies.length).toBeGreaterThanOrEqual(10);
    });

    it('should have required properties on each company', () => {
      companies.forEach((company) => {
        expect(company).toHaveProperty('id');
        expect(company).toHaveProperty('name');
        expect(company).toHaveProperty('logo');
        expect(company).toHaveProperty('industry');
        expect(company).toHaveProperty('size');
        expect(company).toHaveProperty('locations');
        expect(company).toHaveProperty('description');
      });
    });

    it('should have valid company sizes', () => {
      const validSizes = ['1-50', '51-200', '201-500', '501-1000', '1000+', '5000+', '10000+'];
      companies.forEach((company) => {
        expect(validSizes).toContain(company.size);
      });
    });
  });

  describe('getCompanyById', () => {
    it('should return a company when valid id is provided', () => {
      const firstCompany = companies[0];
      const result = getCompanyById(firstCompany.id);
      expect(result).toBeDefined();
      expect(result?.id).toBe(firstCompany.id);
    });

    it('should return undefined for invalid id', () => {
      const result = getCompanyById('non-existent-id');
      expect(result).toBeUndefined();
    });

    it('should return the correct company details', () => {
      const firstCompany = companies[0];
      const result = getCompanyById(firstCompany.id);
      expect(result?.name).toBe(firstCompany.name);
      expect(result?.industry).toBe(firstCompany.industry);
    });
  });

  describe('getCompaniesByIndustry', () => {
    it('should return companies for a valid industry', () => {
      const firstCompany = companies[0];
      const result = getCompaniesByIndustry(firstCompany.industry);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should return only companies from specified industry', () => {
      const industry = companies[0].industry;
      const result = getCompaniesByIndustry(industry);
      result.forEach((company) => {
        expect(company.industry).toBe(industry);
      });
    });

    it('should return empty array for non-existent industry', () => {
      const result = getCompaniesByIndustry('NonExistentIndustry123');
      expect(result).toEqual([]);
    });
  });

  describe('getFeaturedCompanies', () => {
    it('should return featured companies with default limit', () => {
      const result = getFeaturedCompanies();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeLessThanOrEqual(10);
    });

    it('should return specified number of companies', () => {
      const result = getFeaturedCompanies(5);
      expect(result.length).toBeLessThanOrEqual(5);
    });

    it('should return limited number of companies', () => {
      const result = getFeaturedCompanies();
      // The function returns companies up to the limit
      expect(result.length).toBeGreaterThan(0);
      expect(result.length).toBeLessThanOrEqual(10);
    });
  });

  describe('searchCompanies', () => {
    it('should find companies by name', () => {
      const firstCompany = companies[0];
      const searchTerm = firstCompany.name.split(' ')[0];
      const result = searchCompanies(searchTerm);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should be case insensitive', () => {
      const firstCompany = companies[0];
      const searchTerm = firstCompany.name.toUpperCase();
      const result = searchCompanies(searchTerm);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should find companies by industry', () => {
      const firstCompany = companies[0];
      const result = searchCompanies(firstCompany.industry);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should return empty array for no matches', () => {
      const result = searchCompanies('xyznonexistentterm123');
      expect(result).toEqual([]);
    });
  });
});
