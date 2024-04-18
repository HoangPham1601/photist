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
} from "../assets/png/DiscoverPage";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../redux/slice/cartItem";
import CartModal from "../components/CartModal";

export const Discover = () => {
  const data = [
    {
      img: Img1,
      title: "title 1",
    },
    {
      img: Img2,
      title: "title 2",
    },
    {
      img: Img3,
      title: "title 3",
    },
    {
      img: Img4,
      title: "title 4",
    },
    {
      img: Img5,
      title: "title 5",
    },
    {
      img: Img6,
      title: "title 6",
    },
    {
      img: Img7,
      title: "title 7",
    },
    {
      img: Img8,
      title: "title 8",
    },
    {
      img: Img9,
      title: "title 9",
    },
    {
      img: Img10,
      title: "title 10",
    },
    {
      img: Img11,
      title: "title 11",
    },
    {
      img: Img12,
      title: "title 12",
    },
    {
      img: Img13,
      title: "title 13",
    },
    {
      img: Img14,
      title: "title 14",
    },
    {
      img: Img15,
      title: "title 15",
    },
    {
      img: Img16,
      title: "title 16",
    },
    {
      img: Img17,
      title: "title 17",
    },
    {
      img: Img18,
      title: "title 18",
    },
    {
      img: Img19,
      title: "title 19",
    },
    {
      img: Img20,
      title: "title 20",
    },
    {
      img: Img21,
      title: "title 21",
    },
    {
      img: Img22,
      title: "title 22",
    },
    {
      img: Img23,
      title: "title 23",
    },
    {
      img: Img24,
      title: "title 24",
    },
    {
      img: Img25,
      title: "title 25",
    },
    {
      img: Img26,
      title: "title 26",
    },
    {
      img: Img27,
      title: "title 27",
    },
    {
      img: Img28,
      title: "title 28",
    },
    {
      img: Img29,
      title: "title 29",
    },
    {
      img: Img30,
      title: "title 30",
    },
    {
      img: Img31,
      title: "title 31",
    },
    {
      img: Img32,
      title: "title 32",
    },
    {
      img: Img33,
      title: "title 33",
    },
    {
      img: Img34,
      title: "title 34",
    },
    {
      img: Img35,
      title: "title 35",
    },
    {
      img: Img36,
      title: "title 36",
    },
    {
      img: Img37,
      title: "title 37",
    },
    {
      img: Img38,
      title: "title 38",
    },
    {
      img: Img39,
      title: "title 39",
    },
    {
      img: Img40,
      title: "title 40",
    },
    {
      img: Img41,
      title: "title 41",
    },
    {
      img: Img42,
      title: "title 42",
    },
    {
      img: Img43,
      title: "title 43",
    },
  ];
  const dispatch = useDispatch();
  const [check, setCheck] = useState(false);
  const [checks, setChecks] = useState(new Array(data.length).fill(false));
  const [countCheck, setCountCheck] = useState(0);
  type CartItem = {
    id: number;
    quantity: number;
    img: string;
    title: string;
  };

  const toggleCheck = (idx: number) => {
     {
      const selectedItem = data[idx];
      const cartItem: CartItem = {
        id: idx,
        quantity: 1,
        ...selectedItem,
      };

      dispatch(addItemToCart(cartItem));
      const newChecks = [...checks];
      newChecks[idx] = !newChecks[idx];
      setChecks(newChecks);
    }
  };
  //Set title
  useEffect(() => {
    document.title = "Discover";
  });

  const isModalOpen = useSelector((state: { isModal: { isOpen: boolean } }) => {
    return state.isModal.isOpen;
  });

  return (
    <div className="relative">
      {isModalOpen && <CartModal />}

      <div className="columns-6 absolute bg-black top-16">
        {data.map((img, idx) => (
          <div
            key={idx}
            className="mb-2 hover:bg-white hover:opacity-90 group relative"
          >
            <img src={img.img} />

            <div
              onClick={() => toggleCheck(idx)}
              className="hidden group-hover:block absolute bottom-2 right-2 opacity-100 hover:opacity-80 duration-300 cursor-pointer"
            >
              {checks[idx] ? (
                <div className="bg-white text-black h-8 w-8 flex justify-center items-center">
                  <FontAwesomeIcon icon={faCheck} />
                </div>
              ) : (
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
