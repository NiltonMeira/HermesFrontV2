import { IconBox } from "./components/IconBox"

export const HomePage = () => {
    let images = ["./CRIN.svg"]
    let titles = ["Operações"]

    return(
        <>
            <h1>Menu operacional</h1>
            <div className="grid grid-cols-2 gap-4">
                {images.map((image, index)=> (
                    <IconBox key={index} image={image} title={titles[index]}/>
                ))}

            </div>

        </>
    )
}