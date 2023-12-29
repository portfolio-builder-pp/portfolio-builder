export type WithDefaultValues<Entity, FieldsWithDefaults extends keyof Entity> = Omit<Entity, FieldsWithDefaults> & Partial<Pick<Entity, FieldsWithDefaults>>;