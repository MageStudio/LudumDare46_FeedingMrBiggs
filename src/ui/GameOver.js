import { Component } from 'inferno';
import {parseScore} from '../levels';

const GameOver = ({ score }) => (
    <div className={'dialog-container'}>
        <div className={'dialog lose'}>
            <div className={'title-container'}>
                <h1>Game Over :(</h1>
            </div>
            <div className={'details'}>
                <h3 className={'score'}>{parseScore(score)}</h3>
                <div className={'action'}>
                    <a className={'action-button'} href={'/'}>
                        Try Again?
                    </a>
                </div>
            </div>
        </div>
    </div>
);

export default GameOver;
