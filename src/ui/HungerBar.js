import { Component } from 'inferno';

export default class HungerBar extends Component {

    constructor(props) {
        super(props);
        this.intervalId = null;


        this.state = {
            value: 100
        }
    }

    componentDidMount() {
        // set interval for bar
        const { interval } = this.props;
        this.intervalId = setInterval(this.updateHungerBar, interval);
    }

    updateHungerBar = () => {
        const { onHungerZero, rate } = this.props;



    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render() {
        return (
            <span className="bar">
                <span className="progress"></span>
            </span>
        )
    }
}
