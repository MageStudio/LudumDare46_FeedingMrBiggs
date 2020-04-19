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
        <h3 className={'author'}>
            Built with <a href={'https://github.com/MageStudio/Mage'} target={'_blank'}>Mage Engine</a>.
            <br/>
            <br/>
            By <a href={'http://www.marcostagni.com'} target={'_blank'}>Marco Stagni</a>.
        </h3>
        <div className={'action'}>
            <button className={'action-button'} onClick={onAboutClose}>
                Back
            </button>
        </div>
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
