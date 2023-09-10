import React, { useState } from 'react';
import { graphQLQuery } from './utils';

export default function StoryletViewer({ storylet }) {
    const [titleContent, setTitleContent] = useState(storylet.title)
    const [bodyContent, setBodyContent] = useState(storylet.body)

    async function submitHandler(e) {
        e.preventDefault();

        await graphQLQuery(`
        mutation EditStorylet($id: Int!, $title: String, $body: String) {
            editStorylet(id: $id, title: $title, body: $body) {
                id
            }
        }
        `, {
            id: storylet.id,
            body: bodyContent,
            title: titleContent
        });
    }

    return (
        <>
            
            <form onSubmit={submitHandler}>
                <textarea 
                    value={titleContent}
                    onChange={e => setTitleContent(e.target.value)}
                />
                <textarea 
                    value={bodyContent}
                    onChange={e => setBodyContent(e.target.value)}
                />
                <button type="submit">Save Changes</button>
            </form>
        </>
    );
}