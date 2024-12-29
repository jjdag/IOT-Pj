// bridge functions between db and js backend access interface
const db = require('./db');


// == CRUD logement ==
function getHouses() {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM logement', (err, rows) => {
            if(err)
                reject(err);
            else
                resolve(rows);
        });
    });
}

function getLogementParID(ID) {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM logement where LogID=(?)', ID, (err, rows) => {
            if(err)
                reject(err);
            else
                resolve(rows);
        });
    });
}

function createLogement(Addr, IPAddr) {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO logement (LogID, Addr, IPAddr, Insertion) VALUES (NULL, ?, ?, CURRENT_TIMESTAMP)', Addr, IPAddr, (err) => {
            if(err)
                reject(err);
            else
                resolve();
        });
    });
}

function delLogement(LogID) {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM logement WHERE LogID = (?)', LogID, (err) => {
            if(err)
                reject(err);
            else
                resolve();
        });
    });
}

// == == ==

// == CRUD capteur ==
function getCapteurs() {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM capteur', (err, rows) => {
            if(err)
                reject(err);
            else
                resolve(rows);
        });
    });
}

function getCaptParType(type) { // tous les catpeurs d un type particulier
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM capteur where Type=(?)', type, (err, rows) => {
            if(err)
                reject(err);
            else
                resolve(rows);
        });
    });
}

function getCaptParPiece(piece) {
    console.log("am i even in capt par piece");
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM capteur where RefPiece like ?', `%${piece}%`, (err, rows) => {
            if(err)
                reject(err);
            else
                console.log(rows);
                resolve(rows);
        });
    });
}

function createCapteur(Type, RefComm, RefPiece, Port) {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO capteur (CaptID, Type, RefComm, RefPiece, Port, Insertion) VALUES (NULL, ?, ?, ?, ?, CURRENT_TIMESTAMP)', Type, RefComm, RefPiece, Port, (err) => {
            if(err)
                reject(err);
            else
                resolve();
        });
    });
}

function getCapteursByPiece(pieceId) {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM Capteur WHERE RefPiece LIKE CONCAT(%,?,%)', `%${pieceId}%`, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

// == == ==


// == methodes Piece ==
function getPiecesByLogement(logementId) {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM Piece WHERE Func LIKE ?', `%${logementId}%`, (err, rows) => { // last num in func must match logid
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

function createPiece(Func, Coord) {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO Piece (PieceID, Func, Coord) VALUES (NULL, ?, ?)', Func, Coord, (err) => {
            if(err)
                reject(err);
            else
                resolve();
        });
    });
}
// == == ==


// == methodes Capteur ==
function getMeasParamsByCapteur(type) {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM MeasParam WHERE Type = ?', type, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}
// == == ==


function getFacturesParLogement(LogID) {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM Facture WHERE Type LIKE ?', `%_${LogID}%`, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

module.exports = {
    getHouses,
    getLogementParID,
    createLogement,
    delLogement,
    getCapteurs,
    getCaptParType,
    getCaptParPiece,
    createCapteur,
    getPiecesByLogement,
    getCapteursByPiece,
    getMeasParamsByCapteur,
    createPiece,
    getFacturesParLogement
};