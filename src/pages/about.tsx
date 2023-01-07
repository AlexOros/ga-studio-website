import { About } from "@templates";
import { GetStaticPropsContext, NextPage } from "next";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations"

const DesprePage: NextPage = ({ ...props }) => <About {...props} />;

export default DesprePage;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      //   ...(locale && (await serverSideTranslations(locale, ["common"])))
    },
  };
}
