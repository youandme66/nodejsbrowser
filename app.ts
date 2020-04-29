import { alimama } from "./web/alimama";

async function runWeb(): Promise<void> {
    await alimama();
}

runWeb();