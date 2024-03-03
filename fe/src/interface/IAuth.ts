export interface IAuth {
  userId: number;
  id: number;
  username: string;
  full_name: string;
  email: string;
  bio: string;
  profile_picture?: string;
  profile_description?: string;
  followers_count: number;
  followings_count: number;
}

export interface IRegister {
  full_name: string;
  username: string;
  email: string;
  password: string;
}

export interface ILogin {
  username: string;
  password: string;
}

export interface IUserSearch {
  id: number;
  username: string;
  full_name: string;
  bio: string;
  profile_picture?: string;
  userId: number,
  is_following: boolean
}

export interface IEditProfile {
  id: number;
  username: string;
  full_name: string;
  bio: string;
}
