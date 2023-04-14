import { getProjects } from "@api";
import { Projects } from "@templates";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const LOCALE = "ro";

/**
 * TODO
 * Add both index pages (With filter functionality)
 * Add category to Heading (side navigation)
 * Add translation si side navigation
 * Test Projects page make sure nothing has broken
 * Add Logo
 * Deploy :D
 */

export async function getStaticProps() {
  try {
    const data = await getProjects({
      locale: LOCALE,
    });
    console.log("🔥  data:", data);

    return {
      props: {
        // data: JSON.stringify(data),`
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

export default Projects;
