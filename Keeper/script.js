const addbutton = document.querySelector("#add");

const updateLSD = () => {
  const textAreas = document.querySelectorAll("textarea");
  const notes = [];
  console.log(textAreas);
  textAreas.forEach((note) => {
    return notes.push(note.value);
  });
  localStorage.setItem("notes", JSON.stringify(notes));
};

const addnote = (text = " ") => {
  const note = document.createElement("div");
  note.classList.add("note");
  const addhtml = `<div class="operation">
<button class="edit"><i class="fas fa-edit"></i></button>
<button class="delete"><i class="fas fa-trash-alt"></i></button></div>
<div class="main ${text ? "" : "hidden"}"></div>
<textarea class="${text ? "hidden" : ""}"></textarea>`;
  note.insertAdjacentHTML("afterbegin", addhtml);

  const editbut = note.querySelector(".edit");
  const delbut = note.querySelector(".delete");
  const maindiv = note.querySelector(".main");
  const textarea = note.querySelector("textarea");

  textarea.value = text;
  maindiv.innerHTML = text;

  delbut.addEventListener("click", () => {
    note.remove();
    updateLSD();
  });

  editbut.addEventListener("click", () => {
    maindiv.classList.toggle("hidden");
    textarea.classList.toggle("hidden");
  });

  textarea.addEventListener("change", (event) => {
    const value = event.target.value;
    maindiv.innerHTML = value;
    updateLSD();
  });

  document.body.appendChild(note);
};

const notes = JSON.parse(localStorage.getItem("notes"));
if (notes) {
  notes.forEach((note) => addnote(note));
}

addbutton.addEventListener("click", addnote);
