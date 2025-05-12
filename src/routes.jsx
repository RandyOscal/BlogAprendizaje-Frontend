import { PublicationDetails } from "./components/PublicationDetails.jsx";
import { Home } from "./pages/Home.jsx";

export const routes = [
    { path: '/', element: <Home /> },
    { path: '/publications/list/:id', element: <PublicationDetails /> },
];