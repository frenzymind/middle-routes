const CACHE_STATIC = 'rnm-app-static-v8'
const DYNAMIC_CACHE = 'rnm-app-dynamic-v8'

const ASSETS = ['/', '/offline.js', '/index.html', 'https://fonts.googleapis.com/css?family=Lily+Script+One']

self.addEventListener('install', async event => {
  const cache = await caches.open(CACHE_STATIC)
  await cache.addAll(ASSETS)
})

self.addEventListener('activate', async event => {
  const cachesKeys = await caches.keys()

  await Promise.all(cachesKeys.filter(key => key !== CACHE_STATIC).map(key => caches.delete(key)))
})

self.addEventListener('fetch', event => {
  event.respondWith(cacheFirst(event.request))
})

async function cacheFirst(req) {
  const cached = await caches.match(req)
  console.log('cacheFirst', cached)

  try {
    return (
      cached ??
      (await fetch(req).then(res => {
        return cacheResolvedNetwork(req, res)
      }))
    )
  } catch (error) {
    console.log(error)
    return await caches.match('offline.js')
  }
}

async function cacheResolvedNetwork(req, res) {
  const cache = await caches.open(DYNAMIC_CACHE)

  try {
    await cache.put(req, res.clone())
    console.log('put to cache:', res)

    return res
  } catch (error) {
    console.log('CAN NOT put to cache:', res)
    return res
  }
}
