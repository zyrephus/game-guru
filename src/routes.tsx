import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import GameDetailPage from "./pages/GameDetailPage";
import GameExplorerPage from "./pages/GameExplorerPage";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import AppContainer from "./components/AppContainer";

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppContainer />,
    children: [
      {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
            { index: true, element: <HomePage /> },
            { path: "explore", element: <GameExplorerPage /> },
            { path: "games/:slug", element: <GameDetailPage /> },
          ],
      }
    ]
  },
]);

export default router;
