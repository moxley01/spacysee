# SpacySee

A project that helps you visualize your Spacy docs in Jupyter notebooks

## Installation

```bash
pip install spacysee
```

## Usage

```python
from spacysee import render

nlp = spacy.load("en_core_web_sm")
doc = nlp("This is a neat way to visualize your Spacy docs")

render(doc, width="500", height="500")
```

## Example

![Example](https://raw.githubusercontent.com/moxley01/spacysee/master/screenshot.png)

## Notes

Each of the dependency tags, POS tags and morphological features are clickable. Clicking on a tag will bring up the relevant documentation for that tag.

## What did I learn whilst building this?

- The `srcdoc` attribute of an iframe (prevents the need for a server, and allows concatenation of arbitrary script tags that can run in the context of the iframe)
- The `HtmlInlineScriptPlugin` for bundling CRA output into a single HTML file
- The `<base/>` tag (for setting the base URL for relative links)
- Using `setuptools` to build and deploy a Python package (including package_data)
