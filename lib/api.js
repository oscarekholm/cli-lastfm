const path = require('path')
const dotProp = require('dot-prop')
const loadJsonFile = require('load-json-file')
const LastFmNode = require('lastfm').LastFmNode
const writeJsonFile = require('write-json-file')

const getClient = () => loadJsonFile(path.join(__dirname, 'config.json'))
  .then(config => new LastFmNode(config))

const lastRequestPath = path.join(__dirname, '.last-request.json')

const getLastRequest = () => loadJsonFile(lastRequestPath)
  .catch(() => ({}))

const writeResult = data => writeJsonFile(lastRequestPath, data)

const user = {
  np ({ user }) {
    return new Promise(async (resolve, reject) => {
      const lastRequest = await getLastRequest()
      const now = new Date()
      const { result, time } = dotProp.get(lastRequest, `user.np.${user}`, {})

      if (time && result && now - new Date(time) < 60 * 1000) {
        return resolve(result)
      }

      const client = await getClient()

      const request = client.request('user.getRecentTracks', {
        user,
        limit: 1
      })

      request.addListener('success', response => {
        const path = 'recenttracks.track.0'
        const artist = dotProp.get(response, `${path}.artist.#text`, null)
        const song = dotProp.get(response, `${path}.name`, null)
        const nowPlaying = dotProp.get(response, `${path}.@attr.nowplaying`, true)

        if (!artist || !song) reject()

        const result = nowPlaying ? `${artist} - ${song}` : ''

        if (nowPlaying) dotProp.set(lastRequest, `user.np.${user}`, { result, time: now })
        else dotProp.delete(lastRequest, `user.np.${user}`)

        writeResult(lastRequest)
        resolve(result)
      })

      request.addListener('error', reject)
    })
  }
}

module.exports = { user }
