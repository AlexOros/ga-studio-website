import { getProjects } from "@api";
import { Projects } from "@templates";
import { getCategories } from "api/projects/getCategories";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const LOCALE = "ro";

/**
 * TODO
 * Add category to Heading (side navigation)
 * Add translation si side navigation
 * Test Projects page make sure nothing has broken
 * Add Logo
 * Deploy :D
 */

export async function getStaticProps() {
  try {
    const { data: projects } = await getProjects({
      locale: LOCALE,
      populate: ["category", "image"],
    });

    const { data: categories } = await getCategories({
      locale: LOCALE,
    });

    return {
      props: {
        projects,
        categories,
        ...(await serverSideTranslations(LOCALE, ["common"])),
      },
    };
  } catch (error: any) {
    throw new Error(
      error?.message ??
        `Something went wrong (getStaticProps proiecte ${LOCALE})`
    );
  }
}

export default Projects;
