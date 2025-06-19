function Acceso() {
    return (
        <div className="cuadro-formulario">
            <div className="form-row">
                <label htmlFor="email" className="form-label">Email:</label>
                <input id="email" type="email" className="form-input" placeholder="incondicional@gmail.com" />
            </div>
            <div className="form-row">
                <label htmlFor="password" className="form-label">Contraseña:</label>
                <input id="password" type="password" className="form-input" placeholder="********" /> 
            </div>
            <div className="form-row-acceso-registro">
                <button className="boton-acceso">Acceso</button>
                <button className="boton-registro">Registro</button>
            </div>      
           
        </div>

    );
}

export default Acceso;