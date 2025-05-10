"use client";

import { logout } from "./actions";

export default function LogoutButton() {


  return (
     
      <button onClick={() => logout()}>Logout</button>
    
  );
}


