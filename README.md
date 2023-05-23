Update 23/5/2023: this project is now an official part of [spaCy universe](https://spacy.io/universe/project/spacysee) !

# SpacySee

A project that helps you visualize your spaCy docs in Jupyter notebooks

## Installation

```bash
pip install spacysee
```

## Usage

```python
import spacy
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

- The `srcdoc` attribute of an iframe (prevents the need for a server, and allows concatenation of arbitrary script tags for passing data to the application)
- The `HtmlInlineScriptPlugin` for bundling CRA output into a single HTML file
- The `<base/>` tag (for setting the base URL for relative links)
- Using `setuptools` to build and deploy a Python package (including package_data)

## Development

To contribute to this project, clone the repo and run the following commands:

```bash
cd src/spacysee/client && npm start
```

This will run the CRA development server on port 3000. Then you can use SpacySee in dev mode by passing the `dev` argument to the `render` function:

```python
import spacy
from spacysee import render

nlp = spacy.load("en_core_web_sm")
doc = nlp("This is a neat way to visualize your Spacy docs")

render(doc, dev=True)
```

To deploy your changes, first build the CRA app:

```bash
cd src/spacysee/client && npm run build
```

If you have PyPi permissions for the package, run the following command to build and deploy:

```bash
python setup.py sdist bdist_wheel && twine upload dist/*
```
