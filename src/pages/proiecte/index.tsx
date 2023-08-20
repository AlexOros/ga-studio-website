import { getProjects } from "@api";
import { Projects } from "@templates";
import { getCategories } from "api/project";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const LOCALE = "ro";

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
