import clsx from "clsx";
import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode | string;
  isDisabled?: boolean;
  onClick: () => void;
  className?: string;
};

export function Button({
  children,
  isDisabled,
  onClick,
  className,
}: ButtonProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      // disabled={isDisabled}
      className={clsx(
        "flex cursor-pointer py-2.5 px-5 shadow-sm text-sm font-medium transition-all bg-white rounded-lg border-solid border border-gray-400 hover:bg-gray-100 hover:opacity-80",
        { ["cursor-auto opacity-40 hover:opacity-40"]: isDisabled },
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
