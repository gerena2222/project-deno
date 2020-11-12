import { Application, send } from 'https://deno.land/x/oak/mod.ts';
import userMidleware from './userMidleware.ts'
import router from './rute.ts';
import "https://deno.land/x/dotenv/mod.ts";

const app = new Application();
app.use(userMidleware);

app.use(router.routes());
app.use(router.allowedMethods());
app.use(async (context) => {
    await send(context, context.request.url.pathname, {
      root: `${Deno.cwd()}`
    });
  });

console.log("service jalan di port 8080");
await app.listen({port : 8080});
