/**
 * Type checking validation functions
 */

/**
 * Checks if a value is strictly true or false
 */
export function isBoolean(value: unknown): value is boolean {
  return value === true || value === false;
}

/**
 * Checks if a value is not set (null/undefined) or is a boolean
 */
export function isBooleanIfSet(value: unknown): boolean {
  return value === null || value === undefined || isBoolean(value);
}

/**
 * Checks if a value is a valid JavaScript Date object
 */
export function isDate(value: unknown): value is Date {
  return value instanceof Date && !isNaN(value.getTime());
}

/**
 * Checks if a value is defined (not undefined)
 */
export function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}

/**
 * Checks if a value is a function
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(value: unknown): value is Function {
  return typeof value === 'function';
}

/**
 * Checks if a value is an async function
 */
export function isAsync(value: unknown): boolean {
  return (
    typeof value === 'function' && value.constructor && value.constructor.name === 'AsyncFunction'
  );
}

/**
 * Checks if a value can be interpreted as a finite number
 */
export function isNumber(value: unknown): boolean {
  if (typeof value === 'number') {
    return isFinite(value);
  }
  if (typeof value === 'string' && value.trim() !== '') {
    const num = Number(value);
    return isFinite(num);
  }
  return false;
}

/**
 * Checks if a value is an array
 */
export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

/**
 * Checks if a value is a plain JavaScript object (not null, not an array)
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return (
    value !== null &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    !(value instanceof Date) &&
    !(value instanceof RegExp)
  );
}

/**
 * Checks if a value is neither null nor undefined
 */
export function isSet<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * Checks if a value is not null
 */
export function isNotNull<T>(value: T | null): value is T {
  return value !== null;
}

/**
 * Checks if a value is null or undefined
 */
export function isNullOrUndefined(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}
