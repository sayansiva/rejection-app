//TODO: use async pipes
import { initializeFirebase } from 'lib/firebase';

const questionsHandler = async (request, response) => {
  if (request.method === 'POST') {
    const question = request.body;
    const admin = initializeFirebase();
    const result = await admin
      .firestore()
      .collection('questions')
      .add(question);

    return response.status(200).json(result);
  }

  if (request.method === 'GET') {
    const admin = initializeFirebase();
    const result = await admin.firestore().collection('questions').get();

    return response.status(200).json(result);
  }
};

export default questionsHandler;
