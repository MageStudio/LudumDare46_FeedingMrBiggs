import { Component } from 'inferno';

const getOptions = (onStartClick, onAboutClick) => (
    <ul className='menu'>
        <li>
            <button className='menu-button' onClick={onStartClick}>
                START
            </button>
        </li>
        <li>
            <button className='menu-button' onClick={onAboutClick}>
                ABOUT
            </button>
        </li>
    </ul>
);

const getAbout = (onAboutClose) => (
    <div>
        <h3>
            Built with mage Engine. By Marco Stagni
        </h3>
        <button onClick={onAboutClose}>
            BACK
        </button>
    </div>
)

const MainMenu = (props) => {
    const { visible, about, onStartClick, onAboutClick, onAboutClose } = props;
    const classname = 'overlay '.concat(visible ? 'visible' : 'invisible');

    return (
        <div className={classname}>
            <div className={'dialog menu-container'}>
                <div className={'title-container'}>
                    <h1>Feeding Mr Biggs</h1>
                </div>
                <div className={'details'}>
                    { !about && getOptions(onStartClick, onAboutClick) }
                    { about && getAbout(onAboutClose) }
                </div>
            </div>
        </div>
    )
};

export default MainMenu;
