const mostrarGatos = () => {
    axios.get('https://api.thecatapi.com/v1/images/search/')
    .then(res => {console.log(res.data)
            res.data.forEach(imagen => {       
                const img = document.createElement('img');
                img.src = imagen.url;
                img.style.width = '350px';
                console.log(`Un nuevo gato`, img.src)
                const eliminar = event => {
                    const eliminarImagen = event.target.parentElement;
                    eliminarImagen.remove();
                } 
                img.addEventListener('click', eliminar);
                document.querySelector('.section-imagen').appendChild(img); 
        });
    })
}

const load = () => {
    const navLinks = document.querySelector('#abrir');
    navLinks.addEventListener('click', mostrarGatos);
    
    const botonBuscar = document.querySelector('.search')
    botonBuscar.addEventListener("click", async () => {
        try {
            const inputNewSearch = document.querySelector('#input-gatitos');
            console.log(inputNewSearch)   
            const newPost = await axios.get(`https://api.thecatapi.com/v1/breeds/search?q=${inputNewSearch.value}`);
            newPost.data.forEach(gatito => {
                const tRow = document.querySelector('#data-gatitos');
                const tName = document.createElement('td')
                tName.innerText = gatito.name;
                const tId = document.createElement('td');
                tId.innerText = gatito.weight.imperial;
                const tWeb = document.createElement('td');
                tWeb.innerText =  gatito.origin;
            
                tRow.appendChild(tName);
                tRow.appendChild(tId);
                tRow.appendChild(tWeb);
            });
        
        } catch (err) {
            console.log(err);
            }      
    })
    document.querySelector('.search').addEventListener('click', botonBuscar);   
}