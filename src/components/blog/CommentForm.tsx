'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Send, LogIn } from 'lucide-react';

const authenticatedCommentSchema = z.object({
  content: z.string().min(3, 'Comment must be at least 3 characters.'),
});

const guestCommentSchema = z.object({
  content: z.string().min(3, 'Comment must be at least 3 characters.'),
  authorName: z.string().min(2, 'Name must be at least 2 characters.'),
  authorEmail: z.string().email('Please enter a valid email.'),
});

type AuthenticatedCommentValues = z.infer<typeof authenticatedCommentSchema>;
type GuestCommentValues = z.infer<typeof guestCommentSchema>;

interface CommentFormProps {
  postId: string;
  parentId?: string;
  onCommentSubmitted: (comment: any) => void;
}

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export default function CommentForm({ postId, parentId, onCommentSubmitted }: CommentFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const userData = await response.json();
          setUser(userData.user);
        }
      } catch (error) {
        // User not authenticated
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  const authenticatedForm = useForm<AuthenticatedCommentValues>({
    resolver: zodResolver(authenticatedCommentSchema),
    defaultValues: { content: '' },
  });

  const guestForm = useForm<GuestCommentValues>({
    resolver: zodResolver(guestCommentSchema),
    defaultValues: { content: '', authorName: '', authorEmail: '' },
  });

  const onAuthenticatedSubmit = async (data: AuthenticatedCommentValues) => {
    if (!user) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: data.content,
          userId: user.id,
          postId,
          parentId
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }

      const result = await response.json();
      toast({
        title: 'Comment Submitted!',
        description: result.message || 'Your comment has been posted.',
      });
      authenticatedForm.reset();
      onCommentSubmitted(result);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not submit your comment. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onGuestSubmit = async (data: GuestCommentValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, postId, parentId }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }

      const result = await response.json();
      toast({
        title: 'Comment Submitted!',
        description: result.message || 'Your comment is awaiting moderation.',
      });
      guestForm.reset();
      onCommentSubmitted(result);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not submit your comment. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="p-6 rounded-lg bg-slate-800/30 border border-slate-700/50">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-slate-700 rounded w-1/4"></div>
          <div className="h-20 bg-slate-700 rounded"></div>
          <div className="h-10 bg-slate-700 rounded w-1/3"></div>
        </div>
      </div>
    );
  }

  if (user) {
    // Authenticated user form
    return (
      <div className="p-6 rounded-lg bg-slate-800/30 border border-slate-700/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-lg font-semibold">Comment as {user.name}</h3>
            <p className="text-sm text-slate-400">{user.email}</p>
          </div>
        </div>
        <Form {...authenticatedForm}>
          <form onSubmit={authenticatedForm.handleSubmit(onAuthenticatedSubmit)} className="space-y-4">
            <FormField
              control={authenticatedForm.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Comment</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your comment here..."
                      className="bg-slate-800/50 border-slate-700"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              <Send className="mr-2 h-4 w-4" />
              {isSubmitting ? 'Submitting...' : 'Post Comment'}
            </Button>
          </form>
        </Form>
      </div>
    );
  }

  // Guest user form with login prompt
  return (
    <div className="p-6 rounded-lg bg-slate-800/30 border border-slate-700/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Leave a Reply</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push('/auth/login')}
          className="flex items-center gap-2"
        >
          <LogIn className="h-4 w-4" />
          Login to Comment
        </Button>
      </div>
      <p className="text-slate-400 text-sm mb-4">
        Login to post comments with your account, or comment as a guest below.
      </p>
      <Form {...guestForm}>
        <form onSubmit={guestForm.handleSubmit(onGuestSubmit)} className="space-y-4">
          <FormField
            control={guestForm.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Comment</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your comment here..."
                    className="bg-slate-800/50 border-slate-700"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              control={guestForm.control}
              name="authorName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} className="bg-slate-800/50 border-slate-700" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={guestForm.control}
              name="authorEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Your Email" {...field} className="bg-slate-800/50 border-slate-700" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            <Send className="mr-2 h-4 w-4" />
            {isSubmitting ? 'Submitting...' : 'Submit as Guest'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
