import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { IToDo } from "../atoms";
import NewCard from "./NewCard";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  padding: 10px;
  width: 240px;
  min-height: 200px;
  max-height: 75vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 16px;
  h2 {
    font-weight: 600;
    flex-grow: 1;
  }
  &:hover {
    cursor: pointer;
  }
`;

const Area = styled.div`
  flex-grow: 1;
`;

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  const onBoardIdClick = (event: React.MouseEvent<HTMLHeadElement>) => {
    // TODO: handle click event
  };
  const onBoardDeleteClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    // TODO: handle click event
  };
  return (
    <Wrapper>
      <Title>
        <h2 onClick={onBoardIdClick}>{boardId}</h2>
        <span onClick={onBoardDeleteClick}>🗑️</span>
      </Title>
      <Droppable droppableId={boardId}>
        {(provided) => (
          <Area ref={provided.innerRef} {...provided.droppableProps}>
            {toDos.map((toDo, index) => (
              <DraggableCard
                key={toDo.id}
                toDoId={toDo.id}
                toDoText={toDo.text}
                index={index}
                boardId={boardId}
              />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
      <NewCard boardId={boardId} />
    </Wrapper>
  );
}

export default Board;
