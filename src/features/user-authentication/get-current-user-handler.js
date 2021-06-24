import { getSession } from 'utils/sessions';

const getCurrentUserHandler = async (request, response) => {
  if (request.method === 'GET') {
    const session = await getSession(request);
    return response.status(200).json({ user: session || null });
  }

  const message = 'This endpoint only supports the GET method.';
  return response.status(405).json({ message });
};

export default getCurrentUserHandler;
