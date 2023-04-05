import styled from "styled-components";
import close from "../assets/close.png";

export const ScrollPaginator = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    text-align: center;
    overflow-y: scroll;
    overscroll-behavior-y: none;
    overscroll-x: hidden;
    background: ${(props: { theme: { colors: { background: any } } }) =>
        props.theme.colors.background};
    color: ${(props: { theme: { colors: { text: any } } }) =>
        props.theme.colors.text};
`;

export const FixedParagraph = styled.section<{ hidden: boolean }>`
    width: 100%;
    padding: 100px 10px 20px;
    z-index: 10;
    // this is either static and hidden or sticky and visible
    position: ${(props: { hidden: any }) =>
        props.hidden ? "static" : "sticky"};
    visibility: ${(props: { hidden: any }) =>
        props.hidden ? "hidden" : "visible"};
    background: ${(props: { theme: { colors: { background: any } } }) =>
        props.theme.colors.background};
    color: ${(props: { theme: { colors: { text: any } } }) =>
        props.theme.colors.text};
    top: 0;
    display: block;
    font-size: 3em;
    text-align: center;
    box-sizing: border-box;
    // box-shadow: 2px 2px 20px -20px black;
    @media (max-width: 700px) {
        font-size: 1.1rem;
        padding-top: 50px;
        padding-bottom: 10px;
    }
`;

/**
 * This is responsible for ensuring that the token text has a max width
 */
export const TokenWrapper = styled.p<{ scale: number; _visibility: boolean }>`
    max-width: 800px;
    display: inline-block;
    line-height: 1em;
    font-size: ${(props: { scale: any }) => props.scale}em;
    opacity: ${(props: { _visibility: any }) => (props._visibility ? 1 : 0)};
`;

export const Svg = styled.svg`
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    pointer-events: none;
    stroke: ${(props: { theme: { colors: { secondary: any } } }) =>
        props.theme.colors.secondary};
    fill: ${(props: { theme: { colors: { secondary: any } } }) =>
        props.theme.colors.secondary};
    // target any nested foreignObject
    & > foreignObject {
        color: ${(props: { theme: { colors: { text: any } } }) =>
            props.theme.colors.text};
        display: flex;
        justify-content: center;
        align-items: center;
    }
    & > path {
        stroke-opacity: 0.5;
    }
    & > foreignObject > div {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        background: ${(props: { theme: { colors: { background: any } } }) =>
            props.theme.colors.background};
        border: 1px solid
            ${(props: { theme: { colors: { secondary: any } } }) =>
                props.theme.colors.secondary};
        border-radius: 0.5em;
        font-size: 0.2em;
        width: 100px;
        height: 30px;
    }
    & > foreignObject > div > div {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    @media (max-width: 700px) {
        & > foreignObject > div {
            font-size: 0.5em;
            width: 50px;
            height: 20px;
        }
    }
`;

/**
 * These combine to produce the upper paragraph of the page
 */
export const Token = styled.span<{
    state: "self" | "parent" | "none";
}>`
    display: inline-block;
    color: ${(props: {
        theme: { colors: { primary: any; secondary: any; text: any } };
        state: string | number;
    }) => {
        const colors = {
            self: props.theme.colors.primary,
            parent: props.theme.colors.secondary,
            none: props.theme.colors.text,
        };
        return (colors as any)[props.state];
    }};
    &:first-child {
        margin-left: 0;
    }
    &:last-child {
        margin-right: 0;
    }
`;

export const PageWrapper = styled.div`
    position: absolute; // don't let it define the height of the parent
    top: 0;
    width: 100%;
`;

export const Page = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

export const PageContent = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
`;

export const TokenDetails = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1em;
    row-gap: 1.2em;
    font-weight: 300;
    padding-top: 50px;
    border-top: 2px solid
        ${(props: { theme: { colors: { gray: any } } }) =>
            props.theme.colors.gray};
    & > h2 {
        text-transform: uppercase;
        font-weight: 300;
        display: inline-block;
        background: ${(props: { theme: { colors: { background: any } } }) =>
            props.theme.colors.background};
        padding: 0.2em 0.5em;
        border-radius: 0.2em;
        color: ${(props: { theme: { colors: { gray: any } } }) =>
            props.theme.colors.gray};
        font-weight: 500;
        font-size: 1.2em;
        position: absolute;
        top: 0;
        transform: translateY(-50%);
    }

    @media (max-width: 700px) {
        padding-top: 20px;
        font-size: 0.6rem;
    }
`;

export const Tag = styled.div<{ title: string }>`
    display: flex;
    column-gap: 0.5em;
    row-gap: 0.5em;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & strong {
    }
    & i {
        font-style: italic;
    }
    & .icon {
        height: 30px;
        width: 100%;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }
    @media (max-width: 700px) {
        & .icon {
            height: 15px;
        }
    }
`;

export const BlockLink = styled.a<{ color: string }>`
    padding: 0.2em 0.5em;
    margin: 0 0.5em;
    border-radius: 0.2em;
    background: ${(props: { color: any }) => props.color};
    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }
