import { useState } from 'react';
import { useDeleteUserFileMutation, useGetDownloadFileMutation, useUpdateAccessTokenMutation, useUpdateUserFileMutation } from '../../../store/api/api';
import styles from './FileData.module.css'

export function FileData({fileData}) {

  const uploadDate = new Date(fileData.load_date);
  const downloadDate = new Date(fileData.load_date);
  const id = fileData.id;
  const { VITE_HOST } = import.meta.env

  const [ deleleUser ] = useDeleteUserFileMutation();
  const [ updateName ] = useUpdateUserFileMutation();
  const [ getExternal ] = useGetDownloadFileMutation();

  const [editClick, setEditClick] = useState(false);
  const [editValue, setEditValue] = useState(fileData.filename);
  const [updateAccess, { isLoading }] = useUpdateAccessTokenMutation();
  const [externalLink, setExternalLink] = useState(null);

  const hundleClickDelete = async () => {
    await deleleUser({id}).unwrap();
  };

  const hundleClickEdit = async (e) => {
    setEditClick(!editClick); 
    if (editClick) {
      let updateData = new FormData()
      updateData.set('user', fileData.user)
      updateData.set('filename', editValue)
      await updateName({id, updateData}).unwrap();
    }
  }

  const hundleDownloadClick = async () => {
    const { access } = await updateAccess().unwrap();
    if (!isLoading) {
      const response = await fetch(`http://${VITE_HOST}/api/v1/download/${id}/`, {
        headers: {
          Authorization: `Bearer ${access}`
        }
      });
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileData.filename;

      document.body.appendChild(link);
      link.style = 'display: none';
      link.click();

      link.parentNode.removeChild(link);
      URL.revokeObjectURL(url);
    }
  }

  const hundleChangeName = (e) => {
    setEditValue(e.target.value);
  }

  const hundleClickGetExternalLink = async () => {
    setExternalLink(await getExternal({id}).unwrap());
  }

  return (
    <div className={styles.fileCard}>
      <div className={styles.userDelete}>
        <a className={`waves-effect waves-light btn-small `}>
          <i className="tiny material-icons" onClick={hundleClickDelete}>close</i>
        </a>
      </div>
      <p className={styles.filenameStyle}>
        Name: {!editClick?fileData.filename:<input type="text" value={editValue} onChange={hundleChangeName}/>}
        <i className="material-icons" onClick={hundleClickEdit}>{editClick?'check':'create'}</i>
      </p>
      <p>Size: {(fileData.filesize/1048576).toFixed(2)} Mb</p>
      <p>Loading date: {`${uploadDate.getFullYear()}/${(uploadDate.getMonth()+1)}/${uploadDate.getDate()}`}</p>
      <p>Last download date: {`${downloadDate.getFullYear()}/${(downloadDate.getMonth()+1)}/${downloadDate.getDate()}`}</p>
      <p>Comment: {fileData.comment?fileData.comment:'Empty'}</p>
      <div className={styles.fileBtns}>
        <a className="waves-effect waves-light btn-small" onClick={hundleDownloadClick}>Download</a>
        {!externalLink?null:<input type="text" readOnly defaultValue={externalLink.link}/>}
        <a className="waves-effect waves-light btn-small" onClick={hundleClickGetExternalLink}>Create external link</a>
      </div>
    </div>
  )
}
