import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticPropsContext } from "next";
import { Home } from "@templates";
import { getHomePage } from "api/projects/getHomePage";

// TODO Get all categories here

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  try {
    const data = await getHomePage({ locale });

    return {
      props: {
        homePage: data,
        categories: [],
        ...(await serverSideTranslations(locale!, ["common", "home"])),
      },
    };
  } catch (error: any) {
    throw new Error(
      error?.message ?? "Something went wrong (getStaticProps getHomePage)"
    );
  }
}

export default Home;
