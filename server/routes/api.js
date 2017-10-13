const express = require('express');
const router = express.Router();

const heroes = [
    { id: 0,  name: 'Zero' },
    { id: 11, name: 'Mr. Nice' },
    { id: 12, name: 'Narco' },
    { id: 13, name: 'Bombasto' },
    { id: 14, name: 'Celeritas' },
    { id: 15, name: 'Magneta' },
    { id: 16, name: 'RubberMan' },
    { id: 17, name: 'Dynama' },
    { id: 18, name: 'Dr IQ' },
    { id: 19, name: 'Magma' },
    { id: 20, name: 'Tornado' }
  ];

router.get('/heroes', (req, res) => {
  res.send(JSON.stringify(heroes));
});

router.get('/heroes/hero/:id', (req, res) => {
  res.send(JSON.stringify(heroes.find(hero => hero.id === Number(req.params.id))));
});

router.get('/heroes/hero/update/:id', (req, res) => {
  var h = req.params.id;
  console.info("save: "+h);
  res.send(JSON.stringify("ok"));
});

module.exports = router;
