"use client"
import { useState } from 'react';
import styles from '../styles.module.css';
import { useForm } from 'react-hook-form';
import generatePDF from '../utils/generatePDF';
import Error from '../components/error';
import Report from '../components/report';
import Modal from '../components/modal';

const Loading = ({children}) => {
    return <div className={styles.loaderComp}>{children}</div>;
}

function HomePage() {
    const [query,setQuery] = useState('')
    const [websites, setWebsites] = useState('');
    const [youtube,setYoutube] = useState('')
    const [pdf, setPDF] = useState('');
    const [report,setReport] = useState('');
    const [name, setName] = useState('');
    const [isLoading, setLoading] = useState(false)
    const [isComplete, setComplete] = useState(false);
    const [error, setError] = useState(null);
    const [modal, setModal] = useState(false);

    const { register, handleSubmit,formState:{errors} } = useForm();

    const handlePDFArea = (e) => {
        setPDF(e.target.value)
    }

    const handleTextArea = (e) => {
        console.log(e.target.value)
        setWebsites(e.target.value);
        console.log();
    }

    const handleYoutubeArea = (e) => {
        console.log(e.target.value)
        setYoutube(e.target.value);
    }

    const onSubmit = async (data,e) => {
        setComplete(false);
        console.log(e);
        e.preventDefault();
        setError(null);
        
        const body = {
                name,
                query,
                websites: websites.split('\n'),
                youtube: youtube.split('\n'),
                pdf: pdf.split('\n')
            }
            try {
                setLoading(true);
                const response = await fetch('/api/retrieval', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                });

                if(!response.ok) {
                    throw new Error(`HTTP error status: ${response.status}`)
                }
               
              const data = await response.json();
      
              setReport(data);
              setComplete(true);
                
            } catch(error) {
                console.error('Failed to submit',error);
                setError('Failed to Submit, Please try again later')
            } finally {
                setLoading(false);
            }
        
        
    }

    const loadingClass = `
        ${styles.form} 
        ${isLoading ? styles.form__loading : ''}
    `;

    return (
        <>
            <header className={styles.header}>
                <svg width="300" height="79.856605739022" viewBox="0 0 390 76.9084485448045" className="looka-1j8o68f"><defs id="SvgjsDefs1276"></defs><g id="SvgjsG1277" featurekey="xG21Y3-0" transform="matrix(0.7936507936507936,0,0,0.7936507936507936,19.206349206349206,-10.272223457457525)" fill="#222831"><g xmlns="http://www.w3.org/2000/svg"><path d="M90.716,58.23c0.106-0.063,0.225-0.094,0.345-0.102l-0.651-8.221l-15.451,8.898l7.379,4.248L90.716,58.23z"></path><polygon points="38.218,79.959 37.434,89.857 63.781,74.688 55.426,70.053  "></polygon><path d="M38.148,49.908l-0.65,8.221c0.119,0.01,0.239,0.039,0.347,0.102l8.789,5.061h0.001l44.49,26.566l-0.785-9.898   L38.148,49.908z"></path><path d="M99.914,63.055l7.379-4.248L91.84,49.908l-0.65,8.221c0.119,0.008,0.239,0.039,0.348,0.102L99.914,63.055z"></path><path d="M64.904,53.248l8.394,4.613l17.184-9.895c0.138-0.17,0.341-0.289,0.579-0.309c0.285-0.021,0.547,0.104,0.712,0.313   l17.581,10.121c0.014,0.008,0.025,0.02,0.037,0.027c0.026,0.018,0.05,0.033,0.074,0.053c0.02,0.016,0.039,0.035,0.059,0.055   c0.018,0.018,0.036,0.037,0.053,0.057c0.02,0.023,0.036,0.049,0.053,0.074c0.009,0.014,0.02,0.023,0.038,0.061   c0.014,0.027,0.025,0.055,0.036,0.082c0.01,0.021,0.02,0.047,0.026,0.07c0.008,0.025,0.013,0.051,0.018,0.078   c0.006,0.025,0.012,0.053,0.014,0.078c0.003,0.027,0.002,0.053,0.002,0.08c0,0.025,0.001,0.051-0.002,0.078   c-0.002,0.025-0.008,0.053-0.014,0.078c-0.005,0.027-0.01,0.053-0.018,0.078c-0.007,0.023-0.017,0.047-0.026,0.07   c-0.011,0.027-0.022,0.055-0.047,0.105c-0.005,0.01-0.014,0.016-0.02,0.023c-0.027,0.045-0.059,0.086-0.096,0.125   c-0.012,0.014-0.021,0.025-0.035,0.037c-0.046,0.043-0.096,0.084-0.158,0.119L91.537,69.777c-0.128,0.074-0.271,0.109-0.412,0.109   s-0.283-0.035-0.409-0.109L37.458,38.143L1.573,58.801l35.857,19.713l16.318-9.395l-7.517-4.17l-8.388,4.828   c-0.127,0.074-0.269,0.111-0.41,0.111s-0.284-0.037-0.411-0.111c-0.815-0.451-16.51-9.107-17.285-9.568   c-0.514-0.305-1.114-0.572-1.021-1.271c0.111-0.842,1.209-1.262,1.861-1.637c2.014-1.16,4.028-2.318,6.042-3.479   c2.295-1.322,9.075-5.225,10.17-5.855c0.138-0.17,0.341-0.289,0.579-0.309c0.285-0.021,0.547,0.104,0.713,0.313l53.053,30.545   l35.863-19.709L91.125,38.15L64.904,53.248z"></path><polygon points="127,58.807 91.91,79.949 91.126,89.857 127,69.203  "></polygon><path d="M21.266,58.807l7.381,4.248l8.377-4.824c0.107-0.063,0.226-0.092,0.346-0.102l-0.651-8.221L21.266,58.807z"></path><polygon points="1,58.807 1,69.203 37.154,89.857 36.229,79.949  "></polygon></g></g><g id="SvgjsG1278" featurekey="n48U4P-0" transform="matrix(4.938759487853897,0,0,4.938759487853897,133.18451016407343,-23.249703234331314)" fill="#222831"><path d="M7.84 5.720000000000001 c1.52 0 2.72 0.41334 3.6 1.24 s1.32 1.94 1.32 3.34 c0 1.4133 -0.44 2.53 -1.32 3.35 s-2.0734 1.23 -3.58 1.23 l-3.34 0 l0 5.12 l-3.14 0 l0 -14.28 l6.46 0 z M7.02 12.440000000000001 c0.90666 0 1.5833 -0.16666 2.03 -0.5 s0.67 -0.88 0.67 -1.64 c0 -0.73334 -0.21666 -1.2733 -0.65 -1.62 s-1.11 -0.52 -2.03 -0.52 l-2.52 0 l0 4.28 l2.5 0 z M17.259999999999998 9.66 l0 5.86 c0 0.8 0.12666 1.42 0.38 1.86 s0.73334 0.66 1.44 0.66 c0.78666 0 1.35 -0.23334 1.69 -0.7 s0.51 -1.2133 0.51 -2.24 l0 -5.44 l2.84 0 l0 10.34 l-2.7 0 l0 -1.44 l-0.06 0 c-0.70666 1.1467 -1.7667 1.72 -3.18 1.72 c-1.3467 0 -2.31 -0.34334 -2.89 -1.03 s-0.87 -1.7433 -0.87 -3.17 l0 -6.42 l2.84 0 z M29.2 5.720000000000001 l0 14.28 l-2.84 0 l0 -14.28 l2.84 0 z M35.68 9.38 c1.3867 0 2.47 0.28002 3.25 0.84002 s1.2167 1.38 1.31 2.46 l-2.7 0 c-0.04 -0.49334 -0.22 -0.85 -0.54 -1.07 s-0.78666 -0.33 -1.4 -0.33 c-0.53334 0 -0.93 0.08 -1.19 0.24 s-0.39 0.4 -0.39 0.72 c0 0.24 0.08666 0.44 0.26 0.6 s0.43668 0.3 0.79002 0.42 s0.74334 0.22 1.17 0.3 c1.2933 0.25334 2.2066 0.51334 2.74 0.78 s0.92334 0.58666 1.17 0.96 s0.37 0.83334 0.37 1.38 c0 1.16 -0.42334 2.05 -1.27 2.67 s-1.9967 0.93 -3.45 0.93 c-1.52 0 -2.7034 -0.32666 -3.55 -0.98 s-1.2833 -1.54 -1.31 -2.66 l2.7 0 c0 0.53334 0.20666 0.95668 0.62 1.27 s0.93334 0.47 1.56 0.47 c0.53334 0 0.97668 -0.11666 1.33 -0.35 s0.53 -0.55668 0.53 -0.97002 c0 -0.26666 -0.11 -0.48666 -0.33 -0.66 s-0.53 -0.32668 -0.93 -0.46002 s-1.02 -0.28668 -1.86 -0.46002 c-0.66666 -0.13334 -1.26 -0.31334 -1.78 -0.54 s-0.91666 -0.52332 -1.19 -0.88998 s-0.41 -0.81666 -0.41 -1.35 c0 -0.68 0.16334 -1.2733 0.49 -1.78 s0.82666 -0.89 1.5 -1.15 s1.51 -0.39 2.51 -0.39 z M46.96 9.38 c0.97334 0 1.84 0.22664 2.6 0.67998 s1.3567 1.11 1.79 1.97 s0.65 1.85 0.65 2.97 c0 0.10666 -0.0066602 0.28 -0.02 0.52 l-7.46 0 c0.02666 0.82666 0.24332 1.47 0.64998 1.93 s1.03 0.69 1.87 0.69 c0.52 0 0.99666 -0.13 1.43 -0.39 s0.71 -0.57666 0.83 -0.95 l2.5 0 c-0.73334 2.32 -2.3466 3.48 -4.84 3.48 c-0.94666 -0.01334 -1.8233 -0.22 -2.63 -0.62 s-1.45 -1.0233 -1.93 -1.87 s-0.72 -1.83 -0.72 -2.95 c0 -1.0533 0.24334 -2.0134 0.73 -2.88 s1.1333 -1.5133 1.94 -1.94 s1.6767 -0.64 2.61 -0.64 z M49.14 13.719999999999999 c-0.13334 -0.77334 -0.38 -1.3333 -0.74 -1.68 s-0.87334 -0.52 -1.54 -0.52 c-0.69334 0 -1.24 0.19666 -1.64 0.59 s-0.63334 0.93 -0.7 1.61 l4.62 0 z"></path></g></svg>
                <a className={styles.settings} onClick={() => setModal(prev => !prev)}>Settings</a>
            </header>
        <div className={isLoading ? styles.whileLoading : styles.notLoading}>
            <Modal showModal={setModal} modal={modal} />
                <form className={loadingClass} onSubmit={handleSubmit(onSubmit)}>
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
            {error && <Error message={error} />}
            {isLoading ? <Loading><div className={styles.loading}></div></Loading> : null }
            {isComplete && !isLoading && <Report report={report}/>}
            {isComplete && <a onClick={() =>  generatePDF(report,name)}>Download PDF</a>}

        </div>
        </>
        );
  }
  
  export default HomePage;
  