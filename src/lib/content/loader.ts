import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface MarkdownFile {
  frontmatter: Record<string, any>;
  content: string;
}

/**
 * Get the absolute path to the content directory
 */
export function getContentDirectory(...segments: string[]): string {
  return path.join(process.cwd(), 'content', ...segments);
}

/**
 * Load and parse a markdown file
 */
export async function loadMarkdownFile(
  filePath: string,
): Promise<MarkdownFile> {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    frontmatter: data,
    content,
  };
}

/**
 * Get all markdown files in a directory
 */
export async function getAllMarkdownFiles(dir: string): Promise<string[]> {
  if (!fs.existsSync(dir)) {
    return [];
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      const subFiles = await getAllMarkdownFiles(fullPath);
      files.push(...subFiles);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Extract image paths from markdown content
 */
export function extractImagesFromMarkdown(content: string): string[] {
  const imageRegex = /!\[.*?\]\((.*?)\)/g;
  const images: string[] = [];
  let match;

  while ((match = imageRegex.exec(content)) !== null) {
    images.push(match[1]);
  }

  return images;
}
