var express = require('express');
const { serialize, parse } = require('../utils/json');
var router = express.Router();

const jsonDbPath = __dirname + '/../data/films.json';

const FILMS=[
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
]
  



router.get('/', (req, res) => {
  const minimumFilmDuration = req?.query
        ? Number(req.query['minimum-duration'])
        : undefined;
      if (typeof minimumFilmDuration !== 'number' || minimumFilmDuration <= 0)
        return res.sendStatus(400);
    
      const films = parse(jsonDbPath, FILMS);
    
      if (!minimumFilmDuration) return res.json(films);
    
      const filmsReachingMinimumDuration = films.filter(
        (film) => film.duration >= minimumFilmDuration
      );
      return res.json(filmsReachingMinimumDuration);
    });



//Lister la page selon un id
router.get('/:id', (req, res) => {
  const filmes=parse(jsonDbPath, FILMS);
  const indexOfFilmFound = FILMS.findIndex((film) => film.id == req.params.id);

  if (indexOfFilmFound < 0) return res.sendStatus(404);

  return res.json(filmes[indexOfFilmFound]);
});


// Create a film to be added to the menu.
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

  const films = parse(jsonDbPath, FILMS);

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


router.delete('/:id', (req, res) => {
  console.log(`DELETE /films/${req.params.id}`);

  const filmes = parse(jsonDbPath, FILMS);

  const foundIndex = filmes.findIndex(filmes => filmes.id == req.params.id);

  if (foundIndex < 0) return res.sendStatus(404);

  const itemsRemovedFromFilms = filmes.splice(foundIndex, 1);
  const itemRemoved = itemsRemovedFromFilms[0];

  serialize(jsonDbPath, filmes);

  return res.json(itemRemoved);
});

router.patch('/:id', (req, res) => {
  console.log(`PATCH /films/${req.params.id}`);

  const titre = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.t?.length !== 0 ? req.body.duration : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;
  const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;


  if ((!titre && !duration && !link && !budget) || titre?.length === 0 || duration?.length === 0 || link?.length === 0 || budget?.length ===0) return res.sendStatus(400);

  const films = parse(jsonDbPath, FILMS);

  const foundIndex = films.findIndex(film => film.id == req.params.id);

  if (foundIndex < 0) return res.sendStatus(404);

  const updatedFilm = {...films[foundIndex], ...req.body};

  films[foundIndex] = updatedFilm;

  serialize(jsonDbPath, films);

  return res.json(updatedFilm);

});






    module.exports=router;