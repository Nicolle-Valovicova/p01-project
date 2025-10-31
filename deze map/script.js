const geboortejaarInput = prompt("Wat is je geboortejaar?");
const geboortejaar = parseInt(geboortejaarInput);
console.log("geboortejaar is-", geboortejaar);

const huldingjaar = 3025;
const leeftijd = huldingjaar - geboortejaar;
console.log(" de bereikende leeftijd is -", leeftijd);