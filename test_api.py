import requests

url = 'http://192.168.178.142:3000/get-client-salt'
data = {
  'email': 'trgrg@ngferg.vrs',
}

x = requests.post(url, json = data)

print(x.text)
