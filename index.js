const PackagingContext = require('./src/PackagingContext')

try {
  const arguments = process.argv
  if (arguments.length <= 1) {
    throw new Error('Slalom: Not enough arguments given.')
  }
  const context = new PackagingContext(__dirname, arguments.slice(2))
  context.makeSelf()
} catch (error) {
  console.error(error.message)
  process.exit(1)
}
