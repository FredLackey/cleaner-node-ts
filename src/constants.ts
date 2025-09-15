const HTTP_STATUS_PHRASES = {
  CONTINUE: {
    code       : 100,
    message    : 'Continue',
    description: 'indicates that the initial part of a request has been received and has not yet been rejected by the server.',
    spec_title : 'RFC7231#6.2.1',
    spec_href  : 'https://tools.ietf.org/html/rfc7231#section-6.2.1'
  },
  SWITCHING_PROTOCOLS: {
    code       : 101,
    message    : 'Switching Protocols',
    description: "indicates that the server understands and is willing to comply with the client's request, via the Upgrade header field, for a change in the application protocol being used on this connection.",
    spec_title : 'RFC7231#6.2.2',
    spec_href  : 'https://tools.ietf.org/html/rfc7231#section-6.2.2'
  },
  PROCESSING: {
    code       : 102,
    message    : 'Processing',
    description: 'is an interim response used to inform the client that the server has accepted the complete request, but has not yet completed it.',
    spec_title : 'RFC5218#10.1',
    spec_href  : 'https://tools.ietf.org/html/rfc2518#section-10.1'
  },
  OK: {
    code       : 200,
    message    : 'OK',
    description: 'indicates that the request has succeeded.',
    spec_title : 'RFC7231#6.3.1',
    spec_href  : 'https://tools.ietf.org/html/rfc7231#section-6.3.1'
  },
  CREATED: {
    code       : 201,
    message    : 'Created',
    description: 'indicates that the request has been fulfilled and has resulted in one or more new resources being created.',
    spec_title : 'RFC7231#6.3.2',
    spec_href  : 'https://tools.ietf.org/html/rfc7231#section-6.3.2'
  },
  ACCEPTED: {
    code       : 202,
    message    : 'Accepted',
    description: 'indicates that the request has been accepted for processing, but the processing has not been completed.',
    spec_title : 'RFC7231#6.3.3',
    spec_href  : 'https://tools.ietf.org/html/rfc7231#section-6.3.3'
  },
  NON_AUTHORITATIVE_INFORMATION: {
    code       : 203,
    message    : 'Non-Authoritative Information',
    description: "indicates that the request was successful but the enclosed payload has been modified from that of the origin server's 200 (OK) response by a transforming proxy.",
    spec_title : 'RFC7231#6.3.4',
    spec_href  : 'https://tools.ietf.org/html/rfc7231#section-6.3.4'
  },
  NO_CONTENT: {
    code       : 204,
    message    : 'No Content',
    description: 'indicates that the server has successfully fulfilled the request and that there is no additional content to send in the response payload body.',
    spec_title : 'RFC7231#6.3.5',
    spec_href  : 'https://tools.ietf.org/html/rfc7231#section-6.3.5'
  },
  RESET_CONTENT: {
    code       : 205,
    message    : 'Reset Content',
    description: 'indicates that the server has fulfilled the request and desires that the user agent reset the document view, which caused the request to be sent, to its original state as received from the origin server.',
    spec_title : 'RFC7231#6.3.6',
    spec_href  : 'https://tools.ietf.org/html/rfc7231#section-6.3.6'
  },
  PARTIAL_CONTENT: {
    code       : 206,
    message    : 'Partial Content',
    description: "indicates that the server is successfully fulfilling a range request for the target resource by transferring one or more parts of the selected representation that correspond to the satisfiable ranges found in the requests's Range header field.",
    spec_title : 'RFC7233#4.1',
    spec_href  : 'https://tools.ietf.org/html/rfc7233#section-4.1'
  },
  MULTI_STATUS: {
    code       : 207,
    message    : 'Multi-Status',
    description: 'provides status for multiple independent operations.',
    spec_title : 'RFC5218#10.2',
    spec_href  : 'https://tools.ietf.org/html/rfc2518#section-10.2'
  },
  IM_USED: {
    code       : 226,
    message    : 'IM Used',
    description: 'The server has fulfilled a GET request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.',
    spec_title : 'RFC3229#10.4.1',
    spec_href  : 'https://tools.ietf.org/html/rfc3229#section-10.4.1'
  },
  MULTIPLE_CHOICES: {
    code       : 300,
    message    : 'Multiple Choices',
    description: 'indicates that the target resource has more than one representation, each with its own more specific identifier, and information about the alternatives is being provided so that the user (or user agent) can select a preferred representation by redirecting its request to one or more of those identifiers.',
    spec_title : 'RFC7231#6.4.1',
    spec_href  : 'https://tools.ietf.org/html/rfc7231#section-6.4.1'
  },
  MOVED_PERMANENTLY: {
    code       : 301,
    message    : 'Moved Permanently',
    description: 'indicates that the target resource has been assigned a new permanent URI and any future references to this resource ought to use one of the enclosed URIs.',
    spec_title : 'RFC7231#6.4.2',
    spec_href  : 'https://tools.ietf.org/html/rfc7231#section-6.4.2'
  },
  FOUND: {
    code       : 302,
    message    : 'Found',
    description: 'indicates that the target resource resides temporarily under a different URI.',
    spec_title : 'RFC7231#6.4.3',
    spec_href  : 'https://tools.ietf.org/html/rfc7231#section-6.4.3'
  },
  SEE_OTHER: {
    code       : 303,
    message    : 'See Other',
    description: 'indicates that the server is redirecting the user agent to a different resource, as indicated by a URI in the Location header field, that is intended to provide an indirect response to the original request.',
    spec_title : 'RFC7231#6.4.4',
    spec_href  : 'https://tools.ietf.org/html/rfc7231#section-6.4.4'
  },
  NOT_MODIFIED: {
    code       : 304,
    message    : 'Not Modified',
    description: 'indicates that a conditional GET request has been received and would have resulted in a 200 (OK) response if it were not for the fact that the condition has evaluated to false.',
    spec_title : 'RFC7232#4.1',
    spec_href  : 'https://tools.ietf.org/html/rfc7232#section-4.1'
  },
  USE_PROXY: {
    code       : 305,
    message    : 'Use Proxy',
    description: '*deprecated*',
    spec_title : 'RFC7231#6.4.5',
    spec_href  : 'https://tools.ietf.org/html/rfc7231#section-6.4.5'
  },
  TEMPORARY_REDIRECT: {
    code       : 307,
    message    : 'Temporary Redirect',
    description: 'indicates that the target resource resides temporarily under a different URI and the user agent MUST NOT change the request method if it performs an automatic redirection to that URI.',
    spec_title : 'RFC7231#6.4.7',
    spec_href  : 'https://tools.ietf.org/html/rfc7231#section-6.4.7'
  },
  PERMANENT_REDIRECT: {
    code       : 308,
    message    : 'Permanent Redirect',
    description: 'The target resource has been assigned a new permanent URI and any future references to this resource outght to use one of the enclosed URIs. [...] This status code is similar to 301 Moved Permanently (Section 7.3.2 of rfc7231), except that it does not allow rewriting the request method from POST to GET.',
    spec_title : 'RFC7538',
    spec_href  : 'https://tools.ietf.org/html/rfc7538'
  },
  BAD_REQUEST: {
    code       : 400,
    message    : 'Bad Request',
    description: 'indicates that the server cannot or will not process the request because the received syntax is invalid, nonsensical, or exceeds some limitation on what the server is willing to process.',
    spec_title : 'RFC7231#6.5.1',
    spec_href  : 'https://tools.ietf.org/html/rfc7231#section-6.5.1'
  },
  UNAUTHORIZED: {
    code       : 401,
    message    : 'Unauthorized',
    description: 'indicates that the request has not been applied because it lacks valid authentication credentials for the target resource.',
    spec_title : 'RFC7235#6.3.1',
    spec_href  : 'https://tools.ietf.org/html/rfc7235#section-3.1'
  },
  PAYMENT_REQUIRED: {
    code       : 402,
    message    : 'Payment Required',
    description: '*reserved*',
    spec_title : 'RFC7231#6.5.2',
    spec_href  : 'https://tools.ietf.org/html/rfc7231#section-6.5.2'
  },
  FORBIDDEN: {
    code       : 403,
    message    : 'Forbidden',
    description: 'indicates that the server understood the request but refuses to authorize it.',
    spec_title : 'RFC7231#6.5.3',
    spec_href  : 'https://tools.ietf.org/html/rfc7231#section-6.5.3'
  },
  NOT_FOUND: {
    code       : 404,
    message    : 'Not Found',
    description: 'indicates that the origin server did not find a current representation for the target resource or is not willing to disclose that one exists.',
    spec_title : 'RFC7231#6.5.4',
    spec_href  : 'https://tools.ietf.org/html/rfc7231#section-6.5.4'
  },
  METHOD_NOT_ALLOWED: {
    code       : 405,
    message    : 'Method Not Allowed',
    description: 'indicates that the method specified in the request-line is known by the origin server but not supported by the target resource.',
    spec_title : 'RFC7231#6.5.5',
    spec_href  : 'https://tools.ietf.org/html/rfc7231#section-6.5.5'
  },
  NOT_ACCEPTABLE: {
    code       : 406,
    message    : 'Not Acceptable',
    description: 'indicates that the target resource does not have a current representation that would be acceptable to the user agent, according to the proactive negotiation header fields received in the request, and the server is unwilling to supply a default representation.',
    spec_title : 'RFC7231#6.5.6',
    spec_href  : 'https://tools.ietf.org/html/rfc7231#section-6.5.6'
  },
  PROXY_AUTHENTICATION_REQUIRED: {
    code       : 407,
    message    : 'Proxy Authentication Required',
    description: 'is similar to 401 (Unauthorized), but indicates that the client needs to authenticate itself in order to use a proxy.',
    spec_title : 'RFC7235#3.2',
    spec_href  : 'https://tools.ietf.org/html/rfc7235#section-3.2'
  },
  REQUEST_TIMEOUT: {
    code       : 408,
    message    : 'Request Timeout',
    description: 'indicates that the server did not receive a complete request message within the time that it was prepared to wait.',
    spec_title : 'RFC7231#6.5.7',
    spec_href  : 'https://tools.ietf.org/html/rfc7231#section-6.5.7'
  },
  CONFLICT: {
    code       : 409,
    message    : 'Conflict',
    description: 'indicates that the request could not be completed due to a conflict with the current state of the resource.',
    spec_title : 'RFC7231#6.5.8',
    spec_href  : 'https://tools.ietf.org/html/rfc7231#section-6.5.8'
  },
  GONE: {
    code       : 410,
    message    : 'Gone',
    description: 'indicates that access to the target resource is no longer available at the origin server and that this condition is likely to be permanent.',
    spec_title : 'RFC7231#6.5.9',
    spec_href  : 'https://tools.ietf.org/html/rfc7231#section-6.5.9'
  },
  LENGTH_REQUIRED: {
    code       : 411,
    message    : 'Length Required',
    description: 'indicates that the server refuses to accept the request without a defined Content-Length.',
    spec_title : 'RFC7231#6.5.10',
    spec_href  : 'https://tools.ietf.org/html/rfc7231#section-6.5.10'
  },
  PRECONDITION_FAILED: {
    code       : 412,
    message    : 'Precondition Failed',
    description: 'indicates that one or more preconditions given in the request header fields evaluated to false when tested on the server.',
    spec_title : 'RFC7232#4.2',
    spec_href  : 'https://tools.ietf.org/html/rfc7232#section-4.2'
  },
  PAYLOAD_TOO_LARGE: {
    code       : 413,
    message    : 'Payload Too Large',
    description: 'indicates that the server is refusing to process a request because the request payload is larger than the server is willing or able to process.',
    spec_title : 'RFC7231#6.5.11',
    spec_href  : 'https://tools.ietf.org/html/rfc7231#section-6.5.11'
  },
  URI_TOO_LONG: {
    code       : 414,
    message    : 'URI Too Long',
    description: 'indicates that the server is refusing to service the request because the request-target is longer than the server is willing to interpret.',
    spec_title : 'RFC7231#6.5.12',
    spec_href  : 'https://tools.ietf.org/html/rfc7231#section-6.5.12'
  },
  UNSUPPORTED_MEDIA_TYPE: {
    code       : 415,
    message    : 'Unsupported Media Type',
    description: 'indicates that the origin server is refusing to service the request because the payload is in a format not supported by the target resource for this method.',
    spec_title : 'RFC7231#6.5.13',
    spec_href  : 'https://tools.ietf.org/html/rfc7231#section-6.5.13'
  },
  RANGE_NOT_SATISFIABLE: {
    code       : 416,
    message    : 'Range Not Satisfiable',
    description: "indicates that none of the ranges in the request's Range header field overlap the current extent of the selected resource or that the set of ranges requested has been rejected due to invalid ranges or an excessive request of small or overlapping ranges.",
    spec_title : 'RFC7233#4.4',
    spec_href  : 'https://tools.ietf.org/html/rfc7233#section-4.4'
  },
  EXPECTATION_FAILED: {
    code       : 417,
    message    : 'Expectation Failed',
    description: "indicates that the expectation given in the request's Expect header field could not be met by at least one of the inbound servers.",
    spec_title : 'RFC7231#6.5.14',
    spec_href  : 'https://tools.ietf.org/html/rfc7231#section-6.5.14'
  },
  IM_A_TEAPOT: {
    code       : 418,
    message    : "I'm a teapot",
    description: "Any attempt to brew coffee with a teapot should result in the error code 418 I'm a teapot.",
    spec_title : 'RFC2324#2.3.1',
    spec_href  : 'https://tools.ietf.org/html/rfc2324#section-2.3.1'
  },
  UNPROCESSABLE_ENTITY: {
    code       : 422,
    message    : 'Unprocessable Entity',
    description: 'means the server understands the content type of the request entity (hence a 415(Unsupported Media Type) status code is inappropriate), and the syntax of the request entity is correct (thus a 400 (Bad Request) status code is inappropriate) but was unable to process the contained instructions.',
    spec_title : 'RFC5218#10.3',
    spec_href  : 'https://tools.ietf.org/html/rfc2518#section-10.3'
  },
  LOCKED: {
    code       : 423,
    message    : 'Locked',
    description: 'means the source or destination resource of a method is locked.',
    spec_title : 'RFC5218#10.4',
    spec_href  : 'https://tools.ietf.org/html/rfc2518#section-10.4'
  },
  FAILED_DEPENDENCY: {
    code       : 424,
    message    : 'Failed Dependency',
    description: 'means that the method could not be performed on the resource because the requested action depended on another action and that action failed.',
    spec_title : 'RFC5218#10.5',
    spec_href  : 'https://tools.ietf.org/html/rfc2518#section-10.5'
  },
  UPGRADE_REQUIRED: {
    code       : 426,
    message    : 'Upgrade Required',
    description: 'indicates that the server refuses to perform the request using the current protocol but might be willing to do so after the client upgrades to a different protocol.',
    spec_title : 'RFC7231#6.5.15',
    spec_href  : 'https://tools.ietf.org/html/rfc7231#section-6.5.15'
  },
  PRECONDITION_REQUIRED: {
    code       : 428,
    message    : 'Precondition Required',
    description: 'indicates that the origin server requires the request to be conditional.',
    spec_title : 'RFC6585#3',
    spec_href  : 'https://tools.ietf.org/html/rfc6585#section-3'
  },
  TOO_MANY_REQUESTS: {
    code       : 429,
    message    : 'Too Many Requests',
    description: 'indicates that the user has sent too many requests in a given amount of time (rate limiting).',
    spec_title : 'RFC6585#4',
    spec_href  : 'https://tools.ietf.org/html/rfc6585#section-4'
  },
  REQUEST_HEADER_FIELDS_TOO_LARGE: {
    code       : 431,
    message    : 'Request Header Fields Too Large',
    description: 'indicates that the server is unwilling to process the request because its header fields are too large.',
    spec_title : 'RFC6585#5',
    spec_href  : 'https://tools.ietf.org/html/rfc6585#section-5'
  },
  UNAVAILABLE_FOR_LEGAL_REASONS: {
    code       : 451,
    message    : 'Unavailable For Legal Reasons',
    description: 'This status code indicates that the server is denying access to the resource in response to a legal demand.',
    spec_title : 'draft-ietf-httpbis-legally-restricted-status',
    spec_href  : 'https://tools.ietf.org/html/draft-ietf-httpbis-legally-restricted-status'
  },
  INTERNAL_SERVER_ERROR: {
    code       : 500,
    message    : 'Internal Server Error',
    description: 'indicates that the server encountered an unexpected condition that prevented it from fulfilling the request.',
    spec_title : 'RFC7231#6.6.1',
    spec_href  : 'https://tools.ietf.org/html/rfc7231#section-6.6.1'
  },
  NOT_IMPLEMENTED: {
    code       : 501,
    message    : 'Not Implemented',
    description: 'indicates that the server does not support the functionality required to fulfill the request.',
    spec_title : 'RFC7231#6.6.2',
    spec_href  : 'https://tools.ietf.org/html/rfc7231#section-6.6.2'
  },
  BAD_GATEWAY: {
    code       : 502,
    message    : 'Bad Gateway',
    description: 'indicates that the server, while acting as a gateway or proxy, received an invalid response from an inbound server it accessed while attempting to fulfill the request.',
    spec_title : 'RFC7231#6.6.3',
    spec_href  : 'https://tools.ietf.org/html/rfc7231#section-6.6.3'
  },
  SERVICE_UNAVAILABLE: {
    code       : 503,
    message    : 'Service Unavailable',
    description: 'indicates that the server is currently unable to handle the request due to a temporary overload or scheduled maintenance, which will likely be alleviated after some delay.',
    spec_title : 'RFC7231#6.6.4',
    spec_href  : 'https://tools.ietf.org/html/rfc7231#section-6.6.4'
  },
  GATEWAY_TIME_OUT: {
    code       : 504,
    message    : 'Gateway Time-out',
    description: 'indicates that the server, while acting as a gateway or proxy, did not receive a timely response from an upstream server it needed to access in order to complete the request.',
    spec_title : 'RFC7231#6.6.5',
    spec_href  : 'https://tools.ietf.org/html/rfc7231#section-6.6.5'
  },
  HTTP_VERSION_NOT_SUPPORTED: {
    code       : 505,
    message    : 'HTTP Version Not Supported',
    description: 'indicates that the server does not support, or refuses to support, the protocol version that was used in the request message.',
    spec_title : 'RFC7231#6.6.6',
    spec_href  : 'https://tools.ietf.org/html/rfc7231#section-6.6.6'
  },
  VARIANT_ALSO_NEGOTIATES: {
    code       : 506,
    message    : 'Variant Also Negotiates',
    description: 'indicates that the server has an internal configuration error: the chosen variant resource is configured to engage in transparent content negotiation itself, and is therefore not a proper end point in the negotiation process.',
    spec_title : 'RFC2295#8.1',
    spec_href  : 'https://tools.ietf.org/html/rfc2295#section-8.1'
  },
  INSUFFICIENT_STORAGE: {
    code       : 507,
    message    : 'Insufficient Storage',
    description: 'means the method could not be performed on the resource because the server is unable to store the representation needed to successfully complete the request.',
    spec_title : 'RFC5218#10.6',
    spec_href  : 'https://tools.ietf.org/html/rfc2518#section-10.6'
  },
  NETWORK_AUTHENTICATION_REQUIRED: {
    code       : 511,
    message    : 'Network Authentication Required',
    description: 'indicates that the client needs to authenticate to gain network access.',
    spec_title : 'RFC6585#6',
    spec_href  : 'https://tools.ietf.org/html/rfc6585#section-6'
  }
};

