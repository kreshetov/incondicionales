import React, { useEffect, useState } from 'react';
import './Miembros.css';

interface Miembro {
    id: string;
    nombre: string;
    mote: string;
    posicion: string;
    foto: string;
}

const Miembros = () => {
    const [miembros, setMiembros] = useState<Miembro[]>([]);

    useEffect(() => {
        fetch(`https://storageincondicionales.blob.core.windows.net/miembros/miembros`)
            .then(res => res.json())
            .then(data => setMiembros(data))
            .catch(err => console.error('Error al cargar miembros:', err));
    }, []);

    const handleInsertar = () => {
        alert('Aquí va la lógica para insertar un nuevo miembro');
    };

    return (
        <>
            {/* Botón insertar fuera de la lista de miembros */}
            <button className="btn-insertar naranja" onClick={handleInsertar}>
                + Añadir Miembro
            </button>

            <div className="lista-miembros">
                {miembros.map(miembro => (
                    <div className="miembro" key={miembro.id}>
                        <img src={miembro.foto} alt={miembro.nombre} />
                        <h3>
                            {miembro.nombre}{' '}
                            <span>({miembro.mote || 'Sin Asignar'})</span>
                        </h3>
                        <p>Posición: {miembro.posicion}</p>
                        <div className="botones-miembro">
                            <button className="btn-editar">Editar</button>
                            <button className="btn-eliminar">Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Miembros;
