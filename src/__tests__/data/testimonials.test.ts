import { testimonials, getFeaturedTestimonials } from '@/data/testimonials';

describe('Testimonials Data', () => {
  describe('testimonials array', () => {
    it('should have testimonials', () => {
      expect(testimonials.length).toBeGreaterThan(0);
    });

    it('should have 10 testimonials', () => {
      expect(testimonials).toHaveLength(10);
    });

    it('should have required properties for each testimonial', () => {
      testimonials.forEach((testimonial) => {
        expect(testimonial).toHaveProperty('id');
        expect(testimonial).toHaveProperty('name');
        expect(testimonial).toHaveProperty('role');
        expect(testimonial).toHaveProperty('company');
        expect(testimonial).toHaveProperty('avatar');
        expect(testimonial).toHaveProperty('content');
        expect(testimonial).toHaveProperty('rating');
      });
    });

    it('should have unique ids', () => {
      const ids = testimonials.map((t) => t.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have ratings between 1 and 5', () => {
      testimonials.forEach((testimonial) => {
        expect(testimonial.rating).toBeGreaterThanOrEqual(1);
        expect(testimonial.rating).toBeLessThanOrEqual(5);
      });
    });

    it('should have non-empty content', () => {
      testimonials.forEach((testimonial) => {
        expect(testimonial.content.length).toBeGreaterThan(0);
      });
    });

    it('should have non-empty names', () => {
      testimonials.forEach((testimonial) => {
        expect(testimonial.name.length).toBeGreaterThan(0);
      });
    });

    it('should have non-empty roles', () => {
      testimonials.forEach((testimonial) => {
        expect(testimonial.role.length).toBeGreaterThan(0);
      });
    });

    it('should have non-empty company names', () => {
      testimonials.forEach((testimonial) => {
        expect(testimonial.company.length).toBeGreaterThan(0);
      });
    });

    it('should have avatar URLs', () => {
      testimonials.forEach((testimonial) => {
        expect(testimonial.avatar).toBeDefined();
        expect(testimonial.avatar.length).toBeGreaterThan(0);
      });
    });

    it('should contain Sarah Johnson testimonial', () => {
      const sarah = testimonials.find((t) => t.name === 'Sarah Johnson');
      expect(sarah).toBeDefined();
      expect(sarah?.role).toBe('Software Engineer');
    });

    it('should contain testimonials with 5-star ratings', () => {
      const fiveStarReviews = testimonials.filter((t) => t.rating === 5);
      expect(fiveStarReviews.length).toBeGreaterThan(0);
    });

    it('should have content with reasonable length', () => {
      testimonials.forEach((testimonial) => {
        expect(testimonial.content.length).toBeGreaterThan(50);
        expect(testimonial.content.length).toBeLessThan(500);
      });
    });
  });

  describe('getFeaturedTestimonials', () => {
    it('should return only 5-star testimonials', () => {
      const result = getFeaturedTestimonials(10);
      result.forEach((testimonial) => {
        expect(testimonial.rating).toBe(5);
      });
    });

    it('should return default 6 testimonials', () => {
      const result = getFeaturedTestimonials();
      expect(result.length).toBeLessThanOrEqual(6);
    });

    it('should return specified number of testimonials', () => {
      const result = getFeaturedTestimonials(3);
      expect(result.length).toBeLessThanOrEqual(3);
    });

    it('should return empty array when limit is 0', () => {
      const result = getFeaturedTestimonials(0);
      expect(result).toHaveLength(0);
    });

    it('should not include 4-star testimonials', () => {
      const result = getFeaturedTestimonials(10);
      const fourStarCount = result.filter((t) => t.rating === 4).length;
      expect(fourStarCount).toBe(0);
    });

    it('should return testimonials with all required properties', () => {
      const result = getFeaturedTestimonials(3);
      result.forEach((testimonial) => {
        expect(testimonial.id).toBeDefined();
        expect(testimonial.name).toBeDefined();
        expect(testimonial.content).toBeDefined();
      });
    });

    it('should respect limit even when fewer 5-star reviews exist', () => {
      const fiveStarCount = testimonials.filter((t) => t.rating === 5).length;
      const result = getFeaturedTestimonials(100);
      expect(result.length).toBe(fiveStarCount);
    });
  });
});
