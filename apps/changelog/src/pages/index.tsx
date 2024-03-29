import { Footer } from "@lightdotso/common";

import type { InferGetStaticPropsType, GetStaticProps } from "next";

import { Changelog } from "@lightdotso/changelog/components/Changelog/Changelog";
import { Header } from "@lightdotso/changelog/components/Header";
import { NOTION_CHANGELOG_ID } from "@lightdotso/changelog/config/Notion";
import {
  getDatabase,
  getPropertyValue,
} from "@lightdotso/changelog/libs/services/notion";

export type Props = {
  posts: any;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const database = await getDatabase(NOTION_CHANGELOG_ID);

  const posts = database.filter(post => {
    //@ts-expect-error
    return post.cover !== null && post.cover.external_url !== null;
  });

  for (const page of posts) {
    const pageId = page.id;

    //@ts-expect-error
    const datePropertyId = page.properties["Date"].id;
    const datePropertyItem = await getPropertyValue({
      pageId,
      propertyId: datePropertyId,
    });
    //@ts-expect-error
    const date = datePropertyItem.date.start;
    //@ts-expect-error
    page.date = date;

    //@ts-expect-error
    const namePropertyId = page.properties["Name"].id;
    const namePropertyItems = await getPropertyValue({
      pageId,
      propertyId: namePropertyId,
    });
    const name = namePropertyItems
      //@ts-expect-error
      .map(propertyItem => {
        return propertyItem.title.plain_text;
      })
      .join("");
    //@ts-expect-error
    page.name = name;

    //@ts-expect-error
    const numberPropertyId = page.properties["Number"].id;
    const numberPropertyItem = await getPropertyValue({
      pageId,
      propertyId: numberPropertyId,
    });
    //@ts-expect-error
    const number = numberPropertyItem.number;
    //@ts-expect-error
    page.number = number;

    //@ts-expect-error
    const digestPropertyId = page.properties["Digest"].id;
    const digestPropertyItem = await getPropertyValue({
      pageId,
      propertyId: digestPropertyId,
    });
    const digest = digestPropertyItem
      //@ts-expect-error
      .map(propertyItem => {
        return propertyItem.rich_text.plain_text;
      })
      .join("");
    //@ts-expect-error
    page.digest = digest;
  }

  if (posts === null) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      posts: posts,
    },
    revalidate: 300,
  };
};

export const SlugPage = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return (
    <>
      <Header />
      <Changelog posts={posts} />
      <Footer />
    </>
  );
};

export default SlugPage;
