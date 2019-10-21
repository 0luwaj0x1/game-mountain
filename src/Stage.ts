import { TweenMax } from "gsap";
import { degToRad, getPixelWidthBasedOnViewport } from "./util/math";
import { PX_PER_POSITION } from "./constants";
import { Bike } from "./Bike";
import { NameTag } from "./NameTag";
import PureWidget from "./widget/PureWidget";
import { getClosestFreePosition, Box } from "./util/freePosition";
import { Player } from "../shared/sharedModels";

const STAGE_LEFT_EXTRA = 0.2 * window.outerWidth;
const ANGLE = 12;

type State = {
    bikePositions: number[];
};

type PlayerWithStartPosition = Player & { startPosition: number };

export default class Stage extends PureWidget<{}, State> {
    private readonly element: HTMLDivElement;
    private readonly bikesContainer: HTMLDivElement;
    private readonly nameContainer: HTMLDivElement;

    private readonly bikes: Bike[] = [];
    private readonly nameTags: NameTag[] = [];

    constructor(
        parent: HTMLElement,
        staticProps: { maxPosition: number; players: PlayerWithStartPosition[] }
    ) {
        super({
            bikePositions: []
        });
        this.element = document.createElement("div");
        this.element.className = "stage";
        this.element.innerHTML = `<div class="name-container"></div>
    <div class="route montagne">
      <div></div>
      <div></div>
    </div>
    <div class="bikes"></div>`;

        const width =
            staticProps.maxPosition *
                getPixelWidthBasedOnViewport(PX_PER_POSITION) +
            STAGE_LEFT_EXTRA;

        this.element.style.width = width + "px";
        this.bikesContainer = this.element.getElementsByClassName(
            "bikes"
        )[0] as HTMLDivElement;

        this.nameContainer = this.element.getElementsByClassName(
            "name-container"
        )[0] as HTMLDivElement;

        parent.appendChild(this.element);

        staticProps.players.forEach((player, i) => {
            this.state.bikePositions.push(player.startPosition);
            this.bikes.push(
                new Bike(this.bikesContainer, {
                    row: i,
                    startOffsetX: STAGE_LEFT_EXTRA + window.outerWidth / 2, // start in middle of screen,
                    ...player
                })
            );

            this.nameTags.push(
                new NameTag(this.nameContainer, {
                    ...player,
                    startOffsetX: STAGE_LEFT_EXTRA + window.outerWidth / 2
                })
            );
        });
    }

    public moveCamera(newPosition: number, duration: number = 5) {
        const pixels =
            newPosition * getPixelWidthBasedOnViewport(PX_PER_POSITION);

        const newLeft = -STAGE_LEFT_EXTRA - Math.cos(degToRad(ANGLE)) * pixels;

        // TODO: bug here
        const newTop =
            getPixelWidthBasedOnViewport(250) /*TODO: why?*/ +
            pixels * Math.sin(degToRad(ANGLE));
        const ret = [
            TweenMax.to(this.element, duration, {
                x: newLeft,
                y: newTop,
                force3D: true
            })
            // TweenMax.to(this, duration, { setCameraPosition: newPosition })
        ];
        return ret;
    }

    protected tweenBikePosition(bikeIndex: number, toPosition: number) {
        const data = {
            position: this.state.bikePositions[bikeIndex]
        };

        TweenMax.to(
            data, // Create a new tween that modifies 'data'.,
            1, // take 1 second
            {
                position: toPosition,
                onUpdate: () => {
                    // Called after TweenMax updates 'position'.
                    const newBikePositions = [...this.state.bikePositions];
                    newBikePositions[bikeIndex] = data.position;
                    this.setState({
                        bikePositions: newBikePositions
                    });
                }
            }
        );
    }

    protected render() {
        this.bikes.forEach((bike, i) => {
            bike.renderWithProps({ position: this.state.bikePositions[i] });
        });

        this.nameTags.forEach((nameTag, i) => {
            nameTag.renderWithProps({
                position: this.state.bikePositions[i],
                onClick: (nameTag: NameTag) => {
                    this.tweenBikePosition(i, this.state.bikePositions[i] + 5);
                },
                getFreePosition: (nameTag: NameTag, desiredPosition: Box) => {
                    const otherBoxes = this.nameTags
                        .filter(tag => tag != nameTag)
                        .map(tag => tag.getBox())
                        .filter<Box>((box): box is Box => !!box);

                    const containerBox = {
                        x: 0,
                        y: 0,
                        width: this.nameContainer.offsetWidth,
                        height: this.nameContainer.offsetHeight
                    };

                    return getClosestFreePosition(
                        containerBox,
                        desiredPosition,
                        otherBoxes
                    );
                }
            });
        });
    }
}
