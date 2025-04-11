import React, { useState } from "react";
import { postDataToServer, deleteDataFromServer } from "../server-requests";

export default function BookmarkButton({ bookmarkId, id, token }) {

    const [bookmark, setBookmark] = useState(bookmarkId);

    async function addBookmark() {
        const sendData = {
            "post_id": id,
        };
        const responseData = await postDataToServer(token, "/api/bookmarks/", sendData);
        console.log(responseData);
        setBookmark(responseData.id);
    }

    async function removeBookmark() {
        const url = `/api/bookmarks/${stateBookmarkId}`;
        const responseData = await deleteDataFromServer(token, url);
        console.log(responseData);
        setBookmark(null);
    }

    if (bookmark) {
        return (<button aria-label="bookmark button" aria-checked="true" onClick={removeBookmark}><i className="fas fa-bookmark"></i></button>);
    } else {
        return (<button aria-checked="false" aria-label="remove bookmark" onClick={addBookmark}><i className="far fa-bookmark"></i></button>);
    }


}


