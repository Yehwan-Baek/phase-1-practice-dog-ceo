console.log('%c HI', 'color: firebrick')
document.addEventListener("DOMContentLoaded",init)

function init(){
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    
    fetch(imgUrl)
    .then( (res) => res.json() )
    .then( (images) => {
        let div = document.querySelector("#dog-image-container");

        images.message.forEach((dog) => {
            let img = document.createElement("img");
            img.src = dog;

            div.appendChild(img);
        })
    })

    let ul = document.querySelector("#dog-breeds");

    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    let breedObj = {};

    fetch(breedUrl)
    .then( (res) => res.json() )
    .then( (breeds) => {
        breedObj = {...breeds.message}
        
        renderBreed(breedObj)
    })

    function renderBreed(breeds) {
        for (breed in breeds) {
            
            let breedValue = breeds[breed];

            if (breedValue.length > 0) {
                breedValue.forEach((subBreed)=>{
                    let li = document.createElement("li");
                    li.innerHTML = breed + " " + subBreed;

                    ul.appendChild(li);
                })
            } else {
                let li = document.createElement("li");
                li.innerHTML = breed;

                ul.appendChild(li);
            }
        }
    }

    ul.addEventListener("click", (e)=>{
        if(e.target.tagName === "LI"){
            e.target.style.color = "red"
        }
    })

    let  dropdown = document.querySelector("#breed-dropdown");

    dropdown.addEventListener("change", (e) => {
        let selected = dropdown.value;

        ul.innerHTML = "";

        for (breed in breedObj) {
            if (breed[0] === selected) {
                let li = document.createElement("li");
                li.innerHTML = breed;

                ul.appendChild(li)
            }
        }
    })
}