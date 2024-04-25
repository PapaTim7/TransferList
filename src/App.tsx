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

type ItemType = {
  id: string;
  title: string;
};

function App() {
  const [leftItems, setLeftItems] = useState(mockListItems.slice(0, 25));
  const [rightItems, setRightItems] = useState(mockListItems.slice(25));
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

  return (
    <div className="flex">
      <div className="min-w-[400px] shadow-lg p-4 rounded">
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
      <div className="flex flex-col p-4">
        <button disabled className="flex p-1.5">
          <LeftArrowAllSvg />
        </button>
        <button
          disabled={!rightSelectedSet.size}
          className="flex mt-3 p-1.5"
          onClick={() => {
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
          }}
        >
          <LeftArrowSvg />
        </button>
        <button
          disabled={!leftSelectedSet.size}
          className="flex mt-3 p-1.5"
          onClick={() => {
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
          }}
        >
          <RightArrowSvg />
        </button>
        <button disabled className="flex mt-3 p-1.5">
          <RightArrowAllSvg />
        </button>
      </div>
      <div className="min-w-[400px] shadow-lg p-4 rounded">
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
