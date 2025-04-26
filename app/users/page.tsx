import React from "react";

interface User {
  id: number;
  name: string;
}

const UsersPage = async () => {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/users",
 { next: { revalidate: 60 } } // catch revalidate in 60 sec
  );
  const users: User[] = await res.json();

  return (
    <div>
      <h1>Users page</h1>
      <p> Render On: { new Date().toLocaleTimeString() }</p>
      <ul>
        {users.map((user) => (
          <li key={user.id}> {user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;
