const moment = require('moment')

export default (app, inject) => {
  inject('moment', moment)
}
