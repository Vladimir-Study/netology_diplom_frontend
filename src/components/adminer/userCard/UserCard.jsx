import { useAdminUpdateUsersMutation, useAdminUserDeleteMutation } from '../../../store/api/api'
import { setStorageId } from '../../../store/auth/authReducer'
import { Link } from 'react-router-dom'

import { UserIcon } from '../../icons/UserIcon'

import styles from './UserCard.module.css'
import { useDispatch } from 'react-redux'

export function UserCard({ userData, userFilesData }) {

  const [ setUpdate ] = useAdminUpdateUsersMutation({
    fixedCacheKey: 'shared-update-post',
  })
  const [ setDelete ] = useAdminUserDeleteMutation({
    fixedCacheKey: 'shared-update-post',
  })
  const dispatch = useDispatch();
  let id = userData.id
  const username = userData.username;

  const hundleChange = async (e) => {
    console.log(e.target.checked);
    const data = {
      is_staff: e.target.checked
    };
    const res = await setUpdate({id, data}).unwrap() 
    console.log(res);
  }

  const hundleClick = async () => {
    await setDelete({id}).unwrap();
  }

  const hundleStorage = () => {
    dispatch(setStorageId({id, username}));
  }
  
  return (
    <div className={styles.userCard}>
      <div className={styles.userDelete}>
        <a className={`waves-effect waves-light btn-small `}>
          <i className="small material-icons" onClick={hundleClick}>close</i>
        </a>
      </div>
      <UserIcon styleIcon={styles.styleUserIcon}/>
      <div className={styles.userData}>
        <div className={styles.aboutUser}>
          <p>Name: {userData.username}</p>
          <p>Email: {userData.email}</p>
          <p>Full Name: {userData.fullname}</p>
          <label className={styles.userField}>
            <input type="checkbox" checked={userData.is_staff} onChange={hundleChange}/>
            <span>User is Admin</span>
          </label>
        </div>
        <div className={styles.aboutStorage}>
          <div className={styles.filesData}>
            <p>Count files: {userFilesData.countFiles}</p>
            <p>Size all files: {(userFilesData.filesSizes/1048576).toFixed(2)} Mb</p>
          </div>
          <button className="btn waves-effect waves-light" type="submit" name="action">
            <Link to='/files' onClick={hundleStorage}>Files storage</Link>
          </button>
        </div>
      </div>
    </div>
  )
}
