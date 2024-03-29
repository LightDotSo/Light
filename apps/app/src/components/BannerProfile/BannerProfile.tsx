import Link from "next/link";
import type { FC } from "react";

import { PlaceholderProfile } from "@lightdotso/app/components/PlaceholderProfile";
import { useEns } from "@lightdotso/app/hooks/useEns";
import { useWallet } from "@lightdotso/app/hooks/useWallet";

export const BannerProfile: FC = () => {
  const { address } = useWallet();
  const { ens } = useEns(address);

  return (
    <div className="pb-5 sm:pb-8">
      <div className="mx-auto max-w-3xl px-2 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-bg-lighter py-2 px-3 shadow-lg sm:py-3 sm:px-4">
          <div className="flex flex-wrap items-center justify-between">
            <div className="hidden w-0 flex-1 items-center sm:flex">
              <span className="flex rounded-lg">
                <PlaceholderProfile
                  className="h-6 w-6 text-contrast-higher"
                  address={address}
                />
              </span>
              <p className="ml-4 truncate font-medium text-contrast-higher">
                See your profile in the metaverse
              </p>
            </div>
            <div className="order-3 mt-2 w-full shrink-0 sm:order-2 sm:mt-0 sm:w-auto">
              <Link href={`/${ens ?? address}`}>
                <a className="flex items-center justify-center rounded-md border border-transparent bg-contrast-higher py-2 px-4 text-sm font-medium text-contrast-lower shadow-sm ring-offset-bg-lighter hover:bg-contrast-medium focus:border-transparent focus:ring-2 focus:ring-primary-light focus:ring-offset-2 ">
                  Go to your profile
                </a>
              </Link>
            </div>
            <div className="order-2 shrink-0 sm:order-3 sm:ml-2" />
          </div>
        </div>
      </div>
    </div>
  );
};
