import { Component } from 'inferno';

const GREEN = '#b8e994';
const YELLOW = '#fad390';
const ORANGE = '#fa983a';
const RED = '#e55039';

const COLORS = {
    normal: GREEN,
    ok: YELLOW,
    warning: ORANGE,
    danger: RED
};

const hungerToColorMap = {
    'normal': [0, 20],
    'ok': [19, 50],
    'warning': [49, 80],
    'danger': [79, 120]
};

const convertHungerToColor = (hunger) => {
    let level = 'ok';

    Object.keys(hungerToColorMap).forEach(lvl => {
        const min = hungerToColorMap[lvl][0];
        const max = hungerToColorMap[lvl][1];

        if (hunger > min && hunger < max) {
            level = lvl;
        }
    });

    return COLORS[level];
};

export default class HungerBar extends Component {

    constructor(props) {
        super(props);
        this.intervalId = null;
    }

    componentDidUpdate({ level }) {
        const { level: currentLevel } = this.props;
        const isNotSameLevel = level !== currentLevel;

        if (this.props.over || this.props.win || isNotSameLevel) {
            clearInterval(this.intervalId);
        }
    }

    componentDidMount() {
        // set interval for bar
        const { interval = 1000 } = this.props;
        this.intervalId = setInterval(this.updateHungerBar, interval);
    }

    updateHungerBar = () => {
        const { onHungerMax = f => f, onHungerIncrease = f => f, rate, hunger } = this.props;
        const newHunger = hunger + rate;

        onHungerIncrease(newHunger);

        if (newHunger >= 100) {
            onHungerMax();
            clearInterval(this.intervalId);
        }
    };

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    getImageSrcForDesiredFood = () => {
        const { desiredFood } = this.props;
        const baseUrl = '/assets/textures/';

        return `${baseUrl}${desiredFood}_crate.jpg`;
    };

    render() {
        const { hunger } = this.props;
        const background = convertHungerToColor(hunger);
        const width = `${hunger}% !important`;
        const style = `background-color: ${background} !important; width: ${width};`;


        const imgSrc = this.getImageSrcForDesiredFood();

        return (
            <div className={'hunger-container'}>
                <div className={'progress-bar'}>
                    <span className="bar">
                        <span className="progress" style={style}></span>
                    </span>
                </div>
                <span className={'progress-label'}>Hunger level</span>

                <div className={'desired-food'}>
                    <img src={imgSrc} />
                </div>
            </div>
        )
    }
}
