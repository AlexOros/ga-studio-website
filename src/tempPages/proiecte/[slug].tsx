import { GetStaticPropsContext } from 'next';
import { getProjectBySlug, getProjects } from '@api';
import { Project } from '@templates';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
const LOCALE = 'ro';

export async function getStaticPaths() {
  // Temporary fix: Return an empty paths array and set fallback to 'blocking'
  // This will allow the build to succeed even if the backend is down.
  // Pages will be generated on demand if a user requests them.
  return {
    paths: [],
    fallback: 'blocking', // or true if you handle loading states
  };

  try {
    const { data } = await getProjects({
      locale: LOCALE,
      fields: ['locale', 'slug'],
    });

    return {
      paths: data.map(({ attributes }) => ({
        params: {
          slug: attributes!.slug,
        },
        locale: attributes!.locale,
      })),
      fallback: false,
    };
  } catch (error) {
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ slug: string }>) {
  // Temporary fix: Return an empty paths array and set fallback to 'blocking'
  // This will allow the build to succeed even if the backend is down.
  return {
    props: {
      ...(await serverSideTranslations(LOCALE, ['common'])),
    },
  };
  try {
    const data = await getProjectBySlug({
      slug: params!.slug,
      params: {
        populate: {
          image: '*',
          category: {
            populate: 'attribute',
          },
          content: {
            populate: '*',
          },
        },
      },
    });

    return {
      props: {
        data,
        ...(await serverSideTranslations(LOCALE, ['common', 'home'])),
      },
    };
  } catch (error: any) {
    throw new Error(
      error?.message ??
        `Something went wrong (getStaticProps architecture ${LOCALE})`,
    );
  }
}

export default Project;
