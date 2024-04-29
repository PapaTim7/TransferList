export type ItemType = {
  id: string;
  title: string;
};

export type TransferListComponentProps = {
  leftItems: ItemType[];
  rightItems: ItemType[];
  setLeftItems: (items: ItemType[]) => void;
  setRightItems: (items: ItemType[]) => void;
};