import requests

# url = 'http://192.168.178.142:3000/new-client-salt'
# data = {
#   'email': 'trgrg@nfegrg.vrs',
# }

url = 'http://192.168.178.142:3000/sign-in'
data = {
  'email': 'trgrg@nfegrg.vrs',
  'password': 'ffesfsef',
}

x = requests.post(url, json = data)

print(x.text)
