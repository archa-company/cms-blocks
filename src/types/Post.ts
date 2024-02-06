// import { BreadcrumbsItem } from "@/components/common/Breadcrumbs";

export interface PostMetas {
  hat?: string;
  readtime?: number;
  credits?: string;
}

export interface PostSEO {
  title: string;
  description?: string;
  canonical?: string;
  site_name: string;
}

export interface PostNews {
  thumbnail?: string;
  externalId?: number;
  seoDescription?: string;
  advertisingNews?: boolean;
  uri?: string;
  className?: string;
  id?: number;
  title: string;
  slug: string;
  link: string;
  hat?: string;
  likes?: number;
  taxonomies?: {
    category: {
      id?: number;
      isPrimary?: boolean;
      name?: string;
      slug?: string;
      url?: string;
    }[];
    credit: {
      id?: number;
      name?: string;
      slug?: string;
      url?: string;
    }[];
  };
  category?: string;
  primaryCategory?: any;
  credit?: {
    id?: number;
    name?: string;
    slug?: string;
    url?: string;
  }[];
  readtime?: number;
  image?: string;
  excerpt?: string;
  author?: PostAuthor;
  createdAt?: string;
  updatedAt?: string;
  showThumbnail?: boolean;
  isSelected?: boolean;
}

export interface News extends Omit<PostNews, 'className' | 'link'> {}

export interface PostTerm {
  id: number;
  slug: string;
  name: string;
}

export interface PostAuthor {
  id: number;
  name: string;
  image?: string;
}

export default interface Post {
  id: number;
  title: string;
  slug: string;
  thumbnail?: string | null;
  url?: string | null;
  categories?: PostTerm[];
  tags?: PostTerm[];
  metas?: PostMetas | null;
  news?: PostNews[] | null;
  seo?: PostSEO;
  author?: PostAuthor | null;
  // breadcrumbs?: BreadcrumbsItem[]
  body: string;
  excerpt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPagination {
  page: number;
  size: number;
  total: number;
  total_pages: number;
}
