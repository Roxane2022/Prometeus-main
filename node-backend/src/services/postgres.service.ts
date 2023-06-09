import { randomUUID } from 'crypto';
import { Client } from 'pg';

export const pgClient = new Client({
  host: 'postgres',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'postgres'
})

pgClient.on('error', err => console.log(err))

export const initPg = async () => {
  await pgClient.connect()
  await pgClient.query('CREATE TABLE IF NOT EXISTS users (id UUID PRIMARY KEY, name VARCHAR(255)), time TIMESTAMP(10)')
}

export async function resetPg() {
  await pgClient.query('DROP TABLE IF EXISTS users')
  await pgClient.query('CREATE TABLE users (id UUID PRIMARY KEY, name VARCHAR(255))')
  await pgClient.query('INSERT INTO users (id, name) VALUES ($1, $2)', [randomUUID(), 'Lucas'])
  await pgClient.query('INSERT INTO users (id, name) VALUES ($1, $2)', [randomUUID(), 'Ivan'])
  await pgClient.query('INSERT INTO users (id, name) VALUES ($1, $2)', [randomUUID(), 'Manuel'])
  await pgClient.query('INSERT INTO users (id, name) VALUES ($1, $2)', [randomUUID(), 'Benjamin'])

  console.log('Postgres DB flushed')
}

export async function resetDashboard() {
  await pgClient.query('DROP TABLE IF EXISTS tasks')
  await pgClient.query('CREATE TABLE tasks (id UUID PRIMARY KEY, name VARCHAR(255), time TIMESTAMP(10)')
  await pgClient.query('INSERT INTO tasks (id, name, time) VALUES ($1, $2, $3)', [randomUUID(), 'Arzt Besuch' ])
  await pgClient.query('INSERT INTO tasks (id, name, time) VALUES ($1, $2, $3)', [randomUUID(), 'Termin beim Friseur'])
  await pgClient.query('INSERT INTO tasks (id, name, time) VALUES ($1, $2, $3)', [randomUUID(), 'Auto waschen'])
  await pgClient.query('INSERT INTO tasks (id, name, time) VALUES ($1, $2, $3)', [randomUUID(), 'Kinder zum Karate Training fahren'])

  console.log('Postgres DB flushed')
}

/* export async function SetDetails() {
  //await pgClient.query('DROP TABLE IF EXISTS details')
  await pgClient.query('CREATE TABLE details (id UUID PRIMARY KEY, name VARCHAR(255), time TimeDatecls(255), address VARCHAR(255)')
  await pgClient.query('INSERT INTO details (id, name, time) VALUES ($1, $2, $3)', [randomUUID(), 'Arzt Besuch', '10:00'])
  await pgClient.query('INSERT INTO details (id, name, time) VALUES ($1, $2, $3)', [randomUUID(), 'Termin beim Friseur', '13:00'])
  await pgClient.query('INSERT INTO details (id, name, time) VALUES ($1, $2, $3)', [randomUUID(), 'Auto waschen', '14:00'])
  await pgClient.query('INSERT INTO details (id, name, time) VALUES ($1, $2, $3)', [randomUUID(), 'Kinder zum Karate Training fahren', '16:00'])

  console.log('Postgres DB flushed')
} */