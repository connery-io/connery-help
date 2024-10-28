import { LinearClient } from '@linear/sdk';
import { IssueCreateInput } from '@linear/sdk/dist/_generated_documents';
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
  const linearApiKey = process.env.LINEAR_API_KEY;

  if (!linearApiKey) {
    throw new Error('LINEAR_API_KEY is not defined in environment variables.');
  }

  const client = new LinearClient({
    apiKey: linearApiKey,
  });

  const issue: IssueCreateInput = {
    title: 'Feedback from Slack',
    description: `
      ## Feedback
      ${input.feedback}

      ## Provided by
      - Name: ${input.name}
      - Email: ${input.email}
      - Organization: ${input.organization}
    `
      .split('\n')
      .map((line) => line.trim())
      .join('\n'),
    labelIds: ['66dee832-96c0-4344-a232-88498083878e'], // "Feedback from Slack" label
    teamId: '6e509556-467e-4300-a5ee-29e540324452', // "CON" team
  };
  await client.createIssue(issue);

  return {
    textResponse: 'Thank you for your feedback! We will review it and get back to you soon.',
  };
}
