const GET_DATA_URL = 'https://26.javascript.pages.academy/kekstagram/data';
const SEND_DATA_URL = 'https://26.javascript.pages.academy/kekstagram';

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
      throw new Error (`${response.status} - ${response.statusText}`);
    }
    onSuccess();
  } catch (err) {
    onFail();
  }
};

export { getData, sendData };
