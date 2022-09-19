import requests

# url = 'http://192.168.178.142:3000/new-client-salt'
# data = {
#   'email': 'trgrg@nfegrg.vrs',
# }

# url = 'http://192.168.178.142:3000/temp-salt'
# data = {
#   'email': 'trgrg@nfegrg.vrs',
# }

url = 'http://192.168.178.142:3000/sign-up'
data = {
  'email': 'trgrg@nfegrg.vrs',
  'password': 'ughsgjvdjfvjdf',
}


x = requests.post(url, json = data)

print(x.text)
