export const LIMIT = 10;

export const range = (start, end) => {
  return [...Array(end).keys()].map((el) => el + start);
};

export const getPaginator = (search) => {
  const result = {};
  const params = new URLSearchParams(search);

  params.forEach((value, key) => {
    result[key] = isNaN(value) ? value : Number(value);
  });

  const currentPage = result.page ? result.page : 1;
  const offset = currentPage * LIMIT - LIMIT;

  return { currentPage, offset };
};

export const objectToQueryString = (obj) => {
  const params = new URLSearchParams();

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      params.append(key, obj[key]);
    }
  }

  return params.toString();
};
