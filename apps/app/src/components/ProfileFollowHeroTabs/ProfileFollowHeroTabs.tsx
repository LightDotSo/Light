import clsx from "clsx";
import Link from "next/link";
import type { FC } from "react";
import { useMemo } from "react";

import { useEnsName } from "wagmi";

import { useWallet } from "@lightdotso/app/hooks/useWallet";

export type ProfileFollowHeroTab = "following" | "followers";

export type ProfileFollowHeroTabsProps = {
  address?: string;
  follow?: ProfileFollowHeroTab;
};

export const ProfileFollowHeroTabs: FC<ProfileFollowHeroTabsProps> = ({
  address,
  follow = "following",
}) => {
  const { address: walletAddress } = useWallet();
  const { data: ens } = useEnsName({ address: address });

  const slug = useMemo(() => {
    const slug = address === walletAddress ? "profile" : ens ?? address;
    return slug;
  }, [address, ens, walletAddress]);

  const tabs: {
    name: string;
    href: string;
    follow: ProfileFollowHeroTab;
  }[] = [
    {
      name: "Following",
      href: `/${slug}/following`,
      follow: "following",
    },
    {
      name: "Followers",
      href: `/${slug}/followers`,
      follow: "followers",
    },
  ];

  return (
    <div className="overflow-y-hidden overflow-x-scroll border-b border-contrast-lower bg-bg-lighter">
      <div className="mx-auto flex justify-center">
        <nav
          className="-mb-px flex justify-center space-x-8 md:justify-start"
          aria-label="Tabs"
        >
          {tabs.map(tab => {
            return (
              <Link key={tab.name} passHref href={tab.href}>
                <a
                  className={clsx(
                    tab.follow === follow
                      ? "border-contrast-high text-contrast-higher"
                      : "border-transparent text-contrast-medium hover:border-contrast-medium hover:text-contrast-higher",
                    !slug && "pointer-events-none",
                    "group inline-flex items-center border-b-4 py-4 px-3 text-sm font-medium",
                  )}
                  aria-current={tab.follow === follow ? "page" : undefined}
                >
                  <span>{tab.name}</span>
                </a>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
