import Bingo from "./bingo.js";

export default class Card {
  constructor(title) {
    // the constructor is called when you create a new instance of the class
    this.title = title;
    console.log(`Created a new card with title: ${title}`);
  }

  markDone(target) {
    // to mark a card as done, we add a class .bingo__card--done to it
    // 🔥🔥🔥 TODO 5: mark or unmark (toggle) a bingo card when clicked
    console.log("Marking card as done");
    console.log(target);
    target.classList.toggle("bingo__card--done");


    // hint: use class .bingo__card--done
  }

  render(counter) {
    // rendering the card to the screen is done by building up a string of HTML
    // after that, we append the HTML to the DOM - check the index.html file to see what structure to use
    console.log("Rendering card...");

    // 🔥🔥🔥 TODO3: build the HTML element and append it to the DOM
    
    let card = document.createElement("div");
    card.classList.add("bingo__card");
    card.dataset.number = counter + 1;
    card.setAttribute("id", `bingo__card${counter+1}`);
    card.innerHTML = this.title;
    let cards = document.querySelector(".bingo__board");
    cards.appendChild(card);
    
    
    //<div class="bingo__card" data-number="1" id="bingo__card1"></div>>
    // don't forget to append the child to to DOM

    // 🔥🔥🔥 TODO4: when we click an item, we want to check for winners and we want to save the selection to storage
    card.addEventListener("click", (e) => {
      this.markDone(e.target);
      Bingo.checkWinner();
      Bingo.save();
      // call checkWinner() on the Bingo class
      // try to call the save() method on the Bingo class
    });
  }
}
