import { useEffect, useState } from "react";
import './Partidos.css';

interface Partido {
    fecha: string,
    equipoAzules: string,
    equipoVerdes: string,
    campo: string,
    ubicacion: string,
    foto: string,
    golesAzules: number,
    golesVerdes: number,
    mvp: string,
    descripcion: string
}

const Partidos = () => {
    const [partidos, setPartidos] = useState<Partido[]>([]);

    useEffect(() => {
        fetch(`https://storageincondicionales.blob.core.windows.net/partidos/partidos`)
            .then(res => res.json())
            .then(data => setPartidos(data))
            .catch(err => console.error('Error al cargar partidos:', err));
    }, []);

    const handleInsertar = () => {
        alert('Aquí va la lógica para insertar un nuevo partido');
    };

    return (
        <>
            <button className="btn-insertar naranja" onClick={handleInsertar}>
                + Añadir Partido
            </button>

            <div className="partidos-container">
                <h2 className="titulo-partidos">Historial de Partidos</h2>
                <div className="lista-partidos">
                    {partidos.map((partido, index) => (
                        <div className="tarjeta-partido" key={index}>
                            <img className="imagen-partido" src={partido.foto} alt={`Partido en ${partido.campo}`} />
                            
                            <div className="info-partido">
                                <div className="partido-fecha-mvp">
                                    <span className="partido-fecha">{partido.fecha}</span>
                                    <span className="mvp">
                                        <strong>MVP ⭐{partido.mvp}</strong> <span className="estrella"></span>
                                    </span>
                                </div>

                                <div className="resultado">
                                    <span className="equipo azules">{partido.equipoAzules}</span>
                                    <span className="goles">{partido.golesAzules}</span>
                                    <span className="vs">vs</span>
                                    <span className="goles">{partido.golesVerdes}</span>
                                    <span className="equipo verdes">{partido.equipoVerdes}</span>
                                </div>

                                <div className="descripcion-partido">{partido.descripcion}</div>

                                <a className="link-ubicacion" href={partido.ubicacion} target="_blank" rel="noopener noreferrer">
                                    Ver ubicación
                                </a>

                                <div className="acciones">
                                    <button className="btn-editar">Editar</button>
                                    <button className="btn-eliminar">Eliminar</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Partidos;
