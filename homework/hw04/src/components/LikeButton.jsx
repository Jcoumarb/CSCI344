import React, { useState } from "react";
import { postDataToServer, deleteDataFromServer } from "../server-requests";

export default function LikeButton({ likeId, id, token }) {

    const [like, setLike] = useState(likeId);

    async function addLike() {
        const sendData = {
            "post_id": id,
        };
        const responseData = await postDataToServer(token, "/api/likes/", sendData);
        console.log(responseData);
        setLike(responseData.id);
    }

    async function removeLike() {
        const url = `/api/likes/${stateLike}`;
        const responseData = await deleteDataFromServer(token, url);
        console.log(responseData);
        setLike(null);
    }

    if (like) {
        return (<button aria-label="like button" aria-checked="true" onClick={removeLike}><i className="fas text-red-700 fa-heart"></i></button>);
    } else {
        return (<button aria-label="unlike button" aria-checked="false" onClick={addLike}><i className="far fa-heart"></i></button>);
    }

}
