import { useLocation, useNavigate } from "react-router-dom";

import Logo from "../assets/png/Icons/logomain.svg";

import {
  analyse,
  artwork,
  cart,
  commercial,
  discover,
  notify,
  search,
  userpng,
} from "../assets/png/Icons";
import { useContext } from "react";
import { UserContext } from "../lib/contexts/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../redux/slice/modal";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  interface CartItem {
    id: number;
    quantity: number;
    img: string;
    title: string;
  }
  type RootState = {
    itemCart: CartItem[];
  };

  const { user } = useContext(UserContext);

  const path = location.pathname.split("/")[2].toUpperCase();
  const cartItems = useSelector((state: RootState) => state.itemCart);
  const dispatch = useDispatch();

  const handleToggleModal = () => {
    dispatch(toggleModal());
  };
  return (
    <nav className="bg-black fixed top-0 right-0 left-0 p-4 z-50 cursor-default">
      <div className="text-white flex justify-between items-center">
        <div className="flex items-center group">
          <img className="w-8" src={Logo} />
          <h1 className="text-4xl ml-4 tracking-wider">{path}</h1>
          <ul className="hidden group-hover:flex items-center justify-around bg-black text-white absolute top-[56px] h-16 right-0 left-0">
            <li
              onClick={() => navigate("/layout/sport")}
              className="uppercase font-semibold tracking-wider cursor-pointer px-32 py-4"
            >
              sport
            </li>
            <li
              onClick={() => navigate("/layout/art")}
              className="uppercase font-semibold tracking-wider cursor-pointer px-32 py-4"
            >
              art
            </li>
            <li
              onClick={() => navigate("/layout/portrait")}
              className="uppercase font-semibold tracking-wider cursor-pointer px-32 py-4"
            >
              portrait
            </li>
            <li
              onClick={() => navigate("/layout/landscape")}
              className="uppercase font-semibold tracking-wider cursor-pointer px-32 py-4"
            >
              landscape
            </li>
          </ul>
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/getpro")}
            className="uppercase border border-gray-700 text-[0.625rem] px-2 py-0.5 rounded-lg mr-6 hover:bg-[#ccc] hover:border-non ease-in-out duration-300"
          >
            get pro
          </button>
          <ul className="flex justify-between items-center">
            <li className="cursor-pointer">
              <img
                src={analyse}
                className="mr-2 hover:opacity-80 duration-300"
              />
            </li>
            <li className="cursor-pointer">
              <img
                src={discover}
                className="w-10 mr-2 hover:opacity-80 duration-300"
              />
            </li>
            <li className="cursor-pointer">
              <img
                src={search}
                className="w-10 mr-2 hover:opacity-80 duration-300"
              />
            </li>
            <li className="cursor-pointer">
              <img
                src={artwork}
                className="w-10 mr-2 hover:opacity-80 duration-300"
              />
            </li>
            <li className="cursor-pointer">
              <img
                src={commercial}
                className="w-10 mr-2 hover:opacity-80 duration-300"
              />
            </li>
            <li className="cursor-pointer" onClick={handleToggleModal}>
              <div>
                <img
                  src={cart}
                  className="w-10 mr-2 hover:opacity-80 duration-300"
                />
                <div
                  style={{
                    background: "white",
                    height: 20,
                    marginLeft: 22,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 20,
                    borderRadius: 10,
                    position: "absolute",
                    color: "black",
                    top: 15,
                  }}
                >
                  <span style={{ color: "black" }}>{cartItems.length}</span>
                </div>
              </div>
            </li>

            <li className="cursor-pointer">
              <img
                src={notify}
                className="w-10 mr-2 hover:opacity-80 duration-300"
              />
            </li>
            <li
              className="cursor-pointer flex items-center"
              onClick={() => navigate("/profile")}
            >
              <img
                src={userpng}
                className="w-10 hover:opacity-80 duration-300"
              />
              {!!user && <div>{user[0].name}</div>}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
