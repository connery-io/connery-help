import { ActionDefinition, ActionContext, OutputObject } from 'connery';

const actionDefinition: ActionDefinition = {
  key: 'askDocs',
  name: 'Ask docs',
  description: 'Ask a question in the Connery documentation.',
  type: 'read',
  inputParameters: [
    {
      key: 'question',
      name: 'Question',
      description: 'The question to ask in the Connery documentation.',
      type: 'string',
      validation: {
        required: true,
      },
    },
  ],
  operation: {
    handler: handler,
  },
  outputParameters: [
    {
      key: 'textResponse',
      name: 'Text response.',
      type: 'string',
      validation: {
        required: true,
      },
    },
  ],
};
export default actionDefinition;

export async function handler({ input }: ActionContext): Promise<OutputObject> {
  // TODO: Implement the action logic.

  return {};
}
