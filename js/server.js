//todo ссылки в константу

const getData = (onSuccess, onFail) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
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
    'https://22.javascript.pages.academy/keksobooking',
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
