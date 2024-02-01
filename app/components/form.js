import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from '../styles.module.css';

const Form = ({ handleSubmit,handleTextArea, handleYoutubeArea, handlePDFArea }) => {
    const [query,setQuery] = useState('')
    const [name, setName] = useState('');
    const { register, handleSubmit: handleFormSubmit, formState: { errors } } = useForm();

    const loadingClass = `
    ${styles.form} 
    ${isLoading ? styles.form__loading : ''}
`;

    return (
        <form className={styles.form} onSubmit={handleFormSubmit(handleSubmit)}>
            <div>
                        <label className={styles.form__label} htmlFor="name">Company Name*</label>
                    </div>
                    <div>
                        {errors.name && <div><span className={styles.error}>{errors.name.message}</span></div>}
                        <input 
                            className={styles.form__text}
                            {...register('name',{required: "Company name is required", pattern: {
                                value: /^[A-Za-z0-9 ]*$/,
                                message: 'Should be alphanumeric only'
                            }})}
                            name='name'
                            placeholder="Name"
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <label className={styles.form__label} htmlFor="company">Company URL*</label>
                    <div>
                        {errors.company && <div><span className={styles.error}>{errors.company.message}</span>
                    </div>}
                    <input 
                        className={styles.form__text}
                        {...register('company',{required: "Company website link is required"})}
                        type="text" 
                        id="company" 
                        name="company"
                        placeholder="Link"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    </div>
                    <label className={styles.form__label} htmlFor="websites">Website Links</label>
                    <div>
                        <textarea 
                            placeholder="Add website links"
                            className={styles.form__textarea}
                            name="websites" 
                            id="websites"  
                            value={websites}
                            onChange={handleTextArea}/>
                    </div>
                    <label className={styles.form__label} htmlFor="youtube">Youtube Links</label>
                    <div>
                        <textarea 
                            placeholder="Add youtube links" 
                            className={styles.form__textarea} 
                            type="text" 
                            id="youtube" 
                            name="youtube"  
                            value={youtube}
                            onChange={handleYoutubeArea}/>
                    </div>
                    <label className={styles.form__label} htmlFor="pdf">PDF Links</label>
                    <div>
                        <textarea
                            placeholder="Add pdf links"
                            className={styles.form__textarea}
                            type="text"
                            id="pdf"
                            name="pdf"
                            value={pdf}
                            onChange={handlePDFArea}
                        />
                    </div>
                    <button className={styles.form__button} type="submit">Create</button>
        </form>
    );
};

export default Form;