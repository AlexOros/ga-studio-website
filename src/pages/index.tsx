// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticPropsContext } from "next";
import { Home } from "@templates";
import { getProjects } from "@api";

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const {
    data: { data },
  } = await getProjects({
    locale,
    populate: {
      image: {
        fields: ["formats"],
      },
    },
    fields: ["title", "slug", "locale"],
  });

  return {
    props: {
      data,
      // ...(await serverSideTranslations(locale!, ["common", "home"]))
    },
  };
}

export default Home;
