import http.server
import socketserver
import urllib.request
import json
from IPython.display import IFrame, display, HTML

# Set the path of the folder you want to serve
folder_path = "."

# Set the port number you want to use
port_number = 3000

data = [{"id": "sup", "text": "hell"}, {"id": "lads", "text": "world"}, {"id": "sup2", "text": "hello"}, {"id": "lads2", "text": "world"}]


# Start the HTTP server
Handler = http.server.SimpleHTTPRequestHandler
httpd = socketserver.TCPServer(("", port_number), Handler)

# Get the local server URL
local_url = "http://localhost:{}".format(port_number)

with open("./build/index.html", "r") as f:
    html = f.read()

width = 500
height = 400

js_code = """
    <iframe srcdoc='<base href="http://localhost:3000/build/"><script> window.__onready = function(setData) {
            setData(""" + json.dumps(data) + """)
        }</script>""" + html + """
    ' style='width:{}px; height:{}px'></iframe>
""".format(width, height, data=data)

print(js_code)

display(HTML(js_code))

# Print the local server URL
print("Local server URL: ", local_url)

# Serve the contents of the folder
try:
    httpd.serve_forever()
except KeyboardInterrupt:
    pass

# Stop the server when done
httpd.server_close()