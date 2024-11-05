import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import { LoginPage } from "../pages/login/login"

const MainRoutes = createBrowserRouter ([
    {
        path: "/",
        element:
        <App>
            <LoginPage/>
        </App>
    }
])

export default MainRoutes