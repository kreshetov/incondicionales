// src/components/Acceso.tsx
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User, onAuthStateChanged, } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

const Acceso = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState<User | null>(null);
    const [modo, setModo] = useState<'lectura' | 'admin'> ('lectura'); // Posibles modos, lecutra por defecto

    // Escuchar cambios en el estado de autenticación (login/logout)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        if (currentUser?.email === "kreshetov12@gmail.com") {
            setModo('admin');
        } else {
            setModo('lectura');
        }
    });

        // Limpiar el listener cuando se desmonte el componente
        return () => unsubscribe();
    }, [setModo]);

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Sesión iniciada");
            console.log("Usuario autenticado:", auth.currentUser);
        } catch (error: any) {
            alert("Error al iniciar sesión: " + error.message);
        }
    };

    const handleRegistro = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Usuario registrado");
            console.log("Usuario registrado:", auth.currentUser);
        } catch (error: any) {
            alert("Error al registrar: " + error.message);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            alert("Sesión cerrada");
            console.log("Usuario desconectado:", auth.currentUser);
        } catch (error: any) {
            alert("Error al cerrar sesión: " + error.message);
        }
    };

    if (user) {
        return (
            <div>
                <p>Hola, {user.email}</p>
                <button onClick={handleLogout}>Cerrar sesión</button>
            </div>
        );
    }

    return (
        <div className="cuadro-formulario">
            <div className="form-row">
                <label htmlFor="email" className="form-label">Email:</label>
                <input
                    id="email"
                    type="email"
                    className="form-input"
                    placeholder="incondicional@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="form-row">
                <label htmlFor="password" className="form-label">Contraseña:</label>
                <input
                    id="password"
                    type="password"
                    className="form-input"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="form-row-acceso-registro">
                <button className="boton-acceso" onClick={handleLogin}>Acceso</button>
                <button className="boton-registro" onClick={handleRegistro}>Registro</button>
            </div>
        </div>
    );
};

export default Acceso;
