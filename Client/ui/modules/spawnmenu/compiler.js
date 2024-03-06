import fs from 'fs'

var file = fs.readdirSync('./build/assets/').filter(fn => fn.endsWith('.js'))[0]

var scriptLogic = fs.readFileSync('./build/assets/' + file, 'utf8')
var buildHTML = fs.readFileSync('./build/index.html', 'utf8')

var newHTML = buildHTML.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, `<script type="module">${scriptLogic}</script>`)

fs.writeFileSync('./build/index.html', newHTML, 'utf8')
fs.unlinkSync('./build/assets/' + file);