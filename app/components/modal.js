import styles from '../styles.module.css';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState, useEffect } from 'react';

const Modal = ({modal, setModal,user}) => {

    const [show,setShow] = useState(false);

    const [key, setKey] = useState('');
    useEffect(() => {
        async function getSecret () {
            const supabase = createClientComponentClient();
            const apikey = await supabase.rpc('read_secret', {secret_name: `${user}`});
            if (apikey.data) {
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
        setShow(true);
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
            if (key === '') {
                const supabase = createClientComponentClient();
        const { error } = await supabase.rpc('delete_secret', {
            secret_name: `${user}`
        })


        if (error) {
            console.error('Error deleting name', error)
        }

            }
            const supabase = createClientComponentClient();
            const apikey = await supabase.rpc('read_secretid', {secret_name: `${user}`});
            const { error } = await supabase.rpc('update_secret', {secretid: apikey.data, secret: `${key}`})
            if (error) {
                console.error('error inserting data',error)
            }
        }
    }
    return (
        <>
        {modal ? (
        <>
            <div className={styles.modalBackground}>
                <div className={styles.modalContainer}>
                    <div className={styles.modalHeader}>
                        <a onClick={() => setModal(false)}><svg width="24" height="24" class="text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 18 6m0 12L6 6"/>
</svg>
</a>
                    </div>
               
                    <h2 className={styles.modalTitle}>Settings</h2>
                 
                    <div className={styles.modalBody}>
                        <form>
                        <div className={styles.apikey}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 4a4 4 0 0 0-4 4h8a4 4 0 0 0-4-4Zm-6 6a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1H6Zm0-2a6 6 0 1 1 12 0 3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-8a3 3 0 0 1 3-3Zm4 6a2 2 0 1 1 3 1.732V17a1 1 0 1 1-2 0v-1.268A2 2 0 0 1 10 14Z" clip-rule="evenodd"></path></svg>
                            <label className={styles.form__label}>
                                API Key
                            </label>
                            </div>
                            <div className={styles.apikey} >
                                <input id='api' type="password" className={styles.modal__text} value={key}  onChange={(e) => setKey(e.target.value)}/>
                               <div id='reveal' onClick={showPassword}>
                                
                                    <svg width="24" height="24" class="text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4 6-9 6s-9-4.8-9-6c0-1.2 4-6 9-6s9 4.8 9 6Z"/>
                                            <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/> </svg>
                                          
                                        
                                       

                                    </div>
                            </div>
                        
                        </form>
                    </div>
                    <div className={styles.modalFooter}>
                        <button className={styles.modal__button} onClick={() => setModal(false)}>Cancel</button>
                        <button className={styles.modal__buttonContinue} onClick={handleSave}>Save</button>
                   

                    </div>
                </div>
            </div>
        </>
        ) : null}
        </>
    )
}

export default Modal;