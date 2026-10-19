// Intentionally messy starter code for audit practice.
let t = JSON.parse(localStorage.getItem("t")) || [];

function doThing(x) {
  if (x) {
    if (x.title) {
      t.push({ id: Date.now(), title: x.title, done: false });
      localStorage.setItem("t", JSON.stringify(t));
      document.getElementById("list").innerHTML +=
        "<li>" + x.title + "</li>";
    }
  }
}
