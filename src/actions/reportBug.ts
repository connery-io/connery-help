import { LinearClient } from '@linear/sdk';
import { IssueCreateInput } from '@linear/sdk/dist/_generated_documents';
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
  const linearApiKey = process.env.LINEAR_API_KEY;

  if (!linearApiKey) {
    throw new Error('LINEAR_API_KEY is not defined in environment variables.');
  }

  const client = new LinearClient({
    apiKey: linearApiKey,
  });

  const issue: IssueCreateInput = {
    title: 'Bug report from Slack',
    description: `
      ## Description
      ${input.bugDescription}

      ## Reported by
      - Name: ${input.name}
      - Email: ${input.email}
      - Organization: ${input.organization}
    `
      .split('\n')
      .map((line) => line.trim())
      .join('\n'),
    labelIds: ['0d50c8ca-1a16-4ade-83b7-d3eb4a42e5ca'], // "Bug report from Slack" label
    teamId: '6e509556-467e-4300-a5ee-29e540324452', // "CON" team
  };
  await client.createIssue(issue);

  return {
    textResponse: 'Thank you for your bug report! We will review it and get back to you soon.',
  };
}
