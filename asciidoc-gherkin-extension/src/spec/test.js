const asciidoctor = require('asciidoctor')()
const fs = require('fs');

const registry = asciidoctor.Extensions.create()
require('./plugin.js')(registry)

const doc = asciidoctor.loadFile('test.adoc', { 'extension_registry': registry })
//const doc = asciidoctor.loadFile('test_not_valid.adoc', { 'extension_registry': registry })

const result = doc.convert()

try {
    fs.writeFileSync('test.html', result);
    // file written successfully
} catch (err) {
    console.error(err);
}