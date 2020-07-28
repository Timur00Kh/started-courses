import React, {useEffect, useState} from 'react';
import './CourseTestContainer.scss'
import {PosterList} from "../PosterList/PosterList";
import addIcon from "../../icons/add.svg";
import {PosterIcon} from "./icons/PosterIcon";
import {LessonIcon} from "./icons/LessonIcon";

const STEPS = {
    posters: 'posters',
    lessons: 'lessons'

};

export function CourseTestContainer(props) {

    const [step, setStep] = useState(STEPS.posters);
    /*TODO возможно лучше useReducer*/
    const [course, setCourse] = useState();

    useEffect(() => {
        /*TODO API fetch*/
        setCourse({
            name: 'Название курса будет здесь',
            posters: [
                {
                    id: '1',
                    url: '/images/img1.png'
                },
                {
                    id: '2',
                    url: '/images/img2.png'
                },
                {
                    id: '3',
                    url: '/images/img3.png'
                },
            ],
            lessons: []
        })
    }, []);

    const onPostersChange = (posters) => {
        setCourse({
            ...course,
            posters
        })
    };

    if (!course) {
        return '';
    }

    return (
        <div className="container">
            <div className="row mt-5">
                <h1 className="bold-header">Курс: {course.name}</h1>
            </div>
            <div className="row mt-4">
                <div className="col-8 pl-0 pr-5">
                    {
                        (() => {
                            switch (step) {
                                case STEPS.posters: {
                                    return <PosterList onPostersChange={onPostersChange} posters={course.posters}/>
                                }
                                case STEPS.lessons: {
                                    return 'LessonList'
                                }
                            }
                        })()
                    }
                </div>
                <div className="col-3">
                    <button className="save-button">Сохранить</button>
                    <div className="w-100 my-4"></div>
                    <div className="started-btn-group">
                        <button onClick={() => setStep(STEPS.posters)} className={"started-btn " + (step === STEPS.posters ? 'active' : '')}>
                            <PosterIcon color={step === STEPS.posters ? '#434DFF' : '#AEB7C2'}/>
                            Обложки и фото
                        </button>
                        <button onClick={() => setStep(STEPS.lessons)} className={"started-btn " + (step === STEPS.lessons ? 'active' : '')}>
                            <LessonIcon color={step === STEPS.lessons ? '#434DFF' : '#AEB7C2'}/>
                            Уроки
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

