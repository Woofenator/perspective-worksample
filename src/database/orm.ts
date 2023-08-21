import { MikroORM } from '@mikro-orm/core';
import { BetterSqliteDriver } from '@mikro-orm/better-sqlite';

export const orm = await MikroORM.init<BetterSqliteDriver>({
    entities: ['./dist/database/entities'],
    entitiesTs: ['./src/database/entities'],
    dbName: 'work-example',
    type: 'better-sqlite',
});
