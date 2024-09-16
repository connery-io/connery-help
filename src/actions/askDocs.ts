import { ActionDefinition, ActionContext, OutputObject } from 'connery';
import axios from 'axios';

const actionDefinition: ActionDefinition = {
  key: 'askDocs',
  name: 'Ask Connery docs',
  description:
    'Ask a question in the Connery documentation. ' +
    'All the questions about Connery should be asked here. ' +
    'For example questions about plugins, actions, platform, SDK, Slack App, Make App, etc.',
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
  const orgId = process.env.GITBOOK_ORG_ID;
  const apiKey = process.env.GITBOOK_API_KEY;

  if (!orgId) {
    throw new Error('GITBOOK_ORG_ID is not defined in environment variables.');
  }

  if (!apiKey) {
    throw new Error('GITBOOK_API_KEY is not defined in environment variables.');
  }

  const response = await axios.post(
    `https://api.gitbook.com/v1/orgs/${orgId}/ask`,
    {
      query: input.question,
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    },
  );

  const data = response.data;

  if (!data.answer || !data.answer.text) {
    throw new Error('Invalid response from GitBook API.');
  }

  const answerText: string = data.answer.text;

  return {
    textResponse: answerText,
  };
}
