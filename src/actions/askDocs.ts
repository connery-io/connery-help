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
  const { answer, pageId, spaceId } = await askDocs(input.question);

  let sourceText = '';
  if (pageId && spaceId) {
    const internalPageUrl = await getInternalPageUrl(pageId, spaceId);
    const publicPageUrl = await getPublicPageUrl(internalPageUrl);
    sourceText = `\n\nSource: ${publicPageUrl.url}`;
  }

  return {
    textResponse: answer + sourceText,
  };
}

async function askDocs(question: string): Promise<{
  answer: string;
  pageId?: string;
  spaceId?: string;
}> {
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
      query: question,
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.data.answer || !response.data.answer.text) {
    return {
      answer: 'No answer found in the Connery documentation.',
    };
  }

  return {
    answer: response.data.answer.text,
    pageId: response.data.answer.sources[0].page,
    spaceId: response.data.answer.sources[0].space,
  };
}

async function getInternalPageUrl(pageId: string, spaceId: string): Promise<string> {
  const apiToken = process.env.GITBOOK_API_KEY;

  if (!apiToken) {
    throw new Error('GITBOOK_API_KEY is not defined in environment variables.');
  }

  const response = await axios.get(`https://api.gitbook.com/v1/spaces/${spaceId}/content/page/${pageId}`, {
    headers: {
      Authorization: `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data.urls.app;
}

async function getPublicPageUrl(internalPageUrl: string): Promise<{ title: string; url: string }> {
  const apiKey = process.env.GITBOOK_API_KEY;

  if (!apiKey) {
    throw new Error('GITBOOK_API_KEY is not defined in environment variables.');
  }

  const response = await axios.get('https://api.gitbook.com/v1/urls/content', {
    params: { url: internalPageUrl },
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  return {
    title: response.data.page.title,
    url: response.data.space.urls.public + response.data.page.path,
  };
}
