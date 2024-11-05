import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import { LoginPage } from "../pages/login/login"
import { SignUpPage } from "../pages/signUp/signUp"

const MainRoutes = createBrowserRouter ([
    {
        path: "/",
        element:
        <App>
            <LoginPage/>
        </App>
    },
    {
        path: "/signUp",
        element:
        <App>
            <SignUpPage/>
        </App>
    }
])

export default MainRoutes