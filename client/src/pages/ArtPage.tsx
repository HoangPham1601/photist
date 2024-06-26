import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  Img1,
  Img10,
  Img11,
  Img12,
  Img13,
  Img14,
  Img15,
  Img16,
  Img17,
  Img18,
  Img19,
  Img2,
  Img20,
  Img21,
  Img22,
  Img23,
  Img24,
  Img25,
  Img26,
  Img27,
  Img28,
  Img29,
  Img3,
  Img30,
  Img31,
  Img32,
  Img33,
  Img34,
  Img35,
  Img36,
  Img37,
  Img38,
  Img39,
  Img4,
  Img40,
  Img41,
  Img42,
  Img43,
  Img5,
  Img6,
  Img7,
  Img8,
  Img9,
} from "../assets/png/ArtPage";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";

export const Art = () => {
  const data = [
    Img1,
    Img2,
    Img3,
    Img4,
    Img5,
    Img6,
    Img7,
    Img8,
    Img9,
    Img10,
    Img11,
    Img12,
    Img13,
    Img14,
    Img15,
    Img16,
    Img17,
    Img18,
    Img19,
    Img20,
    Img21,
    Img22,
    Img23,
    Img24,
    Img25,
    Img26,
    Img27,
    Img28,
    Img29,
    Img30,
    Img31,
    Img32,
    Img33,
    Img34,
    Img35,
    Img36,
    Img16,
    Img37,
    Img38,
    Img39,
    Img40,
    Img41,
    Img42,
    Img43,
  ];

  const [check, setCheck] = useState(false);

  
  useEffect(() => {
    document.title = "Art";
  });

  return (
    <div className="relative">
      <Header />
      <div className="bg-black columns-6 px-4 absolute top-16">
        {data.map((img, idx) => (
          <div
            key={idx}
            className="mb-2 hover:bg-white hover:opacity-90 group relative duration-500"
          >
            <img
              src={img}
            />
            <div
              onClick={() => setCheck(!check)}
              className="hidden group-hover:block absolute bottom-2 right-2 opacity-100 hover:opacity-80 duration-300 cursor-pointer"
            >
              {check
                ? (
                  <div className="bg-white text-black h-8 w-8 flex justify-center items-center">
                    <FontAwesomeIcon icon={faCheck} />
                  </div>
                )
                : (
                  <div className="bg-black text-white h-8 w-8 flex justify-center items-center">
                    <FontAwesomeIcon icon={faPlus} />
                  </div>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
