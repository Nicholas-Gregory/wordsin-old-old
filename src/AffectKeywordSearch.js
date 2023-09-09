import React, { useRef, useState } from 'react';
import { graphQLQuery } from './utils';

export default function AffectKeywordSearch() {
    const keywordRef = useRef(null);
    const [results, setResults] = useState([]);

    async function addAffect(keywordId) {
        const requirement = Number(window.prompt("Enter requirement", 1));
        setResults(
            [(await graphQLQuery(`
            mutation AddAffect($keywordId: Int!, $requirement: Int!) {
                addAffect(keywordId: $keywordId, requirement: $requirement) {
                    requirement, id
                }
            }`, { keywordId, requirement })).data.addAffect]
        );
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const word = keywordRef.current.value;

        const keyword = (await graphQLQuery(`
        query AffectsByKeyword($word: String!) {
            keywordByWord(word: $word) {
                id,
                affects {
                    requirement, id
                }
            }
        }
        `, { word })).data.keywordByWord;

        if (!keyword) {
            if (window.confirm("No keyword with that search term exists. Would you like to create it?")) {
                const keywordId = (await graphQLQuery(`
                mutation AddKeyword($word: String!) {
                    addKeyword(word: $word) {
                        id
                    }
                }`, { word })).data.addKeyword.id;

                if (window.confirm("Keyword created. Would you like to create an Affect associated with that keyword?")) {
                    addAffect(keywordId);
                }
            }
        } else {
            if (keyword.affects.length > 0) {
                setResults(keyword.affects);
            } else {
                if (window.confirm("Keyword exists, but there are no Affects associated with it. Would you like to create one?")) {
                    addAffect(keyword.id);
                }
            }
        }
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