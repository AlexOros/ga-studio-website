import fs from 'fs';
import path from 'path';
import { Category } from './types';
import { getContentDirectory, loadMarkdownFile } from './loader';

/**
 * Get all categories for a specific locale
 */
export async function getAllCategories(locale: string): Promise<Category[]> {
  const categoriesDir = getContentDirectory('categories');

  if (!fs.existsSync(categoriesDir)) {
    return [];
  }

  const files = fs.readdirSync(categoriesDir)
    .filter(file => file.endsWith(`.${locale}.md`));

  const categories: Category[] = [];

  for (const file of files) {
    const filePath = path.join(categoriesDir, file);
    const { frontmatter, content } = await loadMarkdownFile(filePath);

    categories.push({
      slug: frontmatter.slug,
      name: frontmatter.name,
      locale: frontmatter.locale,
      order: frontmatter.order || 0,
      description: content.trim() || undefined,
    });
  }

  // Sort by order
  categories.sort((a, b) => a.order - b.order);

  return categories;
}

/**
 * Get a single category by slug
 */
export async function getCategoryBySlug(
  slug: string,
  locale: string
): Promise<Category | null> {
  const categoryPath = getContentDirectory('categories', `${slug}.${locale}.md`);

  if (!fs.existsSync(categoryPath)) {
    return null;
  }

  const { frontmatter, content } = await loadMarkdownFile(categoryPath);

  return {
    slug: frontmatter.slug,
    name: frontmatter.name,
    locale: frontmatter.locale,
    order: frontmatter.order || 0,
    description: content.trim() || undefined,
  };
}
