import { createContext , useContext, useEffect, useState } from 'react';
import { auth, database } from '../misc/firebase';
import firebase from 'firebase/app';

export const isOfflineForDatabase = {
    state: 'offline',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const isOnlineForDatabase = {
    state: 'online',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
};


const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {

    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        let userRef;
        let userStatusRef;

       const authUnsub =  auth.onAuthStateChanged(async (authUser) => {
           if (authUser) {
                userStatusRef = database.ref(`/status/${authUser.uid}`);

                userRef = database.ref(`/profiles/${authUser.uid}`);
                userRef.on('value', (snapshot) => {
                    const { name, createdAt , avatar} = snapshot.val();

                    const data = {
                        uid: authUser.uid,
                        email: authUser.email,
                        avatar,
                        name,
                        createdAt,
                    }
                    setProfile(data);     
                    setIsLoading(false);
                });

                database.ref('.info/connected').on('value', (snapshot) => {
                    if (!!snapshot.val() === false) {
                        return;
                    }  
                    userStatusRef.onDisconnect().set(isOfflineForDatabase).then(() => {
                        userStatusRef.set(isOnlineForDatabase);
                    }
                    );
                });



            } else {

                if (userRef) {
                    userRef.off();
                }

               if (userStatusRef) {
                   userStatusRef.off();
               }
               
                database.ref('.info/connected').off();
               
                setProfile(null);
                setIsLoading(false);
            }
       });
        
        return () => {
            authUnsub();

            if (userRef) {
                userRef.off();
            }

            if (userStatusRef) {
                userStatusRef.off();
            }

            database.ref('.info/connected').off();

            
        }

    }, []);

    return (
        <ProfileContext.Provider value={{ isLoading, profile }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => useContext(ProfileContext);