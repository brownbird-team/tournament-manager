import crypto from 'node:crypto';
import { v7 as uuidv7 } from 'uuid';

import { 
    uniqueNamesGenerator, adjectives, animals, NumberDictionary
} from 'unique-names-generator';

export function genToken() {
    return crypto.randomBytes(64).toString('base64url');
}

export function genUUID() {
    return uuidv7();
}

export function genUsername() {
    const numbers = NumberDictionary.generate({ min: 10, max: 99 });

    return uniqueNamesGenerator({
        dictionaries: [ adjectives, animals, numbers ],
        style: 'capital',
        separator: '',
    });
}