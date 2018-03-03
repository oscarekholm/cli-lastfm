#!/usr/bin/env node

const api = require('../lib/api')
const [ ,, user ] = process.argv

if (!user) throw new Error('A username must be provided as the first CLI argument')

api.user.np({ user })
  .then(res => process.stdout.write(res))
  .catch(console.log)
