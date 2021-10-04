document.addEventListener("DOMContentLoaded", () => {
  fetchDogs();
});

//1. Render DOM - already registered dogs//
function renderDogs(dogData) {
  let tr = document.createElement("tr");

  let tdName = document.createElement("td");
  tdName.innerText = dogData.name;
  let tdBreed = document.createElement("td");
  tdBreed.innerText = dogData.breed;
  let tdSex = document.createElement("td");
  tdSex.innerText = dogData.sex;
  let tdEdit = document.createElement("td");
  let editBtn = document.createElement("button");
  editBtn.innerText = "Edit";
  editBtn.classList.add("edit_btn");
  editBtn.id = dogData.id;
  tdEdit.appendChild(editBtn);

  tr.append(tdName, tdBreed, tdSex, tdEdit);

  let tbody = document.querySelector("#table-body");
  tbody.appendChild(tr);

  //2.Render DOM - edited dogs//
  editBtn.addEventListener("click", () => {
    let dogForm = document.querySelector("#dog-form");
    //console.log(dogForm.name) <= Form box
    //console.log(dogData.name) <= name of clicked row
    dogForm.name.value = dogData.name;
    dogForm.breed.value = dogData.breed;
    dogForm.sex.value = dogData.sex;

    patchDogs(dogData)
  });
}

//1. Fetch/GET - already registered dogs//
function fetchDogs() {
  fetch("http://localhost:3000/dogs")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((dogData) => {
        renderDogs(dogData);
      });
    });
}

//2.Fetch/PATCH - edited dogs//
function patchDogs(dogData) {
  let dogForm = document.querySelector("#dog-form");
  dogForm.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/dogs/${dogData.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: dogForm.name.value,
        breed: dogForm.breed.value,
        sex: dogForm.sex.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        fetchMostUpdated(data);
      });

    dogForm.reset();
  });
}

//3.Fetch/GET - most updated data//
function fetchMostUpdated() {
  fetch("http://localhost:3000/dogs")
    .then((response) => response.json())
    .then((data) => {
      //console.log(data)
      data.forEach((dogData) => {
        console.log("Most updated data: ", dogData);
        renderDogs(dogData);
      });
    });
}
