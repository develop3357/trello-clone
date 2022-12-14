import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  padding: 10px;
  background-color: ${(props) =>
    props.isDragging ? "skyblue" : props.theme.cardColor};
  margin-bottom: 5px;
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0,0,0,0.05)" : "none"};
  line-break: anywhere;
  &:hover {
    background-color: #f4f5f7;
  }
`;

interface IDraggableCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

function DraggableCard({ toDoId, toDoText, index }: IDraggableCardProps) {
  const onCardClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // TODO handle card click event
  };
  return (
    <Draggable key={toDoId} draggableId={"" + toDoId} index={index}>
      {(provided, snapshot) => {
        const style = {
          ...provided.draggableProps.style,
          transform:
            provided.draggableProps.style?.transform + " rotate(-5deg)",
        };
        return (
          <Card
            onClick={onCardClick}
            isDragging={snapshot.isDragging}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            style={
              snapshot.isDragging && !snapshot.isDropAnimating
                ? style
                : provided.draggableProps.style
            }
          >
            {toDoText}
          </Card>
        );
      }}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
