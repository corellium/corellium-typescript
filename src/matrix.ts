/* eslint-disable compat/compat */
/* eslint-disable promise/avoid-new */
/* eslint-disable no-await-in-loop */
/* eslint-disable unicorn/no-await-expression-member */
import { createImageEndpoints } from './image';
import { createDeviceEndpoints } from './device';
import type createFetchClient from 'openapi-fetch';
import type { components, paths as matrixPaths } from '../types/matrix';
import type { paths as corePaths } from '../types/corellium';

export const createMatrixEndpoints = (
  api: ReturnType<typeof createFetchClient<corePaths>>,
  matrixApi: ReturnType<typeof createFetchClient<matrixPaths>>,
  instanceId: string,
  baseUrl: string
  // eslint-disable-next-line @typescript-eslint/max-params
) => {
  const imageEndpoints = createImageEndpoints(api);
  const deviceEndpoints = createDeviceEndpoints(api, instanceId, baseUrl);

  const startMonitoring = async (assessmentId: string) => {
    const response = await matrixApi.POST(
      '/{instanceId}/assessments/{assessmentId}/start',
      {
        params: {
          path: {
            instanceId,
            assessmentId,
          },
        },
      }
    );

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  };

  const stopMonitoring = async (assessmentId: string) => {
    const response = await matrixApi.POST(
      '/{instanceId}/assessments/{assessmentId}/stop',
      {
        params: {
          path: {
            instanceId,
            assessmentId,
          },
        },
      }
    );

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  };

  const runChecks = async (assessmentId: string) => {
    const response = await matrixApi.POST(
      '/{instanceId}/assessments/{assessmentId}/test',
      {
        params: {
          path: {
            instanceId,
            assessmentId,
          },
        },
      }
    );

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  };

  const createAssessment = async (
    body: components['schemas']['CreateAssessmentDto']
  ) => {
    const response = await matrixApi.POST('/{instanceId}/assessments', {
      params: {
        path: {
          instanceId,
        },
      },
      body,
    });

    if (response.error) {
      throw new Error(response.error.error);
    }

    return response.data;
  };

  const getAssessment = async (assessmentId: string) => {
    const response = await matrixApi.GET(
      '/{instanceId}/assessments/{assessmentId}',
      {
        params: {
          path: {
            instanceId,
            assessmentId,
          },
        },
      }
    );

    if (response.error) {
      throw new Error(response.error.error);
    }

    // Patch status to be more specific
    return {
      ...response.data,
      status: response.data.status as
        | 'complete'
        | 'failed'
        | 'generatingReport'
        | 'monitoring'
        | 'new'
        | 'readyForTesting'
        | 'startingMonitoring'
        | 'stoppingMonitoring'
        | 'testing',
    };
  };

  return {
    /**
     * Run a MATRIX assessment.
     * @param body The request body.
     * @param body.bundleId The bundle ID of the assessment to run.
     * @param body.input The input to provide to the assessment.
     * @param body.keywords The keywords to provide to the assessment.
     * @returns The response data.
     * @throws {Error} The error message.
     * @example const response = await corellium.device('123').matrix.run({ bundleId: 'com.corellium.cafe' });
     */
    run: async (body: {
      bundleId: components['schemas']['CreateAssessmentDto']['bundleId'];
      input?: corePaths['/v1/instances/{instanceId}/input']['post']['requestBody']['content']['application/json'];
      keywords?: string[];
    }) => {
      // eslint-disable-next-line @typescript-eslint/init-declarations
      let wordlistId: string | undefined;
      const instance = await deviceEndpoints.get();

      while (instance.state !== 'on') {
        await new Promise((resolve) => {
          setTimeout(resolve, 60_000);
        });
      }

      if (body.keywords) {
        const newKeywords = await imageEndpoints.create({
          type: 'extension',
          encoding: 'plain',
          name: 'keywords.txt',
          project: instance.project,
          instance: instance.id,
          file: body.keywords.join('\n'),
        });

        wordlistId = newKeywords.id ?? undefined;
      }

      const assessment = await createAssessment({
        bundleId: body.bundleId,
        wordlistId,
        instanceId,
      });

      if (!assessment.id) {
        throw new Error('Assessment ID not returned from API');
      }

      while ((await getAssessment(assessment.id)).status !== 'new') {
        await new Promise((resolve) => {
          setTimeout(resolve, 5000);
        });
      }

      await startMonitoring(assessment.id);

      while ((await getAssessment(assessment.id)).status !== 'monitoring') {
        await new Promise((resolve) => {
          setTimeout(resolve, 5000);
        });
      }

      if (body.input) {
        await deviceEndpoints.input(body.input);
      }

      await stopMonitoring(assessment.id);

      while (
        (await getAssessment(assessment.id)).status !== 'readyForTesting'
      ) {
        await new Promise((resolve) => {
          setTimeout(resolve, 5000);
        });
      }

      await runChecks(assessment.id);

      while ((await getAssessment(assessment.id)).status !== 'complete') {
        await new Promise((resolve) => {
          setTimeout(resolve, 5000);
        });
      }

      return getAssessment(assessment.id);
    },

    assessment: {
      /**
       * Get a MATRIX assessment.
       * @returns The response data.
       * @throws {Error} The error message.
       * @example const response = await corellium.device('123').matrix.assessment.get('456');
       */
      get: async (assessmentId: string) => getAssessment(assessmentId),

      /**
       * List MATRIX assessments.
       * @returns The response data.
       * @throws {Error} The error message.
       * @example const response = await corellium.device('123').matrix.assessment.list();
       */
      list: async () => {
        const response = await matrixApi.GET(
          '/{instanceId}/instances/{instanceId}/assessments',
          {
            params: {
              path: {
                instanceId,
              },
            },
          }
        );

        if (response.error) {
          throw new Error(response.error.error);
        }

        return response.data;
      },

      /**
       * Delete a MATRIX assessment.
       * @returns The response data.
       * @throws {Error} The error message.
       * @example const response = await corellium.device('123').matrix.assessment.delete('456');
       */
      delete: async (assessmentId: string) => {
        const response = await matrixApi.DELETE(
          '/{instanceId}/assessments/{assessmentId}',
          {
            params: {
              path: {
                instanceId,
                assessmentId,
              },
            },
          }
        );

        if (response.error) {
          throw new Error(response.error.error);
        }

        return response.data;
      },

      /**
       * Download a MATRIX assessment.
       * @param assessmentId The assessment ID.
       * @param format The format to download the assessment in.
       * @returns The response data.
       * @throws {Error} The error message.
       * @example const response = await corellium.device('123').matrix.assessment.download('456', 'html');
       */
      download: async (
        assessmentId: string,
        format: 'html' | 'json' = 'json'
      ) => {
        const response = await matrixApi.GET(
          '/{instanceId}/assessments/{assessmentId}/download',
          {
            params: {
              path: {
                instanceId,
                assessmentId,
              },
              query: {
                format,
              },
            },
          }
        );

        if (response.error) {
          throw new Error(response.error.error);
        }

        if (format === 'json') {
          return JSON.parse(
            response.data
          ) as components['schemas']['Assessment'];
        }

        return response.data;
      },
    },
  };
};
