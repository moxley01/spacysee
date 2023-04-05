import React from "react";

import * as Styled from "./styled";
import { morphToLink, transformFeatureValue } from "../helpers";
import { abbreviationToMorphOptions } from "../constants";

interface IProps {
    token: IToken;
    setIframeSrc: (src: string) => void;
}

export default function MorphologyFeatures({ token, setIframeSrc }: IProps) {
    return (
        <Styled.MorphContainer>
            {token.morph.split("|").map((morph: any) => {
                // the morph attributes arrive like Prs_pron
                let [abbreviation, value] = morph.split("_");
                // make sure it is e.g. Pron and not pron
                value = transformFeatureValue(value);
                const options = abbreviationToMorphOptions[abbreviation];
                if (!options || !options[value] || !options.__description) {
                    return null;
                }
                return (
                    <Styled.MorphTag key={morph}>
                        <span>{`${options.__description}: `}</span>
                        <Styled.Link
                            href={morphToLink(abbreviation, value)}
                            target="token-details"
                            onClick={() =>
                                setIframeSrc(morphToLink(abbreviation, value))
                            }
                        >
                            {options[value]}
                        </Styled.Link>
                    </Styled.MorphTag>
                );
            })}
        </Styled.MorphContainer>
    );
}
