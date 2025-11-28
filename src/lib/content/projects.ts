import fs from 'fs';
import path from 'path';
import { Project } from './types';
import { getContentDirectory, loadMarkdownFile, extractImagesFromMarkdown } from './loader';

/**
 * Get all projects for a specific locale
 */
export async function getAllProjects(locale: string): Promise<Project[]> {
  const projectsDir = getContentDirectory('projects');

  if (!fs.existsSync(projectsDir)) {
    return [];
  }

  const projectDirs = fs.readdirSync(projectsDir, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name);

  const projects: Project[] = [];

  for (const projectDir of projectDirs) {
    const projectPath = path.join(projectsDir, projectDir, `index.${locale}.md`);

    if (fs.existsSync(projectPath)) {
      const { frontmatter, content, html } = await loadMarkdownFile(projectPath);
      const images = extractImagesFromMarkdown(content);

      // Resolve relative image paths to absolute paths
      const resolvedImages = images.map(img => {
        if (img.startsWith('./')) {
          return `/content/projects/${projectDir}/${img.slice(2)}`;
        }
        return img;
      });

      // Resolve hero image path
      const heroImage = frontmatter.hero_image
        ? frontmatter.hero_image.startsWith('./')
          ? `/content/projects/${projectDir}/${frontmatter.hero_image.slice(2)}`
          : frontmatter.hero_image
        : '';

      projects.push({
        slug: frontmatter.slug || projectDir,
        title: frontmatter.title,
        locale: frontmatter.locale,
        category: frontmatter.category,
        status: frontmatter.status,
        location: frontmatter.location,
        heroImage,
        date: frontmatter.date,
        featured: frontmatter.featured || false,
        order: frontmatter.order || 0,
        content,
        html,
        images: resolvedImages,
      });
    }
  }

  // Sort by order, then by date
  projects.sort((a, b) => {
    if (a.order !== b.order) {
      return a.order - b.order;
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return projects;
}

/**
 * Get a single project by slug
 */
export async function getProjectBySlug(
  slug: string,
  locale: string
): Promise<Project | null> {
  const projectPath = getContentDirectory('projects', slug, `index.${locale}.md`);

  if (!fs.existsSync(projectPath)) {
    return null;
  }

  const { frontmatter, content, html } = await loadMarkdownFile(projectPath);
  const images = extractImagesFromMarkdown(content);

  // Resolve relative image paths
  const resolvedImages = images.map(img => {
    if (img.startsWith('./')) {
      return `/content/projects/${slug}/${img.slice(2)}`;
    }
    return img;
  });

  // Resolve hero image path
  const heroImage = frontmatter.hero_image
    ? frontmatter.hero_image.startsWith('./')
      ? `/content/projects/${slug}/${frontmatter.hero_image.slice(2)}`
      : frontmatter.hero_image
    : '';

  return {
    slug: frontmatter.slug || slug,
    title: frontmatter.title,
    locale: frontmatter.locale,
    category: frontmatter.category,
    status: frontmatter.status,
    location: frontmatter.location,
    heroImage,
    date: frontmatter.date,
    featured: frontmatter.featured || false,
    order: frontmatter.order || 0,
    content,
    html,
    images: resolvedImages,
  };
}

/**
 * Get all projects in a specific category
 */
export async function getProjectsByCategory(
  category: string,
  locale: string
): Promise<Project[]> {
  const allProjects = await getAllProjects(locale);
  return allProjects.filter(project => project.category === category);
}
