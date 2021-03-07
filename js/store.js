let offerData = [];

const saveToStore = (data) => {
  // eslint-disable-next-line no-unused-vars
  offerData = data;
}

const getFromStore = () => saveToStore;

export {
  saveToStore,
  getFromStore
}
