import Head from "next/head";
import { HomePage } from '@/lib/content/types';
import { ROUTES } from '@shared/routes';
import { useSyncNextLocale } from '@shared/hooks';

import {
  HeroSection,
  ProcessSection,
  ServicesSection,
  VisionSection,
} from './components';

type HomeProps = {
  data: HomePage;
};

export function Home({ data }: HomeProps) {
  useSyncNextLocale(ROUTES.home);

  console.log(data);

  const { hero, vision, process, services } = data;

  return (
    <>
      <Head>
        <title>GAStudio</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {hero && <HeroSection data={hero} />}

      {vision && <VisionSection data={vision} />}

      {process && <ProcessSection data={process} />}

      {services && <ServicesSection data={services} />}
    </>
  );
}
