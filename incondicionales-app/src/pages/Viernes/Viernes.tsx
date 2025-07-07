import { useEffect, useState } from 'react';
import './Viernes.css';

const Viernes = () => {
    const [nombres, setNombres] = useState<string[]>(Array(20).fill("disponible")); // 20 vacíos inicialmente

    // Cargar lista desde Azure Blob
    useEffect(() => {
        fetch(`https://storageincondicionales.blob.core.windows.net/partidos/partidos/lista?nocache=${Date.now()}`)
            .then(res => res.json())
            .then(data => {
                setNombres(data);
            })
            .catch(err => console.error('Error al cargar la lista:', err));
    }, []);

    // Validar campos de la lista
    const validarLista = (nombres: string[]): boolean => {
        const nombresValidos = /^[A-Za-z]+( [A-Za-z]+)?$/;

        for (const nombre of nombres) {
            if (!nombresValidos.test(nombre)) {
                console.log("Nombre inválido:", nombre);
                console.log ("Solo se permiten letras y un espacio entre nombres");
                alert("Solo se permiten letras y un espacio entre nombres");
             return false;
            }
        }
        return true;
    };

    // PUT hacia Azure Function
    const apuntarse = async () => {
        if (!validarLista(nombres)) {
            return;
        }
        try {
            const res = await fetch(`https://incondicionales-app-c9dqb9fta6bxckef.spaincentral-01.azurewebsites.net/api/ActualizarLista`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(nombres),
            });

            const data = await res.text();
            console.log("Lista actualizada:", data);
            alert("Lista actualizada correctamente");
        } catch (error) {
            console.error("Error al actualizar la lista:", error);
            alert("Ocurrio un error al intentar actualizar la lista.");
        }
    };

    const titulares = nombres.slice(0, 16);
    const reservas = nombres.slice(16);

    return (
        <div className="contenedor-principal">
            <div className="lista">
                <div className="fecha-partido">
                    <span className="fecha">🗓️ Viernes 26-06-2025</span>
                    <span className="campo">📍 Pozuelo 3</span>
                </div>

                <div className="jugadores-anotados">
                    <h3 className="subtitulo">🟢 Titulares</h3>
                    {titulares.map((nombre, index) => (
                        <div key={index} className="fila-jugador">
                            <label className="enumeracion">{index + 1}.</label>
                            <input
                                className="jugador-input"
                                type="text"
                                placeholder="Escribe tu nombre..."
                                value={nombre === "disponible" ? "" : nombre}
                                onChange={(e) => {
                                    const nuevosNombres = [...nombres];
                                    nuevosNombres[index] = e.target.value;
                                    setNombres(nuevosNombres);
                                }}
                            />
                        </div>
                    ))}

                    {reservas.length > 0 && (
                        <>
                            <h3 className="subtitulo">🟡 Reservas</h3>
                            {reservas.map((nombre, index) => (
                                <div key={index + 16} className="fila-jugador reserva">
                                    <label className="enumeracion">{index + 17}.</label>
                                    <input
                                        className="jugador-input"
                                        type="text"
                                        placeholder="Escribe tu nombre..."
                                        value={nombre === "disponible" ? "" : nombre}
                                        onChange={(e) => {
                                            const nuevosNombres = [...nombres];
                                            nuevosNombres[index + 16] = e.target.value;
                                            setNombres(nuevosNombres);
                                        }}
                                    />
                                </div>
                            ))}
                        </>
                    )}
                </div>

                <button className="boton-apuntarme" onClick={apuntarse}>
                    ✅ Apuntarme
                </button>
            </div>
        </div>
    );
};

export default Viernes;
