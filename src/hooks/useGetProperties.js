import { useEffect, useState } from "react";

const API_BASE = "http://localhost:3000";
const FETCH_OPTIONS = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
};

const useGetProperties = () => {
    const [properties, setProperties] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchProperties = async () => {
        try {
            const response = await fetch(`${API_BASE}/api/properties`, FETCH_OPTIONS);

            if (!response.ok)
                throw new Error(`status : ${response.status}, message : Failed to fetch Properties`);

            const properties = await response.json();
            setProperties(properties)
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProperties()
    }, []);

    return {
        properties,
        error,
        loading
    }
}

export default useGetProperties;
