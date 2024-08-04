const axios = require('axios');
const fs = require('fs');

var licensekey = "";
class Data{
    constructor(){
        try {
            const file = fs.readFileSync(__dirname + '/config.json', 'utf8');
            const data = JSON.parse(file);
            licensekey = data.license;
            this.channels = data.channels;
            this.deletion = data.deleteping;
            this.warnmessage = data.warnmessage;
        } catch (e) {
            console.log("Reading files: ", e);
        }
    }
    async license(){
        try {
            const product = 'DontPing';
            const res = await axios.post(
                   'http://104.128.51.12:3002/api/client',
                   {
                       licensekey,
                       product
                   },
                   { headers: { Authorization: "MEjCQ2jTWWIKGy1mX6Nx99Q2285uqbOT" }}
            );
               if (!res.data.status_code || !res.data.status_id){
                console.log('\x1b[31m%s\x1b[0m', "――――――――――――――――――――――――――――――――――――");
                console.log('\x1b[31m%s\x1b[0m', 'Your license key for DontPing is invalid!');
                console.log('\x1b[31m%s\x1b[0m', `Create a ticket in our discord server to get one.`);
                console.log('\x1b[31m%s\x1b[0m', "Stopping the process");
                console.log('\x1b[31m%s\x1b[0m', "――――――――――――――――――――――――――――――――――――");
                   return process.exit(1);
               }
        
            if(res.data.status_overview !== "success"){
                console.log('\x1b[12m%s\x1b[0m', "――――――――――――――――――――――――――――――――――――");
                console.log('\x1b[31m%s\x1b[0m', 'Your license key for DontPing is invalid!');
                console.log('\x1b[31m%s\x1b[0m', `Create a ticket in our discord server to get one.`);
                console.log('\x1b[31m%s\x1b[0m', "Stopping the process");
                console.log('\x1b[31m%s\x1b[0m', "――――――――――――――――――――――――――――――――――――");
                   return process.exit(1);
               } else {
                console.log('\x1b[32m%s\x1b[0m',"――――――――――――――――――――――――――――――――――――");
                console.log('\x1b[32m%s\x1b[0m', 'Your license key for DontPing is valid!');
                console.log('\x1b[36m%s\x1b[0m', "Discord ID: " + res.data.discord_id);
                console.log('\x1b[32m%s\x1b[0m',"――――――――――――――――――――――――――――――――――――");
                console.log('\x1b[32m%s\x1b[0m',"――――――――――――――――――――――――――――――――――――");
        console.log('\x1b[32m%s\x1b[0m',`DontPing is ready`);
        console.log('\x1b[32m%s\x1b[0m',"――――――――――――――――――――――――――――――――――――");
                return res.data.status_overview;
            }
        } catch (err) {
            console.log('\x1b[31m%s\x1b[0m', "――――――――――――――――――――――――――――――――――――");
            console.log('\x1b[31m%s\x1b[0m', 'License Authentication for DontPing failed');
            console.log('\x1b[31m%s\x1b[0m', "Stopping the process");
            console.log('\x1b[31m%s\x1b[0m', "――――――――――――――――――――――――――――――――――――");
            console.log(err);
            process.exit(1);
        }
    }
}

module.exports = new Data();