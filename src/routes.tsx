import { createBrowserRouter } from "react-router-dom";
import GameExplorerpage from "./pages/GameExplorerPage";
import Layout from "./pages/Layout";
import GameDetailPage from "./pages/GameDetailPage";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <GameExplorerpage /> },
      { path: "games/:slug", element: <GameDetailPage /> },
    ],
  },
]);

export default router;
