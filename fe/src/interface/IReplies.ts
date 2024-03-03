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
  replies_count: number;
};

export type IReplyPost = {
  content: string;
  image: string | null | File;
  thread_id: number;
};
