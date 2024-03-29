import fs from 'fs'
import * as cheerio from 'cheerio';

console.log("STARITNG CONVERSION")

var file = fs.readdirSync('./build/assets/').filter(fn => fn.endsWith('.js'))[0]

var scriptLogic = fs.readFileSync('./build/assets/' + file, 'utf8')
var buildHTML = fs.readFileSync('./build/index.html', 'utf8')

const $ = cheerio.load(buildHTML)

$('script').replaceWith(`<script type="module">${scriptLogic}</script>`)

fs.writeFile('./build/index.html', $.html(), err => {
    if (err)
        return console.log("ERROR =>", err)
    
    console.log("SUCCESSFULLY BUILT")
    fs.unlinkSync('./build/assets/' + file);
    fs.cpSync('./static/', './build/assets/', {recursive: true})
})