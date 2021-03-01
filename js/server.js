const SERVER_LINK = 'https://22.javascript.pages.academy/keksobooking';

const getData = (onSuccess, onFail) => {
  fetch(`${SERVER_LINK}/data`)
    .then((r) => r.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onFail();
    })
}

const sendData = (onSuccess, onFail, body) => {
  fetch(
    SERVER_LINK,
    {
      method: 'POST',
      body,
    },
  )
    .then((r) => {
      if (r.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    })
}


export {
  getData,
  sendData
}
