import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import useScrollIndex from "../hooks/useScrollIndex";
import SvgApi from "../SvgApi";
import * as Styled from "./styled";
import TokenWrapper from "./TokenWrapper";
import ScrollPaginator from "./ScrollPaginator";
import TokenDetails from "./TokenDetails";
import arrowLeft from "../assets/arrow-left.png";
import arrowRight from "../assets/arrow-right.png";
import IframePanel from "./IframePanel";

interface IProps {
    sentences: IToken[][];
}

function getTokenHTMLId(token_id: string | number) {
    return `token_${token_id}`;
}

export default function Visualizer(props: IProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollIndex = useScrollIndex(containerRef);
    const svgRef = useRef<SVGSVGElement | null>(null);
    const svgApi = useRef<SvgApi | null>(null);

    const [iframeSrc, setIframeSrc] = useState("");
    const [sentenceId, setSentenceId] = useState(0);
    const tokens = useMemo(
        () => props.sentences[sentenceId] || [],
        [props.sentences, sentenceId]
    );

    useEffect(() => {
        if (!svgRef.current) {
            return;
        }
        svgApi.current = new SvgApi(svgRef.current);
    }, []);

    useEffect(() => {
        function drawConnection() {
            if (!svgApi.current) {
                return;
            }
            const token = tokens[scrollIndex];
            if (!token) {
                svgApi.current.clear();
                return;
            }
            const currentTokenElement = document.getElementById(
                getTokenHTMLId(token.token_id)
            );
            const parentTokenElement = document.getElementById(
                getTokenHTMLId(token.parent_token_id)
            );

            if (!currentTokenElement || !parentTokenElement) {
                svgApi.current.clear();
                return;
            }
            svgApi.current.drawConnection(
                currentTokenElement,
                parentTokenElement,
                token.dep
            );
        }
        drawConnection();
        // set up a listener to redraw the connection when the window is resized
        window.addEventListener("resize", drawConnection);
        return () => {
            window.removeEventListener("resize", drawConnection);
        };
    }, [tokens, scrollIndex]);

    /**
     * We can change this markup as we wish, without messing up the pagination
     * @param hidden
     * @returns
     */
    function renderFixedHeader(hidden: boolean) {
        return (
            <Styled.FixedParagraph hidden={hidden}>
                {!hidden && (
                    <Styled.Svg strokeWidth={3} ref={svgRef}></Styled.Svg>
                )}
                <TokenWrapper key={tokens.map((t) => t.text[0]).join("")}>
                    {tokens.flatMap((token, index) => {
                        let state: "self" | "parent" | "none" = "none";
                        if (index === scrollIndex) {
                            state = "self";
                        } else if (
                            tokens[scrollIndex]?.parent_token_id ===
                            token.token_id
                        ) {
                            state = "parent";
                        }
                        // should follow with a space if the next token is not a punctuation
                        const shouldFollowWithSpace = !(
                            tokens[index + 1]?.pos === "PUNCT"
                        );
                        return [
                            <Styled.Token
                                key={token.token_id}
                                state={state}
                                id={
                                    hidden
                                        ? undefined
                                        : getTokenHTMLId(token.token_id)
                                }
                            >
                                {token.text}
                            </Styled.Token>,
                            shouldFollowWithSpace && (
                                <span key={`space_${token.token_id}`}> </span>
                            ),
                        ];
                    })}
                </TokenWrapper>
            </Styled.FixedParagraph>
        );
    }

    const goToNextPage = useCallback(() => {
        setSentenceId((id) => Math.min(props.sentences.length - 1, id + 1));
    }, [props.sentences]);
    const goToPreviousPage = useCallback(() => {
        setSentenceId((id) => Math.max(0, id - 1));
    }, []);

    const closeIframe = useCallback(() => {
        setIframeSrc("");
    }, []);

    return (
        <>
            <ScrollPaginator
                ref={containerRef}
                renderFixedHeader={renderFixedHeader}
            >
                {tokens.map((token) => {
                    // TODO: can we avoid a loop here?
                    const parent = tokens.find(
                        (p) => p.token_id === token.parent_token_id
                    );
                    return (
                        <Styled.PageContent key={token.token_id}>
                            <TokenDetails
                                token={token}
                                parent={parent || token}
                                setIframeSrc={setIframeSrc}
                            />
                        </Styled.PageContent>
                    );
                })}
            </ScrollPaginator>
            {Boolean(iframeSrc) && (
                <IframePanel src={iframeSrc} onClose={closeIframe} />
            )}
            <Styled.Footer>
                {sentenceId > 0 && (
                    <>
                        <Styled.NextPageButtonLeft
                            src={arrowLeft}
                            aria-label="Previous page"
                            size="small"
                            data-large="false"
                            onClick={goToPreviousPage}
                        />
                        <Styled.NextPageButtonLeft
                            src={arrowLeft}
                            aria-label="Previous page"
                            size="large"
                            data-large="true"
                            onClick={goToPreviousPage}
                        />
                    </>
                )}
                {sentenceId < props.sentences.length - 1 && (
                    <>
                        <Styled.NextPageButtonRight
                            src={arrowRight}
                            aria-label="Next page"
                            size="small"
                            data-large="false"
                            onClick={goToNextPage}
                        />
                        <Styled.NextPageButtonRight
                            src={arrowRight}
                            aria-label="Next page"
                            size="large"
                            data-large="true"
                            onClick={goToNextPage}
                        />
                    </>
                )}
            </Styled.Footer>
        </>
    );
}
