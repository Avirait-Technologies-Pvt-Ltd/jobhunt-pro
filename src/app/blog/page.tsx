'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  Calendar,
  Clock,
  User,
  ArrowRight,
  Tag,
  BookOpen,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { blogs, blogCategories } from '@/data/blogs';
import { useDebounce } from '@/hooks/useDebounce';

const ITEMS_PER_PAGE = 9;

export default function BlogPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebounce(search, 300);

  const filteredBlogs = useMemo(() => {
    let result = [...blogs];

    // Search filter
    if (debouncedSearch) {
      const lowerSearch = debouncedSearch.toLowerCase();
      result = result.filter(
        (blog) =>
          blog.title.toLowerCase().includes(lowerSearch) ||
          blog.excerpt.toLowerCase().includes(lowerSearch) ||
          blog.author.name.toLowerCase().includes(lowerSearch)
      );
    }

    // Category filter
    if (category !== 'All') {
      result = result.filter((blog) => blog.category === category);
    }

    // Sort by date (newest first)
    result.sort(
      (a, b) =>
        new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
    );

    return result;
  }, [debouncedSearch, category]);

  // Pagination
  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Featured blog (first blog)
  const featuredBlog = blogs[0];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 bg-slate-50">
        {/* Hero Section */}
        <section className="border-b bg-white py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-4 text-3xl font-bold md:text-4xl">
                Career Resources & Insights
              </h1>
              <p className="mb-8 text-muted-foreground">
                Expert advice, tips, and strategies to help you succeed in your
                job search and career development.
              </p>

              {/* Search */}
              <div className="relative mx-auto max-w-xl">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-12 pl-12"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Article */}
        {featuredBlog && !search && category === 'All' && currentPage === 1 && (
          <section className="border-b bg-white py-12">
            <div className="container mx-auto px-4">
              <div className="mb-6 flex items-center gap-2">
                <Badge>Featured</Badge>
                <span className="text-sm text-muted-foreground">
                  Latest article
                </span>
              </div>
              <div className="grid gap-8 md:grid-cols-2">
                <div className="aspect-video overflow-hidden rounded-lg bg-gradient-to-br from-primary/10 to-primary/5">
                  <div className="flex h-full items-center justify-center">
                    <BookOpen className="h-16 w-16 text-primary/50" />
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <Badge variant="outline" className="mb-3 w-fit">
                    {featuredBlog.category}
                  </Badge>
                  <Link href={`/blog/${featuredBlog.slug}`}>
                    <h2 className="mb-3 text-2xl font-bold hover:text-primary md:text-3xl">
                      {featuredBlog.title}
                    </h2>
                  </Link>
                  <p className="mb-4 text-muted-foreground">
                    {featuredBlog.excerpt}
                  </p>
                  <div className="mb-6 flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {featuredBlog.author.name}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(featuredBlog.publishedDate).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {featuredBlog.readTime} min read
                    </span>
                  </div>
                  <Button asChild className="w-fit">
                    <Link href={`/blog/${featuredBlog.slug}`}>
                      Read Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Blog Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 lg:grid-cols-4">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardContent className="p-6">
                    <h3 className="mb-4 font-semibold">Categories</h3>
                    <div className="space-y-2">
                      {blogCategories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => {
                            setCategory(cat);
                            setCurrentPage(1);
                          }}
                          className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                            category === cat
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-slate-100'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>

                    <div className="mt-6 rounded-lg bg-primary/5 p-4">
                      <h4 className="mb-2 font-medium">Newsletter</h4>
                      <p className="mb-3 text-sm text-muted-foreground">
                        Get the latest career tips delivered to your inbox.
                      </p>
                      <Input placeholder="Your email" className="mb-2" />
                      <Button className="w-full" size="sm">
                        Subscribe
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Articles Grid */}
              <div className="lg:col-span-3">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">
                    {category === 'All' ? 'All Articles' : category}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {filteredBlogs.length} article
                    {filteredBlogs.length !== 1 ? 's' : ''}
                  </p>
                </div>

                {filteredBlogs.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-16">
                      <BookOpen className="mb-4 h-12 w-12 text-muted-foreground" />
                      <h3 className="mb-2 text-lg font-semibold">
                        No articles found
                      </h3>
                      <p className="mb-4 text-muted-foreground">
                        Try adjusting your search or filters.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSearch('');
                          setCategory('All');
                        }}
                      >
                        Clear filters
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <>
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                      {paginatedBlogs.map((blog) => (
                        <Link key={blog.id} href={`/blog/${blog.slug}`}>
                          <Card className="group h-full overflow-hidden transition-all hover:shadow-lg">
                            <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-50">
                              <div className="flex h-full items-center justify-center">
                                <BookOpen className="h-8 w-8 text-slate-300" />
                              </div>
                            </div>
                            <CardContent className="p-5">
                              <Badge variant="outline" className="mb-2">
                                {blog.category}
                              </Badge>
                              <h3 className="mb-2 font-semibold group-hover:text-primary line-clamp-2">
                                {blog.title}
                              </h3>
                              <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                                {blog.excerpt}
                              </p>
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>{blog.author.name}</span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {blog.readTime} min read
                                </span>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="mt-8 flex items-center justify-center gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </Button>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: Math.min(5, totalPages) }).map(
                            (_, i) => {
                              let pageNum;
                              if (totalPages <= 5) {
                                pageNum = i + 1;
                              } else if (currentPage <= 3) {
                                pageNum = i + 1;
                              } else if (currentPage >= totalPages - 2) {
                                pageNum = totalPages - 4 + i;
                              } else {
                                pageNum = currentPage - 2 + i;
                              }

                              return (
                                <Button
                                  key={pageNum}
                                  variant={
                                    currentPage === pageNum ? 'default' : 'outline'
                                  }
                                  size="icon"
                                  className="h-10 w-10"
                                  onClick={() => setCurrentPage(pageNum)}
                                >
                                  {pageNum}
                                </Button>
                              );
                            }
                          )}
                        </div>
                        <Button
                          variant="outline"
                          onClick={() =>
                            setCurrentPage((p) => Math.min(totalPages, p + 1))
                          }
                          disabled={currentPage === totalPages}
                        >
                          Next
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
