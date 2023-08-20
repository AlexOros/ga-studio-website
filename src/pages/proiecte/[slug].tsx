import { GetStaticPropsContext } from "next";
import { getProjectBySlug, getProjects } from "@api";
import { Project } from "@templates";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
const LOCALE = "ro";

export async function getStaticPaths() {
  try {
    const { data } = await getProjects({
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
  throw new Error(
    `Something went wrong (getStaticProps architecture ${LOCALE})`
  );
  try {
    const data = await getProjectBySlug({
      slug: params!.slug,
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
        ...(await serverSideTranslations(LOCALE, ["common", "home"])),
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
