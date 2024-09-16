import { ActionDefinition, ActionContext, OutputObject } from 'connery';

const actionDefinition: ActionDefinition = {
  key: 'reportBug',
  name: 'Report bug',
  description: '',
  type: 'create',
  inputParameters: [
    {
      key: 'bugDescription',
      name: 'Bug description',
      description:
        'The description of the bug. Please include the steps to reproduce, actual and expected behavior. It will help us fix the bug faster.',
      type: 'string',
      validation: {
        required: true,
      },
    },
    {
      key: 'name',
      name: 'Name',
      description: 'The name of the person reporting the bug.',
      type: 'string',
      validation: {
        required: true,
      },
    },
    {
      key: 'email',
      name: 'Email',
      description: 'The email of the person reporting the bug.',
      type: 'string',
      validation: {
        required: true,
      },
    },
    {
      key: 'organization',
      name: 'Organization',
      description: 'The Connery organization.',
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
  // TODO: Implement the action logic.

  return {
    textResponse: 'Thank you for your bug report! We will review it and get back to you soon.',
  };
}
