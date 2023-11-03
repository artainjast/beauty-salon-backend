const jwt = require('jsonwebtoken');

const tokenGenerator = (id , privateKey , isCustomer = false , expireTime = '30d') => {
  const data = { userId: id };
  if (isCustomer) delete Object.assign(data, { customerId: data.userId })['userId'];
  
  return jwt.sign(data, privateKey, {
    expiresIn: expireTime
  });
};

module.exports = {
  tokenGenerator
};