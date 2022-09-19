import requests

# url = 'http://192.168.178.142:3000/get-client-salt'
# data = {
#   'email': 'tychop@nfrg.vrs',
# }
# $2b$10$93rWSRGAhbOphFDwCAKCGe

url = 'http://192.168.178.142:3000/sign-up'
data = {
  'email': 'tychop@nfrg.vrs',
  'password': 'gferwfregfg',
}

# url = 'http://192.168.178.142:3000/sign-in'
# data = {
#   'email': 'tychop@nfrg.vrs',
#   'password': 'gferwfregfg',
# }

x = requests.post(url, json = data)

print(x.text)
