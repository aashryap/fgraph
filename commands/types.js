module.exports = (args) => {
    let graphtypes = {
        alltypes : `
            Supported types :

            1.      Pie
            2.      Bar
       `
    }

    console.log(graphtypes[args._[0] === "types" ? "alltypes" : args.types]);
}