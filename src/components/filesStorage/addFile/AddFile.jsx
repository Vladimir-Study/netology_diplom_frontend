import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form'
import { useAddNewFileMutation } from '../../../store/api/api';

import styles from './AddFile.module.css'
import { useState } from 'react';

export function AddFile() {
  
  const {
    register,
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange"
  });

  const { storageId, storageName, userData } = useSelector(store => store.auth);
  const [ addFile ] = useAddNewFileMutation();
  const [ message, setMessage ] = useState({
    status: false,
    message: ''
  });

  const handlerSubmit = async (data) => {
    let sendData = new FormData();
    sendData.set('filepath', data.file[0], data.file[0].name);
    sendData.set('filename', data.filename);
    sendData.set('comment', data.comment);
    sendData.set('user', !storageId?userData.userId:storageId);
    try {
      await addFile({sendData}).unwrap()
      setMessage({
        status: true,
        message: 'File was been downloaded'
      });
      reset();
    } catch {
      setMessage({
        status: false,
        message: 'File was not been downloaded'
      });
    }
  }

  return (
    <div className={styles.formBlock}>
      <p className={styles.formTitle}>Add file for {storageId === userData.userId? 'me' : storageName}</p>
      <form action='#' className={styles.addForm} onSubmit={handleSubmit(handlerSubmit)}>
        <label>
          Filename
          <input type="text" required {...register("filename")}/>
        </label>
        <label>
          Comment
          <input type="text" {...register("comment")}/>
        </label>
        <label >
          File
          <br />
          <br />
          <input type="file" {...register("file")}></input>
        </label>
        <button className={`btn waves-effect waves-light ${styles.addBtn}`} type="submit">Add</button>
      </form>
      {message.message?<span>{message.message}</span>:null}
    </div>
  )
}
