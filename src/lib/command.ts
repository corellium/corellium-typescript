import WebSocket from 'ws';
import type createFetchClient from 'openapi-fetch';
import type { paths } from '../../types/corellium';

export const sendCommand = async (
  api: ReturnType<typeof createFetchClient<paths>>,
  instanceId: string,
  baseUrl: string,
  type: string,
  op: string,
  params?: Record<string, unknown>
  // eslint-disable-next-line @typescript-eslint/max-params
) => {
  const response = await api.GET('/v1/instances/{instanceId}', {
    params: {
      path: {
        instanceId,
      },
    },
  });

  if (response.error) {
    throw new Error(response.error.error);
  }

  const device = response.data;

  if (!device.agent?.info) {
    throw new Error('No agent info returned');
  }

  const websocketUrl = new URL(`/api/v1/agent/${device.agent.info}`, baseUrl);

  websocketUrl.protocol = 'wss:';

  const id = Math.floor(Math.random() * 1000);
  const props = { type, op, id, ...params };

  // eslint-disable-next-line promise/avoid-new
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(websocketUrl.toString());

    ws.on('close', (code) => {
      if (code !== 1000) {
        reject(new Error(`WebSocket closed with code ${code}`));
        return;
      }

      resolve(null);
    });

    ws.on('error', () => {
      reject(new Error('Error connecting to WebSocket'));
    });

    ws.on('open', () => {
      ws.send(JSON.stringify(props));
    });

    ws.on('message', (message) => {
      if (!Buffer.isBuffer(message)) {
        reject(new Error('Invalid message data, expecting buffer.'));
        return;
      }

      const data = message.toString();

      const content = JSON.parse(data) as Record<string, unknown> & {
        id?: number;
        error?: {
          message: string;
        };
      };

      if (!content.id) {
        reject(new Error('Invalid message data, expecting id.'));
        return;
      }

      if (content.error) {
        reject(new Error(content.error.message));
        return;
      }

      if (id === content.id) {
        resolve(content);
        ws.close();
      }
    });
  });
};
