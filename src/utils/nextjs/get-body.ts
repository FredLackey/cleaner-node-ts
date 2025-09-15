const getBody = async (req) => {
  if (!req) {
    console.error('Invalid req object for getBody.');
    return {};
  }
  try {
    return await req.json();
  } catch (ex) {
    console.error(ex);
    return {};
  }
};

module.exports = getBody;
