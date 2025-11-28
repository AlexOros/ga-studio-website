import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Projects } from '@templates';
import { getAllProjects, getAllCategories, Project, Category } from '@/lib/content';

interface ProjectsPageProps {
  projects: Project[];
  categories: Category[];
}

export const getStaticProps: GetStaticProps<ProjectsPageProps> = async ({ locale }) => {
  const projects = await getAllProjects(locale || 'en');
  const categories = await getAllCategories(locale || 'en');

  return {
    props: {
      projects,
      categories,
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
  };
};

export default Projects;
