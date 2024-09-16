import { PluginDefinition, setupPluginServer } from 'connery';
import sendFeedback from './actions/sendFeedback.js';
import reportBug from './actions/reportBug.js';
import askDocs from './actions/askDocs.js';
import listActions from './actions/listActions.js';

const pluginDefinition: PluginDefinition = {
  name: 'Connery Help',
  description:
    'Connery Help is a plugin designed to provide easy access to Connery documentation, gather user feedback, report bugs, and list available actions for a streamlined user experience.',
  actions: [sendFeedback, reportBug, askDocs, listActions],
};

const handler = await setupPluginServer(pluginDefinition);
export default handler;
