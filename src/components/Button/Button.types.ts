import { ReactNode } from "react";

export type ButtonProps = {
  children: ReactNode | string;
  onClick: () => void;
  isDisabled?: boolean;
  className?: string;
};
