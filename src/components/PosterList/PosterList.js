import React, {useEffect, useState} from 'react';
import './PosterList.scss';
import addIcon from '../../icons/add.svg'
import Dnd from './Dnd'
import { v4 as uuidv4 } from 'uuid';

export function PosterList({posters = [], onPostersChange}) {

    const onFile = (e) => {
        /*TODO save file on server*/
        e.stopPropagation();
        e.preventDefault();
        if (e.target.files && e.target.files.length) {
            let file = e.target.files[0];
            /*TODO save file on server*/
            let file_url = URL.createObjectURL(file);

            onPostersChange([
                ...posters,
                {
                    id: uuidv4(),
                    url: file_url
                }
            ])

        }
        e.target.value = '';
    };

    return (
        <>
            <h2 className="subheader">Превью и обложки курса</h2>
            <p className="description">Красивые обложки будут дополнительно притягивать и рекламировать Ваш курс</p>
            <div className="hr"/>

            <label className="add-label" htmlFor="add_poster">
                <img src={addIcon} alt="addIcon"/>
                Добавить обложку
            </label>
            <input onChange={onFile} style={{display: 'none'}} id="add_poster" type="file"/>

            <p className="description">Вы можете добавить до 5 фото, размером не более 10 мб.</p>
            <p className="description">Размещайте важную информацию ближе к центру изображения</p>

            <h3 className="poster-header mt-4">Загруженные обложки</h3>
            <Dnd posters={posters} onPostersChange={onPostersChange}/>

        </>
    )

}


