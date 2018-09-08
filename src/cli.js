#!/usr/bin/env node
const upload = require('./upload')
const { join } = require('path')
const { red, green, yellow } = require('colors')

require('yargs').command(
  '$0 <files...>',
  'upload one or multiple files',
  yargs => {
    yargs
      .positional('file', {
        describe: 'the file to upload',
        type: 'string'
      })
      .option('site', {
        alias: 's',
        describe: 'site to upload',
        choices: ['bayfiles', 'anonfile', 'megaupload'],
        default: 'bayfiles'
      })
      .option('verbose', {
        alias: 'v',
        describe: 'If this option is set to true, log messages won\'t appear',
        default: false
      })
  },
  async ({ site, files, verbose }) => {
    for (const file of files) {
      try {
        if(verbose) console.log(yellow(`Uploading ${file}...`))
        const result = await upload(site, join(process.cwd(), file))
        if(verbose) {
          console.log(green(`File uploaded successfully: ${result.url.full}`))
        } else {
          console.log(result.url.full)
        }
      } catch (e) {
        console.error(red(`An error occurred when uploading the file: ${e.message}`))
      }
    }
  }
).argv