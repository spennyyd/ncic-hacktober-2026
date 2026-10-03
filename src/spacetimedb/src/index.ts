import { schema, t, table } from 'spacetimedb/server';

const spacetimedb = schema({
  person: table(
    { public: true },
    {
      name: t.string(),
      classId: t.uuid()
    },
  ),
  classroom: table(
    { public: true },
    {
      id: t.uuid(),
      name: t.string(),
      year: t.string(),
      semester: t.string(),
    }
  )
});
export default spacetimedb;

export const init = spacetimedb.init(_ctx => {
  // Called when the module is initially published
});

export const onConnect = spacetimedb.clientConnected(_ctx => {
  // Called every time a new client connects
});

export const onDisconnect = spacetimedb.clientDisconnected(_ctx => {
  // Called every time a client disconnects
});

export const add = spacetimedb.reducer(
  { name: t.string(), classId: t.uuid() },
  (ctx, { name, classId }) => {
    ctx.db.person.insert({ name: name, classId: classId });
  }
);

export const sayHello = spacetimedb.reducer(ctx => {
  for (const person of ctx.db.person.iter()) {
    console.info(`Hello, ${person.name}!`);
  }
  console.info('Hello, World!');
});
