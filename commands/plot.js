require('dotenv').config();
const PLOTLY_API_KEY = process.env.PLOTLY_API_KEY;
const PLOTLY_USER_NAME = process.env.PLOTLY_USER_NAME;
const plotly = require("plotly")(PLOTLY_USER_NAME, PLOTLY_API_KEY);
const fs = require("fs");
const csv = require("csvtojson");
module.exports = (args) => {

        if(args.hasOwnProperty("x") && args.hasOwnProperty("y") && args.x.length > 0 && args.y.length > 0 &&  args.hasOwnProperty("p") && args.p.length > 0 && args.hasOwnProperty("t") && args.t.length > 0 && args.hasOwnProperty("d") && args.d.length > 0)
        {
                console.log("Right");
                let param1 = args.x;
                let param2 = args.y;
                let csvpath = args.p
                let graphtype = args.t;
                let imageSaveLocation = args.d;
                let trace ;
                console.log(param1);
                console.log(param2);
                console.log(csvpath);
                csv().fromFile(csvpath)
                .then(jsonObj => {
                    console.log(jsonObj);
                    let x = [];
                    let y = [];
                    for(let i=0;i<jsonObj.length;i++)
                        {
                            
                            x.push(isNaN(jsonObj[i][param1]) ? jsonObj[i][param1] : parseFloat(jsonObj[i][param1]));
                            y.push(isNaN(jsonObj[i][param2]) ? jsonObj[i][param2] : parseFloat(jsonObj[i][param2]));
                        }
                    console.log(x);
                    console.log(y)
                    
                    switch(graphtype)
                    {
                            case "pie" :
                                trace = {
                                    values: y,
                                    labels: x,
                                    type: "pie" 
                                }
                                plotGraph(trace, imageSaveLocation);
                                break;
                            case "bar" : {
                                trace = {
                                    x : x,
                                    y : y,
                                    type : "bar"
                                }
                                plotGraph(trace, imageSaveLocation);
                                break;
                            }
                            default :
                                console.log("Chart of "+graphtype+" is not supported");
                                break;
                    }
                })
                
        }
        else
        {
            console.log("Syntax error");
        }

}

function plotGraph(trace, imageSaveLocation){
  

    let figure = { 'data': [trace] };
    let imgOpts = {
            format: 'png',
            width: 1000,
            height: 500
        };
    
    plotly.getImage(figure, imgOpts, function (err, stream) {
                // console.log(msg);
                let fileStream = fs.createWriteStream(imageSaveLocation);
                stream.pipe(fileStream);
        });
}