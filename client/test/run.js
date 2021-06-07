/* eslint-disable no-console */

// Credit to https://github.com/sohamkamani/nodejs-test-without-library

const path = require('path')
const { exit } = require('process')

// `tests` is a singleton variable that will contain all our tests
const tests = []
// Since this is a test command, the status code should indicate
// when the tests succeeded (0) or failed (> 0) (mainly for CI environments)
let status_code = 0

// The test function accepts a name and a function
function test(name, fn) {
  // it pushes the name and function as an object to
  // the `tests` array
  tests.push({ name, fn })
}

function run() {
  console.log() // Some spacing for the output
  // `run` runs all the tests in the `tests` array
  tests.forEach(t => {
    // For each test, we try to execute the
    // provided function.
    try {
      t.fn()
      // If there is no exception
      // that means it ran correctly
      console.log('✅', t.name)
    } catch (e) {
      // Exceptions, if any, are caught
      // and the test is considered failed
      console.log('❌', t.name, '\n')
      console.log(e.stack)
      // Increment the status/exit code of the command so (CI) environments
      // know the tests failed
      status_code++
    }
  })
}

// Get the list of files from the command line arguments
const files = process.argv.slice(2)

// expose the test function as a global variable
global.test = test

// Load each file using `require`
files.forEach(file => {
  // Once a file is loaded, it's tests are
  // added to the `tests` singleton variable
  /* eslint-disable-next-line global-require */
  require(path.resolve('.', file))
})

// Now that all the tests from all the files are
// added, run them one after the other
run()

exit(status_code)
