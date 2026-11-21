import crypto from 'node:crypto';
import { v7 as uuidv7 } from 'uuid';

export function genToken() {
    return crypto.randomBytes(64).toString('base64url');
}

export function genUUID() {
    return uuidv7();
}