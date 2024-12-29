var express = require('express'); // js like include or import (backend, frontend is vue)
// const sqlite3 = require('sqlite3').verbose();

const logement = require('./logement'); // importing database object containing db manipulation funcs (CRUD etc)
const port = process.env.PORT || 3000; // define port

// !!! express does not have access to the content of the json objects that we ll be requesting from/posting into the db
// (if attempt to call obj, it will just return it as empty obj sans afficher le contenu)
// DONC we need a parser to assist in data display and manip
// HENCE:
var bodyParser = require("body-parser");

//app.set("view engine", "ejs"); //must use view engine to render html

//const db = new sqlite3.Database('C://Users/janad/Desktop/TP4_IOT/logement.db', sqlite3.OPEN_READWRITE, (err) => {
//    if (err) return console.error(err.message);
//});
var app = express(); // call instance of express
app.use(bodyParser.urlencoded({ extended: false })); // parse urlencoded objs
// middleware that ll allow app to access and parse the values of req.body instead of just treating it as an empty obj
// MUST DO MORE RESEARCH abt the way it concretely acc functions
app.use(bodyParser.json()); // parse json objs


// static files
app.use(express.static('public'));
app.use('/css', express.static(__dirname = 'public/css'));
app.use('/img', express.static(__dirname = 'public/img'));
// app.use('/js', express.static(__dirname = 'public/js'));


// templating engine for rendering the html --> using ejs which goes well with express
app.set('views', './src/views');
app.set('view engine', 'ejs');


// settign up routes bridging b/w front and back and disp
// const mainRouter = require('./src/routes/house') // main page d accueil
// const routePiece = require('./src/routes/piece') // page piece onclick d un logement ds house
// const routeCapt = require('./src/routes/capteur') // page capt onclick d une piece du lgmt

// actually no i've decided to not use express's routing features, ridiculously cumbersome and elaborate for project of small scale such as that one

// app.use('/', mainRouter);
// app.use('/', routePiece);
// app.use('/', routeCapt);


// ============ TABLE LOGEMENT ============
// GET
app.get("/logement", async function(req, res) {
    // console.log("am i in app.get logement"); // YES I AM ASFDGHEGHG ENFIN
    const lgmt = await logement.getHouses();
    res.render('house', {lgmtdata : lgmt});
    // console.log(lgmt);

    //res.send(lgmt);
});

app.get('/logement/creer', (req, res) => {
    res.render('createLogement', { errorMessage: null });
});

app.post('/logement/creer', async (req, res) => {
    const { address, ipaddress } = req.body;

    if (!address || !ipaddress) { // MAKE SURE DATA EST SAISIE SINON ANNUL
        return res.render('createLogement', { errorMessage: 'Remplir tous les champs svp' }); 
    }
    try {
        await logement.createLogement(address, ipaddress);

        res.redirect('/logement');
    } catch (error) {
        console.error(error);
        res.render('createLogement', { errorMessage: 'Unexpected error, svp réessayer.' });
    }
});

app.get("/capteur/:Func", async function(req, res) {
    // console.log("am i even in get capt func");
    const capteurs = await logement.getCaptParPiece(req.params.Func);
    res.render('capteurs', { Func : req.params.Func, capteurs });
});

app.get("/logement/", async function(req, res) {
    // console.log("am i in app.get logement////"); // YES I AM ASFDGHEGHG ENFIN
    const lgmt = await logement.getHouses();

    res.render('house', {lgmtdata : lgmt});

    //res.send(lgmt);
});

app.get('/factures/:LogID', async (req, res) => {
    // console.log("in get log id fact?");

    const lgmt = await logement.getLogementParID(req.params.LogID);
    // console.log("after lgmt");
    const factures = await logement.getFacturesParLogement(req.params.LogID);

    const annees = factures.map(f => f.Periode);
    const consumptionData = factures.map(f => f.Conso);
    
    //factures.forEach( facture => console.log(facture.FactID))

    // 
    res.render('factures', { lgmt : lgmt[0], factures, annees, consumptionData });

});

app.get("/logement/:LogID", async function(req, res) {
    const lgmt = await logement.getLogementParID(req.params.LogID);
    // const data = JSON.parse(lgmt);
    const pieces = await logement.getPiecesByLogement(req.params.LogID);
    res.render('houseSingle', { lgmtdata : lgmt[0], pieces});
        // infolgmt: lgmt
        //pieces: logement.getPiecesByLogement(req.params.LogID)
    // console.log(lgmt[0].LogID);
    // console.log(pieces[0].Coord);
    //res.send(lgmt);
});

// app.post("/logement", async function(req, res) {
//     const Addr = req.body.Addr;
//     const IPAddr = req.body.IPAddr;
//     await logement.createLogement(Addr, IPAddr);
//     res.send({"message": "Success"});
// });

app.post("/logement/:LogID", async function(req, res) {
    const Func = req.body.Func;
    const Coord = req.body.Coord;
    await logement.createPiece(Func, Coord);
    res.send({"message": "Success"});
});

// ============ ============ ============


// ============ TABLE CAPTEUR ============
// GET
app.get("/capteur", async function(req, res) {
    const capt = await logement.getCapteurs();
    res.send(capt);
});

app.get("/capteur/:Type", async function(req, res) {
    const capt = await logement.getCaptParType(req.params.Type);
    res.send(capt);
});



// POST
app.post("/capteur", async function(req, res) {
    const type = req.body.Type;
    const RefComm = req.body.RefComm;
    const RefPiece = req.body.RefPiece;
    const port = req.body.Port;
    // console.log(type);
    await logement.createCapteur(type, RefComm, RefPiece, port);
    res.send({"message": "Success"});
});

// ============ ============ ============


app.listen(port, function (req, res) {
    console.log(`Server started on port ${port}`);
});