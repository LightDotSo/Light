import { NotionLinks } from "@lightdotso/const";
import type { PlausibleEvents } from "@lightdotso/types";
import { usePlausible } from "next-plausible";
import type { FC, MouseEventHandler } from "react";
import { useConnect } from "wagmi";

import { ModalCloseButton } from "@lightdotso/app/components/ModalCloseButton";
import { WalletBar } from "@lightdotso/app/components/WalletBar";
import { Coinbase } from "@lightdotso/app/components/WalletLogo/Coinbase";
import { Metamask } from "@lightdotso/app/components/WalletLogo/Metamask";
import { WalletConnect } from "@lightdotso/app/components/WalletLogo/WalletConnect";
import { useWallet } from "@lightdotso/app/hooks/useWallet";

export type WalletProps = {
  onClose?: MouseEventHandler<HTMLButtonElement>;
};

export const Wallet: FC<WalletProps> = ({ onClose }) => {
  const plausible = usePlausible<PlausibleEvents>();
  const { address } = useWallet();
  const { connect, connectors } = useConnect();

  return (
    <div className="flex w-full max-w-xl flex-col">
      <div className="flex items-center">
        <h2 className="grow text-2xl font-extrabold tracking-tight text-contrast-higher">
          Connect your wallet
        </h2>
        {onClose && <ModalCloseButton onClick={onClose} />}
      </div>
      <p className="mt-4 text-base text-contrast-medium">
        By using Light, you agree to our{" "}
        <a
          className="underline"
          target="_blank"
          rel="noreferrer"
          href={NotionLinks["Terms of Service"]}
        >
          Terms of Service
        </a>{" "}
        and{" "}
        <a
          className="underline"
          target="_blank"
          rel="noreferrer"
          href={NotionLinks["Privacy Policy"]}
        >
          Privacy Policy
        </a>
      </p>
      <div className="mt-8 grid grid-cols-1 gap-4">
        {connectors
          .filter((v, i, a) => {
            if (v.id === "metaMask") {
              return false;
            }
            return (
              a.findIndex(v2 => {
                return v2.id === v.id;
              }) === i
            );
          })
          .map(connector => {
            return (
              <WalletBar
                key={connector.id}
                name={connector.id === "injected" ? "Metamask" : connector.name}
                disabled={!!address}
                onClick={() => {
                  connect({ connector: connector });
                  plausible("ConnectWallet", { props: { id: connector.id } });
                }}
              >
                {connector.id === "injected" && (
                  <Metamask className="h-5 w-5 rounded-full" />
                )}
                {connector.id === "walletConnect" && (
                  <WalletConnect className="h-5 w-5 rounded-full" />
                )}
                {connector.id === "coinbaseWallet" && (
                  <Coinbase className="h-5 w-5 rounded-full" />
                )}
              </WalletBar>
            );
          })}
      </div>
    </div>
  );
};
