import React, { useRef } from 'react';
import StoryletViewer from './StoryletViewer';
import StoryletCard from './StoryletCard';
import StoryletCardList from './StoryletCardList';

export default function StoryletEditor({ storyletData }) {

    return (
        <>
            <p>
                Previous:
            </p>
            <StoryletCardList storyletList={storyletData.previous} />
            <p>
                Storylet:
            </p>
            <StoryletViewer storylet={storyletData}/>
            <p>
                Next:
            </p>
            <StoryletCardList storyletList={storyletData.next} />
        </>
    );
}