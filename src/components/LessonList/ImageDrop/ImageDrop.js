import React, {useState} from "react";
import imgIcon from "../../../icons/img.svg";
import './ImageDrop.scss'


export const ImageDrop = ({onPosterChange}) => {


    const [active, setActive] = useState(false);
    const [input, setInput] = useState(false);
    const onDragOver = (e) => {
        e.preventDefault();
        setActive(true);
    };
    const setNotActive = (e) => {
        e.preventDefault();
        setActive(false);
    };
    const onInputChange = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (e.target.files && e.target.files.length) {
            let file = e.target.files[0];
            let file_url = URL.createObjectURL(file);

            onPosterChange(file_url);

            /*TODO save file on server*/
        }

    };
    const onClick = () => input && input.click()
    const onDrop = (e) => {
        // Prevent default behavior (Prevent file from being opened)
        e.preventDefault();
        if (e.dataTransfer.items) {
            // Use DataTransferItemList interface to access the file(s)
            for (let i = 0; i < e.dataTransfer.items.length; i++) {
                // If dropped items aren't files, reject them
                if (e.dataTransfer.items[i].kind === 'file') {
                    let file = e.dataTransfer.items[i].getAsFile();
                    let file_url = URL.createObjectURL(file);

                    onPosterChange(file_url);
                    break;
                }
            }
        } else {
            // Use DataTransfer interface to access the file(s)
            if (e.dataTransfer.files.length) {
                let file = e.dataTransfer.files[0];
                let file_url = URL.createObjectURL(file);
                onPosterChange(file_url);
            }
        }
        setActive(false);
    };


    return (
        <div
            onDragOver={onDragOver}
            onDragEnd={setNotActive}
            onDragLeave={setNotActive}
            onDragExit={setNotActive}
            onDrop={onDrop}
            className={"image-drop-down "  + ( active ? 'active' : '')}
            onClick={onClick}
        >
            <input ref={e => setInput(e)} onChange={onInputChange}  type="file" style={{display: 'none'}}/>
            <div className="image-drop-down-placeholder">
                <img className="image-drop-down-placeholder-icon" src={imgIcon} alt="loadIcon"/>
                Изменить обложку
            </div>
        </div>
    )
}