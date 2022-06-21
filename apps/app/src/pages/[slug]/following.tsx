/* eslint-disable no-empty */

import { Footer } from "@lightdotso/core";
import { fetchCyberconnectFollowings, resolveEns } from "@lightdotso/services";
import type { CyberConnectFollowings } from "@lightdotso/types";
import { cyberconnectFollowingsSchema } from "@lightdotso/types";
import { utils } from "ethers";
import type {
  GetStaticProps,
  InferGetStaticPropsType,
  GetStaticPaths,
  GetStaticPropsContext,
} from "next";
import { SWRConfig, unstable_serialize } from "swr";
import { unstable_serialize as unstable_serialize_infinite } from "swr/infinite";

import { Auth } from "@lightdotso/app/components/Auth";
import { Header } from "@lightdotso/app/components/Header";
import { Profile } from "@lightdotso/app/components/Profile";
import { FOLLOW_QUERY_NUMBER } from "@lightdotso/app/config/Query";
import { SwrKeys } from "@lightdotso/app/config/SwrKeys";
import { validateSchema } from "@lightdotso/app/libs/api/validateSchema";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: true,
    paths: [],
  };
};

export type Props = {
  address: string;
  ens?: string;
  followings?: CyberConnectFollowings;
};

const parseStringArray = (stringArray: string | string[]) => {
  return Array.isArray(stringArray) ? stringArray[0] : stringArray;
};

export const getStaticProps: GetStaticProps<Props> = async ({
  params: { slug },
}: GetStaticPropsContext) => {
  let address: string;
  let ens: string;
  let followings: CyberConnectFollowings;
  const parsedSlug = parseStringArray(slug);

  try {
    if (parsedSlug.endsWith(".eth")) {
      try {
        address = await resolveEns(parsedSlug);
        ens = parsedSlug;
      } catch (err) {
        return {
          notFound: true,
        };
      }
    } else if (utils.isAddress(parsedSlug)) {
      address = parsedSlug;
    } else {
      return {
        notFound: true,
      };
    }

    try {
      const assetsResult = await fetchCyberconnectFollowings(
        address,
        FOLLOW_QUERY_NUMBER,
      );
      followings = validateSchema(cyberconnectFollowingsSchema, assetsResult);
    } catch (e) {}

    return {
      props: {
        address: address,
        ens: ens ?? null,
        followings: followings ?? null,
      },
      revalidate: 300,
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

export const SlugPage = ({
  address,
  ens,
  followings,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return (
    <SWRConfig
      value={{
        fallback: {
          [unstable_serialize([SwrKeys.ENS, address])]: ens,
          [unstable_serialize_infinite(() => {
            return [
              SwrKeys.CYBER_CONNECT_FOLLOWINGS,
              { address: address, first: FOLLOW_QUERY_NUMBER, after: "0" },
            ];
          })]: [followings],
        },
      }}
    >
      <Auth>
        <Header border={false} />
        <Profile address={address} follow="following" />
        <Footer />
      </Auth>
    </SWRConfig>
  );
};

export default SlugPage;
