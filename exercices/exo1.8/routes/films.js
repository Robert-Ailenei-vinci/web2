var express = require('express');
const { serialize, parse } = require('../utils/json');
var router = express.Router();

const jsonDbPath = __dirname + '/../data/films.json';

const defaultFilms =[
  {
    id:1,
    titre: 'Oppenheimer',
    duration: 300,
    budget: 16000000,
    link: 'https://www.imdb.com/title/tt15398776/externalreviews/?ref_=tt_ov_rt'
  },
  {
    id:2,
    titre: 'Dunkirk',
    duration: 125,
    budget: 1305552,
    link: 'https://www.imdb.com/title/tt5013056/?ref_=nv_sr_srsg_2_tt_6_nm_2_q_dunkirk'
  },
  {
    id:3,
    titre: 'Insidous:The red Door',
    duration: 120,
    budget: 820000,
    link: 'https://www.imdb.com/title/tt13405778/?ref_=nv_sr_srsg_3_tt_8_nm_0_q_insid'
  }
  ];

// Read all the films, filtered by minimum-duration if the query param exists
router.get('/', (req, res) => {
  const minimumFilmDuration = req?.query
    ? Number(req.query['minimum-duration'])
    : undefined;
  if (typeof minimumFilmDuration !== 'number' || minimumFilmDuration <= 0)
    return res.sendStatus(400);

  const films = parse(jsonDbPath, defaultFilms);

  if (!minimumFilmDuration) return res.json(films);

  const filmsReachingMinimumDuration = films.filter(
    (film) => film.duration >= minimumFilmDuration
  );
  return res.json(filmsReachingMinimumDuration);
});

// Read a film from its id in the menu
router.get('/:id', (req, res) => {
  const films = parse(jsonDbPath, defaultFilms);

  const indexOfFilmFound = films.findIndex((film) => film.id == req.params.id);

  if (indexOfFilmFound < 0) return res.sendStatus(404);

  return res.json(films[indexOfFilmFound]);
});

// Create a film
router.post('/', (req, res) => {
  const title =
    req?.body?.title?.trim()?.length !== 0 ? req.body.title : undefined;
  const link =
    req?.body?.content?.trim().length !== 0 ? req.body.link : undefined;
  const duration =
    typeof req?.body?.duration !== 'number' || req.body.duration < 0
      ? undefined
      : req.body.duration;
  const budget =
    typeof req?.body?.budget !== 'number' || req.body.budget < 0
      ? undefined
      : req.body.budget;

  if (!title || !link || !duration || !budget) return res.sendStatus(400);

  const films = parse(jsonDbPath, defaultFilms);

  const existingFilm = films.find(
    (film) => film.title.toLowerCase() === title.toLowerCase()
  );
  if (existingFilm) return res.sendStatus(409);

  const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
  const lastId = lastItemIndex !== undefined ? films[lastItemIndex]?.id : 0;
  const nextId = lastId + 1;

  const newFilm = { id: nextId, title, link, duration, budget };

  films.push(newFilm);

  serialize(jsonDbPath, films);

  return res.json(newFilm);
});

// Delete a film
router.delete('/:id', function (req, res) {
  const films = parse(jsonDbPath, defaultFilms);

  const indexOfFilmFound = films.findIndex((film) => film.id == req.params.id);

  if (indexOfFilmFound < 0) return res.sendStatus(404);

  const itemsRemoved = films.splice(indexOfFilmFound, 1);
  const itemRemoved = itemsRemoved[0];

  serialize(jsonDbPath, films);

  return res.json(itemRemoved);
});

// Update one or more properties of a film identified by its id
router.patch('/:id', function (req, res) {
  const title = req?.body?.title;
  const link = req?.body?.link;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;

  if (
    !req.body ||
    (title !== undefined && !title.trim()) ||
    (link !== undefined && !link.trim()) ||
    (duration !== undefined && (typeof req?.body?.duration !== 'number' || duration < 0)) ||
    (budget !== undefined && (typeof req?.body?.budget !== 'number' || budget < 0))
  )
    return res.sendStatus(400);

  const films = parse(jsonDbPath, defaultFilms);

  const indexOfFilmFound = films.findIndex((film) => film.id == req.params.id);

  if (indexOfFilmFound < 0) return res.sendStatus(404);

  const filmPriorToChange = films[indexOfFilmFound];
  const objectContainingPropertiesToBeUpdated = req.body;

  const updatedFilm = {
    ...filmPriorToChange,
    ...objectContainingPropertiesToBeUpdated,
  };

  films[indexOfFilmFound] = updatedFilm;

  serialize(jsonDbPath, films);

  return res.json(updatedFilm);
});

// Update a film only if all properties are given or create it if it does not exist and the id is not existant
router.put('/:id', function (req, res) {
  const title = req?.body?.title;
  const link = req?.body?.link;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;

  if (
    !req.body ||
    !title ||
    !title.trim() ||
    !link ||
    !link.trim() ||
    duration === undefined ||
    typeof req?.body?.duration !== 'number' ||
    duration < 0 ||
    budget === undefined ||
    typeof req?.body?.budget !== 'number' ||
    budget < 0
  )
    return res.sendStatus(400);

  const id = req.params.id;
  const films = parse(jsonDbPath, defaultFilms);
  const indexOfFilmFound = films.findIndex((film) => film.id == id);

  if (indexOfFilmFound < 0) {
    const newFilm = { id, title, link, duration, budget };
    films.push(newFilm);
    serialize(jsonDbPath, films);
    return res.json(newFilm);
  }

  const filmPriorToChange = films[indexOfFilmFound];
  const objectContainingPropertiesToBeUpdated = req.body;

  const updatedFilm = {
    ...filmPriorToChange,
    ...objectContainingPropertiesToBeUpdated,
  };

  films[indexOfFilmFound] = updatedFilm;

  serialize(jsonDbPath, films);

  return res.json(updatedFilm);
});

module.exports = router;