const HTTP_STATUS_CODES = {
  CONTINUE                       : 100,
  SWITCHING_PROTOCOLS            : 101,
  PROCESSING                     : 102,
  OK                             : 200,
  CREATED                        : 201,
  ACCEPTED                       : 202,
  NON_AUTHORITATIVE_INFORMATION  : 203,
  NO_CONTENT                     : 204,
  RESET_CONTENT                  : 205,
  PARTIAL_CONTENT                : 206,
  MULTI_STATUS                   : 207,
  IM_USED                        : 226,
  MULTIPLE_CHOICES               : 300,
  MOVED_PERMANENTLY              : 301,
  FOUND                          : 302,
  SEE_OTHER                      : 303,
  NOT_MODIFIED                   : 304,
  USE_PROXY                      : 305,
  TEMPORARY_REDIRECT             : 307,
  PERMANENT_REDIRECT             : 308,
  BAD_REQUEST                    : 400,
  UNAUTHORIZED                   : 401,
  PAYMENT_REQUIRED               : 402,
  FORBIDDEN                      : 403,
  NOT_FOUND                      : 404,
  METHOD_NOT_ALLOWED             : 405,
  NOT_ACCEPTABLE                 : 406,
  PROXY_AUTHENTICATION_REQUIRED  : 407,
  REQUEST_TIMEOUT                : 408,
  CONFLICT                       : 409,
  GONE                           : 410,
  LENGTH_REQUIRED                : 411,
  PRECONDITION_FAILED            : 412,
  PAYLOAD_TOO_LARGE              : 413,
  URI_TOO_LONG                   : 414,
  UNSUPPORTED_MEDIA_TYPE         : 415,
  RANGE_NOT_SATISFIABLE          : 416,
  EXPECTATION_FAILED             : 417,
  IM_A_TEAPOT                    : 418,
  UNPROCESSABLE_ENTITY           : 422,
  LOCKED                         : 423,
  FAILED_DEPENDENCY              : 424,
  UPGRADE_REQUIRED               : 426,
  PRECONDITION_REQUIRED          : 428,
  TOO_MANY_REQUESTS              : 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS  : 451,
  INTERNAL_SERVER_ERROR          : 500,
  NOT_IMPLEMENTED                : 501,
  BAD_GATEWAY                    : 502,
  SERVICE_UNAVAILABLE            : 503,
  GATEWAY_TIME_OUT               : 504,
  HTTP_VERSION_NOT_SUPPORTED     : 505,
  VARIANT_ALSO_NEGOTIATES        : 506,
  INSUFFICIENT_STORAGE           : 507,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};

