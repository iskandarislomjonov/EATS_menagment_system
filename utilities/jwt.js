import Jwt from "jsonwebtoken";
const { sign, verify } = Jwt


import config from "config"
const jwt_key = config.get("JWT_KEY")

export const signPayload = (payload) => sign(payload, jwt_key);
export const verifyPayload = (payload) => verify(payload, jwt_key);