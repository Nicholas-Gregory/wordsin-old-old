import React, { useRef } from 'react';

export default function StoryletEditor() {
    const titleRef = useRef(null);
    const bodyRef = useRef(null);

    async function handleSubmit(e) {
        e.preventDefault();

        const title = titleRef.current.value;
        const body = bodyRef.current.value;

        await fetch('/api', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                query: `
                    mutation NewStorylet($title: String!, $body: String!) {
                        addStorylet(title: $title, body: $body) {
                            id
                        }
                    }
                `,
                variables: {
                    title, body
                }
            })
        });
    }

    return (
        <>
           <textarea ref={titleRef} placeholder='title'></textarea>
           <textarea ref={bodyRef} placeholder='body'></textarea>
           <button onClick={handleSubmit}>Submit</button>
        </>
    );
}