import { GetStaticPropsContext } from "next";
import { getProjectBySlug, getProjects } from "@api";
import { Project } from "@templates";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
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
  try {
    const data = await getProjectBySlug({
      slug: params!.slug,
      ...(await serverSideTranslations(LOCALE, ["common"])),
      params: {
        populate: {
          image: "*",
          category: {
            populate: "attribute",
          },
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
  } catch (error: any) {
    throw new Error(
      error?.message ??
        `Something went wrong (getStaticProps architecture ${LOCALE})`
    );
  }
}

export default Project;
