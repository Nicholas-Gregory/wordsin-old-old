import React, { useState, useEffect, useRef } from 'react';
import StoryletCard from './StoryletCard';
import { graphQLQuery } from './utils';

export default function StoryletEditor() {
    const [currentStorylet, setCurrentStorylet] = useState(null);
    const [editing, setEditing] = useState(false);

    const titleRef = useRef();
    const bodyRef = useRef();

    useEffect(() => { 
        graphQLQuery(`
      query Storylet($title: String!) {
        storyletByTitle(title: $title) {
          title, body, id
          next {
            id, title
          },
          previous {
            id, title
          }
        }
      }
    `, { title: "title 2" }).then(response => setCurrentStorylet(response.data.storyletByTitle));
    }, []);

    async function select(storyletTitle) {
        console.log(storyletTitle);
        const storylet = (await graphQLQuery(`
            query Storylet($title: String!) {
                storyletByTitle(title: $title) {
                    id, title, body,
                    next {
                        id, title
                    },
                    previous {
                        id, title
                    }
                }
            }
        `, { title: storyletTitle })).data.storyletByTitle;

        setCurrentStorylet(storylet);
    }

    async function clickHandler(e) {
        e.preventDefault()

        console.log(currentStorylet);

        const storylet = (await graphQLQuery(`
            mutation EditStorylet($id: Int!, $title: String, $body: String) {
                editStorylet(id: $id, title: $title, body: $body) {
                    id, title, body,
                    next {
                        id, title
                    },
                    previous {
                        id, title
                    }
                }
            }
        `, { 
            id: currentStorylet.id, 
            title: titleRef.current.textContent,
            body: bodyRef.current.textContent
        })).data.editStorylet;

        setCurrentStorylet(storylet);

        setEditing(false);
    }

    return (
        <>
            {currentStorylet &&
                <div>
                    <p>
                        Previous:
                    </p>
                    <ul>
                        {(currentStorylet.previous || []).map(storylet => 
                            <li key={storylet.id}>
                                <StoryletCard title={storylet.title} />                    
                                {!editing &&
                                    <button onClick={() => select(storylet.title)}>View</button>
                                }
                            </li>                
                        )}
                    </ul>
                    <p>
                        Storylet:
                    </p>
                    <div>
                        <div 
                            contentEditable={editing}
                            ref={titleRef}
                        >
                            {currentStorylet.title}
                        </div>
                        <div 
                            contentEditable={editing}
                            ref={bodyRef}
                        >
                            {currentStorylet.body}
                        </div>
                        {!editing && <button onClick={() => setEditing(true)}>Edit</button>}
                    </div>
                    {editing &&
                            <button onClick={clickHandler}>Save Changes</button>
                    }
                    <p>
                        Next:
                    </p>
                    <ul>
                        {(currentStorylet.next || []).map(storylet => 
                            <li key={storylet.id}>
                                <StoryletCard title={storylet.title} />                    
                                {!editing &&
                                    <button onClick={() => select(storylet.title)}>View</button>
                                }
                            </li>                
                        )}
                    </ul>
                </div>
            }
        </>
    );
}