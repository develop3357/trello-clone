import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";
import { useEffect, useState } from "react";

interface IForm {
  toDo: string;
}

const Form = styled.form`
  width: 100%;
  display: flex;
  input {
    flex-grow: 1;
    border: none;
    outline: none;
    border-radius: 5px;
    padding: 10px;
  }
`;

const AddButton = styled.div`
  background: inherit;
  border-radius: 5px;
  padding: 10px;

  &:hover {
    background-color: #d1d2d4;
    cursor: pointer;
  }
`;

interface INewCardProps {
  boardId: string;
}

function NewCard({ boardId }: INewCardProps) {
  const [active, setActive] = useState(false);
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit, setFocus } = useForm<IForm>();
  register("toDo", {
    onBlur: () => {
      setActive(false);
    },
  });
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]],
      };
    });
    setValue("toDo", "");
  };
  const onAddClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setActive(true);
  };
  useEffect(() => {
    if (active) setFocus("toDo");
  }, [active, setFocus]);
  return active ? (
    <Form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("toDo", { required: true })}
        type="text"
        placeholder={`Add task on ${boardId}`}
      />
    </Form>
  ) : (
    <AddButton onClick={onAddClick}>+ Add</AddButton>
  );
}

export default NewCard;
