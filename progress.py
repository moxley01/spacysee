import json
import html
from IPython.display import IFrame, HTML, display
from spacy.tokens import Doc
import requests

url = "http://localhost:3000"

def render(doc: any, width=500, height=300, dev=False):
    data = {"sentences": get_sentences(doc), "language": doc.lang_}
    if (dev):
        display_dev(data, width, height)
    else:
        display_prod(data, width, height)


def display_prod(data: list, width: int, height: int):
    # read the text content of build/index.html
    with open("./client/build/index.html", "r") as f:
        markup = f.read()

    js_code = """
        <iframe width='{width}' height='{height}' sandbox='allow-scripts' srcdoc='
            <script>
                window.__onready = function(setData) {{
                    setData({data})
                }}
            </script>
            {markup}
        '</iframe>
        """.format(width=width, height=height, data=html.escape(json.dumps(data)), markup=html.escape(markup))
    display(HTML(js_code))

def display_dev(data: list, width: int, height: int):
    # fetch the html at localhost
    response = requests.get(url)
    if response.status_code == 200:
        js_code = """
            <iframe width='{width}' height='{height}' sandbox='allow-scripts' srcdoc='
                <base href="{url}/">
                <script>
                    window.__onready = function(setData) {{
                        setData({data})
                    }}
                </script>
                {text}
            '</iframe>
        """.format(url=url, text=html.escape(response.text), width=width, height=height, data=html.escape(json.dumps(data)))
        display(HTML(js_code))
    else:
        print(f"Error fetching {url}. Status code: {response.status_code}")


def get_sentences(doc: Doc):
    sentences = []
    for sentence_id, sentence in enumerate(doc.sents):
        tokens = []
        doc_id = 0
        for token in sentence:
            tokens.append({"text": token.text, "doc_id": doc_id, "sentence_id": sentence_id, "token_id": token.i, "parent_token_id": token.head.i, "pos": token.pos_, "tag": token.tag_, "dep": token.dep_, "morph": "|".join([m for m in token.morph]), "lemma": token.lemma_, "lang": "en"})
        sentences.append(tokens)
    return sentences