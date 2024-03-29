import { utils } from "ethers";
import { useRouter } from "next/router";
import { useMemo } from "react";

import { useEnsAddress } from "@lightdotso/app/hooks/useEnsAddress";
import { useWallet } from "@lightdotso/app/hooks/useWallet";

export const useProfileAddress = (address?: string) => {
  const { address: walletAddress, isConnecting: isWalletLoading } = useWallet();
  const { asPath } = useRouter();

  const slug = useMemo(() => {
    return asPath.split("/").pop();
  }, [asPath]);

  const { address: routerAddress, isLoading: isEnsResolverLoading } =
    useEnsAddress(slug);

  const profileAddress: string = useMemo(() => {
    return address === walletAddress
      ? walletAddress
      : utils.isAddress(slug)
      ? slug
      : routerAddress;
  }, [address, walletAddress, slug, routerAddress]);

  return {
    isLoading: !profileAddress ?? isWalletLoading ?? isEnsResolverLoading,
    profileAddress: address ?? profileAddress,
  };
};
