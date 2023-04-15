import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

export const useToDo = () => {
  const { openFormI, key, toDoId } = useSelector(
    (state: RootState) => state?.toDo
  );
  return { openFormI, key, toDoId };
};
