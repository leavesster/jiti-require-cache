import jiti from "jiti";
import {writeFileSync} from "fs";
import {resolve} from "path";
(process as any).JITI_DEBUG = 1;
jiti(__filename, {}).register();


const p = "./src/module.ts";
const cwd = process.cwd();
const resolveP = resolve(cwd, p);
console.log("resolveP", resolveP);

(async () => {
    const ts = require(resolveP);
    ts.main();
    change();

    delete require.cache[resolveP];

    const ts2 = require(resolveP);
    ts2.main();

    reset();
})()


function change() {
    writeFileSync(resolveP, "export function main() { console.log('changed') }");
}

function reset() {
    writeFileSync(resolveP, "export function main() { console.log('main') }");
}