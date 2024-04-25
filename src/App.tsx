import { useCallback, useState } from "react";
import "./App.css";
import { mockListItems } from "./mock";
import { ItemType, TransferListComponent } from "./TransferListComponent";

function App() {
  const [leftItemsInit, setLeftItems] = useState(mockListItems.slice(0, 30));
  const [rightItemsInit, setRightItems] = useState(mockListItems.slice(30));

  const handleSetLeftItems = useCallback(
    (items: ItemType[]) => {
      setLeftItems(items);
    },
    [setLeftItems]
  );

  const handleSetRightItems = useCallback(
    (items: ItemType[]) => {
      setRightItems(items);
    },
    [setRightItems]
  );

  return (
    <TransferListComponent
      leftItems={leftItemsInit}
      rightItems={rightItemsInit}
      setLeftItems={handleSetLeftItems}
      setRightItems={handleSetRightItems}
    />
  );
}

export default App;
