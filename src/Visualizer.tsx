import React, { useCallback, useEffect, useRef, useTransition } from "react";
import useScrollIndex from "./useScrollIndex";
import SvgApi from "./SvgApi";
import * as Styled from "./styled";
import TokenWrapper from "./TokenWrapper";
import ScrollPaginator from "./ScrollPaginator";
import TokenDetails from "./TokenDetails";

interface IProps {
  tokens: IToken[];
}

interface IToken {
  id: string;
  doc_id: number;
  sentence_id: number;
  token_id: number;
  parent_token_id: number;
  pos: string;
  tag: string;
  dep: string;
  morph: string;
  lemma: string;
  lang: string;
  text: string;
}

function getTokenHTMLId(token_id: string | number) {
  return `token_${token_id}`;
}

export default function Home(props: IProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollIndex = useScrollIndex(containerRef);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const svgApi = useRef<SvgApi | null>(null);
  //   const infoPanelRef = useRef<OverlayPanel | null>(null);
  //   const langagePanelRef = useRef<OverlayPanel | null>(null);
  //   const router = useRouter();
  const [isPending, _] = useTransition();

  console.log("transition pending", isPending);

  useEffect(() => {
    if (!svgRef.current) {
      return;
    }
    svgApi.current = new SvgApi(svgRef.current);
  }, []);

  //   useEffect(() => {
  //     if (containerRef.current) {
  //       containerRef.current.scrollTop = 0;
  //     }
  //   }, [router.query.sentence_id]);

  useEffect(() => {
    function drawConnection() {
      if (!svgApi.current) {
        return;
      }
      const token = props.tokens[scrollIndex];
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
  }, [props.tokens, scrollIndex]);

  /**
   * We can change this markup as we wish, without messing up the pagination
   * @param hidden
   * @returns
   */
  function renderFixedHeader(hidden: boolean) {
    return (
      <Styled.FixedParagraph hidden={hidden}>
        {!hidden && <Styled.Svg strokeWidth={3} ref={svgRef}></Styled.Svg>}
        <TokenWrapper key={props.tokens.map((t) => t.text[0]).join("")}>
          {props.tokens.flatMap((token, index) => {
            let state: "self" | "parent" | "none" = "none";
            if (index === scrollIndex) {
              state = "self";
            } else if (
              props.tokens[scrollIndex]?.parent_token_id === token.token_id
            ) {
              state = "parent";
            }
            // should follow with a space if the next token is not a punctuation
            const shouldFollowWithSpace = !(
              props.tokens[index + 1]?.pos === "PUNCT"
            );
            return [
              <Styled.Token
                key={token.id}
                state={state}
                id={hidden ? undefined : getTokenHTMLId(token.token_id)}
              >
                {token.text}
              </Styled.Token>,
              shouldFollowWithSpace && <span key={`space_${token.id}`}> </span>,
            ];
          })}
        </TokenWrapper>
      </Styled.FixedParagraph>
    );
  }

  //   const step = useCallback(
  //     (direction: "backward" | "forward") => {
  //       const { language, doc_id, sentence_id } = router.query;
  //       const nextSentenceId =
  //         parseInt(sentence_id as string) + (direction === "backward" ? -1 : 1);
  //       if (direction === "forward" && nextSentenceId > props.maxSentenceId) {
  //         return;
  //       }
  //       if (direction === "backward" && nextSentenceId < 0) {
  //         return;
  //       }
  //       router.push({
  //         pathname: "/nlp/[language]/[doc_id]/[sentence_id]",
  //         query: {
  //           language,
  //           doc_id,
  //           sentence_id: nextSentenceId,
  //         },
  //       });
  //     },
  //     [props.maxSentenceId, router]
  //   );

  //   const goToPreviousPage = useCallback(() => {
  //     step("backward");
  //   }, [step]);

  //   const goToNextPage = useCallback(() => {
  //     step("forward");
  //   }, [step]);

  return (
    <>
      {/* <Head>
        <title>Syntax Quix</title>
        <meta
          name="description"
          content="A quiz to help you learn universal dependencies"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <Styled.Header>
        {/* <Styled.ToolbarButton
          icon="pi pi-info"
          rounded
          aria-label="Get info"
          size="large"
          data-large="true"
          onClick={(e) => infoPanelRef.current?.toggle(e)}
        />
        <Styled.ToolbarButton
          icon="pi pi-info"
          rounded
          aria-label="Get info"
          size="small"
          data-large="false"
          onClick={(e) => infoPanelRef.current?.toggle(e)}
        />
        <Styled.OverlayPanel ref={infoPanelRef}>
          <InfoPanel />
        </Styled.OverlayPanel> */}
      </Styled.Header>
      <ScrollPaginator ref={containerRef} renderFixedHeader={renderFixedHeader}>
        {props.tokens.map((token) => {
          // TODO: can we avoid a loop here?
          const parent = props.tokens.find(
            (p) => p.token_id === token.parent_token_id
          );
          return (
            <Styled.PageContent key={token.id}>
              <TokenDetails token={token} parent={parent || token} />
            </Styled.PageContent>
          );
        })}
      </ScrollPaginator>
      <Styled.Footer>
        {/* <Styled.ToolbarButton
          icon="pi pi-language"
          rounded
          text
          outlined
          aria-label="Change language"
          size="large"
          data-large="true"
          onClick={(e) => langagePanelRef.current?.toggle(e)}
        />
        <Styled.ToolbarButton
          icon="pi pi-language"
          rounded
          text
          outlined
          aria-label="Change language"
          size="small"
          data-large="false"
          onClick={(e) => langagePanelRef.current?.toggle(e)}
        />
        <Styled.OverlayPanel ref={langagePanelRef}>
          <LanguagePanel />
        </Styled.OverlayPanel>
        <Styled.NextPageButtonLeft
          icon="pi pi-arrow-left"
          rounded
          text
          outlined
          aria-label="Previous page"
          size="small"
          data-large="false"
          onClick={goToPreviousPage}
        />
        <Styled.NextPageButtonLeft
          icon="pi pi-arrow-left"
          rounded
          text
          outlined
          aria-label="Previous page"
          size="large"
          data-large="true"
          onClick={goToPreviousPage}
        />
        <Styled.NextPageButtonRight
          icon="pi pi-arrow-right"
          rounded
          text
          outlined
          aria-label="Next page"
          size="small"
          data-large="false"
          onClick={goToNextPage}
        />
        <Styled.NextPageButtonRight
          icon="pi pi-arrow-right"
          rounded
          text
          outlined
          aria-label="Next page"
          size="large"
          data-large="true"
          onClick={goToNextPage}
        /> */}
      </Styled.Footer>
    </>
  );
}
