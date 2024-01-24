import { useAdminGetUsersQuery, useAdminGetUsersFilesQuery } from "../../../store/api/api"

import { UserCard } from "../userCard/UserCard"
import { Preloader } from "../../elements/Preloader";

import styles from './Panel.module.css'

export function Panel() {

  const allUsers = useAdminGetUsersQuery();
  const allFiles = useAdminGetUsersFilesQuery();

  let showUsersData;

  if (!allUsers.isLoading && !allUsers.isError) {
    showUsersData = allUsers.data.map(userData => {
      if (!allFiles.isLoading) {
        const userFiles = allFiles.data.filter((file) => file.user === userData.id);
        let filesSize = 0;
        userFiles.forEach((file) => filesSize+=file.filesize);
        const userFilesData = {
          countFiles: userFiles.length,
          filesSizes: filesSize
        };
        return (
          <UserCard key={userData.id} userData={userData} userFilesData={userFilesData}/>
        )
      }
    })
  }

  return (
    <section className={styles.adminPanel}>
      {!showUsersData?<Preloader/>:showUsersData} 
      {allUsers.isLoading || allUsers.isError ? <Preloader/>:null}
    </section>
  )

}
