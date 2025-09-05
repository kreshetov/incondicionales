import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './Miembro.css';

interface Miembro {
    id: string,
    nombre: string;
    mote: string;
    posicion: string;
    foto: string;
    edad: number;
    nacionalidad: string;       
}

const Miembro = () => {
    const { id } = useParams<{ id: string }>();
    const [miembro, setMiembro] = useState<Miembro | null>(null);

     useEffect(() => {
        fetch(`https://storageincondicionales.blob.core.windows.net/miembro/miembro_${id}?nocache=${Date.now()}`)
            .then(res => res.json())
            .then(data => setMiembro(data))
            .catch(err => console.error('Error al cargar miembros:', err));
    }, [id]);

    return (
        <>
            <p className="titulo-miembro"> Miembro Detalles </p>
            <div className="miembro-contenedor">
                {miembro && (
                    <div className="miembro-ficha" key={miembro.id}>
                        <img src={miembro.foto} alt={miembro.nombre} />
                        <h2>{miembro.nombre} ({miembro.mote})</h2>
                        <p>Posición: {miembro.posicion}</p>
                        <p>Edad: {miembro.edad}</p>
                        <p>Nacionalidad: {miembro.nacionalidad}</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default Miembro;