import {IMAGE_STORAGE_PATH} from "$app/env/private"
import { createHash } from "node:crypto";
import { join } from "node:path";
import {access, writeFile, readFile} from "node:fs/promises"
import sharp from "sharp";
import { mkdirSync } from "node:fs";


export class ImageRepository {
    private storagePath: string;
    constructor(storagePath:string = IMAGE_STORAGE_PATH) {
        this.storagePath = storagePath
        mkdirSync(this.storagePath, {recursive:true}) // Napravi store folder ako ne postoji
    }

    async save(image: File): Promise<string> {
        // Dodati provjeru za velicinu slike
        this.validateFile(image)



        const inputBuffer = await this.toBuffer(image)

        const hash = this.computeHash(inputBuffer)
        const imagePath = this.getFilePath(hash)

        if (await this.exists(imagePath)) {
            return hash
        }

        const jpegBuffer = await this.convertToJpeg(inputBuffer)

        await this.safeWrite(imagePath, jpegBuffer)

        return hash
        
    }

    async get(hash: string): Promise<Buffer> {
        const imagePath = this.getFilePath(hash)
        return this.safeRead(imagePath)
    }

    private validateFile(image: File): void {
        // Dodaj error handleing
        
        return
    }

    private async toBuffer(image:File):Promise<Buffer> {
        const arrayBuffer = await image.arrayBuffer()
        return Buffer.from(arrayBuffer)
    }

    private getFilePath(hash:string): string {
        return join(this.storagePath, `${hash}.jpeg`);
    }

    private computeHash(buffer:Buffer): string {
        return createHash("sha256").update(buffer).digest("hex")
    }

    private async convertToJpeg(inputBuffer: Buffer): Promise<Buffer> {
        // Dodati provjeru je li zapravo slika
        return sharp(inputBuffer) 
            .rotate()
            .resize({width:500, height:500})// Dodati za cropat sliku
            .jpeg()
            .toBuffer()
    }

    private async safeWrite(filePath: string, buffer: Buffer): Promise<void> {
        return writeFile(filePath, buffer, {flag:"wx"}).catch((err:NodeJS.ErrnoException)=> {
            if (err.code !== "EEXIST") throw err
        })
    }

    private async safeRead(filePath: string): Promise<Buffer> {
        return readFile(filePath)
    }

    private async exists(path: string): Promise<boolean> {
        return access(path).then(
            () => true,
            () => false
        )
    }
}