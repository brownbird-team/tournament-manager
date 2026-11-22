import Login from './components/Login.svelte';
import Connection from './components/Connection.svelte';

import { defineWidgetPack } from "#plugins";

export default defineWidgetPack({
    login: Login,
    connection: Connection,
});