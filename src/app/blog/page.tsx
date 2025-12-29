'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Clock, 
  MessageCircle, 
  Heart, 
  Search, 
  Rss, 
  ArrowLeft, 
  ArrowRight, 
  Calendar, 
  User,
  BookOpen,
  PenTool,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string;
  readTime: number;
  author: {
    name: string;
    avatar: string;
  };
  categories: { name: string; slug: string }[];
  _count: {
    comments: number;
    likes: number;
  };
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

function PostCard({ post }: { post: Post }) {
  return (
    <Card className="group flex flex-col overflow-hidden bg-slate-800/30 border-slate-700/50 transition-all duration-300 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-900/20 hover:-translate-y-2">
      <CardHeader className="p-0 relative">
        <Link href={`/blog/${post.slug}`} passHref>
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={post.coverImage || 'https://picsum.photos/seed/blog-fallback/600/400'}
              alt={post.title}
              width={600}
              height={400}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <div className="mb-3">
          {post.categories.slice(0, 2).map(cat => (
            <Link key={cat.slug} href={`/blog?category=${cat.slug}`} passHref>
              <Badge variant="secondary" className="mr-2 text-xs hover:bg-slate-700 cursor-pointer">
                {cat.name}
              </Badge>
            </Link>
          ))}
        </div>
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
          <Link href={`/blog/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h3>
        <p className="text-slate-400 mb-4 line-clamp-3">{post.excerpt}</p>
      </CardContent>
      <CardFooter className="p-6 pt-4 flex flex-col items-start gap-4">
        <div className="flex items-center gap-4 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>{post.author.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(post.publishedAt)}</span>
          </div>
        </div>
        <div className="w-full flex justify-between items-center text-sm text-slate-400 border-t border-slate-700/50 pt-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{post.readTime} min read</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Heart className="h-4 w-4" />
              <span>{post._count.likes}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MessageCircle className="h-4 w-4" />
              <span>{post._count.comments}</span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

function PostCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden bg-slate-800/30 border border-slate-700/50 rounded-lg">
      <Skeleton className="aspect-video w-full" />
      <div className="p-6 flex-grow flex flex-col">
        <div className="mb-3">
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-1/2 mb-4" />
        <div className="flex-grow"></div>
        <div className="flex items-center gap-4 text-sm text-slate-400 mt-4">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <div className="p-6 border-t border-slate-700/50 flex justify-between items-center">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  );
}

function EmptyState({ searchTerm }: { searchTerm: string }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="relative mb-6">
        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-xl"></div>
        <div className="relative p-6 rounded-full bg-slate-800/50 border border-slate-700/50">
          <BookOpen className="h-12 w-12 text-slate-500" />
        </div>
      </div>
      
      {searchTerm ? (
        <>
          <h3 className="text-xl font-bold text-white mb-2">No Articles Found</h3>
          <p className="text-slate-400 mb-6 max-w-md">
            We couldn't find any articles matching "{searchTerm}". Try a different search term or browse all articles.
          </p>
          <Button 
            variant="outline"
            onClick={() => window.location.reload()}
            className="border-slate-700 hover:bg-slate-800"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Clear Search
          </Button>
        </>
      ) : (
        <>
          <h3 className="text-xl font-bold text-white mb-2">No Articles Yet</h3>
          <p className="text-slate-400 mb-4 max-w-md">
            I'm currently working on some exciting new content. Check back soon for articles about web development, design, and technology.
          </p>
          <div className="flex items-center gap-2 text-slate-500 text-sm mb-6">
            <AlertCircle className="h-4 w-4" />
            <span>Blog articles coming soon!</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mb-8">
            <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50 text-left">
              <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                <PenTool className="h-4 w-4 text-blue-400" />
                What to Expect
              </h4>
              <ul className="text-slate-400 text-sm space-y-1">
                <li>• Web development tutorials</li>
                <li>• Technology insights</li>
                <li>• Project breakdowns</li>
                <li>• Industry trends</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50 text-left">
              <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                <Rss className="h-4 w-4 text-purple-400" />
                Stay Updated
              </h4>
              <p className="text-slate-400 text-sm">
                Subscribe to get notified when new articles are published.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/" passHref>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                Back to Home
              </Button>
            </Link>
            <Link href="/contact" passHref>
              <Button variant="outline" className="border-slate-700">
                Suggest a Topic
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/posts?page=${page}&limit=6${searchTerm ? `&search=${searchTerm}` : ''}`);
        if (!response.ok) {
          if (response.status === 404) {
            // No posts found - empty state
            setPosts([]);
            setPagination(null);
            return;
          }
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data.posts || []);
        setPagination(data.pagination || null);
      } catch (error) {
        console.error(error);
        setError('Unable to load blog posts. Please try again later.');
        setPosts([]);
        setPagination(null);
      } finally {
        setLoading(false);
      }
    }
    
    // Debounce search
    const timeoutId = setTimeout(() => {
      fetchPosts();
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [page, searchTerm]);

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to first page on new search
  };

  // Handle retry
  const handleRetry = () => {
    setPage(1);
    setSearchTerm('');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto max-w-7xl px-4 py-8 md:py-12 lg:py-16">
        {/* Header */}
        <header className="mb-8 md:mb-12 text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-blue-500/10 rounded-full">
            <Rss className="h-3 w-3 md:h-4 md:w-4 text-blue-400" />
            <span className="text-xs md:text-sm text-slate-300">From My Desk</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-white mb-3">
            The <span className="text-blue-400">Blog</span>
          </h1>
          <p className="text-base md:text-lg text-slate-300 max-w-3xl mx-auto">
            Insights, tutorials, and reflections on web development, design, and technology.
          </p>
        </header>

        {/* Search & Filter */}
        <div className="mb-8 md:mb-12 max-w-lg mx-auto">
          <div className="relative">
            <Input 
              type="search"
              placeholder="Search articles..."
              className="pl-10 bg-slate-800/50 border-slate-700 placeholder:text-slate-500"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-8 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <div>
                <p className="text-red-300 font-medium">{error}</p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleRetry}
                  className="mt-2 text-sm h-7 px-3 text-red-300 hover:text-white hover:bg-red-500/20"
                >
                  <RefreshCw className="mr-1 h-3 w-3" />
                  Try Again
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Content Area */}
        <main className="min-h-[400px]">
          {loading ? (
            // Loading state
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <PostCardSkeleton key={i} />
              ))}
            </div>
          ) : posts.length === 0 ? (
            // Empty state
            <EmptyState searchTerm={searchTerm} />
          ) : (
            // Posts grid
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>

              {/* Pagination */}
              {pagination && pagination.pages > 1 && (
                <div className="mt-12 flex justify-center items-center gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="border-slate-700 hover:bg-slate-800"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                  <span className="text-slate-400 text-sm">
                    Page <span className="text-white font-medium">{pagination.page}</span> of{' '}
                    <span className="text-white font-medium">{pagination.pages}</span>
                    {pagination.total > 0 && (
                      <span className="text-slate-500 ml-2">
                        ({pagination.total} total)
                      </span>
                    )}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => setPage(p => Math.min(pagination.pages, p + 1))}
                    disabled={page === pagination.pages}
                    className="border-slate-700 hover:bg-slate-800"
                  >
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </main>

        {/* Stats (only when there are posts) */}
        {!loading && posts.length > 0 && pagination && (
          <div className="mt-12 pt-8 border-t border-slate-800/50">
            <div className="flex flex-wrap justify-center gap-6 text-center text-slate-400 text-sm">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>{pagination.total} articles published</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <span>
                  {posts.reduce((sum, post) => sum + post._count.comments, 0)} total comments
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span>
                  {posts.reduce((sum, post) => sum + post._count.likes, 0)} total likes
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}