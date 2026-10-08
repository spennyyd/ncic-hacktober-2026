import { schema, t, table } from "spacetimedb/server";

const person = table(
  { public: true },
  {
    id: t.u64().primaryKey().autoInc(),
    name: t.string(),
    classroomId: t.u64().index(),
  },
);

const classroom = table(
  { public: true },
  {
    id: t.u64().primaryKey().autoInc(),
    name: t.string(),
    year: t.string(),
    semester: t.string(),
  },
);

const spacetimedb = schema({
  person,
  classroom,
});
export default spacetimedb;

export const init = spacetimedb.init((_ctx) => {
  // Called when the module is initially published
});

export const onConnect = spacetimedb.clientConnected((_ctx) => {
  // Called every time a new client connects
});

export const onDisconnect = spacetimedb.clientDisconnected((_ctx) => {
  // Called every time a client disconnects
});

export const add = spacetimedb.reducer(
  { name: t.string(), classId: t.u64() },
  (ctx, { name, classId }) => {
    ctx.db.person.insert({ id: 0n, name: name, classroomId: classId });
  },
);

export const updatePerson = spacetimedb.reducer(
  { id: t.u64(), name: t.string() },
  (ctx, { id, name }) => {
    const person = ctx.db.person.id.find(id);
    if (person) {
      person.name = name;
      ctx.db.person.id.update(person);
    }
  },
);

export const addClass = spacetimedb.reducer(
  { name: t.string(), year: t.string(), semester: t.string() },
  (ctx, { name, year, semester }) => {
    ctx.db.classroom.insert({
      id: 0n,
      name: name,
      year: year,
      semester: semester,
    });
  },
);

export const sayHello = spacetimedb.reducer((ctx) => {
  for (const person of ctx.db.person.iter()) {
    console.info(`Hello, ${person.name}!`);
  }
  console.info("Hello, World!");
});
