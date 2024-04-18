import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Logo from "../assets/png/Icons/logomain.svg";
import { UserContext } from "../lib/contexts/UserContext";

export const EditProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(UserContext);

  const [data, setData] = useState([
    {
      avatar: "",
    },
  ]);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [company, setCompany] = useState("");
  const [specialized, setSpecialized] = useState("");
  const [website, setWebsite] = useState("");

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/profile/" + id).then(({ data }) => {
      console.log(data);
      setName(data.name);
      setUsername(data.username);
      setEmail(data.email);
      setCompany(data.company);
      setSpecialized(data.specialized);
      setWebsite(data.website);
    });
  }, [id]);

  useEffect(() => {
    (async () => {
      await axios.get("/profile").then((res: any) => {
        setData(res.data);
        localStorage.setItem("avatar", JSON.stringify(res.data));
      });
    })();
  }, []);

  const inputHeader = (text: string) => (
    <h2 className="text-md text-white mt-4">{text}</h2>
  );

  const inputFormAndLabel = (label: string) => <>{inputHeader(label)}</>;

  const editAvatar = async (e: any) => {
    const files = e.target.files[0];
    const data = new FormData();

    data.append("photos", files);

    await axios.post("/upload", data).then((res) => {
      const { data: filename } = res;

      setAvatar(filename);
    });
  };

  const saveChanges = async (event: any) => {
    event.preventDefault();

    const userData = {
      name,
      username,
      email,
      company,
      specialized,
      website,
      avatar: `http://localhost:3001/uploads/${avatar[0]}`,
    };

    console.log(userData);

    await axios.put("/profile", { id, ...userData });
    navigate(-1);
  };

  return (
    <div className="bg-black h-screen w-screen px-32 py-16">
      <div className="w-full">
        <img src={Logo} onClick={() => navigate("/layout/discover")} />
        <div className="flex w-full justify-end">
          <form className="w-4/12" onSubmit={saveChanges}>
            {inputFormAndLabel("Name")}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-gray-300 w-full text-lg px-2 bg-transparent border border-gray-500 rounded-lg outline-none"
            />
            {inputFormAndLabel("Email")}
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-gray-300 w-full text-lg px-2 bg-transparent border border-gray-500 rounded-lg outline-none"
            />
            {inputFormAndLabel("Username")}
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="text-gray-300 w-full text-lg px-2 bg-transparent border border-gray-500 rounded-lg outline-none"
            />
            {inputFormAndLabel("Company")}
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="text-gray-300 w-full text-lg px-2 bg-transparent border border-gray-500 rounded-lg outline-none"
            />
            {inputFormAndLabel("Specialized")}
            <input
              type="text"
              value={specialized}
              onChange={(e) => setSpecialized(e.target.value)}
              className="text-gray-300 w-full text-lg px-2 bg-transparent border border-gray-500 rounded-lg outline-none"
            />
            {inputFormAndLabel("Website")}
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="text-gray-300 w-full text-lg px-2 bg-transparent border border-gray-500 rounded-lg outline-none"
            />

            <button className="bg-[#f5f5f5] px-3 py-1 w-full rounded-lg mt-4 tracking-wider hover:bg-[#ddd]">
              Save changes
            </button>
          </form>
          <div className="w-3/12 flex justify-center">
            <div className="overflow-hidden rounded-full w-40 h-40 flex flex-col">
              <img
                className="object-cover w-full h-full"
                src={
                  avatar === ""
                    ? data[0].avatar
                    : `http://localhost:3001/uploads/${avatar}`
                }
              />
              <label className="bg-[#aaa] text-black px-4 py-1 -translate-y-8 text-center cursor-pointer">
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={editAvatar}
                />
                Edit
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
