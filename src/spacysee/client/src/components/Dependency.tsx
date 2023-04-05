import React from "react";

import * as Styled from "./styled";
import { depToLink } from "../helpers";
import { depMap } from "../constants";
import { useStateValue } from "../State";

interface IProps {
    token: IToken;
    parent: IToken;
    icon: () => JSX.Element;
    setIframeSrc: (src: string) => void;
}

export default function Dependency({
    token,
    parent,
    icon,
    setIframeSrc,
}: IProps) {
    const {
        state: { language: currentLanguage },
    } = useStateValue();

    if (!depMap[token.dep] && token.dep !== "ROOT") {
        console.log("Missing dep", token.dep);
    }
    return (
        <>
            {token.parent_token_id === token.token_id ? (
                <span>
                    <span>Is </span>
                    <strong>root</strong>
                    <span> of the sentence</span>
                </span>
            ) : (
                <>
                    {icon()}
                    <span>
                        <span>Dependent on </span>
                        <strong>{`"${parent.text}"`}</strong>
                        <span> as a </span>
                        <Styled.Link
                            href={depToLink(
                                token.dep || "",
                                currentLanguage as string
                            )}
                            target="token-details"
                            onClick={() =>
                                setIframeSrc(
                                    depToLink(
                                        token.dep || "",
                                        currentLanguage as string
                                    )
                                )
                            }
                        >
                            {depMap[token.dep]}
                        </Styled.Link>
                    </span>
                </>
            )}
        </>
    );
}
