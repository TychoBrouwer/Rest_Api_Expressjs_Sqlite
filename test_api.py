import requests

url = 'http://192.168.178.142:3000/set-client-salt'
data = {
  'email': 'trgrg@ngrg.vrs',
}

x = requests.post(url, json = data)

print(x.text)
