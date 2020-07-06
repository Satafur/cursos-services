var express = require('express');
var db = require('../db');
var router = express.Router();

/* GET estudiantes router. */
router.get('/', async (req, res, next) => {
  const client = await db.client();

  try {
    await client.query('BEGIN');
    const queryText = 'SELECT * FROM estudiantes;';
    const result = await client.query(queryText, []);
    await client.query('COMMIT');
    res.send(result.rows);
  } catch (e) {
    await client.query('ROLLBACK');
    throw e
  } finally {
    client.release();
  }
});

/* GET estudiantes by id router. */
router.get('/:id', async (req, res, next) => {
  const client = await db.client();

  try {
    await client.query('BEGIN');
    const queryText = 'SELECT * FROM estudiantes WHERE id=$1;';
    const result = await client.query(queryText, [req.params.id]);
    await client.query('COMMIT');
    res.send(result.rows[0]);
  } catch (e) {
    await client.query('ROLLBACK');
    throw e
  } finally {
    client.release();
  }
});

/* POST estudiantes router. */
router.post('/', async (req, res, next) => {
  const client = await db.client();

  try {
    await client.query('BEGIN');
    const queryText = 'INSERT INTO estudiantes(nombres, apellidos, edad, correo) VALUES($1, $2, $3, $4) RETURNING id;';
    const result = await client.query(queryText, [
      req.body.nombres,
      req.body.apellidos,
      req.body.edad,
      req.body.correo
    ]);
    await client.query('COMMIT');
    res.send(result.rows);
  } catch (e) {
    await client.query('ROLLBACK');
    throw e
  } finally {
    client.release();
  }
});

/* PUT estudiantes router. */
router.put('/:id', async (req, res, next) => {
  const client = await db.client();

  try {
    await client.query('BEGIN');
    const queryText = 'UPDATE estudiantes SET nombres=$1, apellidos=$2, edad=$3, correo=$4 WHERE id=$5;';
    const result = await client.query(queryText, [
      req.body.nombres,
      req.body.apellidos,
      req.body.edad,
      req.body.correo,
      req.params.id,
    ]);
    await client.query('COMMIT');
    res.send(result.rows);
  } catch (e) {
    await client.query('ROLLBACK');
    throw e
  } finally {
    client.release();
  }
});

/* DELETE estudiantes router. */
router.delete('/:id', async (req, res, next) => {
  const client = await db.client();

  try {
    await client.query('BEGIN');
    const queryText = 'DELETE FROM estudiantes WHERE id=$1;';
    const result = await client.query(queryText, [req.params.id]);
    await client.query('COMMIT');
    res.send(result.rows);
  } catch (e) {
    await client.query('ROLLBACK');
    throw e
  } finally {
    client.release();
  }
});

module.exports = router;
