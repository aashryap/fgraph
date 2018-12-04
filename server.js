#!/usr/bin/env node

const fs = require("fs");
const minimist = require("minimist");
const figlet = require('figlet');
const connectivity = require("connectivity");

let args = minimist(process.argv.slice(2));
console.log(args);

figlet("FGRAPH", function(err,figletText){
      console.log(figletText);

      let cmd = args._[0] || "help";

      if(args.plot)
      {
        cmd = "plot"; 
      }

      else if(args.help)
      {
          cmd = "help";
      }

      switch(cmd){

          case "help" :
            require("./commands/help")(args);
            break;

          case "plot" :
            connectivity(function(online){
                if(online)
                {
                  require("./commands/plot")(args);
                }
                else
                {
                  console.log("No internet connection!!");
                }
            })
            break; 
          
          case "types" :
            require("./commands/types")(args);
            break;
          
          default : 
            console.log("No command found please see the help");
            break;

      }
})