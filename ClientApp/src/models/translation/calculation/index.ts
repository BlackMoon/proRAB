import { Constructor, getName } from '@shared';
import { Aggregate } from './aggregate';

export * from './aggregate-type';
export * from './aggregate';

export const aggregateTypes: ReadonlyMap<string, Constructor<Aggregate>> = new Map<string, Constructor<Aggregate>> ([
    [ getName(Aggregate), Aggregate ]
]);
