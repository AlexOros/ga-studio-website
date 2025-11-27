import { GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getProjectBySlug, getProjects } from "@api";
import { Project } from "@templates";

const LOCALE = "en";

export async function getStaticPaths() {
  // Temporary fix: Return an empty paths array and set fallback to 'blocking'
  // This will allow the build to succeed even if the backend is down.
  return {
    paths: [],
    fallback: 'blocking',
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
  } catch (error) {}
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ slug: string }>) {
  // Temporary fix: Return an empty paths array and set fallback to 'blocking'
  // This will allow the build to succeed even if the backend is down.
  return {
    props: {
      ...(await serverSideTranslations(LOCALE, ["common"])),   
    }
  };    
  try {
    const data = await getProjectBySlug({
      slug: params!.slug,
      params: {
        locale: LOCALE,
        populate: {
          category: "name",
          image: "*",
          content: {
            populate: "*",
          },
        },
      },
    });

    return {
      props: {
        data,
        ...(await serverSideTranslations(LOCALE, ["common"])),
      },
    };
  } catch (error: any) {
    throw new Error(
      error?.message ??
        `Something went wrong (getStaticProps architecture ${LOCALE})`
    );
  }
}

export default Project;
