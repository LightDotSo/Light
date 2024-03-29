import { XMarkIcon } from "@heroicons/react/24/solid";

import type { MouseEventHandler, FC } from "react";

export type ModalCloseButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export const ModalCloseButton: FC<ModalCloseButtonProps> = ({ onClick }) => {
  return (
    <button
      aria-label="Close panel"
      className="transition duration-150 ease-in-out focus:outline-none"
      onClick={onClick}
    >
      <XMarkIcon className="h-6 w-6 text-contrast-high hover:text-contrast-medium" />
    </button>
  );
};
