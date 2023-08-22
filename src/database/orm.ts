import { MikroORM } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { SqliteDriver } from '@mikro-orm/sqlite';
import { User } from './entities/user.js';

export const orm = await MikroORM.init<SqliteDriver>({
    entities: [User],
    metadataProvider: TsMorphMetadataProvider,
    dbName: 'work-example.sqlite',
    type: 'sqlite',
});
