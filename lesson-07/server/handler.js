const cart = require('./cart');
const fs = require('fs');

const actions = {
    add: cart.add,
    change: cart.change,
    remove: cart.remove
};

let saveStat = (modifiedItem, action) => {
    const statFile = 'server/db/stats.json';
    var data = {id: modifiedItem.id_product, name: modifiedItem.product_name, action: action, date: new Date()};
    fs.readFile(statFile, 'utf-8', (err, statJson)=> {
        if(err){
            console.log("Coulnd't read stat");
        } else {
            let stat = JSON.parse(statJson);
            stat.push(data);
            fs.writeFile(statFile, JSON.stringify(stat, null, 4), (err) => {
                if (err) {
                    console.log("Coulnd't write stat");
                }
            })
        }
    })
};

//HANDLER отвечает за изменение данных в самом файле
let handler = (req, res, action, file) => {
    fs.readFile(file, 'utf-8', (err, data)=> {
        if(err){
            res.sendStatus(404, JSON.stringify({result:0, text: err}));
        } else {
            let newCart, modifiedItem;
            [newCart, modifiedItem] = actions[action](JSON.parse(data), req);
            fs.writeFile(file, newCart, (err) => {
                if(err){
                    res.sendStatus(404, JSON.stringify({result:0, text: err}));
                } else {
                    res.send(JSON.stringify({result: 1}))
                }
            });
            saveStat(modifiedItem, action);
        }
    })
};

module.exports = handler;