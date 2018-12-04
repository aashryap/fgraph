module.exports = (args) => {
    let helps = {
        help : `
                plot command <options>

                Flags

                -x          Defines the parameter for the x axis in bar chart and labels in pie chart
                -y          Defines the paramter for the y axis in bar chart and values in pie chart
                -p          Defines path of csv file for which graph is to plotted
                -t          Defines type of graph
                -d          Defines the download location of the fraph image

        `,
        types : `
                types

                Gives all the supported graph types
        `
    }

    console.log(helps[args._[0] === undefined ? "help" : args._[1]]);
}