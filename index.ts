import jiti from "jiti";
import {writeFileSync} from "fs";
import {resolve} from "path";
(process as any).JITI_DEBUG = 1;
jiti(__filename, {
  cache: false,
  debug: true,
  requireCache: false,
  v8cache: false,
}).register();

const p = "./module.ts";

const resolveP = resolve(__dirname, "..", p);
console.log("dir", __dirname, "resolveP", resolveP);

(async () => {
    const ts = await import(resolveP);
    ts.main();
    change();

    const ts2 = await import(resolveP);
    ts2.main();

    reset();
})()


function change() {
    writeFileSync(resolveP, "export function main() { console.log('changed') }");
}

function reset() {
    writeFileSync(resolveP, "export function main() { console.log('main') }");
}