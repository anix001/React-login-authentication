import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import UseAxiosPrivate from "../hooks/UseAxiosPrivate";

const Users = () => {
    const [users, setUsers] = useState<any>();
    const axiosPrivate = UseAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/users', {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setUsers(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }
    })

    return (
        <article>
            <h2>Users List</h2>
            {users?.length
                ? (
                    <ul>
                        {users.map((user: any, i: number) => <li key={i}>{user?.username}</li>)}
                    </ul>
                ) : <p>No users to display</p>
            }
        </article>
    );
};

export default Users;