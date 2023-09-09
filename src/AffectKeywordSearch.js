import React, { useRef, useState } from 'react';
import { graphQLQuery } from './utils';

export default function AffectKeywordSearch() {
    const keywordRef = useRef(null);
    const [results, setResults] = useState([]);

    async function handleSubmit(e) {
        e.preventDefault();

        const keyword = keywordRef.current.value;

        setResults((await graphQLQuery(`
        query AffectsByKeyword($word: String!) {
            keywordByWord(word: $word) {
                affects {
                    requirement, id
                }
            }
        }
        `, { word: keyword })).data.keywordByWord.affects);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Keyword Search'
                    ref={keywordRef}
                ></input>
                <button type='submit'>Search</button>
            </form>

            <ul>
                {results.map(affect =>
                    <li key={affect.id}>
                        <p>
                            Requirement: {affect.requirement}
                        </p>
                    </li>
                )}
            </ul>
        </>
    )
}