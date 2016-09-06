## twemote
the easy way to get twitch emotes

Note: this uses lots of ES6.

Example to download the small `discordWumpking` emote and save it
```
const request = require('superagent');
const twemote = require('./twemote');
const fs = require('fs')

twemote('discordWumpking').then(url => {
  request.get(url).pipe(fs.createWriteStream('discordWumpking.png'));
}).catch(console.log)
```
