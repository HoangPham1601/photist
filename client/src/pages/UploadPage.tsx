import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PhotoContext } from "../lib/contexts/PhotoContext";
import { UserContext } from "../lib/contexts/UserContext";

export const UploadPage = () => {
  const navigate = useNavigate();
  const { addedPhotos, setAddedPhotos } = useContext(PhotoContext);
  const [photoLink, setPhotoLink] = useState("");
  const [show, setShow] = useState(false);
  const { user } = useContext(UserContext);
  const id = user._id;

  const uploadFromDevice = async (e: any) => {
    const files = e.target.files;
    const data = new FormData();

    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }

    await axios.post("/upload", data).then((res) => {
      const { data: filename } = res;

      setAddedPhotos((prev: string[]) => {
        return [...prev, ...filename];
      });

      navigate(-1);
    });
  };

  const uploadByLink = async (e: any) => {
    e.preventDefault();

    await axios.post("/uploadByLink", {
      link: photoLink,
    }).then((res) => {
      const { data: filename } = res;

      setAddedPhotos((prev: any) => {
        return [...prev, filename];
      });

      setPhotoLink("");

      navigate(-1);
    });
  };

  return (
    <>
      {!show && (
        <div className="h-screen bg-black text-white flex flex-col justify-around items-center">
          <span className="text-8xl tracking-wider h-1/2 flex items-end">
            JUST DROP YOUR IMAGE HERE.
          </span>
          <div className="h-1/2 flex items-center">
            <div className="text-xl">
              <label className="bg-[#262626] px-3 py-1 rounded-3xl text-[#ccc] hover:bg-[#404040] cursor-pointer">
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={uploadFromDevice}
                />
                Select from your device
              </label>
              <span className="mx-4">or</span>
              <label className="bg-[#262626] px-3 py-1 rounded-3xl text-[#ccc] hover:bg-[#404040] cursor-pointer">
                <button onClick={() => setShow(!show)}>
                  Import by link
                </button>
              </label>
            </div>
          </div>
        </div>
      )}
      {show && (
        <form
          className="w-screen h-screen flex flex-col justify-center items-center bg-black"
          onSubmit={uploadByLink}
        >
          <input
            className="px-4 py-2 w-2/6 h-12 mb-4 bg-transparent text-white outline-none border border-b-1 border-t-0 border-r-0 border-l-0"
            type="text"
            onChange={(e) => setPhotoLink(e.target.value)}
            placeholder="Paste your link here ..."
            multiple
          />
        </form>
      )}
    </>
  );
};
