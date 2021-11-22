import { useState, useEffect } from 'react';
import './styles.scss';

function Stopwatch() {
    const [isActive, setIsActive] = useState(false);
    const [time, setTime] = useState(0);
    const [splitTime, setSplitTime] = useState(0)
    const [entries, setEntries] = useState([]);
    
    useEffect(() => {
        let interval = null;
        if (isActive === true) {
          interval = setInterval(() => {
            setTime((time) => time + 11);
          }, 11);
        } else {
          clearInterval(interval);
        }
        return () => {
          clearInterval(interval);
        };
      }, [isActive]);

    function handleStart() {
        setIsActive(!isActive);
        if (isActive) {
            addEntry(time, 'Pause');
        }
    }

    function resetTime() {
        setTime(0);
        setSplitTime(0);
        setEntries([]);
    }

    function handleSplitTime() {
        setSplitTime(time);
        addEntry(time, 'Split');
    }

    function getFormattedTime(time) {
        return `${('00' + Math.floor((time / 3600000) % 60)).slice(-2)}:${('00' + Math.floor((time / 60000) % 60)).slice(-2)}:${('00' + Math.floor((time / 1000) % 60)).slice(-2)}.${('000' + Math.floor((time % 1000))).slice(-3)}`;
    }

    function addEntry(time, type) {
        setEntries([...entries, {time, type}]);
    }

    return (
        <div className='stopwatch-container'>
            <span>
                {getFormattedTime(time).substring(0, getFormattedTime(time).length -2)}
                <span className='milliseconds'>{getFormattedTime(time).substring(getFormattedTime(time).length - 2)}</span>
            </span>
            
            <span className='split-time'>{splitTime ? getFormattedTime(splitTime) : 'SPLIT TIME'}</span>
            <div className='buttons-container'>
                <div className={'btn ' + (!isActive ? 'start-btn' : 'pause-btn')} onClick={handleStart}> 
                    <span>{isActive ? 'Pause' : 'Start'}</span>
                </div>
                <div className={'btn ' + (!isActive ? 'inactive-btn' : 'split-btn')} onClick={handleSplitTime}>
                    <span>Split</span>
                </div>
                <div className={'btn ' + (!isActive && time ? 'reset-btn' : 'inactive-btn')} onClick={resetTime}>
                    <span>Reset</span>
                </div>
            </div>
            <div className={!!entries.length ? 'entry-table' : ''}>
                {entries.map((entry, i) => 
                <span className='entry'>
                    <span className='index'>#{i + 1}</span>
                    <span className={entry.type === 'Split' ? 'split-time-color' : 'pause-time-color'}>{getFormattedTime(entry.time)}</span>
                    <span className='type'>{entry.type}</span>
                </span>)}
            </div>
        </div>
    );
}

export default Stopwatch;