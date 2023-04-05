const Icon = ({ src, alt }: { src: string; alt: string }) => {
    return (
        <div
            className="icon"
            style={{
                backgroundImage: `url(${src})`,
            }}
            // alt={alt}
            // height={size}
            // width={size}
        />
    );
};

export default Icon;
