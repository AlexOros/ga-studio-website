export interface Project {
  slug: string;
  title: string;
  locale: string;
  category: string;
  status: 'concept' | 'under_construction' | 'finished';
  location: string;
  heroImage: string;
  date: string;
  featured: boolean;
  order: number;
  content: string;  // Markdown
  html: string;     // Rendered HTML
  images: string[]; // Extracted from markdown
}

export interface Category {
  slug: string;
  name: string;
  locale: string;
  order: number;
  description?: string;
}

export interface HomePage {
  locale: string;
  hero: {
    title: string;
    subtitle: string;
    image: string;
  };
  vision: {
    title: string;
    content: string;
    image: string;
  };
  process: {
    title: string;
    content: string;
    image: string;
  };
  services: {
    title: string;
    items: string[];
    image: string;
  };
  content?: string;
  html?: string;
}
