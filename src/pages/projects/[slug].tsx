import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Project as ProjectTemplate } from '@templates';
import { getAllProjects, getProjectBySlug, Project } from '@/lib/content';

interface ProjectPageProps {
  data: Project;
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths: Array<{ params: { slug: string }; locale: string }> = [];

  for (const locale of locales || ['en']) {
    const projects = await getAllProjects(locale);
    projects.forEach(project => {
      paths.push({
        params: { slug: project.slug },
        locale,
      });
    });
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<ProjectPageProps, { slug: string }> = async ({
  params,
  locale,
}) => {
  const project = await getProjectBySlug(params!.slug, locale || 'en');

  if (!project) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: project,
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
  };
};

export default ProjectTemplate;
