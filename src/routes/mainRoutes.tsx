import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import { LoginPage } from "../pages/login/login"
import { SignUpPage } from "../pages/signUp/signUp"
import { Home } from "../pages/home/home"
import Product from "../pages/product/ProductPage"
import Operation from "../pages/operation/operation"
import LotePage from "../pages/lotes/LotePage"

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
    },
    {
        path: "/home",
        element:
        <App>
            <Home/>
        </App>
    },
    {
        path: "/product",
        element:
        <App>
            <Product/>
        </App>
    },
    {
        path: "/operation",
        element:
        <App>
            <Operation/>
        </App>
    },
    {
        path: "/batch",
        element:
        <App>
            <LotePage/>
        </App>
    }
])

export default MainRoutes