import { TimelineMax, TweenMax } from "gsap";
import { getPixelWidthBasedOnViewport } from "./util/math";
import { PX_PER_POSITION } from "./constants";
import PureWidget from "./widget/PureWidget";
import { Kit } from "../shared/sharedModels";

type Props = {
    position: number;
};

export class Bike extends PureWidget<Props, {}> {
    private element: HTMLDivElement;
    constructor(
        container: HTMLElement,
        private readonly staticProps: {
            kit: Kit;
            row: number;
            startOffsetX: number;
            name: string;
        }
    ) {
        super({});
        var innerHTML = `
    <div class="cycliste montagne">
        <img src="img/bike/teams/${staticProps.kit}/cuisse.png" class="cuisse cuisse1">
        <div class="mollet mollet1">
            <img src="img/bike/mollet.png">
        </div>
        <div class="chaussure chaussure1">
            <img src="img/bike/chaussure.png">
        </div>
        <img src="img/bike/pedale.png" class="pedale">
        <img src="img/bike/roue.png" class="roue roue1">
        <img src="img/bike/roue.png" class="roue roue2">
        <img src="img/bike/cadre.png" class="cadre">
        <img src="img/bike/pedalier.png" class="pedalier">
        <img src="img/bike/teams/${staticProps.kit}/corps.png" class="corps">
        <img src="img/bike/teams/${staticProps.kit}/cuisse.png" class="cuisse cuisse2">
        <div class="mollet mollet2">
            <img src="img/bike/mollet.png">
        </div>
        <div class="chaussure chaussure2">
            <img src="img/bike/chaussure.png">
        </div>
        <img src="img/bike/teams/${staticProps.kit}/bras.png" class="bras">
        <img src="img/bike/avant-bras.png" class="avant-bras">
    </div>
`;

        this.element = document.createElement("div");
        this.element.innerHTML = innerHTML;
        this.element.className = "bike";

        container.appendChild(this.element);

        // TODO: bug here
        this.element.style.top =
            "calc(26% + " +
            staticProps.row * getPixelWidthBasedOnViewport(35) +
            "px)";

        // TweenMax.set(this.element, { x: this.getXForPosition() + "px" });

        TweenMax.fromTo(this.element, 2, { opacity: 0 }, { opacity: 1 });
    }

    public getXForPosition() {
        const ret =
            this.props.position *
                getPixelWidthBasedOnViewport(PX_PER_POSITION) +
            this.staticProps.startOffsetX;

        return ret;
    }

    protected render() {
        console.log("render Bike", this.staticProps.name);
        const x = this.getXForPosition();
        this.element.style.transform = `translate(${x}px,0px)`;
    }
}