`;

export const MorphContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-top: 1px solid
        ${(props: { theme: { colors: { gray: any } } }) =>
            props.theme.colors.gray};
    position: relative;
    padding-top: 1em;
    :before {
        content: "Features";
        color: ${(props: { theme: { colors: { gray: any } } }) =>
            props.theme.colors.gray};
        text-transform: uppercase;
        font-size: 0.7em;
        position: absolute;
        display: inline-block;
        top: 0;
        left: 50%;
        padding: 0px 20px;
        transform: translate(-50%, -50%);
        background: ${(props: { theme: { colors: { background: any } } }) =>
            props.theme.colors.background};
    }
`;

export const MorphTag = styled.div`
    margin: 0.2em 0;
    & span {
        text-transform: uppercase;
    }
`;

export const Link = styled.a<{ href: string; target: string }>`
    font-style: italic;
    display: block;
    opacity: 0.6;
    &:hover {
        opacity: 1;
    }
`;

export const Header = styled.header`
    position: fixed;
    top: 0;
    height: 5em;
    padding: 0.2em 1em;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    display: flex;
    flex-direction: row-reverse;
    z-index: ${(props: { theme: { zIndex: { header: any } } }) =>
        props.theme.zIndex.header}};
    @media (max-width: 700px) {
        height: 3.4em;
        & *[data-large="true"] {
            display: none;
        }
    }
    @media (min-width: 700px) {
        & *[data-large="false"] {
            display: none;
        }
    }
`;

export const Footer = styled.footer`
    position: fixed;
    bottom: 0;
    height: 5em;
    padding: 0.2em 0.4em;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: ${(props: { theme: { zIndex: { header: any } } }) =>
        props.theme.zIndex.header}};
    @media (max-width: 700px) {
        height: 3.4em;
        & *[data-large="true"] {
            display: none;
        }
    }
    @media (min-width: 700px) {
        & *[data-large="false"] {
            display: none;
        }
    }
`;

export const CloseButton = styled.button`
    width: 30px;
    height: 30px;
    outline: none;
    border: none;
    background-image: url(${close});
    background-size: contain;
    background-repeat: no-repeat;
    background-color: transparent;
    background-position: center;
    cursor: pointer;
`;

export const NextPageButtonLeft = styled.button<{ src: string; size: string }>`
    position: fixed;
    left: 0px;
    top: 50%;
    transform-origin: center left;
    transform: translateY(-50%)
        scale(${(props: { size: string }) => (props.size === "large" ? 2 : 1)});
    color: ${(props: { theme: { colors: { primary: any } } }) =>
        props.theme.colors.primary}!important;
    background-image: url(${(props) => props.src});
    width: 30px;
    height: 30px;
    background-size: contain;
    background-repeat: no-repeat;
    background-color: transparent;
    border: none;
    cursor: pointer;
`;

export const NextPageButtonRight = styled.button<{ src: string; size: string }>`
    position: fixed;
    right: 0px;
    top: 50%;
    transform-origin: center right;
    transform: translateY(-50%)
        scale(${(props: { size: string }) => (props.size === "large" ? 2 : 1)});
    color: ${(props: { theme: { colors: { primary: any } } }) =>
        props.theme.colors.primary}!important;
    background-image: url(${(props) => props.src});
    width: 30px;
    height: 30px;
    background-size: contain;
    background-repeat: no-repeat;
    background-color: transparent;
    border: none;
    cursor: pointer;
`;

export const InfoPanel = styled.div`
    max-width: 500px;
    text-align: center;
    @media (max-width: 700px) {
        font-size: 0.5rem;
        width: 100%;
    }
    & div {
        margin: 2em 0;
    }
    & a {
        color: ${(props: { theme: { colors: { gray: any } } }) =>
            props.theme.colors.gray};
    }
`;

export const LanguagePanel = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const PrivacyPolicy = styled.div`
    padding: 1em;
    text-align: left;
    color: #b4b4b4;
    > div {
        max-width: 800px;
    }
    & h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        text-align: center;
        text-transform: uppercase;
        color: white;
    }
    & strong {
        color: white;
    }
    & h1 {
        margin: 0.67em 0;
        font-size: 2em;
    }
    & h2 {
        font-size: 1.5em;
        margin: 0.83em 0;
    }
    & h3 {
        font-size: 1.17em;
        margin: 1em 0;
    }
    & h4 {
        font-size: 1em;
    }
    & p {
        margin: 1em 0;
    }
`;

export const IframePanel = styled.div`
    position: fixed;
    display: flex;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10000;
    & iframe {
        height: 100%;
        flex-grow: 1;
        border: none;
        background: white;
        box-sizing: border-box;
    }
    & div {
        background: ${(props) => props.theme.colors.background};
        flex-basis: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
