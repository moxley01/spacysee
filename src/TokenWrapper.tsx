import React, { useRef, useEffect, useState } from "react";

import * as Styled from "./styled";

interface IProps {
  children: React.ReactNode | React.ReactNode[];
}

export default function TokenWrapper(props: IProps) {
  const ref = useRef<HTMLDivElement>(null);

  // I want to scale the text if this element is greater than 40% of the window height
  const [scale, setScale] = useState(1);
  const [ready, setReady] = useState(false);
  const scaleRef = useRef(scale);

  console.log("suppp", window.innerHeight);

  useEffect(() => {
    const tokenWrapper = ref.current;
    if (!tokenWrapper) return;

    const handleResize = () => {
      const windowHeight = window.innerHeight;
      const tokenWrapperHeight = tokenWrapper.clientHeight;
      const scale = tokenWrapperHeight / windowHeight;
      const currentScale = scaleRef.current;

      if (scale > 0.4) {
        // it is too big, scale it down
        const newScale = Math.max(0.5, (0.4 * currentScale) / scale);
        setScale(newScale);
        scaleRef.current = newScale;
      }
      if (scale < 0.2) {
        // it is too small, scale it up
        const newScale = Math.min(1.3, (0.2 * currentScale) / scale);
        setScale(newScale);
        scaleRef.current = newScale;
      }
      setReady(true);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Styled.TokenWrapper scale={scale} ref={ref} _visibility={ready}>
      {props.children}
    </Styled.TokenWrapper>
  );
}
