import React from 'react';
import StoryletCard from './StoryletCard';

export default function StoryletCardList({ list }) {
    return (
        <ul>
            {(list || []).map(storylet => 
                <li key={storylet.id}>
                    <StoryletCard storylet={storylet} />
                </li>
            )}
        </ul>
    )
}