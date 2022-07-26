function urlFormData(object = {}) {
  const body = new URLSearchParams();
  Object.keys(object).forEach((key) => {
    if (object[key]) body.set(key, object[key]);
    else body.set(key, '');
  });

  return body;
}

export default urlFormData;
