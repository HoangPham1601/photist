import { createContext, useState } from "react";

interface Props {
  addedPhotos: any[];
  setAddedPhotos: (value: any) => void;
}

export const PhotoContext = createContext<Props>({
  addedPhotos: [],
  setAddedPhotos: () => {
    //
  },
});

export default function PhotoContextProvider({ children }: { children: any }) {
  const [addedPhotos, setAddedPhotos] = useState([] as any[]);

  return (
    <PhotoContext.Provider
      value={{
        addedPhotos: addedPhotos,
        setAddedPhotos: (value) => {
          setAddedPhotos(value);
        },
      }}
    >
      {children}
    </PhotoContext.Provider>
  );
}
