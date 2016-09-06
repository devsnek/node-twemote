const request = require('superagent');

const getImageCache = new Promise((resolve, reject) => {
  request.get('https://twitchemotes.com/api_cache/v2/images.json').end((err, res) => {
    if (err) reject(err);
    resolve(res.body.images);
  });
});

const getChannelCache = new Promise((resolve, reject) => {
  request.get('https://twitchemotes.com/api_cache/v2/subscriber.json').end((err, res) => {
    if (err) reject(err);
    resolve({channels: res.body.channels, template: res.body.template});
  });
});

module.exports = (name, size = 'small') => { // es6 argument defaults are fucking amazing
  return new Promise((resolve, reject) => {
    Promise.all([getImageCache, getChannelCache]).then(res => {
      let channel = Object.keys(res[0]).map(k => res[0][k]).find(i => i.code.toLowerCase() === name.toLowerCase()).channel;
      let emote = res[1].channels[channel].emotes.find(e => e.code.toLowerCase() === name.toLowerCase());
      resolve(res[1].template[size].replace('{image_id}', emote.image_id))
    }).catch(reject)
  });
}
