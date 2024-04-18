import React, { useEffect, useState } from "react";
import { SocialConnect } from "../components/SocialConect";
import { MyImg_1, MyImg_2, MyImg_3 } from "../assets/png/JoinPage";
import axios from "axios";
import { useForm } from "../lib/Hooks";
import { useNavigate } from "react-router-dom";

export const Join = () => {
  const images = [
    MyImg_1,
    MyImg_2,
    MyImg_3,
  ];

  const navigate = useNavigate();

  const [indexOfCurrentImg, setIndexOfCurrentImg] = useState(-1);

  useEffect(() => {
    setIndexOfCurrentImg(Math.floor(Math.random() * (images.length)));
  }, []);

  const initialValue = {
    name: "",
    email: "",
    username: "",
    password: "",
    photos: [],
    company: "",
    specialized: "",
    website: "",
  };

  const [formValues, setFormValues] = useForm(initialValue);

  const registerUser = async (event: any) => {
    event.preventDefault();

    try {
      await axios
        .post("/join", { ...formValues });
      alert("Registration successful. Now you can log in");
      navigate("/login");
    } catch (err) {
      alert("Registration failed. Please try again later");
    }
  };

  // Set title
  useEffect(() => {
    document.title = "Join with us";
  }, []);

  return (
    <div className="bg-black w-screen ">
      <div className="h-screen container mx-auto columns-12 flex flex-col items-center justify-between">
        <div className="w-screen container grid grid-cols-12">
          <img
            src={images[indexOfCurrentImg]}
            className="col-start-3 col-span-8 h-max w-full"
          />
        </div>
        <div className="w-screen px-4 h-1/2 flex flex-col justify-around">
          <h1 className="text-f5 text-4xl w-full text-center font-semibold font-sans tracking-wider uppercase leading-normal">
            the best community for photographers
          </h1>
          <div className="w-full font-sans">
            <form
              className=" grid grid-cols-12 gap-x-4"
              onSubmit={registerUser}
            >
              <input
                type="text"
                name="name"
                placeholder="NAME"
                className="col-span-3 text-f5 bg-transparent focus:placeholder-none focus:outline-none border border-t-0 border-l-0 border-r-0 pb-1"
                onChange={setFormValues}
              />
              <input
                type="email"
                name="email"
                placeholder="EMAIL"
                className="col-span-3 text-f5 bg-transparent focus:outline-none border border-t-0 border-l-0 border-r-0 pb-1"
                onChange={setFormValues}
              />
              <input
                type="text"
                name="username"
                placeholder="USER NAME"
                className="col-span-3 text-f5 bg-transparent focus:outline-none border border-t-0 border-l-0 border-r-0 pb-1"
                onChange={setFormValues}
              />
              <input
                type="password"
                name="password"
                placeholder="PASSWORD"
                className="col-span-3 text-f5 bg-transparent focus:outline-none border border-t-0 border-l-0 border-r-0 pb-1"
                onChange={setFormValues}
              />
              <div className="mt-8 mb-10 col-span-5">
                <p className="text-f5 font-sans uppercase text-sm font-semibold tracking-wide mb-2">
                  by creating account, you accept out terms
                </p>
                <button className="text-25 bg-f5 text-sm font-sans font-semibold uppercase py-1.5 px-6 rounded-2xl duration-300 hover:bg-gray-300">
                  join
                </button>
              </div>
            </form>

            <SocialConnect />
          </div>
        </div>
      </div>
    </div>
  );
};
