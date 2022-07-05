export function createDefer<T = any>() {
  const r: any = {}
  const promise = new Promise<T>((resolve, reject) => {
    r.resolve = resolve
    r.reject = reject
  })
  r.promise = () => promise
  return r
}

export function loadCss(url: string, doc = document) {
  const node = doc.createElement('link')

  node.onload = onload
  node.onerror = onload

  const i = createDefer()

  function onload(e: Event) {
    node.onload = null
    node.onerror = null
    if (e.type === 'load') {
      i.resolve()
    } else {
      i.reject()
    }
  }

  node.rel = 'stylesheet'
  node.type = 'text/css'
  node.href = url

  doc.head.appendChild(node)
  return i.promise()
}

export function loadJs(url: string, doc = document) {
  const node = doc.createElement('script')
  node.onload = onload
  node.onerror = onload
  const i = createDefer()

  function onload(e: Event) {
    node.onload = null
    node.onerror = null
    if (e.type === 'load') {
      i.resolve()
    } else {
      i.reject()
    }
  }

  node.src = url
  node.async = false

  doc.head.appendChild(node)
  return i.promise()
}

export function load(url: string) {
  const isCss = url.endsWith('.css')
  const node: any = isCss
    ? document.createElement('link')
    : document.createElement('script')
  // node.setAttribute('crossorigin', 'anonymous');

  node.onload = onload
  node.onerror = onload

  const i = createDefer()

  function onload(e: Event) {
    node.onload = null
    node.onerror = null
    if (e.type === 'load') {
      i.resolve()
    } else {
      i.reject()
    }
  }

  if (isCss) {
    node.rel = 'stylesheet'
    node.type = 'text/css'
    node.href = url
  } else {
    node.src = url
  }

  document.head.appendChild(node)

  return i.promise()
}
