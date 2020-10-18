
workbox.core.setCacheNameDetails({prefix: "qukaoyan-v1"});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

const registerRoute = workbox.routing.registerRoute

registerRoute(
  matchGet('/v1/jwt/alive'),
  async () => {
      return new Response(JSON.stringify({hello: 'world'}))
  }
)

registerRoute(
  matchGet('/v1/info/note'),
  async () => {
    let res = {
      page: 1
    }
    return new Response(JSON.stringify(res))
  }
)

registerRoute(
  matchGet('/v1/user/event'),
  async () => {
    let e = {
      prefix: '还有',
      suffix: '天',
      date: [
        "2020-11-16T01:04:36.760Z",
				"2021-10-12T01:04:36.760Z",
				"2022-10-07T01:04:36.760Z"
      ],
      finishDate: "2020-11-16T01:04:36.760Z"
    }
    return new Response(JSON.stringify(e))
  }
)
registerRoute(
  matchGet('/v1/note/today'),
  async () => {
    let note = {
      page: 1,
      publishDate: new Date(),
      todo: []
    }
    return new Response(JSON.stringify(note),{
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
  }
)

function matchGet(route) {
  return ({url, request}) => {
    const fix = URI_PREFIX(url, route)
    if ((request.method === 'GET') && (url.href === fix)) {
      return true
    }
    return false
  }
}

function URI_PREFIX (address, route) {
  let urlNode = route.split('//')
  if ((urlNode[0] === 'https:') || (urlNode[0] === 'http:')) {//指定具体地址
    return route
  } else {//本主机
    let href_Array = address.href.split('/')
    const protocol = href_Array[0]
    const host = href_Array[2]
    if (route[0] === '/') {
      route = route.slice(1, route.length)
    }
    let pre = [protocol, host].join('//')
    return [pre, route].join('/')
  }
}

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});