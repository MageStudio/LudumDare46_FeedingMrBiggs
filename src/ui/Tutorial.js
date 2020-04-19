import { Component } from 'inferno';

export default class Tutorial extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { onCloseMenu } = this.props;
        setTimeout(onCloseMenu, 15000);
    }

    render() {
        return (
            <div className={'dialog-container'}>
                <div className={'dialog win tutorial'}>
                    <div className={'title-container'}>
                        <h1>Welcome!</h1>
                    </div>
                    <div className={'details'}>
                        <p className={'introduction'}>
                            Your job is to feed our lovely Mr Biggs. He's a very precious specimen, and it's the last of his species.
                            He gets hungry very easily, so get his food and bring it to the collection point.
                            <br/>
                            Give it the food it wants, and your score will be higher! Remember, keep it alive!
                            <span className={'disclaimer'}>
                                This message will disappear in 15 seconds.
                            </span>
                        </p>

                        <div className={'images'}>
                            <div className={'img-container'}>
                                <span>Movement:</span>
                                <img className={'wasd'} src={'assets/textures/wasd.png'}/>
                            </div>
                            <div className={'img-container'}>
                                <span>Feeding:</span>
                                <img className={'f'} src={'assets/textures/f.png'}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
