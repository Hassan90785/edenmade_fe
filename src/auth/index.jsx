import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
import { useEffect, useState } from "react";
import auth from "./config";

export const useProvideAuth = () => {
  const [authUser, setAuthUser] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingAuthUser, setLoadingAuthUser] = useState(true);
  const [error, setError] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);
  const [userData, setUserData] = useState(null);
  

  const provider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  
  const userSignInWithFacebook = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      setAuthUser(result.user);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const userLogin = async (email, password) => {
    setLoading(true);
    email.toLowerCase();
    await signInWithEmailAndPassword(auth, email, password).then(
      async ({ user }) => {
        const val = await user.getIdTokenResult();
        // if (val?.claims["type"] !== "payer") {
        //   signOut(auth).then(() => {
        //     setAuthUser(undefined);
        //   });
        // } else {
        setAuthUser(user);
        // }
      }
    );
    setLoading(false);
  };
  const userSignInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      setAuthUser(result.user);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const userSignUp = async (email, password) => {
    setLoading(true);
    email.toLowerCase();
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => { 
        await updateProfile(user, { displayName });

        // Send email verification
        await sendEmailVerification(user);

        setAuthUser(user);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const userSignOut = () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        setAuthUser(undefined);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const resetPassword = async (email) => {
    setLoading(true);
    await sendPasswordResetEmail(auth, email);
    setLoading(false);
  };
 

  const tokenId = async () => {
    return await authUser?.getIdToken();
  };
  const fetchUserData = async () => {
    const endpoint = 'http://localhost:8800/getUserFromEmail';
    const email = authUser?.email;  

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error:', error.message);
      // Handle the error
    }
  };
  const fetchOrderDetails = async (userId) => {
    const endpoint = 'http://localhost:8800/orderdetails';
  
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });
  
      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        // Parse the response JSON
        const data = await response.json();
        setOrderDetails(data);
        return data;
      } else {
        // Handle the error, e.g., by throwing an error or returning an error object
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      // Handle network errors, e.g., connection refused, timeout, etc.
      console.error('Error:', error.message);
      throw error; // Rethrow the error to let the calling code handle it
    }
  };
   
  
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setLoading(true);
      if (user) {
        setAuthUser(user);
        // fetchUserData(); 

    // fetchOrderDetails(userData.id)
      } else {
        setAuthUser(undefined);
        setLoadingAuthUser(false);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    loadingAuthUser,
    loading,
    authUser,
    resetPassword,
    setAuthUser,
    userLogin,
    tokenId,
    error,
    userSignUp,
    GoogleAuthProvider,
    userSignInWithGoogle,
    userSignInWithFacebook,
    userSignOut,
    signInWithEmailAndPassword,
    fetchUserData,userData
  };
};
