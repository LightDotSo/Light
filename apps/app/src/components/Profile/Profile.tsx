import dynamic from "next/dynamic";
import type { FC } from "react";

import { FollowListFollowers } from "@lightdotso/app/components/FollowListFollowers";
import { FollowListFollowing } from "@lightdotso/app/components/FollowListFollowing";
import type { ProfileBoardSectionNFTProps } from "@lightdotso/app/components/ProfileBoardSectionNFT";
import { ProfileBoardSectionNFT } from "@lightdotso/app/components/ProfileBoardSectionNFT";
import type { ProfileBoardSectionOATProps } from "@lightdotso/app/components/ProfileBoardSectionOAT";
import { ProfileBoardSectionOAT } from "@lightdotso/app/components/ProfileBoardSectionOAT";
import type { ProfileBoardSectionPoapProps } from "@lightdotso/app/components/ProfileBoardSectionPoap";
import { ProfileBoardSectionPoap } from "@lightdotso/app/components/ProfileBoardSectionPoap";
import { ProfileBoardSectionTokens } from "@lightdotso/app/components/ProfileBoardSectionTokens";
import { ProfileFollowHero } from "@lightdotso/app/components/ProfileFollowHero";
import type { ProfileFollowHeroTabsProps } from "@lightdotso/app/components/ProfileFollowHeroTabs";
import { ProfileHero } from "@lightdotso/app/components/ProfileHero";
import type { ProfileHeroTabsProps } from "@lightdotso/app/components/ProfileHeroTabs";
import { SeoBase } from "@lightdotso/app/components/SeoBase";
import { SeoLight } from "@lightdotso/app/components/SeoLight";
import { useEns } from "@lightdotso/app/hooks/useEns";

export type ProfileProps = ProfileHeroTabsProps &
  ProfileFollowHeroTabsProps &
  ProfileBoardSectionNFTProps &
  ProfileBoardSectionOATProps &
  ProfileBoardSectionPoapProps;

const DrawerAsset = dynamic(() => {
  return import("@lightdotso/app/components/DrawerAsset").then(mod => {
    return mod.DrawerAsset;
  });
});

const ModalNetwork = dynamic(() => {
  return import("@lightdotso/app/components/ModalNetwork").then(mod => {
    return mod.ModalNetwork;
  });
});

const ModalShare = dynamic(() => {
  return import("@lightdotso/app/components/ModalShare").then(mod => {
    return mod.ModalShare;
  });
});

const ModalTwitterVerify = dynamic(() => {
  return import("@lightdotso/app/components/ModalTwitterVerify").then(mod => {
    return mod.ModalTwitterVerify;
  });
});

export const Profile: FC<ProfileProps> = ({ active, follow, address }) => {
  const { ens } = useEns(address);

  return (
    <>
      {!address && <SeoBase base="Profile" />}
      <SeoLight ogpName={ens ?? address} />
      <div className="mx-auto pb-12 text-center lg:pb-16">
        {active && <ProfileHero active={active} address={address} />}
        {follow && <ProfileFollowHero address={address} follow={follow} />}
        {active === "Board" && (
          <div className="mx-auto space-y-6 py-5 md:py-12 lg:max-w-container">
            <ProfileBoardSectionNFT address={address} />
            <ProfileBoardSectionPoap address={address} />
            <ProfileBoardSectionOAT address={address} />
            <ProfileBoardSectionTokens address={address} />
          </div>
        )}
        {follow === "following" && <FollowListFollowing address={address} />}
        {follow === "followers" && <FollowListFollowers address={address} />}
      </div>
      <DrawerAsset />
      <ModalNetwork />
      <ModalShare />
      <ModalTwitterVerify />
    </>
  );
};
