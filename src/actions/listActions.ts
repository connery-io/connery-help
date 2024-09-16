import { ActionDefinition, ActionContext, OutputObject } from 'connery';

const actionDefinition: ActionDefinition = {
  key: 'listActions',
  name: 'List actions',
  description: 'Show all the actions available on the Connery Platform.',
  type: 'read',
  inputParameters: [],
  operation: {
    handler: handler,
  },
  outputParameters: [
    {
      key: 'textResponse',
      name: 'Text response',
      type: 'string',
      validation: {
        required: true,
      },
    },
  ],
};
export default actionDefinition;

export async function handler({ input }: ActionContext): Promise<OutputObject> {
  return {
    textResponse:
      'Please find all the available actions for your organization on the Connery Platform:\n' +
      'https://platform.connery.io/actions',
  };
}
