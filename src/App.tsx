import { useState } from "react";
import "./App.css";
import { ListItem } from "./components/ListItem";
import { mockListItems } from "./mock";
import {
  LeftArrowAllSvg,
  LeftArrowSvg,
  RightArrowAllSvg,
  RightArrowSvg,
} from "./assets";
import { Button } from "./components/Button";
import { SelectionCounter } from "./components/SelectionCounter";

type ItemType = {
  id: string;
  title: string;
};

function App() {
  const [leftItems, setLeftItems] = useState(mockListItems.slice(0, 30));
  const [rightItems, setRightItems] = useState(mockListItems.slice(30));
  const [leftSelectedSet, setLeftSelectedSet] = useState(new Set<string>());
  const [rightSelectedSet, setRightSelectedSet] = useState(new Set<string>());

  const handleItemClick = (
    targetItem: string,
    items: Set<string>,
    setStateCallback: React.Dispatch<React.SetStateAction<Set<string>>>
  ) => {
    const newItems = new Set(items);
    newItems.has(targetItem)
      ? newItems.delete(targetItem)
      : newItems.add(targetItem);
    setStateCallback(newItems);
  };

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
  };

  const handleMoveRightAll = () => {
    // right all to the left
    setRightItems([]);
    setLeftItems([...leftItems, ...rightItems]);
    setRightSelectedSet(new Set());
  };
  const handleMoveLeftAll = () => {
    // left all to the right
    setLeftItems([]);
    setRightItems([...rightItems, ...leftItems]);
    setLeftSelectedSet(new Set());
  };

  return (
    <div className="flex">
      <div className="min-w-[400px] max-w-[40vw] grow shadow-xl py-4 rounded">
        <SelectionCounter count={leftSelectedSet.size} />
        {leftItems.map((leftItem) => (
          <ListItem
            key={leftItem.id}
            text={leftItem.title}
            isChecked={leftSelectedSet.has(leftItem.id)}
            onClick={() => {
              handleItemClick(leftItem.id, leftSelectedSet, setLeftSelectedSet);
            }}
          />
        ))}
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

      <div className="min-w-[400px] max-w-[40vw] grow shadow-xl py-4 rounded">
        <SelectionCounter count={rightSelectedSet.size} />
        {rightItems.map((rightItem) => (
          <ListItem
            key={rightItem.id}
            text={rightItem.title}
            isChecked={rightSelectedSet.has(rightItem.id)}
            onClick={() => {
              handleItemClick(
                rightItem.id,
                rightSelectedSet,
                setRightSelectedSet
              );
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
