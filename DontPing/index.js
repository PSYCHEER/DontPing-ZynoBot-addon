const addons = require('zyno-bot-addons');
const functions = require('./functions.js');

const addon = new addons.Addon({
    name: 'DontPing',
    description: 'Prevent members from tagging the staff in tickets',
    version: '1.0.0',
    author: 'PSYCHEER',
    bitfield: [addons.bitfield.MESSAGES, addons.bitfield.CHANNELS, addons.bitfield.ROLES, addons.bitfield.GUILDS]
});

function wait(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

addon.once('ready', async () => {

    restrictedChannels = functions.channels;
    try{
        await functions.license();
    } catch(err){
        return process.exit();
    }

    const events = addon.createEventListener();

    events.on('message', async msg => {
        if(msg.channel){
            if((msg.channel.isTicket() || restrictedChannels.indexOf(msg.channel.id) >= 0) && msg.mentions.members.filter(m => {
                const moderatorRoles = Array.from(m.value.guild.moderationRoles.keys());
                const memberRoles = Array.from(m.value.roles.keys());
                
                for(let i = 0; i < moderatorRoles.length; i++){
                    if(memberRoles.indexOf(moderatorRoles[i]) >= 0) return true;
                }
                return false;
            }).size > 0 && msg.author.roles.filter(r => {
                const moderatorRoles = Array.from(r.value.guild.moderationRoles.keys());
                
                return moderatorRoles.indexOf(r.value.id) >= 0;
            }).size === 0){
                if(functions.deletion === "true"){
                    msg.delete().catch(err => {});
                }
                    this.warning = functions.warnmessage.replace(/{MENTION}/, `<@!${msg.author.id}>`);
                    await wait(2e2);
                    msg.channel.send(this.warning).catch(err => {});
               }
        }
    });
});