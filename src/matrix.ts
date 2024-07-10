import type createFetchClient from 'openapi-fetch';
import type { paths } from '../types/matrix';

export const createMatrixEndpoints = (
  api: ReturnType<typeof createFetchClient<paths>>,
  instanceId: string
) => ({});
