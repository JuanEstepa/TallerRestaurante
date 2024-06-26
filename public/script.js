document.getElementById("btnSend").addEventListener("click", () => {
  const id = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const type = document.getElementById("type").value;
  const description = document.getElementById("description").value;
  const image = document.getElementById("image").value;

  const dish = {
    id: id,
    name: name,
    price: price,
    type: type,
    description: description,
    image: image,
  };

  if (dish.id == "") {
    alert("Please enter a valid ID");
  } else {
    console.log(JSON.stringify(dish));
    const URL = "/";
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dish),
    })
      .then((data) => data.json())
      .then(() => console.log(data))
      .catch((err) => alert(err));
  }
});
