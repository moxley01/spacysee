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
