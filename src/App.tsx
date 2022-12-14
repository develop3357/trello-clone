import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ToDoManager, toDoState } from "./atoms";
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
  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    setToDos((currentToDos) => {
      return ToDoManager.init(currentToDos)
        .moveCard(
          source.droppableId,
          source.index,
          destination.droppableId,
          destination.index
        )
        .done();
    });
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
