import React from "react";
import * as Styled from "./styled";

interface IProps {
    src: string;
    onClose: () => void;
}

export default function IframePanel(props: IProps) {
    return (
        <Styled.IframePanel>
            <iframe title="token-details" src={props.src} />
            <div>
                <Styled.CloseButton onClick={props.onClose} />
            </div>
        </Styled.IframePanel>
    );
}
