const chalk = require("chalk");

class TimePlugin {
    apply(compiler) {
        console.log(compiler)

        // compiler阶段
        const startTime = Date.now();
        // sync hook
        const compilerSyncHooks = [
            "environment",
            "entryOption",
            "afterPlugins",
            "compile"
        ];
        // async hook
        const compilerAsyncHooks = [
            "beforeRun",
            "beforeCompile",
            "make",
            "afterCompile",
            "emit",
            "done"
        ];

        compilerSyncHooks.forEach(hookName => {
            compiler.hooks[hookName].tap('Time Plugin', () => {
                console.log(`Compiler Sync Hook ${hookName}, took ${chalk.red(Date.now() - startTime)}ms`)
            })
        })

        compilerAsyncHooks.forEach(hookName => {
            compiler.hooks[hookName].tapPromise('Time Plugin', () => {
                return new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
                    console.log(`Compiler Async Hook ${hookName}, took ${chalk.red(Date.now() - startTime)}ms`)
                })
            })
        })

        // compilation阶段
        compiler.hooks.compilation.tap('Time Plugin', (compilation) => {
            const compilationSyncHooks = [
                'addEntry',
                'succeedEntry',
                'finishModules',
                'seal',
                'optimize',
                'optimizeAssets',
                'afterSeal',
            ];
            compilationSyncHooks.forEach(hookName => {
                compilation.hooks[hookName].tap('Time Plugin', () => {
                    console.log(`compilation Sync Hook ${hookName}, took ${chalk.red(Date.now() - startTime)}ms`)
                })
            })
        })
    }
}

module.exports = TimePlugin;
