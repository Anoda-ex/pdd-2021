import {TEST_ROUTE, LOGIN_ROUTE} from "./utils/consts";
import Login from "./components/Login/Login";
import Test from "./components/Test/Test";

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Login
    }
]

export const privateRoutes = [
    {
        path: TEST_ROUTE,
        Component: Test
    }
]
