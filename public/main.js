const activityItem = document.querySelectorAll(".activity");
console.log(activityItem[0].innerText);
document.querySelector(".time").addEventListener("click", addTotal);

// const mappedItems = activityItem.map((el) => el);
console.log("this iswhat i want to  mapped array", activityItem);

const mappedItems = Array.from(activityItem).map((el) =>
  el.innerText.split("\n")
);
console.log("this is mapped array of  just activities", mappedItems);
// for (let i = 0; i < mappedItems.length - 1; i++) {
//   console.log("this is mapped list inside for loop", mappedItems[i][0]);
//   let elActivity = mappedItems[i][0];
//   if (elActivity == mappedItems[i + 1][0]) {
//     console.log("ay ay we found onw in the same ", elActivity);
//   }
// }
let reducedNums = mappedItems.map((el) => Number(el[1].split(" ")[0]));
console.log(
  "this is reduced nums",
  reducedNums.reduce((a, b) => a + b)
);

async function addTotal() {
  try {
    const response = await fetch("addTotal", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        total: reducedNums,
      }),
    });
    const data = await response.json();
    console.log("this is data for our async function ", data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}
