import React, { useRef, useState } from 'react';
import { graphQLQuery } from './utils';

export default function EffectKeywordSearch({ select, type }) {
    const keywordRef = useRef(null);
    const [results, setResults] = useState([]);

    async function handleSubmit(e) {
        e.preventDefault();

        const keyword = keywordRef.current.value;

        setResults((await graphQLQuery(`
        query EffectsByKeyword($word: String!) {
            effectsByKeyword(word: $word) {
                id,
                ceil,
                time,
                keywords {
                    word
                }
            }
        }`, { "word" : keyword })).data.effectsByKeyword);
            console.log(results);
    }

    function resultClickHandler(e) {
        e.preventDefault();

        select(e.target.dataset.id);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder='Keyword Search'
                    ref={keywordRef}
                ></input>
                <button type='submit'>Search</button>
            </form>

            <ul>
                {results.map(effect => 
                    <li key={effect.id}>
                        <p>
                            Ceil: {effect.ceil}
                        </p>
                        <p>
                            Time: {effect.time}
                        </p>
                    </li>
                )}
            </ul>
        </>
    )
}