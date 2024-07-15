export const generateToken = async (baseUrl: string, authorization: object) => {
  const url = new URL('/api/v1/users/login', baseUrl);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authorization),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = (await response.json()) as {
    token: string;
    expiration: string;
  };

  return data;
};
