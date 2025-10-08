function getRedirectUrl(url) {
  let i = 0
  // we detect how many slash before a valid path
  for (; i < url.length; ++i) {
    if (url[i] !== '/' && url[i] !== '\\') break
  }
  // turns all leading / or \ into a single /
  url = '/' + url.substr(i)
  try {
    const parsed = new URL(url, 'http://localhost.com/')
    const parsedPathname = parsed.pathname
    return parsedPathname + (parsedPathname[parsedPathname.length - 1] !== '/' ? '/' : '') + (parsed.search || '')
  } /* c8 ignore start */ catch {
    // the try-catch here is actually unreachable, but we keep it for safety and prevent DoS attack
    const err = new Error(`Invalid redirect URL: ${url}`)
    err.statusCode = 400
    throw err
  } /* c8 ignore stop */
}