const OPTION_TYPE = {
  BOOLEAN : { name: 'Boolean',  yargs: 'boolean',  display: 'boolean' },
  NUMBER  : { name: 'Number',   yargs: 'number',   display: 'number' },
  STRING  : { name: 'String',   yargs: 'string',   display: 'string' },
  ARRAY   : { name: 'Array',    yargs: 'string',   display: 'string | string[]' },
  PATH    : { name: 'Path',     yargs: 'string',   display: 'string (path)' },
  FUNCTION: { name: 'Function', yargs: 'function', display: '(function)' },
};

const CLEAR_CODE = 'ACDEFGHJKLMNPRTVWXY0123456789';

const NUMBERS = {
  MS: {
    PER: {}
  }
};
NUMBERS.MS.PER.SECOND = 1000;
NUMBERS.MS.PER.MINUTE = NUMBERS.MS.PER.SECOND * 60;
NUMBERS.MS.PER.HOUR   = NUMBERS.MS.PER.MINUTE * 60;
NUMBERS.MS.PER.DAY    = NUMBERS.MS.PER.HOUR   * 24;
NUMBERS.MS.PER.WEEK   = NUMBERS.MS.PER.DAY    * 7;

module.exports = {
  ALPHA       : 'abcdefghijklmnopqrstuvwxyz',
  ALPHANUMERIC: 'abcdefghijklmnopqrstuvwxyz0123456789',
  AUDIT_FIELDS: [
    'createdBy', 'createdAt', 'updatedBy', 'updatedAt', 'deletedBy', 'deletedAt',
    '_ac', '_av', '_ad', '_au',
    'ac', 'av', 'ad', 'au',
  ],
  BRACKETS    : [
    { open: '<', close: '/>' },
    { open: '<', close: '>' },
    { open: '<%=', close: '%>' },
    { open: '[', close: ']' },
    { open: '[%', close: '%]' },
    { open: '{', close: '}' },
    { open: '(', close: ')' },
    { open: '%', close: '%' },
    { open: '_', close: '_' }
  ],
  CLEAR_CODE,
  DIGITS   : '0123456789',
  ENUM_NAME: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_',
  ENUM_KEYS: [
    'enum',
    'enum_name',
    'ENUM',
    'ENUM_NAME',
    'enumName',
  ],
  QUOTE    : '"',
  SPACE    : ' ',
  
  EMPTY_GUID: '00000000-0000-0000-0000-000000000000',
  EMPTY_UID : '00000000000000000000000000000000',
  EMPTY_IP  : '0.0.0.0',

  NUMBERS,

  HTTP: {
    STATUS: {
      CODES  : HTTP_STATUS_CODES,
      PHRASES: HTTP_STATUS_PHRASES
    }
  },
  TYPES: {
    OPTION: OPTION_TYPE
  },

  DEFAULTS: {
    CODE: {
      LENGTH: 6,
      CHARS : CLEAR_CODE,
    }
  },

  ZERO_DATE: new Date('1970-01-01Z00:00:00:000'),

    // INTERNAL
  SALT_OPTION  : 'base64',
  HMAC_OPTION  : 'sha1',
  DIGEST_OPTION: 'hex',
  ENCODE_FORMAT: 'base64',
  DECODE_FORMAT: 'ascii',
  STRING_HMAC  : 'md5'
};
