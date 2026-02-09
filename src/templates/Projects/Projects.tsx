import {
  Box,
  Button,
  Center,
  Grid,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  VStack,
} from '@chakra-ui/react';
import { HEADER_HEIGHT, Heading, ImageCard } from '@components';
import { Project, Category } from '@/lib/content';
import {
  stringifySearchParams,
  useRouter,
  useSearchParams,
  useSyncNextLocale,
} from '@shared/hooks';
import { ROUTES } from '@shared/routes';
import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';
import { TbZoomQuestion } from 'react-icons/tb';
import { RiCloseFill } from 'react-icons/ri';
import { useSearch } from './useSearch';

export type ProjectsProps = {
  projects: Project[];
  categories: Category[];
};

export const Projects = ({ projects, categories }: ProjectsProps) => {
  const { pathname, locale } = useRouter();
  const [searchQuery, setSearchQuery] = useSearch();
  const [mounted, setMounted] = useState(false);

  const { searchParams, setSearchParams } = useSearchParams<{
    category: string | null;
  }>();
  const { category = 'all' } = searchParams;

  // Prevent hydration mismatch by deferring filtering until after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const { t } = useTranslation(['common']);

  const getNextLocaleWithSearchParam = () => {
    const suffix =
      category !== 'all' ? `?${stringifySearchParams({ category })}` : '';
    return locale === 'ro'
      ? `${ROUTES.projects.en}${suffix}`
      : `${ROUTES.projects.ro}${suffix}`;
  };

  useSyncNextLocale(getNextLocaleWithSearchParam());

  // Only filter after mount to prevent hydration mismatch
  const filteredProjects = mounted
    ? projects
        .filter(project => {
          if (category === 'all') return true;
          return project.category === category;
        })
        .filter(project =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase()),
        )
    : projects;

  const handleCategoryChange = (newCategory: string) => {
    setSearchParams(searchParams => ({
      ...searchParams,
      category: newCategory === 'all' ? null : newCategory,
    }));
    setSearchQuery('');
  };

  const pathnameWithLocale =
    locale === 'ro' ? pathname : `/${locale}${pathname}`;

  return (
    <Box py={`${HEADER_HEIGHT}px`}>
      <Center pb={6} pt={12}>
        <Heading size="h1">{t('common:projects')}</Heading>
      </Center>

      <VStack
        alignItems="start"
        px={4}
        py={8}
        width={['auto', null, null, 'min-content']}
      >
        <Stack
          direction={['column', null, null, 'row']}
          alignItems="center"
          alignSelf={['center', null, null, 'start']}
        >
          <Heading whiteSpace="nowrap" size="h5">
            {t('common:selectedCategory')}:
          </Heading>

          <Button
            textTransform="none"
            onClick={() => handleCategoryChange('all')}
            variant={category === 'all' ? 'solid' : 'ghost'}
          >
            {t(`common:categoryObj.all`)}
          </Button>

          {categories.map(cat => (
            <Button
              textTransform="none"
              onClick={() => handleCategoryChange(cat.slug)}
              variant={category === cat.slug ? 'solid' : 'ghost'}
              key={cat.slug}
            >
              {t(`common:categoryObj.${cat.slug}`) ?? cat.name}
            </Button>
          ))}
        </Stack>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            value={searchQuery}
            onChange={ev => setSearchQuery(ev.target.value)}
            borderRadius={1}
            focusBorderColor="gray.800"
            variant="outline"
            placeholder={t('common:searchSelectedCategory') ?? 'Search'}
          />
          {searchQuery && (
            <InputRightElement width="4.5rem">
              <IconButton
                size="sm"
                variant="ghost"
                onClick={() => setSearchQuery('')}
                aria-label="clear search input"
              >
                <Icon fontSize="2xl" as={RiCloseFill} />
              </IconButton>
            </InputRightElement>
          )}
        </InputGroup>
      </VStack>
      <Grid gridTemplateColumns={['1fr', null, null, '1fr 1fr']} gap={2}>
        {/* {filteredProjects.map(project => {
          return (
            <Box
              key={project.slug}
              href={`${pathnameWithLocale}/${project.slug}`}
              as={Link}
            >
              <ImageCard
                name={project.title}
                url={project.heroImage}
                blurDataURL={undefined}
                alt={project.title}
              />
            </Box>
          );
        })} */}
      </Grid>
      {/* {filteredProjects.length === 0 && (
        <Center py={12}>
          <VStack spacing={6}>
            <Icon as={TbZoomQuestion} fontSize="6xl" />
            <Heading>{t('common:noProjectFound')}</Heading>
          </VStack>
        </Center>
      )} */}
      {true && (
        <Center py={12}>
          <VStack spacing={6}>
            <Icon as={TbZoomQuestion} fontSize="6xl" />
            <Heading>{t('common:noProjectFound')}</Heading>
          </VStack>
        </Center>
      )}
    </Box>
  );
};
