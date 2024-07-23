import { createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Layout from "./pages/Layout";
import GameDetailPage from "./pages/GameDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "games/:id", element: <GameDetailPage /> },
    ],
  },
]);

export default router;
