var express = require('express');
var router = express.Router();

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
  



//lister la page selon une duree minimale
router.get('/', (req, res) => {
  
  if(req.query.minDuration==undefined) res.json(FILMS);

  const minimumDuration=parseInt(req.query.minDuration) ;
  console.log("mmmmm"+minimumDuration)
  let listeFinale=[];




  for(let i = 0; i<FILMS.length; i++){
    if(FILMS[i].titre==titre){
      return res.sendStatus(409);
    }
  }
  
  
  res.json(listeFinale);
});



//Lister la page selon un id
router.get('/:id', (req, res) => {
  const indexOfFilmFound = FILMS.findIndex((film) => film.id == req.params.id);

  if (indexOfFilmFound < 0) return res.json('Resource not found');

  return res.json(FILMS[indexOfFilmFound]);
});


// Create a film to be added to the menu.
router.post('/', (req, res) => {
  const titre = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.t?.length !== 0 ? req.body.duration : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;
  const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;

  console.log('POST /pizzas');

  if (!titre || !link || !duration || !budget ) return res.sendStatus(400); // error code '400 Bad request'

  const lastItemIndex = FILMS?.length !== 0 ? FILMS.length - 1 : undefined;
  const lastId = lastItemIndex !== undefined ? FILMS[lastItemIndex]?.id : 0;
  const nextId = lastId + 1;

  const newFilm = {
    nextId,
    titre,
    link, duration,budget
  };

  FILMS.push(newFilm);

  res.json(newFilm);
});


    module.exports=router;