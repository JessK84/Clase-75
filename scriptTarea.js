const mostrarGatos = () => {
    axios.get('https://api.thecatapi.com/v1/images/search/')
    .then(res => {console.log(res.data)
            res.data.forEach(imagen => {
                const div = document.createElement('div');
                const img = document.createElement('img');
                img.src = imagen.url;
                img.style.width = '500px';
                img.style.textAlign = 'center';

                console.log(`Un nuevo gato`, img.src)
                const eliminar = event => {
                    const eliminarImagen = event.target.parentElement;
                    eliminarImagen.remove();
                } 
                div.addEventListener('click', eliminar);
                div.appendChild(img);
                document.querySelector('.section-imagen').appendChild(div);
                
        });
    })
}

const load = () => {
    const imagenGatos = document.querySelector('#abrir');
    imagenGatos.addEventListener('click', mostrarGatos);
}