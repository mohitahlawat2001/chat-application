import { createContext , useContext, useEffect, useState } from 'react';
import { auth, database } from '../misc/firebase';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {

    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        let userRef;

       const authUnsub =  auth.onAuthStateChanged(async (authUser) => {
            if (authUser) {

                userRef = database.ref(`/profiles/${authUser.uid}`);
                userRef.on('value', (snapshot) => {
                    const { name, createdAt } = snapshot.val();

                    const data = {
                        uid: authUser.uid,
                        email: authUser.email,
                        name,
                        createdAt,
                    }
                    setProfile(data);     
                    setIsLoading(false);
                });
            } else {

                if (userRef) {
                    userRef.off();
                }

                setProfile(null);
                setIsLoading(false);
            }
       });
        
        return () => {
            authUnsub();

            if (userRef) {
                userRef.off();
            }
            
        }

    }, []);

    return (
        <ProfileContext.Provider value={{ isLoading, profile }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => useContext(ProfileContext);