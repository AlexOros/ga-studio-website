import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps, GetStaticPropsContext } from 'next';
import { Home } from "@templates";
import { getHomePage, HomePage } from '@/lib/content';

interface HomePageProps {
  data: HomePage;
}

export const getStaticProps: GetStaticProps<HomePageProps> = async ({
  locale,
}: GetStaticPropsContext) => {
  const data = await getHomePage(locale || 'ro');

  return {
    props: {
      data,
      ...(await serverSideTranslations(locale || 'ro', ['common', 'home'])),
    },
  };
};

export default Home;
