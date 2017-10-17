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

  //client.query("INSERT INTO heroes(id_pk,heroname) values($1,$2)", ['4','dudelo']);

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
    client.query("select * from heroes;")
    .then(resp => {
        console.log(resp);
        res.send(JSON.stringify(resp.rows));
    })
    .catch(e => console.error(e.stack));
});

router.get('/heroes/hero/:id', (req, res) => {
  client.query("select * from heroes where id_pk=$1;", [req.params.id])
    .then(resp => {
      console.log(resp);
      res.send(JSON.stringify(resp.rows[0]));
    })
    .catch(e => console.error(e.stack));
});

router.put('/heroes/hero/update/:id', function (req, res) {
    client.query("update heroes set heroname=$2 where id_pk=$1", [req.body.id, req.body.name])
        .then(resp => {
          console.log(resp);
          res.send("ok");
        })
        .catch(e => console.error(e.stack));
  });

router.put('/heroes/hero/new', function (req, res) {
  client.query("insert into heroes(heroname) values($1) returning id_pk", [req.body.name])
    .then(resp => {
      console.log(resp.rows);
      res.send(JSON.stringify(resp.rows[0]));
    })
    .catch(e => console.error(e.stack));
});

router.put('/heroes/hero/delete', function (req, res) {
  client.query("delete from heroes where id_pk=$1", [req.body.id])
    .then(resp => {
      console.log(resp.rows);
      res.send("ok");
    })
    .catch(e => console.error(e.stack));
});

module.exports = router;
