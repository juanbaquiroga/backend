import { Application, Context, Router } from "https://deno.land/x/oak@v12.3.0/mod.ts";

const app = new Application();
const router = new Router();

router.get("/", (ctx: Context) => {
  const frase = ctx.request.url.searchParams.get('frase')
  const words = frase?.split(",").reverse().toString().replaceAll(',', ' ')
  console.log(words)
  ctx.response.status = 200;
  ctx.response.body = `
    <!DOCTYPE html>
    <html>
      <head><title>Hello oak!</title><head>
      <body>
        <h1 style="color: blue;">${words}</h1>
      </body>
    </html>
    `;
});

app.use(router.routes());

app.listen({ port: 3000 });

console.log("Server listening port 3000");
