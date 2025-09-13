/**
 * JWT (JSON Web Token) functions
 */

import * as crypto from 'crypto';
import type { Nullable } from '../types';

export interface JwtHeader {
  alg: string;
  typ: string;
}

export interface JwtClaims {
  iss?: string; // Issuer
  sub?: string; // Subject
  aud?: string | string[]; // Audience
  exp?: number; // Expiration time
  nbf?: number; // Not before
  iat?: number; // Issued at
  jti?: string; // JWT ID
  [key: string]: unknown;
}

export interface ParsedJwt {
  header: JwtHeader;
  payload: JwtClaims;
  claims: JwtClaims;
  signature: string;
  valid: boolean;
  expired: boolean;
}

/**
 * Base64 URL encode
 */
function base64UrlEncode(str: string): string {
  return Buffer.from(str)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

/**
 * Base64 URL decode
 */
function base64UrlDecode(str: string): string {
  str += '='.repeat((4 - (str.length % 4)) % 4);
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  return Buffer.from(str, 'base64').toString('utf8');
}

/**
 * Encodes (signs) a payload into a JWT token
 * @param payload - Payload to encode
 * @param secret - Secret key for signing
 * @param expiresIn - Expiration time in seconds (optional)
 * @returns JWT token string, or empty string if error
 */
export function encode(payload: JwtClaims, secret: string, expiresIn?: number): string {
  if (!payload || !secret) {
    return '';
  }

  if (typeof secret !== 'string') {
    return '';
  }

  try {
    const header: JwtHeader = {
      alg: 'HS256',
      typ: 'JWT',
    };

    // Add expiration if specified
    const claims = { ...payload };
    if (expiresIn && typeof expiresIn === 'number') {
      claims.exp = Math.floor(Date.now() / 1000) + expiresIn;
    }

    // Add issued at time
    claims.iat = Math.floor(Date.now() / 1000);

    const encodedHeader = base64UrlEncode(JSON.stringify(header));
    const encodedPayload = base64UrlEncode(JSON.stringify(claims));

    const signature = crypto
      .createHmac('sha256', secret)
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

    return `${encodedHeader}.${encodedPayload}.${signature}`;
  } catch {
    return '';
  }
}

/**
 * Decodes a JWT token without verifying the signature
 * @param token - JWT token to decode
 * @returns Decoded payload, or null if invalid
 */
export function decode(token: string): JwtClaims | null {
  if (!token || typeof token !== 'string') {
    return null;
  }

  try {
    const parts = token.split('.');
    if (parts.length !== 3 || !parts[1]) {
      return null;
    }

    const payload = base64UrlDecode(parts[1]);
    return JSON.parse(payload) as JwtClaims;
  } catch {
    return null;
  }
}

/**
 * Verifies a JWT token using a secret or public key
 * @param token - JWT token to verify
 * @param secret - Secret key for verification
 * @returns Decoded payload if valid, null otherwise
 */
export function verify(token: string, secret: string): JwtClaims | null {
  if (!token || !secret) {
    return null;
  }

  if (typeof token !== 'string' || typeof secret !== 'string') {
    return null;
  }

  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    const encodedHeader = parts[0];
    const encodedPayload = parts[1];
    const signature = parts[2];

    if (!encodedHeader || !encodedPayload || !signature) {
      return null;
    }

    // Verify signature
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

    if (signature !== expectedSignature) {
      return null;
    }

    const payload = JSON.parse(base64UrlDecode(encodedPayload)) as JwtClaims;

    // Check expiration
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    // Check not before
    if (payload.nbf && payload.nbf > Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Parses a JWT, returning details including validity and expiration status
 * @param token - JWT token to parse
 * @returns Parsed JWT details
 */
export function parseJwt(token: string): Nullable<ParsedJwt> {
  if (!token || typeof token !== 'string') {
    return null;
  }

  try {
    const parts = token.split('.');
    if (parts.length !== 3 || !parts[0] || !parts[1] || !parts[2]) {
      return null;
    }

    const header = JSON.parse(base64UrlDecode(parts[0])) as JwtHeader;
    const payload = JSON.parse(base64UrlDecode(parts[1])) as JwtClaims;

    const now = Math.floor(Date.now() / 1000);
    const expired = payload.exp ? payload.exp < now : false;

    return {
      header,
      payload,
      claims: payload,
      signature: parts[2],
      valid: true, // Can't verify without secret
      expired,
    };
  } catch {
    return null;
  }
}

/**
 * Converts an application-specific payload to JWT claims
 * @param payload - Application payload
 * @returns JWT claims object
 */
export function toClaims(payload: unknown): JwtClaims {
  if (!payload || typeof payload !== 'object') {
    return {};
  }

  const claims: JwtClaims = { ...(payload as Record<string, unknown>) };

  // Ensure standard claim types
  if (claims.exp && typeof claims.exp !== 'number') {
    claims.exp = parseInt(String(claims.exp), 10);
  }

  if (claims.iat && typeof claims.iat !== 'number') {
    claims.iat = parseInt(String(claims.iat), 10);
  }

  if (claims.nbf && typeof claims.nbf !== 'number') {
    claims.nbf = parseInt(String(claims.nbf), 10);
  }

  return claims;
}

/**
 * Converts JWT claims to an application-specific payload
 * @param claims - JWT claims
 * @returns Application payload
 */
export function fromClaims(claims: JwtClaims): JwtClaims | null {
  if (!claims || typeof claims !== 'object') {
    return null;
  }

  // Return a copy without modifications
  return { ...claims };
}

/**
 * JWT module containing all JWT utilities
 */
export const jwt = {
  encode,
  decode,
  verify,
  parseJwt,
  toClaims,
  fromClaims,
};
