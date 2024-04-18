import { Outlet, useParams } from "react-router-dom";
import { Header } from "./components/Header";
import { Art, Discover, Landscape, Portrait, Sport } from "./pages";

export default function MainLayout() {
  const { subpage } = useParams();
  console.log(subpage);
  return (
    <div className="flex flex-col min-h-screen max-w-4xl mx-auto">
      <Header />
      {subpage === "discover" && <Discover />}
      {subpage === "sport" && <Sport />}
      {subpage === "portrait" && <Portrait />}
      {subpage === "art" && <Art />}
      {subpage === "landscape" && <Landscape />}
    </div>
  );
}
