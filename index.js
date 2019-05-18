const request = require('request');

module.exports = {
  defaultConfig: {
    enabled: true
  },
  pluginName: 'External Plugin Demo',
  pluginDescription: 'This plugin is loaded from the <settings>/plugins folder.',
  init(proxy, config) {
    proxy.log({ type: 'info', source: 'plugin', name: this.pluginName, message: `${this.pluginName} loaded!` });

    request.get('https://swarfarm.com/api/v2', function(error, response, body) {
      proxy.log({
        type: 'info',
        source: 'plugin',
        name: this.pluginName,
        message: `Got an HTTP${response.statusCode} for a GET request to swarfarm.com`
      });
    });

    proxy.on('apiCommand', (req, resp) => {
      const { command } = req;
      proxy.log({
        type: 'info',
        source: 'plugin',
        name: this.pluginName,
        message: `${this.pluginName} got a command! ${command}`
      });
    });
  }
};
