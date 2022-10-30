import * as prismic from '@prismicio/client';
import * as prismicNext from '@prismicio/next';
import sm from '../../sm.json';

export const prismicRepositoryName = prismic.getRepositoryName(sm.apiEndpoint)

const routes: prismic.ClientConfig['routes'] = [
  {
    type: 'homepage',
    path: '/posts',
  },
  {
    type: 'page',
    path: '/:uid',
  },
]

export function getPrismicClient(serverSideContext?: prismicNext.CreateClientConfig) {
  const client = prismic.createClient(sm.apiEndpoint, {
    // routes,
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  });

  if (serverSideContext) {
    prismicNext.enableAutoPreviews({
      client,
      previewData: serverSideContext.previewData,
      req: serverSideContext.req,
    });
  }

  return client
}
