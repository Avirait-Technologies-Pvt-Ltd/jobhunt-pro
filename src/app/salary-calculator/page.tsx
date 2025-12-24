'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  DollarSign,
  MapPin,
  Briefcase,
  TrendingUp,
  Calculator,
  Building2,
  ArrowRight,
  Info,
  ChevronDown,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { salaryData, cityLivingCosts, roles, locations, compareCities } from '@/data/salaries';
import { formatSalary } from '@/lib/utils';

export default function SalaryCalculatorPage() {
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [compareCity1, setCompareCity1] = useState('San Francisco');
  const [compareCity2, setCompareCity2] = useState('Austin');
  const [currentSalary, setCurrentSalary] = useState('');

  const filteredSalaries = useMemo(() => {
    return salaryData.filter((s) => {
      if (selectedRole && !s.role.toLowerCase().includes(selectedRole.toLowerCase())) return false;
      if (selectedLocation && !s.location.toLowerCase().includes(selectedLocation.toLowerCase())) return false;
      if (selectedExperience && s.experienceLevel !== selectedExperience) return false;
      return true;
    });
  }, [selectedRole, selectedLocation, selectedExperience]);

  const comparison = compareCities(compareCity1, compareCity2);

  const calculateAdjustedSalary = () => {
    if (!currentSalary || !comparison.city1 || !comparison.city2) return null;
    const salary = parseFloat(currentSalary);
    const ratio = comparison.city2.costIndex / comparison.city1.costIndex;
    return Math.round(salary * ratio);
  };

  const adjustedSalary = calculateAdjustedSalary();

  const experienceLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Executive'];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 bg-slate-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-600 to-purple-700 py-16 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="mb-4 text-4xl font-bold">Salary Calculator</h1>
            <p className="mx-auto max-w-2xl text-lg text-blue-100">
              Research salaries, compare cost of living, and understand your market value
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="salary" className="space-y-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="salary">Salary Lookup</TabsTrigger>
              <TabsTrigger value="compare">Compare Cities</TabsTrigger>
            </TabsList>

            <TabsContent value="salary" className="space-y-8">
              {/* Filters */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Find Salary Data
                  </CardTitle>
                  <CardDescription>
                    Search by role, location, and experience level
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label>Job Role</Label>
                      <Select value={selectedRole} onValueChange={setSelectedRole}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All Roles</SelectItem>
                          {roles.map((role) => (
                            <SelectItem key={role} value={role}>
                              {role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All Locations</SelectItem>
                          {locations.map((loc) => (
                            <SelectItem key={loc} value={loc}>
                              {loc}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Experience Level</Label>
                      <Select value={selectedExperience} onValueChange={setSelectedExperience}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All Levels</SelectItem>
                          {experienceLevels.map((level) => (
                            <SelectItem key={level} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Results */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">
                  {filteredSalaries.length} Results Found
                </h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredSalaries.map((salary, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardContent className="p-6">
                        <div className="mb-4 flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold">{salary.role}</h3>
                            <p className="text-sm text-muted-foreground">
                              {salary.experienceLevel}
                            </p>
                          </div>
                          <div className="rounded-lg bg-green-100 px-3 py-1">
                            <span className="text-sm font-medium text-green-800">
                              {salary.category}
                            </span>
                          </div>
                        </div>

                        <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          {salary.location}
                        </div>

                        <div className="space-y-3">
                          <div className="rounded-lg bg-slate-50 p-3">
                            <p className="mb-1 text-sm text-muted-foreground">Salary Range</p>
                            <p className="text-lg font-bold text-green-600">
                              {formatSalary(salary.salaryRange.min, salary.salaryRange.max)}
                            </p>
                          </div>

                          <div className="grid grid-cols-3 gap-2 text-center">
                            <div className="rounded-lg bg-slate-50 p-2">
                              <p className="text-xs text-muted-foreground">25th %</p>
                              <p className="font-medium">${(salary.percentile25 / 1000).toFixed(0)}k</p>
                            </div>
                            <div className="rounded-lg bg-blue-50 p-2">
                              <p className="text-xs text-muted-foreground">Median</p>
                              <p className="font-medium text-blue-600">${(salary.median / 1000).toFixed(0)}k</p>
                            </div>
                            <div className="rounded-lg bg-slate-50 p-2">
                              <p className="text-xs text-muted-foreground">75th %</p>
                              <p className="font-medium">${(salary.percentile75 / 1000).toFixed(0)}k</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredSalaries.length === 0 && (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-16">
                      <DollarSign className="mb-4 h-12 w-12 text-muted-foreground" />
                      <h3 className="mb-2 text-lg font-semibold">No data found</h3>
                      <p className="text-center text-muted-foreground">
                        Try adjusting your filters to see salary data.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="compare" className="space-y-8">
              {/* City Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Cost of Living Comparison
                  </CardTitle>
                  <CardDescription>
                    Compare living costs and calculate salary adjustments between cities
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label>Current City</Label>
                      <Select value={compareCity1} onValueChange={setCompareCity1}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {cityLivingCosts.map((city) => (
                            <SelectItem key={city.city} value={city.city}>
                              {city.city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end justify-center">
                      <ArrowRight className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                      <Label>Target City</Label>
                      <Select value={compareCity2} onValueChange={setCompareCity2}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {cityLivingCosts.map((city) => (
                            <SelectItem key={city.city} value={city.city}>
                              {city.city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {comparison.city1 && comparison.city2 && (
                    <div className="grid gap-6 md:grid-cols-2">
                      {/* City 1 */}
                      <div className="rounded-lg border p-4">
                        <h3 className="mb-4 text-lg font-semibold">{comparison.city1.city}</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Cost Index</span>
                            <span className="font-medium">{comparison.city1.costIndex}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Rent Index</span>
                            <span className="font-medium">{comparison.city1.rentIndex}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Groceries</span>
                            <span className="font-medium">{comparison.city1.groceriesIndex}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Transport</span>
                            <span className="font-medium">{comparison.city1.transportIndex}</span>
                          </div>
                        </div>
                      </div>

                      {/* City 2 */}
                      <div className="rounded-lg border p-4">
                        <h3 className="mb-4 text-lg font-semibold">{comparison.city2.city}</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Cost Index</span>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{comparison.city2.costIndex}</span>
                              <span
                                className={`text-sm ${
                                  comparison.city2.costIndex < comparison.city1.costIndex
                                    ? 'text-green-600'
                                    : 'text-red-600'
                                }`}
                              >
                                ({comparison.city2.costIndex < comparison.city1.costIndex ? '-' : '+'}
                                {Math.abs(comparison.city2.costIndex - comparison.city1.costIndex)}%)
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Rent Index</span>
                            <span className="font-medium">{comparison.city2.rentIndex}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Groceries</span>
                            <span className="font-medium">{comparison.city2.groceriesIndex}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Transport</span>
                            <span className="font-medium">{comparison.city2.transportIndex}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Salary Calculator */}
                  <div className="rounded-lg border bg-slate-50 p-6">
                    <h3 className="mb-4 text-lg font-semibold">Salary Adjustment Calculator</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Your Current Salary (in {compareCity1})</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            type="number"
                            placeholder="100000"
                            value={currentSalary}
                            onChange={(e) => setCurrentSalary(e.target.value)}
                            className="pl-9"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Equivalent Salary in {compareCity2}</Label>
                        <div className="flex h-10 items-center rounded-lg bg-white px-4 text-lg font-bold text-green-600">
                          {adjustedSalary
                            ? `$${adjustedSalary.toLocaleString()}`
                            : 'Enter salary above'}
                        </div>
                      </div>
                    </div>
                    {adjustedSalary && (
                      <p className="mt-4 text-sm text-muted-foreground">
                        <Info className="mr-1 inline h-4 w-4" />
                        Based on cost of living difference of{' '}
                        {comparison.city2 && comparison.city1
                          ? Math.round(((comparison.city2.costIndex - comparison.city1.costIndex) / comparison.city1.costIndex) * 100)
                          : 0}
                        %
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* All Cities */}
              <Card>
                <CardHeader>
                  <CardTitle>All Cities Cost Index</CardTitle>
                  <CardDescription>
                    San Francisco = 100 (baseline)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {cityLivingCosts
                      .sort((a, b) => b.costIndex - a.costIndex)
                      .map((city) => (
                        <div
                          key={city.city}
                          className="flex items-center justify-between rounded-lg border p-3"
                        >
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{city.city}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                              <div
                                className="h-full bg-blue-500"
                                style={{ width: `${city.costIndex}%` }}
                              />
                            </div>
                            <span className="w-8 text-right text-sm font-medium">
                              {city.costIndex}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Tips */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Salary Negotiation Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border p-4">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                  </div>
                  <h4 className="mb-1 font-medium">Know Your Worth</h4>
                  <p className="text-sm text-muted-foreground">
                    Research market rates for your role and experience level before negotiating.
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                  <h4 className="mb-1 font-medium">Consider Total Compensation</h4>
                  <p className="text-sm text-muted-foreground">
                    Include equity, bonuses, benefits, and perks in your evaluation.
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                    <Building2 className="h-5 w-5 text-purple-600" />
                  </div>
                  <h4 className="mb-1 font-medium">Factor in Location</h4>
                  <p className="text-sm text-muted-foreground">
                    Adjust expectations based on cost of living in different cities.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
