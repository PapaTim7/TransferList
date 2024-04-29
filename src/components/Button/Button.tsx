import clsx from "clsx";
import { ButtonProps } from "./Button.types";

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
      className={clsx(
        "flex py-2.5 px-5 shadow-sm text-sm font-medium transition-all rounded-lg border border-solid border-gray-400 hover:bg-gray-100 ",
        isDisabled
          ? "cursor-auto opacity-40"
          : "cursor-pointer hover:opacity-80",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
