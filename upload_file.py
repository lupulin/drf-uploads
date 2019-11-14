import requests


files = {'file': open('sample.pdf', 'rb')}
values = {'description': 'This is my pdf file uploaded via Python'}

url = 'http://127.0.0.1:8000/file/upload/'
response = requests.post(url, files=files, data=values)

print(response)
