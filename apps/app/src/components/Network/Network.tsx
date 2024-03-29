import type { NetworkType } from "@lightdotso/types";
import dynamic from "next/dynamic";
import type { FC } from "react";

import { NetworkHeroPoap } from "@lightdotso/app/components/NetworkHeroPoap";
import { NetworkHeroSnapshot } from "@lightdotso/app/components/NetworkHeroSnapshot";
import { NetworkPeopleListPoap } from "@lightdotso/app/components/NetworkPeopleListPoap";
import { NetworkPeopleListSnapshot } from "@lightdotso/app/components/NetworkPeopleListSnapshot";
import { NetworkTabs } from "@lightdotso/app/components/NetworkTabs";
import type { NetworkTabsProps } from "@lightdotso/app/components/NetworkTabs";
import { SeoLight } from "@lightdotso/app/components/SeoLight";

export type NetworkProps = {
  id: string;
  name?: string;
  type: NetworkType;
} & Pick<NetworkTabsProps, "active">;

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

export const Network: FC<NetworkProps> = ({ active, id, type, name }) => {
  return (
    <>
      <SeoLight ogpName={name || id} />
      <div className="mx-auto max-w-7xl">
        <div className="lg:mt-12 lg:grid lg:grid-cols-12 lg:gap-x-5 lg:px-12">
          <div className="bg-bg-lighter py-8 px-2 sm:px-6 lg:col-span-3 lg:bg-bg lg:p-0 lg:py-12">
            {type === "DAO" && <NetworkHeroSnapshot spaceId={id} />}
            {type === "POAP" && <NetworkHeroPoap eventId={id} />}
          </div>
          <div className="lg:col-span-9 lg:px-0">
            <NetworkTabs active={active} id={id} type={type} />
            <div className="mx-auto lg:max-w-container">
              {active === "People" && type === "DAO" && (
                <NetworkPeopleListSnapshot spaceId={id} />
              )}
              {active === "People" && type === "POAP" && (
                <NetworkPeopleListPoap eventId={id} />
              )}
            </div>
          </div>
        </div>
      </div>
      <ModalNetwork />
      <ModalShare />
    </>
  );
};
