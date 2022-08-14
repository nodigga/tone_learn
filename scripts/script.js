import * as Tone from "https://cdn.skypack.dev/tone";
//import Tone from 'tone'
//const Tone = require ('tone')

  window.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded")
    configPlayButton();
    makeSequencer();

  });

  const configPlayButton = () => {
   
    //create a synth and connect it to the main output (your speakers)
    const synth = new Tone.Synth().toDestination();
    const button = document.getElementById("my-button-id");
     button.addEventListener("click", (e) => {
        
    const now = Tone.now()
    //play a middle 'C' for the duration of an 8th note
    synth.triggerAttackRelease("C4", "8n", now );
    synth.triggerAttackRelease("E4", "8n", now + 0.5)
    synth.triggerAttackRelease("G4", "8n", now + 1)
    });
  };

  const makeGrid = (notes) => {
    // our "notation" will consist of an array with 6 sub arrays
    // each sub array corresponds to one row in our sequencer grid
  
    // parent array to hold each row subarray
    const rows = [];
  
    for (const note of notes) {
      // declare the subarray
      const row = [];
      // each subarray contains multiple objects that have an assigned note
      // and a boolean to flag whether they are "activated"
      // each element in the subarray corresponds to one eigth note
      for (let i = 0; i < 8; i++) {
        row.push({
          note: note,
          isActive: false
        });
      }
      rows.push(row);
    }
  
    // we now have 6 rows each containing 16 eighth notes
    return rows;
  };

// declaring the notes for each row
const notes = ["F4", "Eb4", "C4", "Bb3", "Ab3", "F3"];
let grid = makeGrid(notes);
let beat = 0;
let playing = false;
let started = false;


  const makeSequencer = () => {
    const sequencer = document.getElementById("sequencer");
    grid.forEach((row, rowIndex) => {
      const seqRow = document.createElement("div");
      seqRow.id = `rowIndex`;
      seqRow.className = "sequencer-row";
  
      row.forEach((note, noteIndex) => {
        const button = document.createElement("button");
        button.className = "note"
        button.addEventListener("click", function(e) {
          handleNoteClick(rowIndex, noteIndex, e);
        });
  
        seqRow.appendChild(button);
      });
  
      sequencer.appendChild(seqRow);
    });
  };