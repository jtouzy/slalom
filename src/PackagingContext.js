const fs = require('fs')
const path = require('path')

class PackagingContext {
  constructor(executionPath, commandArguments) {
    this.$executionPath = executionPath
    this.$commandArguments = commandArguments
  }
  makeSelf() {
    this.$loadStaticContext()
    let services = []
    if (this.$commandArguments.length > 0) {
      services = services.concat(this.$commandArguments[0].split(','))
      this.$checkServices(services)
    } else {
      services = this.$fetchServices()
    }
    console.log(`Slalom: Services: ${services.join(' & ')}`)
  }
  $loadStaticContext() {
    console.log('Slalom: Initializing static context.')
    this.$static = Object.assign({
      servicesPath: 'services'
    }, {}) // TODO fetch from config file
  }
  $fetchServices() {
    const servicesPath = this.$getServicesPath()
    return fs.readdirSync(servicesPath)
  }
  $checkServices(services) {
    for (const service of services) {
      if (!fs.existsSync(this.$getServicePath(service))) {
        throw new Error(`SlalomError: Unrecognized service '${service}'`)
      }
    }
  }
  $getServicesPath() {
    return path.resolve(this.$executionPath, this.$static.servicesPath)
  }
  $getServicePath(service) {
    return path.resolve(this.$getServicesPath(), service)
  }
}

module.exports = PackagingContext
