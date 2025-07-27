import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticPropsContext } from "next";
import { NotFound } from "@templates";

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  try {
    return {
      props: {
        ...(await serverSideTranslations(locale!, ["common"])),
      },
    };
  } catch (error: any) {}
}

export default NotFound;
