import axios from 'axios';
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
  const slackWebhookUrl = process.env.FEEDBACK_SLACK_WEBHOOK_URL;

  if (!slackWebhookUrl) {
    throw new Error('FEEDBACK_SLACK_WEBHOOK_URL is not defined in environment variables.');
  }

  const message = `*💡 You have new feedback*\n\nName: ${input.name}\nEmail: ${input.email}\nOrganization: ${input.organization}\n\n${input.feedback}`;
  await axios.post(slackWebhookUrl, {
    text: message,
  });

  return {
    textResponse: 'Thank you for your feedback! We will review it and get back to you soon.',
  };
}
