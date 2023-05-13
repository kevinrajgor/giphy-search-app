import React from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

function SignIn() {
  const [user] = useAuthState(auth);

  function handleUser() {
    if (!user) {
      const signInWithGoogle = async () => {
        await signInWithPopup(auth, provider);
      };
      signInWithGoogle();
    } else {
      const signUserOut = async () => {
        await signOut(auth);
      };
      signUserOut();
    }
  }
  return (
    <div className="login">
      {user && <span>Welcome {user.displayName}</span>}
      <button onClick={handleUser} className="login-button">
        {user ? "Sign Out" : "Sign In"}
      </button>
    </div>
  );
}

export default SignIn;
