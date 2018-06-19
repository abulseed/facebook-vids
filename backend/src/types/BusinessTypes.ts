export interface Video {
  id: string;
  title: string;
  page_name: string;
  page_id: string;
  views_count?: number;
  likes_count: number;
  comments_count: number;
  shares_count?: number;
}
