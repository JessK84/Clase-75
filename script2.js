// Estado active de los <nav></nav>
const setActive = event => {
    const navLinks = document.querySelectorAll(".nav-link");
    const navLink = event.target;
    for(let nl of navLinks) {
        nl.classList.remove("is-active");
    }
    navLink.classList.add("is-active");
};



//Aparecen imágenes random de gatitos - Jesica
// const mostrarGatos = () => {
//     axios.get('https://api.thecatapi.com/v1/images/search/')
//     .then(res => {console.log(res.data)
//             res.data.forEach(imagen => {       
//                 const img = document.createElement('img');
//                 img.src = imagen.url
//                 img.style.width = '350px';
//                 console.log(`Un nuevo gato`, img.src)
//                 const eliminar = event => {
//                     const eliminarImagen = event.target.parentElement;
//                     eliminarImagen.remove();
//                 } 
//                 img.addEventListener('click', eliminar);
//                 document.querySelector('.section-imagen').appendChild(img); 
//         });
//     })
// }

// Aparecen imágenes random de gatitos - Fede
const hideAllMainScts = () => {
    const sections = document.querySelectorAll(".main-sct");
    for(let sct of sections) {
        sct.style.display = "none";
    }
}

const openRazas = () => {
    hideAllMainScts();
    document.querySelector("#sct-razas").style.display = "block";
    document.querySelector("#btn-random").addEventListener("click", openRandom);
};

const openRandom = e => {
    hideAllMainScts();
    axios.get("https://api.thecatapi.com/v1/images/search/")
        .then(res => {
            document.querySelector("#random-img").src = res.data[0].url;
            document.querySelector("#sct-random").style.display = "flex";
            e.target.removeEventListener("click", openRandom);
        })
        .catch(err => alert("Hubo un error"));
}
const openBuscador = e => {
    hideAllMainScts();
    document.querySelector("#sct-buscador").style.display = "block";
}

// Agrego fila con dato de un nuevo gatito
const dataGatito = async () => {
    try {
        const inputNewSearch = document.querySelector('#input-gatitos');
        const newPost = await axios.get(`https://api.thecatapi.com/v1/breeds/search?q=${inputNewSearch.value}`);
        const tBody = document.querySelector('#data-gatitos')
        const tRow = document.createElement('tr');
        const tName = document.createElement('td')
        const tId = document.createElement('td');
        const tWeb = document.createElement('td');
        const tTemp = document.createElement('td');
        
        tRow.appendChild(tName);
        tRow.appendChild(tId);
        tRow.appendChild(tWeb);
        tBody.appendChild(tRow)
        tRow.appendChild(tTemp);
        newPost.data.forEach(gatito => {
            tName.innerText = gatito.name;
            tId.innerText = gatito.weight.imperial;
            tWeb.innerText =  gatito.origin;   
            tTemp.innerText = gatito.temperament;
        });
        const eliminar = event => {
            event.target.parentElement.remove();
        } 
        tRow.addEventListener('click', eliminar);       
    } catch (err) {
        console.log(err);
        }      
}

// Ejecuto los eventos
const load = () => {
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(navLink => {
        navLink.addEventListener("click", setActive);
    });

    const btnRazas = document.querySelector("#btn-razas");
    const btnRandom = document.querySelector("#btn-random");

    btnRazas.addEventListener("click", openRazas);
    btnRandom.addEventListener("click", openRandom);
    
    // const hacerClick = document.querySelector('#abrir');   
    const botonBuscar = document.querySelector('.search');
    const input = document.querySelector('#input-gatitos');

    // hacerClick.addEventListener('click', mostrarGatos);    
    botonBuscar.addEventListener("click", dataGatito);
    input.addEventListener('keyUp', e =>{
        console.log('Entrando a la tecla 13')
            if (e.keyCode === 13 ){
                console.log('Entrando a la tecla 13')
                dataGatito(); //no funciona
            }
    });  
}