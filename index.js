const delayedPromise = data => new Promise(resolve => resolve(data))

// Faking remit for now
const remit = {
  request: endpoint => data => delayedPromise(data) 
}

const vorpal = require('vorpal')()
const chalk = vorpal.chalk
var prettyjson = require('prettyjson')

vorpal
  .command('request')
  .action(async function (args, cb) {
    remit.request('foo')({foo: {bar: 2}})
      .then((data) => {
        this.log(prettyjson.render(data, {
          keysColor: 'rainbow',
          dashColor: 'magenta',
          stringColor: 'white'
        }))
        cb()
      })
  })

vorpal
  .delimiter(chalk.magenta('remit~$'))
  .show()