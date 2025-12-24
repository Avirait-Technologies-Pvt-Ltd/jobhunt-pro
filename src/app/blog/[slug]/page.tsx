'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  Bookmark,
  Facebook,
  Twitter,
  Linkedin,
  Link2,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getBlogBySlug, getRelatedBlogs } from '@/data/blogs';
import { toast } from 'sonner';

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();

  const blog = getBlogBySlug(params.slug as string);

  if (!blog) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold">Article Not Found</h1>
            <p className="mb-6 text-muted-foreground">
              The article you're looking for doesn't exist.
            </p>
            <Button asChild>
              <Link href="/blog">Browse Articles</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedBlogs = getRelatedBlogs(blog.id, blog.category);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = blog.title;

    switch (platform) {
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
          '_blank'
        );
        break;
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          '_blank'
        );
        break;
      case 'linkedin':
        window.open(
          `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
          '_blank'
        );
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        toast.success('Link copied to clipboard!');
        break;
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 bg-slate-50">
        {/* Breadcrumb */}
        <div className="border-b bg-white">
          <div className="container mx-auto px-4 py-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Button>
          </div>
        </div>

        {/* Article Header */}
        <section className="border-b bg-white py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <Badge variant="outline" className="mb-4">
                {blog.category}
              </Badge>
              <h1 className="mb-6 text-3xl font-bold md:text-4xl">
                {blog.title}
              </h1>
              <p className="mb-6 text-lg text-muted-foreground">
                {blog.excerpt}
              </p>

              {/* Author & Meta */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
                    <AvatarFallback>
                      {blog.author.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{blog.author.name}</p>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(blog.publishedDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {blog.readTime} min read
                      </span>
                    </div>
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Share:</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleShare('twitter')}
                  >
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleShare('facebook')}
                  >
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleShare('linkedin')}
                  >
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleShare('copy')}
                  >
                    <Link2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <div className="container mx-auto px-4">
          <div className="mx-auto -mt-8 max-w-4xl overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 to-primary/5">
            <div className="flex aspect-[2/1] items-center justify-center">
              <BookOpen className="h-24 w-24 text-primary/30" />
            </div>
          </div>
        </div>

        {/* Article Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              {/* Article Body */}
              <div className="prose prose-slate max-w-none">
                {blog.content.split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h2 key={index} className="mt-8 mb-4 text-2xl font-bold">
                        {paragraph.replace('## ', '')}
                      </h2>
                    );
                  } else if (paragraph.startsWith('### ')) {
                    return (
                      <h3 key={index} className="mt-6 mb-3 text-xl font-semibold">
                        {paragraph.replace('### ', '')}
                      </h3>
                    );
                  } else if (paragraph.startsWith('- ')) {
                    const items = paragraph.split('\n');
                    return (
                      <ul key={index} className="my-4 list-disc pl-6 space-y-2">
                        {items.map((item, i) => (
                          <li key={i} className="text-muted-foreground">
                            {item.replace('- ', '')}
                          </li>
                        ))}
                      </ul>
                    );
                  } else if (paragraph.match(/^\d\./)) {
                    const items = paragraph.split('\n');
                    return (
                      <ol key={index} className="my-4 list-decimal pl-6 space-y-2">
                        {items.map((item, i) => (
                          <li key={i} className="text-muted-foreground">
                            {item.replace(/^\d\.\s*/, '')}
                          </li>
                        ))}
                      </ol>
                    );
                  } else if (paragraph.startsWith('> ')) {
                    return (
                      <blockquote
                        key={index}
                        className="my-6 border-l-4 border-primary pl-4 italic text-muted-foreground"
                      >
                        {paragraph.replace('> ', '')}
                      </blockquote>
                    );
                  }
                  return (
                    <p key={index} className="my-4 text-muted-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="mt-8 pt-8 border-t">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium">Tags:</span>
                    {blog.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Author Bio */}
              <Card className="mt-8">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
                      <AvatarFallback>
                        {blog.author.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{blog.author.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {blog.author.bio ||
                          'Career expert and writer at JobHunt Pro, helping job seekers navigate their career journey.'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Share Section */}
              <div className="mt-8 rounded-lg bg-slate-100 p-6 text-center">
                <h3 className="mb-4 font-semibold">Found this article helpful?</h3>
                <div className="flex justify-center gap-3">
                  <Button
                    variant="outline"
                    onClick={() => handleShare('twitter')}
                  >
                    <Twitter className="mr-2 h-4 w-4" />
                    Tweet
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleShare('linkedin')}
                  >
                    <Linkedin className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleShare('copy')}
                  >
                    <Link2 className="mr-2 h-4 w-4" />
                    Copy Link
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        {relatedBlogs.length > 0 && (
          <section className="border-t bg-white py-12">
            <div className="container mx-auto px-4">
              <h2 className="mb-8 text-2xl font-bold">Related Articles</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {relatedBlogs.map((relatedBlog) => (
                  <Link key={relatedBlog.id} href={`/blog/${relatedBlog.slug}`}>
                    <Card className="group h-full overflow-hidden transition-all hover:shadow-lg">
                      <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-50">
                        <div className="flex h-full items-center justify-center">
                          <BookOpen className="h-8 w-8 text-slate-300" />
                        </div>
                      </div>
                      <CardContent className="p-5">
                        <Badge variant="outline" className="mb-2">
                          {relatedBlog.category}
                        </Badge>
                        <h3 className="mb-2 font-semibold group-hover:text-primary line-clamp-2">
                          {relatedBlog.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {relatedBlog.excerpt}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Button asChild variant="outline">
                  <Link href="/blog">
                    View All Articles
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
