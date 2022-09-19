import requests

url = 'http://192.168.178.142:3000/sign-in'
data = {
  'email': 'trgrg@ngrg.vrs',
  'password': 'ffgregaergeagergergfdbdyhtmnfff'
}

x = requests.post(url, json = data)

print(x.text)
