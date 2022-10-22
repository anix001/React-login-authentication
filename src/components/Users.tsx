import { useState } from 'react'

export const Users = () => {
    const [users, setUsers] = useState<any>();

    return (
        <article>
            <h2>Users List</h2>
            {users?.length
            ?(
                <ul>
                    {users?.map((user:any, key:number)=>
                    <li key={key}>{user?.name}</li>)}
                </ul>
            ): <p>Users to display</p>
            }
        </article>
    )
}
