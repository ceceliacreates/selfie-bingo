export interface BingoItem {
    id: number;
    text: string;
    completed: boolean;
  }

export interface bingoItemsProvider {
  bingoItems: BingoItem[];
  loadBingoItems: () => void;
  saveBingoItems: (bingoItemsString: string) => void;
  markComplete: (id: number) => void;
}