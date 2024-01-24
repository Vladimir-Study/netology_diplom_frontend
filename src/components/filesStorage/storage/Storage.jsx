import { FileData } from '../fileData/FileData' 
import { Preloader } from '../../elements/Preloader'

import { useSelector } from 'react-redux';
import { useGetUserFilesQuery } from '../../../store/api/api';
import { Link } from 'react-router-dom';

import styles from './Storage.module.css'
// import stscss from '../../../css/extend_materials.module'

export function Storage() {

  let { storageId, userData } = useSelector(store => store.auth);
  let showFiles;

  if (!storageId) {
    storageId = userData.userId; 
  }

  const filesData = useGetUserFilesQuery(storageId);

  if (!filesData.isLoading) {
    showFiles = filesData.data.map(file => <FileData key={file.id} fileData={file}/>)
  }

  return (
    <div className={styles.storageMain}>
      <div className={styles.addBtn}>
        <Link to='/add-file' className={`btn-floating btn-large waves-effect waves-light red darken-1`}>
          <i className="material-icons">add</i>
        </Link>
      </div>
      {filesData.isLoading?< Preloader />:null}
      {showFiles?showFiles:<Preloader/>}
    </div>
  )
}
