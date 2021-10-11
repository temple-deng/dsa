import { globby } from 'globby';
import { build } from 'esbuild';

(async () => {
    const files = await globby('./js2/*.ts');
    build({
        entryPoints: files,
        platform: 'node',
        target: 'es6',
        outdir: 'out',
    }).catch(() => process.exit(1))
})();
