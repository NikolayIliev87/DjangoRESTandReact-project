import styles from './ProfileList.module.css'

import { useEffect, useState } from "react";

import { Profile } from "./Profile";

import * as profileService from '../../services/profile_service';

export const ProfilesList = () => {
    const [profiles, setProfiles] = useState([])

    useEffect(() => {
        profileService.getProfiles()
            .then(profiles => setProfiles(profiles))
      },[]);

    const onProfileDeleteHandler = (profile) => {
        const values = {
            first_name: `${profile.first_name}`,
            last_name: `${profile.last_name}`,
            phone: `${profile.phone}`,
            photo_url: `${profile.photo_url}`,
            user: `${profile.user}`,
            is_deleted: true,
        }
        profileService.updateProfile(values)
            .then(() =>
                profileService.getProfiles()
            .       then(profiles => setProfiles(profiles))
            );
    };

    return (
            <div className={styles.ProfileList}>
                <h1>Profiles List</h1>
                {profiles.map(profile => 
                    <article key={profile.user}>
                        <Profile {...profile} onDeleteClick={onProfileDeleteHandler} />
                    </article>
                )}
            </div>
    );
}