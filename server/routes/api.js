const express = require('express');
const router = express.Router();

const pg = require('pg'); //require('pg-promise')(/*options*/)
const dbUrl = 'pg://postgres:postgres@localhost:5432/angularDB';
const client = new pg.Client(dbUrl);
client.connect();

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


  //db.query('INSERT INTO $1~($2~) VALUES($3~,$4~)', ['heroes', 'heroname', '1', 'myhero']);

  client.query("INSERT INTO heroes(id_pk,heroname) values($1,$2)", ['3','myherooo']);

 /* pg.connect(dbUrl, function(err, client, done) {
    var i = 0, count = 0; 
    for (i = 0; i < 1000; i++) {
        client.query(
            'INSERT into heroes VALUES($2) RETURNING id', 
            ['myherooo'], 
            function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('row inserted with id: ' + result.rows[0].id);
                }

                count++;
                console.log('count = ' + count);
                if (count == 1000) {
                    console.log('Client will end now!!!');
                    client.end();
                }
            });        
    }
});*/


router.get('/heroes', (req, res) => {
  res.send(JSON.stringify(heroes));
});

router.get('/heroes/hero/:id', (req, res) => {
  res.send(JSON.stringify(heroes.find(hero => hero.id === Number(req.params.id))));
});

router.get('/heroes/hero/update/:id', (req, res) => {
  let h = req.params.id;
  console.info("save: "+h);
  res.send(JSON.stringify("ok"));
});

module.exports = router;
