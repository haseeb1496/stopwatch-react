import { useState, useEffect } from 'react';
import './styles.scss';

function Stopwatch() {

    const [state, setState] = useState({
        isActive: false,
        time: 0,
        splitTime: 0,
        entries: []
    })
    
    useEffect(() => {
        let interval = null;
        if (state.isActive === true) {
          interval = setInterval(() => {
            setState((st)=>({
                ...st,
                time: st.time + 11
            }))
            
          }, 11);
        } else {
          clearInterval(interval);
        }
        return () => {
          clearInterval(interval);
        };
    }, [state.isActive]);

    function handleStart() {
        setState((st)=>({
            ...st,
            isActive: !st.isActive
        }))
        if (state.isActive) {
            addEntry(state.time, 'Pause');
        }
    }

    function resetTime() {
        setState((st)=>({
            ...st,
            time: 0,
            splitTime: 0,
            entries: []
        }))
    }

    function handleSplitTime() {
        setState((st)=>({
            ...st,
            splitTime: st.time
        }))
        addEntry(state.time, 'Split');
    }

    function getFormattedTime(time) {
        return `${('00' + Math.floor((time / 3600000) % 60)).slice(-2)}:${('00' + Math.floor((time / 60000) % 60)).slice(-2)}:${('00' + Math.floor((time / 1000) % 60)).slice(-2)}.${('000' + Math.floor((time % 1000))).slice(-3)}`;
    }

    function addEntry(time, type) {
        setState((st)=>({
            ...st,
            entries:[...st.entries, {time, type}]
        }))
    }

    return (
        <div className='stopwatch-container'>
            <span>
                {getFormattedTime(state.time).substring(0, getFormattedTime(state.time).length -2)}
                <span className='milliseconds'>{getFormattedTime(state.time).substring(getFormattedTime(state.time).length - 2)}</span>
            </span>
            
            <span className='split-time'>{state.splitTime ? getFormattedTime(state.splitTime) : 'SPLIT TIME'}</span>
            <div className='buttons-container'>
                <div className={'btn ' + (!state.isActive ? 'start-btn' : 'pause-btn')} onClick={handleStart}> 
                    <span>{state.isActive ? 'Pause' : 'Start'}</span>
                </div>
                <div className={'btn ' + (!state.isActive ? 'inactive-btn' : 'split-btn')} onClick={handleSplitTime}>
                    <span>Split</span>
                </div>
                <div className={'btn ' + (!state.isActive && state.time ? 'reset-btn' : 'inactive-btn')} onClick={resetTime}>
                    <span>Reset</span>
                </div>
            </div>
            <div className={!!state.entries.length ? 'entry-table' : ''}>
                {state.entries.map((entry, i) => 
                <span className='entry'>
                    <span className='index'>#{i + 1}</span>
                    <span className={entry.type === 'Split' ? 'split-time-color' : 'pause-time-color'}>{getFormattedTime(entry?.time)}</span>
                    <span className='type'>{entry.type}</span>
                </span>)}
            </div>
        </div>
    );
}

export default Stopwatch;