import { GET_DATA_URL, SEND_DATA_URL } from './const.js';

const getData = async (onSuccess, onFail) => {
  try {
    const response = await fetch(GET_DATA_URL);
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
    const response = await fetch(SEND_DATA_URL, {
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
