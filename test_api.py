import requests

url = 'https://www.w3schools.com/python/demopage.php'
data = {
  'email': 'trgrg@ngrg.vrs',
  'password': 'ffgregaergeagergergfdbdyhtmnfff'
}

x = requests.post(url, json = data)

print(x.text)
