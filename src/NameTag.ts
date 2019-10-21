import { getPixelWidthBasedOnViewport } from "./util/math";
import { PX_PER_POSITION } from "./constants";
import PureWidget from "./widget/PureWidget";
import { Box, Point } from "./util/freePosition";
import { Kit } from "../shared/sharedModels";

type Props = {
    position: number;
    onClick: (nameTag: NameTag) => void;
    getFreePosition: (nameTag: NameTag, desiredPosition: Box) => Point;
};

export class NameTag extends PureWidget<Props, {}> {
    private element: HTMLDivElement;
    private box: Box | undefined = undefined;
    constructor(
        private container: HTMLElement,
        private staticProps: {
            name: string;
            kit: Kit;
            startOffsetX: number;
        }
    ) {
        super({});
        this.element = document.createElement("div");
        this.element.className = `name ${this.staticProps.kit}`;
        this.element.innerText = this.staticProps.name;
        this.element.addEventListener("click", () => {
            this.props.onClick(this);
        });
        container.appendChild(this.element);
    }

    private getXForPosition() {
        const ret =
            this.props.position *
                getPixelWidthBasedOnViewport(PX_PER_POSITION) +
            this.staticProps.startOffsetX;

        return ret;
    }

    public getBox(): Box | undefined {
        return this.box;
    }

    protected render(): void {
        console.log("render NameTag", this.staticProps.name);

        const margin = 10;

        const desiredPosition = {
            x: this.getXForPosition(),
            y: this.element.offsetHeight + margin, // ideal position is on the second row, closer to the rider
            width: this.element.offsetWidth + margin,
            height: this.element.offsetHeight + margin
        };

        const pos = this.props.getFreePosition(this, desiredPosition);
        this.element.style.transform = this.element.style.webkitTransform = `translate(${pos.x}px, ${pos.y}px)`;

        this.box = {
            ...pos,
            width: this.element.offsetWidth + margin,
            height: this.element.offsetHeight + margin
        };
    }
}
