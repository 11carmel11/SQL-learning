export interface Blog {
  id: number;
  title: string;
  url: string;
  author: string;
  likes: number;
  userId?: number | string;
}

export interface User {
  id: number;
  name: string;
  username: string;
}

export interface Authored {
  author: string;
  blogs: string;
  likes: string;
}
