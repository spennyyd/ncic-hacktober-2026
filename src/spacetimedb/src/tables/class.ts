import { table, t } from 'spacetimedb';

export const classroom = table(
  { public: true },
  {
    id: t.uuid(),
    name: t.string(),
    year: t.string(),
    semester: t.string(),
  }
)
