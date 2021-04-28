import { useSelector } from "react-redux";
import React from 'react'

const Picture = ({post}) => {

    return (
        <div>
        <img src={post.url}></img>
        </div>
    )
}

export default Picture