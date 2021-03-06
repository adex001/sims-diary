const trim = (req, res, next) => {
  const keysArr = Object.keys(req.body);

  req.body = keysArr.reduce((obj, key) => {
    obj[key] = typeof req.body[key] === 'string' ? req.body[key].replace(/ +/g, ' ').trim() : req.body[key];
    return obj;
  }, {});

  next();
}

export default trim;