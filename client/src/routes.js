import {
    ADMIN_ROUTE,
    FEEDBACKS_ROUTE, LOGIN_ROUTE,
    MAIN_ROUTE,
    NEW_FEEDBACK_ROUTE,
    NEW_PLACE_ROUTE, PLACE_NOT_FOUND_ROUTE,
    PLACE_ROUTE, PLACE_TYPE_ROUTE,
    REGISTRATION_ROUTE
} from "./utils/consts";
import NewFeedbackPage from "./pages/NewFeedbackPage";
import newPlacePage from "./pages/NewPlacePage";
import Main from "./pages/Main";
import PlacePage from "./pages/PlacePage";
import PlaceTypePage from "./pages/PlaceTypePage";
import Auth from "./pages/Auth";
import FeedbacksPage from "./pages/FeedbacksPage";
import PageNotFound from "./pages/PageNotFound";
import adminPage from "./pages/AdminPage";

export const authRoutes = [
    {
        path: NEW_FEEDBACK_ROUTE + "/:id",
        Component: NewFeedbackPage
    },
    {
        path: NEW_PLACE_ROUTE,
        Component: newPlacePage
    },
    {
        path: ADMIN_ROUTE,
        Component: adminPage
    }
]

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: PLACE_ROUTE + "/:id",
        Component: PlacePage
    },
    {
        path: FEEDBACKS_ROUTE + "/:id",
        Component: FeedbacksPage
    },
    {
        path: PLACE_TYPE_ROUTE + "/:id",
        Component: PlaceTypePage
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: PLACE_NOT_FOUND_ROUTE,
        Component: PageNotFound
    }
]
