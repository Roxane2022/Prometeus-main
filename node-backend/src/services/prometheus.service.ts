import { Registry, collectDefaultMetrics } from "prom-client";

export const register = new Registry()
collectDefaultMetrics({ register, prefix: 'node_backend_' })