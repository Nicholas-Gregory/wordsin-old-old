import React from 'react';
import StoryletCardList from './StoryletCardList';

export default function StoryletViewer({ storylet }) {

    function submitHandler(e) {
        e.preventDefault();
    }

    return (
        <>
            
            <form onSubmit={submitHandler}>
                <div>{storylet.title}</div>
                <div>{storylet.body}</div>
                <button type="submit">Save Changes</button>
            </form>
        </>
    );
}