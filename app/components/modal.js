import styles from '../styles.module.css';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState, useEffect } from 'react';

const Modal = ({modal, setModal,user}) => {

    const [key, setKey] = useState('');
    useEffect(() => {
        async function getSecret () {
            const supabase = createClientComponentClient();
            const apikey = await supabase.rpc('read_secret', {secret_name: `${user}`});
            if (apikey.data) {
                console.log(apikey, 'data');
                setKey(apikey.data);
                const hiddenInput = document.getElementById('api')
                if(hiddenInput) {
                    hiddenInput.value = key;
                    hiddenInput.disabled = true;
                    hiddenInput.type = 'password';
                }
               
            }
           
        }
        getSecret();
    
     
    },[])

    const showPassword = (event) => {
        event.preventDefault();
        const password = document.getElementById('api');
        if (password.type === 'password') {
            password.type = 'text';

        } else {
            password.type = 'password';
        }
    }

    const setEdit = (event) => {
        event.preventDefault();
        const hiddenInput = document.getElementById('api')
        hiddenInput.type = 'text';
        hiddenInput.disabled = false;
    }

    async function handleDelete (event) {
        event.preventDefault();
        const supabase = createClientComponentClient();
        const { error } = await supabase.rpc('delete_secret', {
            secret_name: `${user}`
        })
        setKey('');

        if (error) {
            console.error('Error deleting name', error)
        }
    }

    async function handleSave (event) {
        event.preventDefault();
        const supabase = createClientComponentClient();
        const apikey = await supabase.rpc('read_secret', {secret_name:  `${user}`});
        if (!apikey.data) {
            const { error } = await supabase.rpc('insert_secret', {
                'name':`${user}`, 'secret': `${key}`
            })
            if (error) {
                console.error('error inserting data',error)
            }
        } else {
            const supabase = createClientComponentClient();
            const apikey = await supabase.rpc('read_secretid', {secret_name: `${user}`});
            console.log(apikey, 'readsecretid')
            const { error } = await supabase.rpc('update_secret', {secretid: apikey.data, secret: `${key}`})
            if (error) {
                console.error('error inserting data',error)
            }
        }
        

       const hiddenInput = document.getElementById('api')
       hiddenInput.disabled = true;
    }
    return (
        <>
        {modal ? (
        <>
            <div className={styles.modalBackground}>
                <div className={styles.modalContainer}>
                    <div className={styles.modalHeader}>
                        <a onClick={() => setModal(false)}>X</a>
                    </div>
               
                    <h1 className={styles.modalTitle}>Settings</h1>
                 
                    <div className={styles.modalBody}>
                        <form>
                            
                            <label className={styles.form__label}>
                                ApiKey
                            </label>
                            <div>
                            <input id='api' type="password" className={styles.form__textarea} value={key}  onChange={(e) => setKey(e.target.value)}/>
                            </div>
                            <button id='reveal' onClick={showPassword}>Show</button>
                            <button id='edit' onClick={setEdit}>Edit</button>
                        </form>
                    </div>
                    <div className={styles.modalFooter}>
                        <button className={styles.modal__button} onClick={() => setModal(false)}>Cancel</button>
                        <button className={styles.modal__buttonContinue} onClick={handleSave}>Save</button>
                        <button className={styles.modal__buttonContinue} onClick={handleDelete}>Delete</button>

                    </div>
                </div>
            </div>
        </>
        ) : null}
        </>
    )
}

export default Modal;