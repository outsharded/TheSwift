# The Swift
Bot built for the [Swift Den Discord server](https://discord.gg/DzpaehyZyv)
Now available for public use. If you do not want to modify the code, use [our bot](https://discord.com/api/oauth2/authorize?client_id=1045760873316229193&permissions=274878179328&scope=bot%20applications.commands)

## MongoDB
For warn commands, you need a local MongoDB database named 'warns'. [Use their guide for the most up-to-date guidance.](<https://www.mongodb.com/docs/manual/installation/> "Use their guide for the most up-to-date guidance.")


## Installation
node.js and npm are required.

```
git clone https://github.com/tecdude/TheSwift.git
cd TheSwift
npm install
nano config.json
```
### config.json structure:

`{
"token": "",
"clientId": "",
"guildId": "",
"OPENAI_API_KEY": ""
}`

#### Thanks to memer#0001 for the command loader/general code structure
