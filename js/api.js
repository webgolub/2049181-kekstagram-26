import { GET, POST } from './const.js';

const getData = async (onSuccess, onFail) => {
  try {
    const response = await fetch(GET);
    const data = await response.json();
    if (!response.ok) {
      onFail();
    }
    onSuccess(data);
  } catch (err) {
    onFail();
  }
};

const sendData = async (onSuccess, onFail, body) => {
  try {
    const response = await fetch(POST, {
      method: 'POST',
      body,
    });
    if (!response.ok) {
      onFail();
    }
    onSuccess();
  } catch (err) {
    onFail();
  }
};

export { getData, sendData };
