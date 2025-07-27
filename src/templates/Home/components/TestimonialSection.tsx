import {
  Avatar,
  Box,
  Center,
  HStack,
  Icon,
  Stack,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { Heading } from "@components";
import { ComponentHomeTestimony, Testimonial } from "@models";
import { getImageFormat } from "@utils";
import React from "react";
import { A11y, Keyboard, Navigation } from "swiper";
import { Swiper, SwiperSlide, useSwiper, useSwiperSlide } from "swiper/react";
import { AiFillStar } from "react-icons/ai";

export const TestimonialSection = ({
  data,
}: {
  data: ComponentHomeTestimony;
}) => {
  const { title, testimonials } = data;
  const [smallerThen740] = useMediaQuery("(max-width: 740px)");

  return (
    <Box py={10} as="section">
      <Swiper
        modules={[Navigation, A11y, Keyboard]}
        keyboard={{
          enabled: true,
        }}
        autoHeight
        navigation={{
          enabled: true,
        }}
        {...(smallerThen740 && { navigation: false })}
        loop={true}
      >
        {testimonials?.data?.map(({ attributes, id }) => {
          return (
            <SwiperSlide key={id}>
              <Box py={4} px={[2, null, null, 4]}>
                {attributes && <TestimonialBlock {...attributes} />}
              </Box>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
};

const TestimonialBlock = ({
  name,
  rating,
  avatar,
  companyAndRole,
  description,
  addedAt,
}: Testimonial) => {
  const { thumbnail } = getImageFormat(avatar!.data);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="50vh"
    >
      <Stack
        p={[4, null, null, 6]}
        w={["auto", "2xl"]}
        border="2px solid"
        borderColor="gray.100"
      >
        <>
          <HStack>
            {thumbnail && <Avatar name={name} src={thumbnail.url} />}

            <Box>
              <HStack direction="row">
                <Heading size="h6">{name}</Heading>
                <Rating rating={rating} />
              </HStack>
              <Text
                noOfLines={2}
                color="gray.500"
                fontWeight="normal"
                fontSize="sm"
              >
                {companyAndRole ?? ""}
              </Text>
              <Text color="gray.500" fontWeight="normal" fontSize="sm">
                {" "}
                {addedAt}
              </Text>
            </Box>
          </HStack>
        </>

        {description && (
          <Box pt={0}>
            <Text>{description}</Text>
          </Box>
        )}
      </Stack>
    </Box>
  );
};

const Rating = ({ rating }: { rating: number }) => {
  const ratingList = new Array(rating).fill("");

  return (
    <HStack spacing={1}>
      {ratingList.map((_, i) => (
        <Icon key={i} as={AiFillStar} color="orange.300" />
      ))}
    </HStack>
  );
};
