// import express from './express';
import nextjs from './nextjs';

/**
 * Asynchronously extracts the request body from a request object (req).
 * Primarily designed for Next.js environments, falling back to `req.body` if present.
 * Logs an error and returns an empty object if the request object is invalid.
 * @param {object} req The request object (e.g., from an HTTP request).
 * @returns {Promise<object>} A promise that resolves to the request body object.
 */
const getBody = async (req: any): Promise<any> => {
  if (!req) {
    console.error('Invalid req object for getBody.');
    return {};
  }
  if (req.body) {
    return req.body;
  }
  const body = nextjs.getBody(req);
  return body;
};

export default getBody;
