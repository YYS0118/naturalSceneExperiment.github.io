const elGrid = document.querySelector(".grid");
const elOrder = document.querySelector("#order");
const order = [...elGrid.children].map(el => el.dataset.index);
let elDrag;

const showOrder = () => elOrder.textContent = `Order: ${order}`;

const events = {
  dragstart() { elDrag = this; },
  dragover(ev) { ev.preventDefault(); },
  drop() {
    if (elDrag === this) return;
    const ia = [...elGrid.children].indexOf(elDrag);
    const ib = [...elGrid.children].indexOf(this);
    elDrag.replaceWith(this.cloneNode(true));
    this.replaceWith(elDrag);
    [order[ia], order[ib]] = [order[ib], order[ia]];
    showOrder();
  }
};

[...elGrid.children].forEach((el, i) => el.draggable = true);
["dragstart", "dragover", "drop"].forEach(evName => {
  elGrid.addEventListener(evName, (ev) => {
    const elItem = ev.target.closest(".item");
    if (!elItem) return; 
    events[evName].call(elItem, ev);
  });
});
showOrder();

// SELECT IMAGES RANDOMLY
//window.onload = choosePic;
//var myPix = new Array("images/img1.png","images/img2.png","images/img3.png","images/img4.png","images/img5.png","images/img6.png");
//var trailList =  [[5,4,3],[2,1,0],[0,2,4],[1,3,5]]; //[0,1,2,3,4,5]
//var loopL = 0;
// function choosePic() {
 //    trails = trailList[loopL];
//     document.getElementById("myPicture1").src = myPix[trails[0]];
//     document.getElementById("myPicture2").src = myPix[trails[1]];
//     document.getElementById("myPicture3").src = myPix[trails[2]];
//   }
