// a hook that accepts a ref and returns the index of the element that is currently in view

import { useEffect, useState } from "react";

const useScrollIndex = (ref: React.RefObject<HTMLElement>) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleScroll = () => {
            const { scrollTop, clientHeight } = element;
            const scrollIndex = Math.floor(
                (scrollTop + clientHeight / 2) / clientHeight
            );
            setIndex(scrollIndex);
        };

        element.addEventListener("scroll", handleScroll);
        return () => element.removeEventListener("scroll", handleScroll);
    }, [ref]);

    return index;
};

export default useScrollIndex;
