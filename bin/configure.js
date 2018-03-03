#!/usr/bin/env node

const path = require('path')
const inquirer = require('inquirer')
const writeJsonFile = require('write-json-file')

const configPath = path.join(__dirname, '..', 'config.json')

const questions = [{
  name: 'api_key',
  message: 'Please enter your Lastfm API key (create an API account at https://www.last.fm/api/account/create):'
}, {
  name: 'secret',
  message: 'Please enter your Lastfm secret:'
}, {
  name: 'useragent',
  message: 'Please enter a unique user agent (please read https://www.last.fm/api/intro)\n(E.g johndoe-lastfm):'
}]

inquirer.prompt(questions)
  .then(answers => writeJsonFile(configPath, answers))
  .then(() => console.log('✅ Config file written!'))
