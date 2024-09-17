import axios from 'axios';
import { ActionDefinition, ActionContext, OutputObject } from 'connery';

const actionDefinition: ActionDefinition = {
  key: 'reportBug',
  name: 'Report bug to Connery',
  description: 'Report a bug to the Connery team.',
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
  const slackWebhookUrl = process.env.BUG_REPORT_SLACK_WEBHOOK_URL;

  if (!slackWebhookUrl) {
    throw new Error('BUG_REPORT_SLACK_WEBHOOK_URL is not defined in environment variables.');
  }

  const message = `*🐞 You have a new bug report*\n\nName: ${input.name}\nEmail: ${input.email}\nOrganization: ${input.organization}\n\n${input.bugDescription}`;
  await axios.post(slackWebhookUrl, {
    text: message,
  });

  return {
    textResponse: 'Thank you for your bug report! We will review it and get back to you soon.',
  };
}
