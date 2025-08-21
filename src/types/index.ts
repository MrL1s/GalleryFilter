export interface CommentItem {
  name: string;
  avatar: string;
  date: string; // ISO
  text: string;
}

export interface ImageItem {
  id: number;
  title: string;
  description: string;
  image: string; // URL
  category: string[];
  createdAt: string; // ISO
  comments: CommentItem[];
}

// return useGallery
export type ImageWithMeta = ImageItem & {
  timeAgo?: string;
  commentsCount?: number;
};
