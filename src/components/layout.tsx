import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchValidUser } from "../redux/slices/userSlice/userSlice";
import { AppDispatch, RootState } from "../redux/store";
import { removeTokenStorage } from "../services/auth.helper";
import { Header } from "./header";
import MessageLabel from "./messageLabel";

export default function Layout({ children }: any) {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const getToken = async () => {
      const token = Cookies.get("accessToken");
      if (token) {
        const data = await dispatch(fetchValidUser());
        if (data?.payload === undefined) removeTokenStorage();
      } else {
        return;
      }
    };
    getToken();
  }, [dispatch]);
  const user = useSelector((state: RootState) => state.userSlice.user);
  return (
    <>
      <Header />
      {children}
      {user.message && <MessageLabel />}
    </>
  );
}
