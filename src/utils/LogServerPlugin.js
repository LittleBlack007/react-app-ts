// 每次热更新完之后输出启动的IP地址在终端

class LogServerAddressPlugin  {
    apply(compiler) {
        compiler.hooks.done.tap('LogServerAddressPlugin', () => {
            const devServerOptions = compiler.options.devServer || {};
            const host = devServerOptions.host || 'localhost';
            const port = devServerOptions.port || 3000;
            console.log(`\nProject is running at http://${host}:${port}\n`);
        })
    }
}

module.exports = LogServerAddressPlugin;