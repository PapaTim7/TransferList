import clsx from "clsx";

export function SelectionCounter({ count }: { count: number }) {
  console.log(count);
  return (
    <div
      className={clsx(
        "transition-all text-sm text-start border-0 border-b py-2 px-7 border-gray-200 border-solid",
        `text-gray-${count ? 600 : 300}`
      )}
    >
      {count} selected
    </div>
  );
}
