const EGClient = require('epicgames-client').Client;
const Fortnite = require('epicgames-fortnite-client');
const EInputType  = require('epicgames-client').EInputType;

var _ = require('lodash');

accountid = 'Id';
status = 'STATUE';

let eg = new EGClient({
    email: 'Email',
    password: 'Passwords',
    debug: console.log
});

(async _ => {
        
    var c_party;

    if(!await eg.init() || !await eg.login())
        throw 'Connect';
    
    let communicator = eg.communicator;
    let fortnite = await eg.runGame(Fortnite);
    
    communicator.updateStatus(status);

    communicator.on('friend:request', async data => {
        if(data.friend.id != accountid){
            eg.acceptFriendRequest(data.friend.id).then(async (ac_result) => {
            });
        }
    });
    
    fortnite.communicator.on('party:invitation', async invitation => {

        c_party = invitation.party;
        
        invitation.party.me.setBRCharacter('/Game/Athena/Items/Cosmetics/Characters/CID_029_Athena_Commando_F_Halloween.CID_029_Athena_Commando_F_Halloween');
        
        await invitation.accept();
        
        invitation.party.me.setBattlePass(true, 1000000, 1000000, 1000000);

    });

    fortnite.communicator.on('friend:message', async data => {  
        var args = data.message.split(" ");
        if (args[0] == "!status"){
              fortnite.communicator.updateStatus(args[1]);
              communicator.updateStatus(args[1]);
        }     
      });
  })();