export const IconBox = ({ image, title }: { image: string; title: string }) => {
    return (
        <div className="flex flex-col">
            <h4>{title}</h4>
            <img src={image} alt="" />
        </div>
    );
};
