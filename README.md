# poormans-cache [![Build Status](https://travis-ci.org/mallendeo/poormans-cache.svg?branch=master)](https://travis-ci.org/mallendeo/poormans-cache)

A simple, persistent cache for dead-simple apps.

## Install
```bash
$ yarn add poormans-cache
# or npm i poormans-cache
```

## Usage

```js
import Cache from 'poormans-cache'
// or const Cache = require('poormans-cache')

// Cache(<Boolean saveFile>, <String filename>)
// e.g const cache = Cache()
// or const cache = require('poormans-cache')()
const cache = Cache(true, './cache.json')

cache.set('hello', 'there')
cache.get('hello') // there

cache.del('hello')
cache.get('hello') // undefined

cache.set('🌚', '🌝', 2) // save for 2 seconds
cache.get('🌚', true) // { val: 🌝, expires: 1535065557820 }

setTimeout(() => cache.get('🌚'), 1000) // 🌝 
setTimeout(() => cache.get('🌚'), 1000) // undefined 
```

## API

> Note: All methods are synchronous.

### Cache.set(key, value)
Returns an object: `{ val: <value>, expires: <ms> }`.

  - **key**: string
  - **value**: string | any serializable object

### Cache.get(key, showExpire)
Returns the entry value.

When `showExpire` is true, it returns an object: `{ val: <value>, expires: <ms> }`.

  - **key**: string
  - **showExpire**: boolean

### Cache.del(key)
  - **key**: string

## Test

```bash
$ yarn test
```

## License

MIT
