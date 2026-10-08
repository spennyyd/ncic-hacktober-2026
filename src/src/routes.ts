import AddClass from "./views/AddClass.vue";
import Class from "./views/Class.vue";
import EditClass from "./views/EditClass.vue";
import Home from "./views/Home.vue";

export const routes = [
  { path: "/", component: Home },
  { path: "/class/:id", component: Class, props: true },
  { path: "/class/new", component: AddClass },
  { path: "/class/:id/edit", component: EditClass, props: true },
];
