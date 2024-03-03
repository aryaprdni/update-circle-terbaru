export interface IFollow {
  id: number;
  userId: number;
  username: string;
  full_name: string;
  email: string;
  profile_picture: string;
  bio: string;
  is_following: boolean;
}
