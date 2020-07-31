import React, {ChangeEventHandler } from 'react'
import { StyledAvatar } from './styles';


type AvatarProps = {
    preview: string,
    handlerImageChange: ChangeEventHandler
}

export default function AvatarInput(props: AvatarProps): JSX.Element {

    return (
        <div>
            <label htmlFor="avatar">
                <StyledAvatar src={props.preview} />
                <input
                    style={{ display: 'none' }}
                    type="file"
                    id="avatar"
                    accept="image/*"
                    onChange={props.handlerImageChange} />
            </label>
        </div>
    )
}