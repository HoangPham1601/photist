import { ChakraProvider } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import PhotoContextProvider from "../lib/contexts/PhotoContext";
import UserContextProvider from "../lib/contexts/UserContext";
import MainLayout from "../MainLayout";

import { EditProfile, GetPro, Home, Join, Login, UploadPage } from "../pages/";
import { Profile } from "../pages/ProfilePage";

export default function() {
  const Layout = () => {
    return <Home />;
  };

  const BrowserRoutes = () => {
    return (
      <ChakraProvider>
        <UserContextProvider>
          <PhotoContextProvider>
            <Routes>
              <Route index element={<Layout />} />
              <Route path="/join" element={<Join />} />
              <Route path="/login" element={<Login />} />
              <Route path="/layout/:subpage" element={<MainLayout />} />
              <Route path="/getpro" element={<GetPro />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/upload" element={<UploadPage />} />
              <Route path="/profile/:id" element={<EditProfile />} />
            </Routes>
          </PhotoContextProvider>
        </UserContextProvider>
      </ChakraProvider>
    );
  };

  return (
    BrowserRoutes()
  );
}
