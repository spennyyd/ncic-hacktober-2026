import { table, t } from 'spacetimedb';

export const person = table(
  { public: true },
  {
    name: t.string(),
    classId: t.uuid()
  }
)
