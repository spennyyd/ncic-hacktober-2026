import { createApp, h } from "vue";
import App from "./App.vue";
import { Identity } from "spacetimedb";
import { SpacetimeDBProvider } from "spacetimedb/vue";
import { DbConnection, ErrorContext } from "./module_bindings/index.ts";
import "./assets/style.css";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes.ts";

const HOST = import.meta.env.VITE_SPACETIMEDB_HOST ?? "ws://localhost:3000";
const DB_NAME = import.meta.env.VITE_SPACETIMEDB_DB_NAME ?? "vue-ts";
const TOKEN_KEY = `${HOST}/${DB_NAME}/auth_token`;

const onConnect = (_conn: DbConnection, identity: Identity, token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
  console.log(
    "Connected to SpacetimeDB with identity:",
    identity.toHexString(),
  );
};

const onDisconnect = () => {
  console.log("Disconnected from SpacetimeDB");
};

const onConnectError = (_ctx: ErrorContext, err: Error) => {
  console.log("Error connecting to SpacetimeDB:", err);
};

const connectionBuilder = DbConnection.builder()
  .withUri(HOST)
  .withDatabaseName(DB_NAME)
  .withToken(localStorage.getItem(TOKEN_KEY) || undefined)
  .onConnect(onConnect)
  .onDisconnect(onDisconnect)
  .onConnectError(onConnectError);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp({
  render: () => h(SpacetimeDBProvider, { connectionBuilder }, () => h(App)),
})
  .use(router)
  .mount("#app");
