import React from 'react';
import StoryletCardList from './StoryletCardList';

export default function StoryletViewer({ storylet }) {

    function submitHandler(e) {
        e.preventDefault();
    }

    return (
        <>
            <p>
                Previous:
            </p>
            <StoryletCardList list={storylet.previous} />
            <form onSubmit={submitHandler}>
                <div>{storylet.title}</div>
                <div>{storylet.body}</div>
                <button type="submit">Save Changes</button>
            </form>
            <p>
                Next:
            </p>
            <StoryletCardList list={storylet.next} />
        </>
    );
}