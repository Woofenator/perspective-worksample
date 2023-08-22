import { BaseEntity, Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { nanoid } from 'nanoid';

@Entity()
export class User extends BaseEntity<User, 'id'> {
    @PrimaryKey({})
    id: string = nanoid();

    @Property()
    name: string;

    @Property()
    email: string;

    @Property({ onCreate: () => new Date() })
    createdAt: Date;

    constructor({ name, email }: { name: string; email: string }) {
        super();

        this.name = name;
        this.email = email;
    }
}
