import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Logo from "../assets/png/Icons/logomain.svg";
import { UserContext } from "../lib/contexts/UserContext";
import { PhotoContext } from "../lib/contexts/PhotoContext";
import { analyse, cart, notify, userpng } from "../assets/png/Icons";
import axios from "axios";

export const Profile = () => {
  const { user } = useContext(UserContext);
  
  const [data, setData] = useState([{
    username: "",
    name: "",
    avatar: "",
  }]);

  useEffect(() => {
    (async () => {
      await axios.get("/profile").then((res: any) => {
        setData(res.data);
      });
    })();
  }, []);

  console.log(data);

  const { addedPhotos, setAddedPhotos } = useContext(PhotoContext);

  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname.split("/")[1].toUpperCase();

  const removePhoto = async (filename: any) =>
    setAddedPhotos([
      ...addedPhotos.filter((photo: string) => photo !== filename),
    ]);

  return (
    <div className="h-screen max-w-screen overflow-x-hidden">
      <nav className="bg-black/80 p-4 z-50 cursor-default">
        <div className="text-white flex justify-between items-center">
          <div className="flex items-center group">
            <img className="w-8" src={Logo} />
            <h1 className="text-4xl ml-4 tracking-wider">{path}</h1>
          </div>
          <div className="flex items-center justify-between">
            <button className="uppercase border border-gray-700 text-[0.625rem] px-2 py-0.5 rounded-lg mr-6 hover:bg-[#ccc] hover:border-non ease-in-out duration-300">
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
                  src={cart}
                  className="w-10 mr-2 hover:opacity-80 duration-300"
                />
              </li>
              <li className="cursor-pointer">
                <img
                  src={notify}
                  className="w-10 mr-2 hover:opacity-80 duration-300"
                />
              </li>
              <li
                onClick={() => navigate("/profile")}
                className="cursor-pointer"
              >
                <img
                  src={userpng}
                  className="w-10 hover:opacity-80 duration-300"
                />
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="bg-black h-screen">
        <div className="-translate-y-5 flex flex-col items-center text-white h-80 w-screen">
          <div className="text-white text-center flex flex-col items-center">
            <div className="rounded-full w-24 h-24 overflow-hidden">
              <img src={data[0].avatar} />
            </div>
            <span className="mb-3 mt-2 text-2xl text-[#666] tracking-wider">
              {!!user && (
                <div className="text-5xl text-white mb-3">
                  {data[0].name}
                </div>
              )}
              @{data[0].username}
            </span>
          </div>
          <button
            onClick={() => navigate(`/profile/${user[0]._id}`)}
            className="bg-[#262626] text-[#ccc] px-4 py-1 rounded-2xl hover:bg-[#333]"
          >
            Edit profile
          </button>
          <label
            onClick={() => navigate("upload")}
            className="mt-3 bg-[#666] px-3 py-1 rounded-3xl text-[#ccc] hover:bg-[#404040] cursor-pointer"
          >
            Upload your photos
          </label>

          <div className="mt-8 text-xl text-[#ccc] w-5/12 flex justify-around">
            <label>{addedPhotos?.length} images</label>
            <label>0 boards</label>
            <label>0 following</label>
            <label>0 followers</label>
          </div>
          <div className="mt-16 border h-full w-full border-t-1 border-[#aaa] border-r-0 border-l-0 border-b-0">
            <div className="w-8/12 h-full px-4 py-2 mt-4 grid gap-4 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {addedPhotos?.length > 0
                ? (
                  addedPhotos.map((link: any) => (
                    <div className="h-32 flex relative" key={link}>
                      <img
                        className="w-full object-cover"
                        src={`http://localhost:3001/uploads/${link}`}
                      />
                      <button
                        onClick={() =>
                          removePhoto(link)}
                        className="absolute bottom-1 right-1 text-white bg-black bg-opacity-50 px-3 py-2 rounded-2xl cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  ))
                )
                : (
                  <div className="w-screen h-full flex items-center text-white text-6xl justify-center">
                    <span>
                      THERE IS NOTHING HERE YET
                    </span>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
