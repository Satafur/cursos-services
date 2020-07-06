var express = require('express');
var db = require('../db');
var router = express.Router();

/* GET cursos router. */
router.get('/', async (req, res, next) => {
  const client = await db.client();

  try {
    await client.query('BEGIN');
    const queryText = 'SELECT * FROM cursos;';
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

/* GET cursos by id router. */
router.get('/:id', async (req, res, next) => {
  const client = await db.client();

  try {
    await client.query('BEGIN');
    const queryText = 'SELECT * FROM cursos WHERE id=$1;';
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

/* GET cursos by id de estudiante router. */
router.get('/estudiante/:estudiante_id', async (req, res, next) => {
  const client = await db.client();

  try {
    await client.query('BEGIN');
    const queryText = 'SELECT cursos.* ' +
      'FROM cursos_estudiantes ' +
      'JOIN cursos ON cursos_estudiantes."cursoId"=cursos.id AND cursos_estudiantes."estudianteId"=$1';
    const result = await client.query(queryText, [req.params.estudiante_id]);
    await client.query('COMMIT');
    res.send(result.rows);
  } catch (e) {
    await client.query('ROLLBACK');
    throw e
  } finally {
    client.release();
  }
});

/* GET cursos router. */
router.get('/top', async (req, res, next) => {
  const client = await db.client();

  try {
    await client.query('BEGIN');
    const queryText = 'SELECT cursos.* ' +
    'FROM cursos_estudiantes ' +
    'JOIN cursos ON cursos_estudiantes."cursoId"=cursos.id AND ' +
    'cursos."fechaIncio" >= date_trunc(\'month\', now() - interval \'6 month\') AND ' +
    'cursos."fechaIncio" < date_trunc(\'month\', now());';
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

/**
 * 'SELECT cursos.* ' +
 'FROM cursos_estudiantes ' +
 'JOIN cursos ON cursos_estudiantes."cursoId"=cursos.id AND ' +
 'cursos."fechaIncio" >= date_trunc(\'month\', now()) - interval \'6 month\') AND ' +
 'cursos."fechaIncio" < date_trunc(\'month\', now())
 * **/

/* POST cursos router. */
router.post('/', async (req, res, next) => {
  const client = await db.client();

  try {
    await client.query('BEGIN');
    const queryText = 'INSERT INTO cursos(nombre, horario, "fechaInicio", "fechaFin") VALUES($1, $2, $3, $4);';
    const result = await client.query(queryText, [
      req.body.nombre,
      req.body.horario,
      req.body.fechaInicio,
      req.body.fechaFin,
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

/* PUT cursos router. */
router.put('/:id', async (req, res, next) => {
  const client = await db.client();

  try {
    await client.query('BEGIN');
    const queryText = 'UPDATE cursos SET nombre=$1, horario=$2, "fechaInicio"=$3, "fechaFin"=$4 WHERE id=$5;';
    const result = await client.query(queryText, [
      req.body.nombre,
      req.body.horario,
      req.body.fechaInicio,
      req.body.fechaFin,
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

/* PUT cursos asignar estudiante router. */
router.put('/:id/asignar/:estudiante_id', async (req, res, next) => {
  const client = await db.client();

  try {
    await client.query('BEGIN');
    const queryText = 'INSERT INTO cursos_estudiantes("cursoId", "estudianteId") VALUES($1, $2);';
    const result = await client.query(queryText, [
      req.params.id,
      req.params.estudiante_id
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

/* DELETE cursos router. */
router.delete('/:id', async (req, res, next) => {
  const client = await db.client();

  try {
    await client.query('BEGIN');
    const queryText = 'DELETE FROM cursos WHERE id=$1;';
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
