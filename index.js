'use strict'

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const exitHook = require('exit-hook')

const cache = (save, file = 'cache.json') => {
  const data = { kv: {}, ttl: {} }

  const db = save && low(new FileSync(file))
  db && db.defaults(data).write()

  const del = k => {
    if (save) {
      db.unset(`kv['${k}']`).value()
      db.unset(`ttl['${k}']`).value()
      db.write()
      return
    }

    delete data.kv[k]
    delete data.ttl[k]
  }

  const set = (k, v, ttl) => {
    // ttl must be seconds
    let ms = null
    if (typeof ttl === 'number') {
      ms = Date.now() + ttl * 1000
      save ? db.set(`ttl['${k}']`, ms).value() : data.ttl[k] = ms
    }

    save ? db.set(`kv['${k}']`, v).value() : (data.kv[k] = v)
    save && db.write()

    return { val: v, expires: ms }
  }

  const get = (k, showExp) => {
    const val = save ? db.get(`kv['${k}']`).value() : data.kv[k]
    const expires = save ? db.get(`ttl['${k}']`).value() : data.ttl[k]

    if (expires && expires < Date.now()) {
      return del(k)
    }

    return showExp ? { val, expires } : val
  }

  exitHook(() => db.write())

  return { set, get, del }
}

module.exports = cache
