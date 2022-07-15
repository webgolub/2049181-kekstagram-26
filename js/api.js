import { showAlert } from './util.js';
// const getData = (onSuccess) => {
//   fetch('https://26.javascript.pages.academy/kekstagram/data')
//     .then((data) => data.json())
//     .then((photos) => onSuccess(photos))
//     .catch(() => {
//       showAlert('Данные с сервера не получены. Попробуйте обновить страницу');
//     });
// };

const getData = async (onSuccess) => {
  try {
    const response = await fetch('https://26.javascript.pages.academy/kekstagram/data');
    const data = await response.json();
    if (!response.ok) {
      throw new Error (`${response.status} - ${response.statusText}`);
    }
    onSuccess(data);
  } catch (err) {
    showAlert('Данные с сервера не получены. Попробуйте обновить страницу');
  }
};

const sendData = async (onSuccess, onFail, body) => {
  try {
    const response = await fetch('https://26.javascript.pages.academy/kekstagram', {
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
// const sendData = (onSuccess, onFail, body) => {
//   fetch('https://26.javascript.pages.academy/kekstagram', {
//     method: 'POST',
//     body,
//   })
//     .then ((response) => {
//       if(response.ok) {
//         onSuccess();
//       } else {
//         onFail('Не удалось отправить форму. Попробуйте ещё раз');
//       }
//     })
//     .catch(() => {
//       onFail('Не удалось отправить форму. Попробуйте ещё раз');
//     });
// };

export {getData, sendData};
