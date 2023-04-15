import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const useUser = () => {
  const { user, token, message } = useSelector(
    (state: RootState) => state?.user.user
  );
  return { user, token, message };
};
