import {useState} from "react";
import {useAuthContext} from "./useAuthContext";

export const useLogin = () => {
    const {dispatch} = useAuthContext();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const login = async (email, password) => {
        setLoading(true)
        setError(null)

        const response = await fetch("/api/user/login", {
            method: "POST",
            body: JSON.stringify({email, password}),
            headers: {
                "Content-Type": "application/json",
            }
        })
        const json = await response.json();

        if (!response.ok) {
            setLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            localStorage.setItem("user", JSON.stringify(json));
            dispatch({type: "LOGIN", payload: json});
            setLoading(false);
        }
    }

    return {login, loading, error};
}