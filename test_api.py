import requests

# url = 'http://192.168.178.142:3000/new-client-salt'
# data = {
#   'email': 'adgrsgadaoffaf@nfrg.vrs',
# }

# url = 'http://192.168.178.142:3000/sign-up'
# data = {
#   'email': 'adgrsgadaoffaf@nfrg.vrs',
#   'password': 'gferwfregfg',
# }

# url = 'http://192.168.178.142:3000/get-client-salt'
# data = {
#   'email': 'adadaoffaf@nfrg.vrs',
# }

url = 'http://192.168.178.142:3000/sign-in'
data = {
  'email': 'adgrsgadaoffaf@nfrg.vrs',
  'password': 'gferwfregfg',
}

x = requests.post(url, json = data)

print(x.text)
