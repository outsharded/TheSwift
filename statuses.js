const { clientId, discordsToken, dblToken, topToken } = require ('./config.json');
const axios = require ('axios');
 
client.shard.fetchClientValues('guilds.cache.size')
			.then(results => {
			const servers = results.reduce((acc, guildCount) => acc + guildCount, 0)
			console.log(servers)
	
			
			axios({
				method: 'post', //you can set what request you want to be
				url: `https://discords.com/bots/api/bot/${clientId}`,
				data: {server_count: servers},
				headers: {
				  Authorization: discordsToken
				}
			}).catch(e => console.log(e))

			
			axios({
				method: 'post', //you can set what request you want to be
				url: `https://discordbotlist.com/api/v1/bots/${clientId}/stats`,
				data: {guilds: servers},
				headers: {
				  Authorization: dblToken
				}
			}).catch(e => console.log(e))

			axios({
				method: 'post', //you can set what request you want to be
				url: `https://top.gg/api/bots/${clientId}/stats`,
				data: {server_count: servers},
				headers: {
				  Authorization: topToken
				}
			}).catch(e => console.log(e))

			return console.log(`Server count: ${results.reduce((acc, guildCount) => acc + guildCount, 0)}`);
			})
			.catch(console.error);
