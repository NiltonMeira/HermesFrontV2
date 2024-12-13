import { AppBar } from "../../components/appbar";
import { BasicTable } from "./components/basicTable";

const Product = () => {
    return (
        <div className="flex flex-col h-screen">
            <AppBar/>
            <div className="flex flex-grow">
                <main className="flex-grow p-4">
                    <BasicTable/>
                </main>
            </div>
        </div>
    );
};

export default Product;