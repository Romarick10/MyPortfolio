'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface LikeButtonProps {
  postId: string;
  initialLikes: number;
}

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export default function LikeButton({ postId, initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

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

  const handleLike = async () => {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Authentication Required',
        description: 'Please log in to like posts.',
      });
      router.push('/auth/login');
      return;
    }

    setLoading(true);

    try {
      if (isLiked) {
        // Unlike the post
        const response = await fetch(`/api/posts/${postId}/likes`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id }),
        });

        if (!response.ok) throw new Error('Failed to unlike');

        setLikes(prev => prev - 1);
        setIsLiked(false);
        toast({
          title: 'Unliked',
          description: 'You unliked this post.',
        });
      } else {
        // Like the post
        const response = await fetch(`/api/posts/${postId}/likes`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id }),
        });

        if (!response.ok) throw new Error('Failed to like');

        setLikes(prev => prev + 1);
        setIsLiked(true);
        toast({
          title: 'Liked!',
          description: 'You liked this post.',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update like. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <Button variant="outline" size="sm" disabled>
        <Heart className="mr-2 h-4 w-4" />
        {likes} Likes
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleLike}
      disabled={loading}
      className={cn(
        "transition-colors",
        isLiked && "border-red-500/50 bg-red-500/10 hover:bg-red-500/20"
      )}
    >
      <Heart className={cn("mr-2 h-4 w-4", isLiked && "fill-red-500 text-red-500")} />
      {likes} Likes
    </Button>
  );
}
