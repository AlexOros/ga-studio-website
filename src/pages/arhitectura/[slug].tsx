import { GetStaticPropsContext } from "next";
import { getProjectBySlug, getProjects } from "@api";
import { Project } from "@templates";
const LOCALE = "ro";

export async function getStaticPaths() {
  try {
    const {
      data: { data },
    } = await getProjects({
      locale: LOCALE,
      fields: ["locale", "slug"],
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
  const data = await getProjectBySlug({
    slug: params!.slug,
    params: {
      populate: {
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
    },
  };
}

export default Project;
