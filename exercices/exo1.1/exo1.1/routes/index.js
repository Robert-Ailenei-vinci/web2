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




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
