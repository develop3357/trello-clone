import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./components/Board";

const Wrapper = styled.div`
  height: 100vh;
  overflow-y: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Boards = styled.div`
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
`;

const AddNewBoard = styled.div`
  background-color: rgb(30, 30, 30, 0.7);
  color: white;
  border-radius: 5px;
  padding: 10px;
  min-width: 240px;
  &:hover {
    cursor: pointer;
    background-color: rgb(40, 40, 40, 0.5);
  }
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    console.log(info);
    const { destination, source } = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const [taskObj] = boardCopy.splice(source.index, 1);
        boardCopy.splice(destination.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
    if (destination?.droppableId !== source.droppableId) {
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const destinationBoard = [...allBoards[destination?.droppableId]];
        const [taskObj] = sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };
  const onAddNewBoardClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // TODO handle add new board click
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
          <AddNewBoard onClick={onAddNewBoardClick}>+ New Board</AddNewBoard>
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
