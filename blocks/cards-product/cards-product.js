import { createOptimizedPicture } from "../../scripts/aem.js";

export default function decorate(block) {
  /* change to ul, li */
  const outerDiv = document.createElement("div");
  [...block.children].forEach((row) => {
    const innerDiv = document.createElement("div");
    innerDiv.className = "product-card";
    const wrapperDiv = document.createElement("div");
    wrapperDiv.className = "product-card-body-wrapper"; // New wrapper div
    while (row.firstElementChild) innerDiv.append(row.firstElementChild);
    [...innerDiv.children].forEach((div) => {
      const wrapperDiv2 = document.createElement("div");
      wrapperDiv2.className = "product-meta"; // New wrapper div 2
      if (div.children.length === 1 && div.querySelector("picture")) {
        div.className = "product-card-image";
      } else if (div.children.length === 1 && div.querySelector("h2")) {
        div.className = "product-card-title";
      } else {
        // ADDING THE IMAGE INTO A SPECIAL META DIV
        if (div.querySelector("p").children.length === 1) {
          wrapperDiv2.append(div.children[0])
        }
        div.className = "product-card-body"; // Set the class name as before
        wrapperDiv2.append(div); // Wrap the product-card-body inside the new div
        wrapperDiv.append(wrapperDiv2); // Wrap the product-card-body inside the new div
        innerDiv.append(wrapperDiv); // Append the wrapper div to the innerDiv
        return; // Exit this iteration since we've moved the div inside the wrapper
      }
    });


        // Filter the product-card-title before adding to outerDiv
        const titleElement = innerDiv.querySelector('.product-card-title h2');
        if (titleElement && titleElement.textContent.trim() !== "Pomelo chicken!") {
          console.log("titleElement", titleElement)
          console.log("innerDiv", innerDiv)
          outerDiv.append(innerDiv);
        }


  });

  outerDiv
    .querySelectorAll("img")
    .forEach((img) =>
      img
        .closest("picture")
        .replaceWith(createOptimizedPicture(img.src, img.alt, false))
    );
  block.textContent = "";
  block.append(outerDiv);
}
