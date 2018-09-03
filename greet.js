module.exports = function () {

    var nameList = [];

    const index = function (req, res) {

        res.send(nameList);
    };

    const add = function (req, res) {

        // res.send('add greet');

        var name = req.query.name;

        nameList.push(name);

        res.redirect('/greet');
    }
    return {
        index,
        add
    }
}