import React, { useRef } from 'react';

export default function KeywordSearch({ 
    select, 
    items,
    spells,
    effects,
    affects,
    equipment,
    modifiers
}) {

    const keywordRef = useRef(null);
    const resultsRef = useRef(null);

    async function submitHandler(e) {
        e.preventDefault();

        const keyword = keywordRef.current.value;
        const results = resultsRef.current;

        // Populate results, add event listeners
    }

    function resultClickHandler(e) {
        e.preventDefault();

        select(e.target.dataset.id);
    }

    return (
        <>
            <form onSubmit={submitHandler}>
                <input 
                    type="text" 
                    placeholder='Keyword Search'
                    ref={keywordRef}
                ></input>
                <button type='submit'>Search</button>
            </form>

            <div ref={results}></div>
        </>
    )
}