/**
 * TrendingSkillCard Component - Tests
 *
 * Tests for the TrendingSkillCard component.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TrendingSkillCard } from '@/components/market-insights/TrendingSkillCard';
import type { TrendingSkill } from '@/types/market-insights';

const mockSkill: TrendingSkill = {
  id: 'skill_test_001',
  name: 'React',
  category: 'technology',
  demandScore: 90,
  growthPercentage: 15.5,
  direction: 'rising',
  jobCount: 89000,
  avgSalaryImpact: 12,
  relatedSkills: ['JavaScript', 'TypeScript', 'Next.js', 'Redux'],
};

const mockDecliningSkill: TrendingSkill = {
  id: 'skill_test_002',
  name: 'Legacy Framework',
  category: 'technology',
  demandScore: 45,
  growthPercentage: -8.5,
  direction: 'declining',
  jobCount: 12000,
  avgSalaryImpact: 3,
  relatedSkills: ['Old Tech'],
};

const mockStableSkill: TrendingSkill = {
  id: 'skill_test_003',
  name: 'SQL',
  category: 'technology',
  demandScore: 75,
  growthPercentage: 2.5,
  direction: 'stable',
  jobCount: 150000,
  avgSalaryImpact: 8,
  relatedSkills: ['Database', 'PostgreSQL'],
};

describe('TrendingSkillCard', () => {
  describe('Default Variant', () => {
    it('should render skill name', () => {
      render(<TrendingSkillCard skill={mockSkill} />);
      expect(screen.getByText('React')).toBeInTheDocument();
    });

    it('should render category badge', () => {
      render(<TrendingSkillCard skill={mockSkill} />);
      expect(screen.getByText('Technology')).toBeInTheDocument();
    });

    it('should render demand score', () => {
      render(<TrendingSkillCard skill={mockSkill} />);
      expect(screen.getByText('90/100')).toBeInTheDocument();
    });

    it('should render growth percentage', () => {
      render(<TrendingSkillCard skill={mockSkill} />);
      expect(screen.getByText('+15.5%')).toBeInTheDocument();
    });

    it('should render job count', () => {
      render(<TrendingSkillCard skill={mockSkill} />);
      expect(screen.getByText('89.0K')).toBeInTheDocument();
    });

    it('should render salary impact', () => {
      render(<TrendingSkillCard skill={mockSkill} />);
      expect(screen.getByText('+12%')).toBeInTheDocument();
    });

    it('should render related skills', () => {
      render(<TrendingSkillCard skill={mockSkill} />);
      expect(screen.getByText('JavaScript')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
    });

    it('should render trend direction label for rising', () => {
      render(<TrendingSkillCard skill={mockSkill} />);
      expect(screen.getByText('Rising')).toBeInTheDocument();
    });

    it('should render trend direction label for declining', () => {
      render(<TrendingSkillCard skill={mockDecliningSkill} />);
      expect(screen.getByText('Declining')).toBeInTheDocument();
    });

    it('should render trend direction label for stable', () => {
      render(<TrendingSkillCard skill={mockStableSkill} />);
      expect(screen.getByText('Stable')).toBeInTheDocument();
    });

    it('should render demand level badge', () => {
      render(<TrendingSkillCard skill={mockSkill} />);
      expect(screen.getByText('Very High Demand')).toBeInTheDocument();
    });
  });

  describe('Compact Variant', () => {
    it('should render skill name in compact mode', () => {
      render(<TrendingSkillCard skill={mockSkill} variant="compact" />);
      expect(screen.getByText('React')).toBeInTheDocument();
    });

    it('should render category badge in compact mode', () => {
      render(<TrendingSkillCard skill={mockSkill} variant="compact" />);
      expect(screen.getByText('Technology')).toBeInTheDocument();
    });

    it('should render demand score in compact mode', () => {
      render(<TrendingSkillCard skill={mockSkill} variant="compact" />);
      expect(screen.getByText('90')).toBeInTheDocument();
      expect(screen.getByText('Demand')).toBeInTheDocument();
    });

    it('should render growth percentage in compact mode', () => {
      render(<TrendingSkillCard skill={mockSkill} variant="compact" />);
      expect(screen.getByText('+15.5%')).toBeInTheDocument();
    });
  });

  describe('Interaction', () => {
    it('should call onSelect when clicked', () => {
      const onSelect = jest.fn();
      render(<TrendingSkillCard skill={mockSkill} onSelect={onSelect} />);

      const card = screen.getByText('React').closest('.hover\\:shadow-md');
      if (card) {
        fireEvent.click(card);
        expect(onSelect).toHaveBeenCalledWith(mockSkill);
      }
    });

    it('should call onSelect in compact mode when clicked', () => {
      const onSelect = jest.fn();
      render(
        <TrendingSkillCard
          skill={mockSkill}
          variant="compact"
          onSelect={onSelect}
        />
      );

      const card = screen.getByText('React').closest('.hover\\:shadow-md');
      if (card) {
        fireEvent.click(card);
        expect(onSelect).toHaveBeenCalledWith(mockSkill);
      }
    });

    it('should not throw when clicked without onSelect', () => {
      render(<TrendingSkillCard skill={mockSkill} />);

      const card = screen.getByText('React').closest('.hover\\:shadow-md');
      expect(() => {
        if (card) fireEvent.click(card);
      }).not.toThrow();
    });
  });

  describe('Demand Level Classification', () => {
    it('should show Very High Demand for score >= 90', () => {
      render(<TrendingSkillCard skill={mockSkill} />);
      expect(screen.getByText('Very High Demand')).toBeInTheDocument();
    });

    it('should show High Demand for score >= 70', () => {
      const highDemandSkill = { ...mockSkill, demandScore: 85 };
      render(<TrendingSkillCard skill={highDemandSkill} />);
      expect(screen.getByText('High Demand')).toBeInTheDocument();
    });

    it('should show Medium Demand for score >= 40', () => {
      const mediumDemandSkill = { ...mockSkill, demandScore: 60 };
      render(<TrendingSkillCard skill={mediumDemandSkill} />);
      expect(screen.getByText('Medium Demand')).toBeInTheDocument();
    });

    it('should show Low Demand for score < 40', () => {
      const lowDemandSkill = { ...mockSkill, demandScore: 30 };
      render(<TrendingSkillCard skill={lowDemandSkill} />);
      expect(screen.getByText('Low Demand')).toBeInTheDocument();
    });
  });

  describe('Category Colors', () => {
    it('should render with technology category color', () => {
      render(<TrendingSkillCard skill={mockSkill} />);
      const badge = screen.getByText('Technology');
      expect(badge).toHaveClass('bg-blue-100');
    });

    it('should render with data-science category', () => {
      const dataSkill: TrendingSkill = {
        ...mockSkill,
        category: 'data-science',
      };
      render(<TrendingSkillCard skill={dataSkill} />);
      expect(screen.getByText('Data Science')).toBeInTheDocument();
    });

    it('should render with design category', () => {
      const designSkill: TrendingSkill = {
        ...mockSkill,
        category: 'design',
      };
      render(<TrendingSkillCard skill={designSkill} />);
      expect(screen.getByText('Design')).toBeInTheDocument();
    });
  });

  describe('Related Skills', () => {
    it('should show up to 4 related skills', () => {
      render(<TrendingSkillCard skill={mockSkill} />);
      expect(screen.getByText('JavaScript')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('Next.js')).toBeInTheDocument();
      expect(screen.getByText('Redux')).toBeInTheDocument();
    });

    it('should truncate related skills if more than 4', () => {
      const skillWithManyRelated: TrendingSkill = {
        ...mockSkill,
        relatedSkills: ['A', 'B', 'C', 'D', 'E', 'F'],
      };
      render(<TrendingSkillCard skill={skillWithManyRelated} />);
      expect(screen.getByText('A')).toBeInTheDocument();
      expect(screen.getByText('D')).toBeInTheDocument();
      expect(screen.queryByText('E')).not.toBeInTheDocument();
      expect(screen.queryByText('F')).not.toBeInTheDocument();
    });
  });

  describe('Formatting', () => {
    it('should format job count correctly for thousands', () => {
      render(<TrendingSkillCard skill={mockSkill} />);
      expect(screen.getByText('89.0K')).toBeInTheDocument();
    });

    it('should format job count correctly for millions', () => {
      const millionJobSkill: TrendingSkill = {
        ...mockSkill,
        jobCount: 1500000,
      };
      render(<TrendingSkillCard skill={millionJobSkill} />);
      expect(screen.getByText('1.5M')).toBeInTheDocument();
    });

    it('should format negative growth percentage', () => {
      render(<TrendingSkillCard skill={mockDecliningSkill} />);
      expect(screen.getByText('-8.5%')).toBeInTheDocument();
    });
  });
});
