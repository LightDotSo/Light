import { Footer } from "@lightdotso/core";

import type { InferGetStaticPropsType, GetStaticProps } from "next";
import dynamic from "next/dynamic";

import { Header } from "@lightdotso/changelog/components/Header";
import { NOTION_CHANGELOG_ID } from "@lightdotso/changelog/config/Notion";
import {
  getDatabase,
  getPropertyValue,
} from "@lightdotso/changelog/libs/services/notion";

const Changelog = dynamic(
  async () => {
    const mod = await import("@lightdotso/changelog/components/Changelog");
    return mod.Changelog;
  },
  { ssr: false },
);

export type Props = {
  posts: any;
  tasks: any;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const database = await getDatabase(NOTION_CHANGELOG_ID);

  const posts = database.filter(post => {
    //@ts-expect-error
    return post.cover !== null && post.cover.external_url !== null;
  });

  const tasks = [];
  for (const page of posts) {
    const pageId = page.id;
    //@ts-expect-error
    delete page.icon;

    //@ts-expect-error
    const datePropertyId = page.properties["Date"].id;
    const datePropertyItem = await getPropertyValue({
      pageId,
      propertyId: datePropertyId,
    });
    //@ts-expect-error
    const date = datePropertyItem.date.start;

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
    const numberPropertyId = page.properties["Number"].id;
    const numberPropertyItem = await getPropertyValue({
      pageId,
      propertyId: numberPropertyId,
    });
    //@ts-expect-error
    const number = numberPropertyItem.number;

    tasks.push({ date: date, name: name, number: number });
  }

  console.warn(posts);

  return {
    props: {
      posts: JSON.stringify(posts),
      tasks: JSON.stringify(tasks),
    },
    revalidate: 300,
  };
};

export const SlugPage = ({
  posts,
  tasks,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return (
    <>
      <Header />
      <Changelog posts={JSON.parse(posts)} tasks={JSON.parse(tasks)} />
      <Footer />
    </>
  );
};

export default SlugPage;
