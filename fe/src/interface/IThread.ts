export interface ThreadInterface {
  id: number;
  user: {
    photo_profile: string;
    full_name: string;
    username: string;
  };
  created_at: string;
  content: string;
  image?: string;
  likes_count: number;
  replies_count: number;
  isLiked: boolean;
}

export type IPostThread = {
  content: string;
  image: string | File | null;
};

export type IReplyThread = {
  content: string;
  image?: string | File | null;
  threads?: number;
};

export type IReplies = {
  id: number;
  user: {
    photo_profile: string;
    full_name: string;
    username: string;
  };
  created_at: string;
  content: string;
  image?: string;
  likes_count: number;
};
