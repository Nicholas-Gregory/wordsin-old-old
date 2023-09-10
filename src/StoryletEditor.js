import React, { useState, useEffect, useRef } from 'react';
import StoryletCard from './StoryletCard';
import { graphQLQuery } from './utils';

export default function StoryletEditor() {
    const [currentStorylet, setCurrentStorylet] = useState(null);
    const [editing, setEditing] = useState(false);
    const [editingNextOrPrev, setEditingNextOrPrev] = useState(null);

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

        const response = (await graphQLQuery(`
            mutation EditStorylet($id: Int!, $title: String, $body: String) {
                editStorylet(id: $id, title: $title, body: $body) {
                    id, title, body,
                    next {
                        id, title
                    },
                    previous {
                        id, title
                    },
                    next {
                        id, title
                    }
                }
            }
        `, { 
            id: currentStorylet.id, 
            title: titleRef.current.textContent,
            body: bodyRef.current.textContent
        })).data;

        let storylet;

        if (response) {
            storylet = response.editStorylet;
        } else {
            storylet = (await graphQLQuery(`
            mutation AddStorylet($title: String!, $body: String!) {
                addStorylet(title: $title, body: $body) {
                    id, title, body
                }
            }`, {
                title: titleRef.current.textContent,
                body: bodyRef.current.textContent
            })).data.addStorylet;

            const affectIds = window.prompt("Enter affect IDs, separated by spaces")
            .split(' ')
            .map(v => Number(v));

            if (editingNextOrPrev === 'next') {
                await graphQLQuery(`
                mutation NewNext($first: Int!, $second: Int!, $affectIds: [Int]!) {
                    linkStorylets(first: $first, second: $second, affectIds: $affectIds)
                }
                `, {
                    first: currentStorylet.previous[0].id,
                    second: storylet.id,
                    affectIds
                });
            } else if (editingNextOrPrev === 'prev') {
                await graphQLQuery(`
                mutation NewPrevious($first: Int!, $second: Int!, $affectIds: [Int]!) {
                    linkStorylets(first: $first, second: $second, affectIds: $affectIds)
                }
                `, {
                    first: storylet.id,
                    second: currentStorylet.next[0].id,
                    affectIds
                })
            }
        }

        storylet = (await graphQLQuery(`
        query Storylet($title: String!) {
            storyletByTitle(title: $title) {
                id, title, body
                previous {
                    id, title
                },
                next {
                    id, title
                }
            }
        }
        `, { title: storylet.title })).data.storyletByTitle;

        setCurrentStorylet(storylet);

        setEditing(false);
    }

    async function clickNewPrevious(e) {
        e.preventDefault();

        setCurrentStorylet({
            next: [{id: currentStorylet.id, title: currentStorylet.title}],
            title: '',
            body: ''
        });
        
        setEditingNextOrPrev('prev');
    }

    async function clickNewNext(e) {
        e.preventDefault();

        setCurrentStorylet({
            previous: [{id: currentStorylet.id, title: currentStorylet.title}],
            title: '',
            body: ''
        });

        setEditingNextOrPrev('next');
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
                    {!editing && <button onClick={clickNewPrevious}>New</button>}
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
                    {!editing && <button onClick={clickNewNext}>New</button>}
                </div>
            }
        </>
    );
}