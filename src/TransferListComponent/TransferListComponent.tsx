import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { ListItem } from "../components/ListItem";
import {
  LeftArrowAllSvg,
  LeftArrowSvg,
  RightArrowAllSvg,
  RightArrowSvg,
} from "../assets";
import { Button } from "../components/Button";
import { SelectionCounter } from "../components/SelectionCounter";
import { usePagination } from "../components/Pagination/usePagination";
import { Pagination } from "../components/Pagination";
import {
  TransferListComponentProps,
  ItemType,
} from "./TransferListComponent.types";

export function TransferListComponent({
  leftItems,
  rightItems,
  setLeftItems,
  setRightItems,
}: TransferListComponentProps) {
  const [leftSelectedSet, setLeftSelectedSet] = useState(new Set<string>());
  const [rightSelectedSet, setRightSelectedSet] = useState(new Set<string>());

  const {
    rowsPerPage: rowsPerPageRight,
    setRowsPerPage: setRowsPerPageRight,
    currentPage: currentPageRight,
    setCurrentPage: setCurrentPageRight,
  } = usePagination();
  const {
    rowsPerPage: rowsPerPageLeft,
    setRowsPerPage: setRowsPerPageLeft,
    currentPage: currentPageLeft,
    setCurrentPage: setCurrentPageLeft,
  } = usePagination();

  const handleItemClick = useCallback(
    (
      targetItem: string,
      items: Set<string>,
      setStateCallback: Dispatch<SetStateAction<Set<string>>>
    ) => {
      const newItems = new Set(items);
      newItems.has(targetItem)
        ? newItems.delete(targetItem)
        : newItems.add(targetItem);
      setStateCallback(newItems);
    },
    []
  );

  const handleMoveRightSelected = () => {
    // right selected to the left
    const newRightItemsArray: ItemType[] = [];
    const additionLeftItemsArray: ItemType[] = [];
    rightItems.forEach((item) => {
      if (rightSelectedSet.has(item.id)) {
        additionLeftItemsArray.push(item);
      } else {
        newRightItemsArray.push(item);
      }
    });
    setRightItems(newRightItemsArray);
    setLeftItems([...leftItems, ...additionLeftItemsArray]);
    setRightSelectedSet(new Set());
    if (
      newRightItemsArray.length <=
      (currentPageRight - 1) * rowsPerPageRight
    ) {
      // no items on the right side -> page down
      setCurrentPageRight(
        Math.ceil(newRightItemsArray.length / rowsPerPageRight)
      );
    }
  };

  const handleMoveLeftSelected = () => {
    // left selected to the right
    const newLeftItemsArray: ItemType[] = [];
    const additionRightItemsArray: ItemType[] = [];
    leftItems.forEach((item) => {
      if (leftSelectedSet.has(item.id)) {
        additionRightItemsArray.push(item);
      } else {
        newLeftItemsArray.push(item);
      }
    });
    setLeftItems(newLeftItemsArray);
    setRightItems([...rightItems, ...additionRightItemsArray]);
    setLeftSelectedSet(new Set());
    if (newLeftItemsArray.length <= (currentPageLeft - 1) * rowsPerPageLeft) {
      // no items on the left side -> page down
      setCurrentPageLeft(Math.ceil(newLeftItemsArray.length / rowsPerPageLeft));
    }
  };

  const handleMoveRightAll = () => {
    // right all to the left
    setRightItems([]);
    setLeftItems([...leftItems, ...rightItems]);
    setRightSelectedSet(new Set());
    setCurrentPageRight(1);
  };
  const handleMoveLeftAll = () => {
    // left all to the right
    setLeftItems([]);
    setRightItems([...rightItems, ...leftItems]);
    setLeftSelectedSet(new Set());
    setCurrentPageLeft(1);
  };

  const leftRowsOffset = (currentPageLeft - 1) * rowsPerPageLeft;
  const rightRowsOffset = (currentPageRight - 1) * rowsPerPageRight;

  return (
    <div className="flex">
      <div className="flex flex-col justify-between min-w-[400px] max-w-[40vw] grow shadow-xl py-4 rounded">
        <div>
          <SelectionCounter count={leftSelectedSet.size} />
          {leftItems
            .slice(leftRowsOffset, leftRowsOffset + rowsPerPageLeft)
            .map((leftItem) => (
              <ListItem
                key={leftItem.id}
                text={leftItem.title}
                isChecked={leftSelectedSet.has(leftItem.id)}
                onClick={handleItemClick.bind(
                  "",
                  leftItem.id,
                  leftSelectedSet,
                  setLeftSelectedSet
                )}
              />
            ))}
        </div>
        <Pagination
          totalCount={leftItems.length}
          currentPage={currentPageLeft}
          setCurrentPage={setCurrentPageLeft}
          rowsPerPage={rowsPerPageLeft}
          setRowsPerPage={setRowsPerPageLeft}
        />
      </div>

      <div className="flex flex-col p-4 pt-6">
        <Button isDisabled={!rightItems.length} onClick={handleMoveRightAll}>
          <LeftArrowAllSvg />
        </Button>
        <Button
          isDisabled={!rightSelectedSet.size}
          className="mt-4"
          onClick={handleMoveRightSelected}
        >
          <LeftArrowSvg />
        </Button>
        <Button
          isDisabled={!leftSelectedSet.size}
          className="mt-4"
          onClick={handleMoveLeftSelected}
        >
          <RightArrowSvg />
        </Button>
        <Button
          isDisabled={!leftItems.length}
          className="mt-4"
          onClick={handleMoveLeftAll}
        >
          <RightArrowAllSvg />
        </Button>
      </div>

      <div className="flex flex-col justify-between min-w-[400px] max-w-[40vw] grow shadow-xl py-4 rounded">
        <div>
          <SelectionCounter count={rightSelectedSet.size} />
          {rightItems
            .slice(rightRowsOffset, rightRowsOffset + rowsPerPageRight)
            .map((rightItem) => (
              <ListItem
                key={rightItem.id}
                text={rightItem.title}
                isChecked={rightSelectedSet.has(rightItem.id)}
                onClick={handleItemClick.bind(
                  "",
                  rightItem.id,
                  rightSelectedSet,
                  setRightSelectedSet
                )}
              />
            ))}
        </div>
        <Pagination
          totalCount={rightItems.length}
          currentPage={currentPageRight}
          setCurrentPage={setCurrentPageRight}
          rowsPerPage={rowsPerPageRight}
          setRowsPerPage={setRowsPerPageRight}
        />
      </div>
    </div>
  );
}
