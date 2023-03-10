import React, { useState } from 'react'
import { Data } from './GalleryData'
import * as AiIcons from "react-icons/ai"

import styles from "./gallery.module.css"

function Gallery() {

    const [model, setModel] = useState(false);
    const [tempimgSrc, setTempImgSrc] = useState("");

    const getImg = (imgSrc) => {
        setTempImgSrc(imgSrc);
        setModel(true)
    }

    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                <h3>Galerija <span>Slika</span></h3>
            </div>
            <div className={model ? `${styles.model} ${styles.modelOpen}` : `${styles.model}`}>
                <img src={tempimgSrc} />
                <AiIcons.AiOutlineClose onClick={() => setModel(false)} />
            </div>
            <div className={styles.gallery}>
                {Data.map((slika, index) => {
                    return (
                        <div className={styles.pics} key={index} onClick={() => getImg(slika.imgSrc)}>
                            <img src={slika.imgSrc} style={{ width: '100%' }} />
                        </div>
                    )
                })}
            </div>
        </div >
    )
}

export default Gallery
