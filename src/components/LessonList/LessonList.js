import React, {useState} from "react";
import './LessonList.scss'
import {Collapse} from 'reactstrap';
import collapseIcon from '../../icons/collapse.svg'
import loadIcon from '../../icons/load.svg'
import {VideoDrop} from "./VideoDrop/VideoDrop";
import {ImageDrop} from "./ImageDrop/ImageDrop";

export const LessonList = ({lessons = [], onLessonsChange}) => {

    const [openedId, setOpenedId] = useState([]);

    const updateLesson = (lesson) => {
        let i = lessons.findIndex(e => e.id === lesson.id);
        if (i >= 0) {
            onLessonsChange([
                ...lessons.slice(0, i),
                lesson,
                ...lessons.slice(i + 1)
            ])
        }
    };


    return (
        <>
            <h2 className="subheader">Уроки</h2>
            <p className="description">В системе можно для курса загрузить несколько уроков</p>

            <div className="lesson-list">
                {
                    lessons.map((lesson, i) => {
                        const isOpen = !!openedId.find(e => e === lesson.id);

                        return (
                            <div key={lesson.id} className="lesson-list-item">
                                <div className="row align-items-center justify-content-between">
                                    <div className="col-8">
                                        <h2 className="lesson-list-item-header">Урок {i + 1}</h2>
                                    </div>
                                    <div className="col-auto">
                                        <img
                                            onClick={() => {
                                                if (isOpen) {
                                                    setOpenedId(openedId.filter(e => e !== lesson.id))
                                                } else {
                                                    setOpenedId([
                                                        ...openedId,
                                                        lesson.id
                                                    ])
                                                }
                                            }}
                                            style={{transform: isOpen ? 'rotate(180deg)' : ''}}
                                            className="lesson-list-item-collapse"
                                            src={collapseIcon} alt=""/>
                                    </div>
                                </div>
                                <Collapse isOpen={isOpen}>
                                    <div className="row pb-3">
                                        <div className="col-12">
                                            <p className="description">
                                                Назовите и кратко расскажите, что будет содержаться в этом конкретном
                                                уроке.
                                                Так Вы поможете лучше понять, что содержится в вашем курсе. Но вообще,
                                                описание необязательно
                                            </p>
                                        </div>
                                        <div className="col-9 ml-auto">
                                            {
                                                lesson.video_url ? (
                                                    <video
                                                        className="video" controls
                                                        src={lesson.video_url}
                                                    />
                                                ) : (
                                                    <VideoDrop onVideoChange={e => updateLesson({
                                                        ...lesson,
                                                        video_url: e,
                                                    })}/>
                                                )
                                            }
                                        </div>
                                        <div className="w-100 mt-3"/>


                                        <div className="col-3">
                                            <label className="input-label">Обложка:</label>
                                        </div>
                                        <div className="col-3">
                                            <ImageDrop onPosterChange={e => updateLesson({
                                                ...lesson,
                                                poster_url: e,
                                            })}/>
                                        </div>
                                        <div className="col-3 ">

                                            {
                                                !!lesson.poster_url && (
                                                    <div className="image-drop-down-poster"
                                                         style={{backgroundImage: `url(${lesson.poster_url})`}}/>
                                                )
                                            }
                                        </div>

                                        <div className="w-100"/>
                                        <div className="col-3">
                                            <label className="input-label" htmlFor="input1">Название урока:</label>
                                        </div>
                                        <div className="col-9 mt-2">
                                            <input
                                                onChange={e => updateLesson({
                                                    ...lesson,
                                                    name: e.target.value
                                                })}
                                                id="input1"
                                                value={lesson.name}
                                                placeholder="Название урока"
                                                type="text"
                                                className="started-input"/>
                                        </div>
                                        <div className="col-3">
                                            <label className="input-label" htmlFor="textarea">Описание:</label>
                                        </div>
                                        <div className="col-9 mt-2">
                                            <textarea
                                                onChange={e => updateLesson({
                                                    ...lesson,
                                                    description: e.target.value
                                                })}
                                                id="textarea"
                                                value={lesson.description}
                                                className="started-textarea"/>
                                        </div>
                                    </div>
                                </Collapse>
                            </div>
                        )
                    })
                }

            </div>
        </>
    )

};