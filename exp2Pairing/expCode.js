const elGrid = document.querySelector(".grid");
const elOrder = document.querySelector("#order");
const order = [...elGrid.children].map(el => el.dataset.index);

let elDrag;

const showOrder = () => elOrder.textContent = `Order: ${order}`;

const events = {
  dragstart() { 
    elDrag = this; 
  },

  dragover(ev) { 
    ev.preventDefault(); 
  },

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