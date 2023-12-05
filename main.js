// Form Atom Formula : (gameStats.AtomGain * ((gameStats.Molecules / 2) + 1));

// Molecule Cost Formula : 10
// Ion Cost Formula : 5

// Molecule Formula : (0.75 * (gameStats.Atoms / (10 * (gameStats.Atoms / 15))))
// Ion Formula : 0.4 * (gameStats.Molecules / (5 * (1 + (gameStats.Molecules / 2500))))

var gameStats = {
    Atoms: 0,
    AtomGain: 1,

    Molecules: 0,

    Ions: 0, // Rebirth

    SaveName: "AtomicIncremental7",
}   

var savegame = JSON.parse(localStorage.getItem(gameStats.SaveName)) // Load Save
if (savegame !== null) {
    gameStats = savegame
}

function ResetLabels() {
    document.getElementById("AtomsDisplay").innerHTML = gameStats.Atoms.toPrecision(2) + " Atoms Formed";
    document.getElementById("AtomGainDisplay").innerHTML = (gameStats.AtomGain * ((gameStats.Molecules / 2) + 1)).toPrecision(2)+" Atoms every 1 second";

    document.getElementById("MoleculesDisplay").innerHTML = gameStats.Molecules.toPrecision(2) + " Molecules Formed (Boosting Atoms by "+((gameStats.Molecules / 2) + 1).toPrecision(2)+"x)";
    document.getElementById("MoleculeButton").innerHTML = "Create "+((0.75 * (gameStats.Atoms / (10 * (1 + (gameStats.Atoms / 15000))))) * (1 + (gameStats.Ions / 4))).toPrecision(2)+" Molecules ("+(10).toPrecision(2)+" Atoms Required)";

    document.getElementById("IonsDisplay").innerHTML = gameStats.Ions.toPrecision(2) + " Ions Constructed (Boosting Molecules by "+((gameStats.Ions / 4) + 1).toPrecision(2)+"x)";
    document.getElementById("IonButton").innerHTML = "Construct "+(0.4 * (gameStats.Molecules / (5 * (1 + (gameStats.Molecules / 2500))))).toPrecision(2)+" Ions ("+(5).toPrecision(2)+" Molecules Required)";
}

function Reset1() { // 1st prestige layer, (molecule)
    gameStats.Atoms = 0;
    gameStats.AtomGain = 1;
}

function Reset2() { // 2nd prestige layer, (ion)
    Reset1();
    gameStats.Molecules = 0;
}

function Reset3() { // 3rd prestige layer, (???)
    Reset2();
    gameStats.Ions = 0;
}

function FormAtom() {
    gameStats.Atoms += (gameStats.AtomGain * ((gameStats.Molecules / 2) + 1)); // 0.01 * 0.5x every Molecule
    ResetLabels();
}

function CreateMolecule() {
    if (gameStats.Atoms >= 10) { // Costs atleast 10 Atoms
        gameStats.Molecules += ((0.75 * (gameStats.Atoms / (10 * (1 + (gameStats.Atoms / 15000))))) * (1 + (gameStats.Ions / 4))); // 
        Reset1();
        ResetLabels();
    }
}

function ConstructIon() { // Rebirth, (2x to Atoms, 1.25x to Molecules) per
    if (gameStats.Molecules >= 5) { // Costs atleast 5 Molecules
        gameStats.Ions += 0.4 * (gameStats.Molecules / (5 * (1 + (gameStats.Molecules / 2500)))); // 
        Reset2();
        ResetLabels();
    }
}

function SaveGame() {
    localStorage.setItem(gameStats.SaveName, JSON.stringify(gameStats));
}

var mainGameLoop = window.setInterval(function() {
    FormAtom();
  }, 1000) // 1000 ms, 1 second

  var saveGameLoop = window.setInterval(function() { // Save every 10 seconds.
    SaveGame();
  }, 30000) // 30000 ms, 30 seconds

ResetLabels();
