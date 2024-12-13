import { AppBar } from "../../components/appbar";
import { Teste } from "./components/Teste";

export const Home = () => {
    return(
            <div className="flex flex-col h-screen">
                <AppBar/>
                <div className="flex flex-grow">
                    <main className="flex-grow p-4 pt-10">
                        <Teste/>
                    </main>
                </div>
            </div>
        );
}