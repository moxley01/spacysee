import React, { forwardRef } from "react";

import * as Styled from "./styled";

interface IProps {
    renderFixedHeader: (hidden: boolean) => React.ReactNode;
    children: React.ReactNode[];
}

export default forwardRef<HTMLDivElement, IProps>(function ScrollPaginator(
    props,
    ref
) {
    const [innerHeight, setInnerHeight] = React.useState(0);

    React.useEffect(() => {
        setInnerHeight(window.innerHeight);
    }, []);

    return (
        <Styled.ScrollPaginator ref={ref}>
            {props.renderFixedHeader(false)}
            <Styled.PageWrapper>
                {props.children?.map((child, index) => (
                    <Styled.Page key={index} style={{ height: innerHeight }}>
                        {props.renderFixedHeader(true)}
                        {child}
                    </Styled.Page>
                ))}
            </Styled.PageWrapper>
        </Styled.ScrollPaginator>
    );
});
