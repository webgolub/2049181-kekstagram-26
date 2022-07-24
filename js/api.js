import { RequestUrl } from './const.js';

const getData = async (onSuccess, onFail) => {
  try {
    const response = await fetch(RequestUrl.GET);
    if (!response.ok) {
      onFail();
    } else {
      const data = await response.json();
      onSuccess(data);
    }
  } catch (err) {
    onFail();
  }
};

const sendData = async (onSuccess, onFail, body) => {
  try {
    const response = await fetch(RequestUrl.POST, {
      method: 'POST',
      body,
    });
    if (!response.ok) {
      onFail();
    } else {
      onSuccess();
    }
  } catch (err) {
    onFail();
  }
};

export { getData, sendData };
