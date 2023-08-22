import { defineConfig } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { User } from './src/database/entities/user.js';

export default defineConfig({
    entities: [User],
    metadataProvider: TsMorphMetadataProvider,
    dbName: 'work-example.sqlite',
    type: 'sqlite',
});
