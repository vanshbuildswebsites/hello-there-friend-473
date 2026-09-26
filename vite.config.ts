import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    base: "/hello-there-friend-473/",
  },

  tanstackStart: {
    server: { entry: "server" },
  },
});
