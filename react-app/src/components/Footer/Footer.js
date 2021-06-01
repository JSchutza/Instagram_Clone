import React from 'react';
import styles from './Footer.module.css';
import git from './git.png';
import linkedin from './linkedin.png';

function Footer () {

    return (
        <div className={styles.mainContainer}>
            <div className={styles.adamContainer}>
                <div>Adam Bailey</div>
                 <a  href='https://github.com/JebGriffin85' >
                    <img className='github' src={git}  />
                 <a href='https://www.linkedin.com/in/jeb-griffin-120631206/'>
                    <img className='linkedin' src={linkedin} />
                 </a>
                 </a>
            </div>
              <div className={styles.adamContainer}>
                <div>Joshua Schutza</div>
                 <a  href='https://github.com/JebGriffin85' >
                    <img className='github' src={git}  />
                 <a href='https://www.linkedin.com/in/jeb-griffin-120631206/'>
                    <img className='linkedin' src={linkedin} />
                 </a>
                 </a>
            </div>
              <div className={styles.adamContainer}>
                <div>Lucian Jones</div>
                 <a  href='https://github.com/JebGriffin85' >
                    <img className='github' src={git}  />
                 <a href='https://www.linkedin.com/in/jeb-griffin-120631206/'>
                    <img className='linkedin' src={linkedin} />
                 </a>
                 </a>
            </div>
            <div className={styles.adamContainer}>
                <div>Jeb Griffin</div>
                 <a  href='https://github.com/JebGriffin85' >
                    <img className='github' src={git}  />
                 <a href='https://www.linkedin.com/in/jeb-griffin-120631206/'>
                    <img className='linkedin' src={linkedin} />
                 </a>
                 </a>
            </div>

        </div>
    )
}

export default Footer;