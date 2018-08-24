import test from 'ava'

const Cache = require('./')
const cache = Cache(true)

const wait = (ms = 250) =>
  new Promise(resolve => setTimeout(resolve, ms))

test.serial('set value', t => {
  const obj = cache.set('hello', 'there')
  t.is(obj.val, 'there')
})

test.serial('get value', t => {
  t.is(cache.get('hello'), 'there')
})

test.serial('delete/remove', t => {
  cache.del('hello')
  t.is(typeof cache.get('hello'), 'undefined')
})

test('save array/object', t => {
  cache.set('obj', [{ prop: 'value' }])
  const obj = cache.get('obj')
  t.deepEqual(obj, [{ prop: 'value' }])
})

test('set value with ttl', async t => {
  cache.set('🌚', '🌝', 0.5)
  await wait()
  if (!cache.get('🌚', true).val) return
  await wait()
  t.is(typeof cache.get('🌚'), 'undefined')
})
