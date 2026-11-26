import { imageRepo } from "#lib/server/loader.ts"
import { error } from "@sveltejs/kit"
import type {RequestEvent, RequestHandler} from "./$types"


export async function GET({params, setHeaders}:RequestEvent) {
    const hash = params.hash ?? ""

    const image = await imageRepo.get(hash).catch((err)=> {
        error(404, "Image not found")
    })

    setHeaders({
        "Content-Type": "image/jpeg",
        "Content-Length": image.byteLength.toString(),
    })

    return new Response(new Uint8Array(image))
}