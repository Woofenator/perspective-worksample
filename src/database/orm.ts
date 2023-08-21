import { MikroORM } from '@mikro-orm/core';
import { BetterSqliteDriver } from '@mikro-orm/better-sqlite';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

export const orm = await MikroORM.init<BetterSqliteDriver>({
    entities: ['./dist/database/entities/*.js'],
    entitiesTs: ['./src/database/entities/*.ts'],
    metadataProvider: TsMorphMetadataProvider,
    dbName: 'work-example',
    type: 'better-sqlite',
});
