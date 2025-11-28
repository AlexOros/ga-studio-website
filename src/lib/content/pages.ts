import { HomePage } from './types';
import { getContentDirectory, loadMarkdownFile } from './loader';

/**
 * Get the home page content for a specific locale
 */
export async function getHomePage(locale: string): Promise<HomePage> {
  const homePagePath = getContentDirectory('pages', `home.${locale}.md`);
  const { frontmatter, content, html } = await loadMarkdownFile(homePagePath);
 
  return {
    locale: frontmatter.locale,
    hero: frontmatter.hero || {
      title: '',
      subtitle: '',
      image: '',
    },
    vision: frontmatter.vision || {
      title: '',
      content: '',
      image: '',
    },
    process: frontmatter.process || {
      title: '',
      content: '',
      image: '',
    },
    services: frontmatter.services || {
      title: '',
      items: [],
      image: '',
    },
    content,
    html,
  } satisfies HomePage;
}
