import { GetStaticPropsContext } from "next";
import { getProjectBySlug, getProjects } from "@api";
import { Project } from "@templates";
const LOCALE = "ro";
import fs from "fs";
import axios from "axios";
import http from "http";
import { assocPath } from "ramda";

export async function getStaticPaths() {
  try {
    const {
      data: { data },
    } = await getProjects({
      locale: LOCALE,
      fields: ["locale", "slug"],
    });

    return {
      paths: data.map(({ attributes }) => ({
        params: {
          slug: attributes!.slug,
        },
        locale: attributes!.locale,
      })),
      fallback: false,
    };
  } catch (error) {}
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ slug: string }>) {
  const data = await getProjectBySlug({
    slug: params!.slug,
    params: {
      populate: {
        image: "*",
        content: {
          populate: "*",
        },
      },
    },
  });

  // const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  // const mimeType = data.attributes?.image?.data?.attributes?.mime;
  // const url = `${baseUrl}${
  //   data.attributes!.image!.data!.attributes!.formats!.thumbnail!.url
  // }`;

  // let buff = Buffer.from(url);
  // const blurDataURL = `data:${mimeType};base64,${buff.toString("base64")}`;

  return {
    props: {
      data,
      // data: assocPath(
      //   ["attributes", "image", "data", "attributes", "blurDataURL"],
      //   buff.toString("base64"),
      //   data
      // ),
    },
  };
}

export default Project;
