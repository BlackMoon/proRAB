import 'reflect-metadata';

export const nameKey = Symbol('name');

/**
 * To perserve class name though mangling.
 * @example
 * @name('Customer')
 * class Customer {}
 * @param className
 */
export function name(className: string): ClassDecorator {
  return Reflect.metadata(nameKey, className);
}

/**
 * @example
 * const type = Customer;
 * getName(type); // 'Customer'
 * @param type
 */
export function getName(type: Function): string {
  return Reflect.getMetadata(nameKey, type);
}

/**
 * @example
 * const instance = new Customer();
 * getInstanceName(instance); // 'Customer'
 * @param instance
 */
export function getInstanceName(instance: Object): string {
  const constructor = instance.constructor;
  return Reflect.getMetadata(nameKey, constructor) || constructor.name;
}