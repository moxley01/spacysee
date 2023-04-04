import json
from IPython.display import IFrame, HTML, display


def render(data):
    # read the text content of build/index.html
    with open("./build/index.html", "r") as f:
        html = f.read()

    # Print the `window` object to the console using JavaScript
    js_code = """
    <script>
        window.__onready = function(setData) {
            setData(""" + json.dumps(data) + """)
        }
    </script>
    """ + html
    display(HTML(js_code))


