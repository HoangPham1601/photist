import axios from "axios";
import { createContext, useEffect, useState } from "react";

interface Props {
  user: any;
  setUser: (value: any) => void;
}

export const UserContext = createContext<Props>({
  user: {},
  setUser: () => {
    //
  },
});

export default function UserContextProvider({ children }: { children: any }) {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const [user, setUser] = useState(userData !== null ? userData : {});

  useEffect(() => {
    (async () => {
      await axios.get("/profile").then(({ data }) => {
        console.log("run");
        console.log(data);
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
      });
    })();
  }, []);

  console.log(user);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser: (value: any) => {
          setUser([value]);
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
