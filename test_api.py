import requests

# url = 'http://192.168.178.142:3000/get-client-salt'
# data = {
#   'email': 'trgrg@nfegrg.vrs',
# }
# $2b$10$YupWWGUWPKT4UePVbzA.qO

# url = 'http://192.168.178.142:3000/sign-up'
# data = {
#   'email': 'trgrg@nfegrg.vrs',
#   'password': 'gferwfregfg',
# }

url = 'http://192.168.178.142:3000/sign-in'
data = {
  'email': 'trgrg@nfegrg.vrs',
  'password': 'gferwfregfg',
}

x = requests.post(url, json = data)

print(x.text)
