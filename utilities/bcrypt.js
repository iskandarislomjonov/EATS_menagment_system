import { hash, compare } from "bcrypt";
const saltOrRounds = 12;

export const hashPayload = (payload) => hash(payload, saltOrRounds);
export const comparePayload = (payload, encryptedPayload) => compare(payload, encryptedPayload);
