import type { CyberConnectStatus, PlausibleEvents } from "@lightdotso/types";
import clsx from "clsx";
import { usePlausible } from "next-plausible";
import type { FC, ButtonHTMLAttributes, MouseEvent } from "react";
import { useEffect, useState, useCallback } from "react";

import { LoadingDots } from "@lightdotso/app/components/LoadingDots";
import { useCyberConnectIdentity } from "@lightdotso/app/hooks/useCyberConnectIdentity";
import { useCyberConnectStatus } from "@lightdotso/app/hooks/useCyberConnectStatus";
import { useHover } from "@lightdotso/app/hooks/useHover";
import { useModalWallet } from "@lightdotso/app/hooks/useModalWallet";
import { useProviderCyberConnect } from "@lightdotso/app/hooks/useProviderCyberConnect";
import { useWallet } from "@lightdotso/app/hooks/useWallet";
import { error } from "@lightdotso/app/libs/toast/error";

export type FollowButtonProps = {
  address: string;
  full?: boolean;
  initialStatus?: CyberConnectStatus;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const FollowButton: FC<FollowButtonProps> = ({
  address,
  full,
  initialStatus,
  ...rest
}) => {
  const cyberconnectProvider = useProviderCyberConnect();
  const plausible = usePlausible<PlausibleEvents>();
  const { openModalWallet } = useModalWallet();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [isOwnFollow, setIsOwnFollow] = useState<boolean>(false);
  const { address: walletAddress } = useWallet();
  const {
    isFollowing,
    mutate: mutateStatus,
    isLoading: isCyberConnectLoading,
  } = useCyberConnectStatus(walletAddress, address, initialStatus);
  const { mutate: mutateIdentity, identity } = useCyberConnectIdentity();
  const [hoverRef, isHovered] = useHover<HTMLButtonElement>();

  const onClick = useCallback(
    async (event: MouseEvent<HTMLButtonElement, any>) => {
      event.preventDefault();
      event.stopPropagation();
      if (!walletAddress) {
        plausible("FollowButton", { props: { type: "OpenModalWallet" } });
        return openModalWallet();
      }

      setIsLoading(true);
      try {
        if (isFollowing) {
          try {
            await cyberconnectProvider.disconnect(address);
          } catch (err) {
            console.error(err);
            console.error("Light Unfollow Error");
            error(err?.message);
          }
          mutateStatus({ followStatus: { isFollowing: false } });
          mutateIdentity({
            identity: { followingCount: identity?.followingCount - 1 },
          });
          plausible("FollowButton", {
            props: { type: "Unfollow" },
          });
        } else {
          try {
            await cyberconnectProvider.connect(address);
          } catch (err) {
            console.error(err);
            console.error("Light Follow Error");
            error(err?.message);
          }
          mutateStatus({ followStatus: { isFollowing: true } });
          mutateIdentity({
            identity: { followingCount: identity?.followingCount + 1 },
          });
          plausible("FollowButton", {
            props: { type: "Follow" },
          });
        }
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        error(err?.message);
      }
    },
    [
      address,
      cyberconnectProvider,
      identity?.followingCount,
      isFollowing,
      mutateIdentity,
      mutateStatus,
      openModalWallet,
      plausible,
      walletAddress,
    ],
  );

  useEffect(() => {
    setIsLoading(isCyberConnectLoading);
  }, [isCyberConnectLoading]);

  useEffect(() => {
    if (address == walletAddress) {
      setIsOwnFollow(true);
    }
  }, [address, walletAddress]);

  if (isOwnFollow) {
    return null;
  }

  return (
    <button
      ref={hoverRef}
      className={clsx(
        "flex w-full shrink items-center justify-center rounded-md py-2 px-10 text-sm ring-offset-bg focus:ring-2 focus:ring-primary focus:ring-offset-2",
        full ? "md:max-w-[101px]" : "max-w-[101px]",
        !walletAddress
          ? "bg-contrast-higher text-contrast-lower hover:bg-contrast-medium"
          : isLoading
          ? "animate-pulse bg-contrast-lower text-contrast-medium"
          : isFollowing
          ? "hover:bg-error-dark/30 border bg-bg text-contrast-high hover:border-error hover:text-error-darker"
          : "bg-contrast-higher text-bg hover:bg-contrast-medium",
      )}
      onClick={event => {
        return onClick(event);
      }}
      {...rest}
    >
      {!walletAddress ? (
        "Follow"
      ) : isLoading ? (
        <>
          <LoadingDots />
          &nbsp;
        </>
      ) : isFollowing ? (
        isHovered ? (
          "Unfollow"
        ) : (
          "Following"
        )
      ) : (
        "Follow"
      )}
    </button>
  );
};
