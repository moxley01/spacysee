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
