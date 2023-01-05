import { atom, AtomEffect } from "recoil";

const localStorageEffect =
  (key: string): AtomEffect<IToDoState> =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export interface IToDo {
  id: number;
  text: string;
}

interface IToDoState {
  [key: string]: IToDo[];
}

export class ToDoManager {
  private data: IToDoState;
  constructor(data: IToDoState) {
    this.data = this.copyToDoState(data);
  }
  private copyToDoState(data: IToDoState) {
    const newData: IToDoState = {};
    Object.keys(data).forEach(
      (boardId) => (newData[boardId] = [...data[boardId]])
    );
    return newData;
  }
  static init(data: IToDoState) {
    return new ToDoManager(data);
  }
  createCard(toDo: IToDo, boardId: string) {
    this.data[boardId] = [toDo, ...this.data[boardId]];
    return this;
  }
  removeCard(boardId: string, index: number) {
    this.data[boardId].splice(index, 1);
    return this;
  }
  modifyCard(toDo: IToDo, boardId: string, targetIndex: number) {
    this.data[boardId].splice(targetIndex, 1, toDo);
    return this;
  }
  moveCard(
    boardFrom: string,
    indexFrom: number,
    boardTo: string,
    indexTo: number
  ) {
    const [toDo] = this.data[boardFrom].splice(indexFrom, 1);
    this.data[boardTo].splice(indexTo, 0, toDo);
    return this;
  }
  createBoard(boardId: string) {
    this.data[boardId] = [];
    return this;
  }
  removeBoard(boardId: string) {
    delete this.data[boardId];
    return this;
  }
  changeBoardName(boardId: string, newName: string) {
    this.data[newName] = this.data[boardId];
    delete this.data[boardId];
    return this;
  }
  done() {
    return this.data;
  }
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "To Do": [
      { id: 1, text: "Please add your to-dos." },
      { id: 2, text: "You can move cards by dragging them." },
    ],
    Doing: [{ id: 3, text: "To delete the card, drop it out." }],
  },
  effects: [localStorageEffect("toDo")],
});
