import { ActionDefinition, ActionContext, OutputObject } from 'connery';

const actionDefinition: ActionDefinition = {
  key: 'sendFeedback',
  name: 'Send feedback to Connery',
  description: 'Send a feedback to the Connery team.',
  type: 'create',
  inputParameters: [
    {
      key: 'feedback',
      name: 'Feedback',
      description: 'The feedback to send.',
      type: 'string',
      validation: {
        required: true,
      },
    },
    {
      key: 'name',
      name: 'Name',
      description: 'The name of the person sending the feedback.',
      type: 'string',
      validation: {
        required: true,
      },
    },
    {
      key: 'email',
      name: 'Email',
      description: 'The email of the person sending the feedback. We will use this to contact you.',
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
    textResponse: 'Thank you for your feedback! We will review it and get back to you soon.',
  };
}
