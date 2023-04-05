import React from "react";

import lemmaIcon from "../assets/lemma.png";
import dependencyIcon from "../assets/dependency.png";
import categoryIcon from "../assets/category.png";

import * as Styled from "./styled";
import { posMap } from "../constants";
import { shouldShowLemma, shouldShowFeatures, posToLink } from "../helpers";
import { posColors } from "../theme";

import Icon from "./Icon";
import Dependency from "../components/Dependency";
import MorphologyFeatures from "./MorphologyFeatures";

interface IProps {
    parent: IToken;
    token: IToken;
    setIframeSrc: (src: string) => void;
}

export default function TokenDetails({ token, parent, setIframeSrc }: IProps) {
    return (
        <Styled.TokenDetails>
            <h2>{token.text}</h2>
            <Styled.Tag title="Part of speech">
                <Icon src={categoryIcon} alt="POS Tag" />
                <span>
                    <span>{posMap[token.pos]}</span>
                    <Styled.BlockLink
                        href={posToLink(token.pos)}
                        target="token-details"
                        color={posColors[token.pos]}
                        onClick={() => setIframeSrc(posToLink(token.pos))}
                    >
                        {token.pos}
                    </Styled.BlockLink>
                </span>
            </Styled.Tag>
            <Styled.Tag title="Dependency relations">
                <Dependency
                    token={token}
                    parent={parent}
                    icon={() => (
                        <Icon src={dependencyIcon} alt="Dependencies" />
                    )}
                    setIframeSrc={setIframeSrc}
                />
            </Styled.Tag>
            {shouldShowLemma(token) && (
                <Styled.Tag title="Lemma">
                    <Icon src={lemmaIcon} alt="Lemma" />
                    <span>{token.lemma}</span>
                </Styled.Tag>
            )}
            {shouldShowFeatures(token) && (
                <MorphologyFeatures token={token} setIframeSrc={setIframeSrc} />
            )}
        </Styled.TokenDetails>
    );
}
