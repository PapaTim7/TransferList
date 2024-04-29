import { MouseEvent } from "react";
import { ListItemProps } from "./ListItem.types";

export function ListItem({ text, isChecked, onClick }: ListItemProps) {
  const handleClick = (event: MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
    onClick();
  };
  return (
    <li
      onClick={handleClick}
      className="flex cursor-pointer hover:bg-slate-100 transition-all py-4 px-6"
    >
      <div className="inline-flex items-center relative mr-2">
        <input
          type="checkbox"
          className="
              before:content[''] peer relative h-5 w-5 appearance-none rounded-md border-solid border border-blue-600
              transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12
              before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity 
              checked:bg-sky-600 checked:before:bg-sky-600 hover:before:opacity-10 cursor-pointer"
          checked={isChecked}
          onChange={() => null}
        />
        <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </span>
      </div>
      <div className="truncate max-w-full">{text}</div>
    </li>
  );
}
