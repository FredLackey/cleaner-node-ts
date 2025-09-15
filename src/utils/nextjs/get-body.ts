const getBody = async (req: any): Promise<any> => {
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

export default getBody;
