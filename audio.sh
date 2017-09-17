#This script assumes you have already installed Nexmo CLI
#1. Set the recording_url that you recieved at eventURL
#2. Set a Generic file name for the file holding the private key for this Application.
private_key_file="./secret/private.key"
application_id="a110458a-103b-47d4-b628-e4a59d7b9252"
#3. Check that you have the id and private_key for the Voice API application
#   associated with the recording
APP_JWT="$(s jwt:generate $private_key_file iat=`date +%s` application_id=$application_id)"
JWT=${APP_JWT#*"T:"}
#4. Download the recording.
curl $recording_url \
-H "Authorization: Bearer $JWT" \
-H "Content-Type: application/json"
