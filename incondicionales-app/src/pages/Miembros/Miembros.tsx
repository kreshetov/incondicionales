// src/pages/Miembros/Miembros.tsx
import { useEffect, useState } from "react"

interface MiembrosInterfaz {
    id: number,
    foto: string,
    nombre: string,
    apodo: string,
    posicion: string
}

const Miembros = () => {
    const [miembros, setMiembros] = useState<MiembrosInterfaz[]>([]);

    useEffect(() => {
    fetch(`https://321c899a-d49d-4fe6-af09-b58a6a361e8f.mock.pstmn.io/Miembros`)
      .then((response) => response.json())
      .then((data) => setMiembros(data))
      .catch((error) => console.error('Error al obtener listado de miembros', error));
  }, []);

    return (
        <div className="lista-miembros">
            {miembros.map((miembro) => (
                <div className="miembro" key={miembro.id}>
                    <img src={miembro.foto} alt={`${miembro.nombre} ${miembro.apodo}`} />
                    <h3>{miembro.nombre} <span>({miembro.apodo})</span></h3>
                    <p>Posición: {miembro.posicion}</p>
                </div>
            ))}
        </div>
    );
};

export default Miembros;