import { PluginDefinition, setupPluginServer } from 'connery';
import sendFeedback from './actions/sendFeedback.js';
import reportBug from './actions/reportBug.js';
import askDocs from './actions/askDocs.js';

const pluginDefinition: PluginDefinition = {
  name: 'Connery Help',
  description:
    'Connery Help is a plugin designed to provide easy access to Connery documentation and allows users to send feedback and report bugs to the Connery team.',
  actions: [sendFeedback, reportBug, askDocs],
};

const handler = await setupPluginServer(pluginDefinition);
export default handler;
