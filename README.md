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

![Example](https://raw.githubusercontent.com/moxley01/spacy-visualizer/master/screenshot.png)

## Notes

Each of the dependency tags, POS tags and morphological features are clickable. Clicking on a tag will bring up the relevant documentation for that tag.
