export type Box = {
    // (x,y) is the top-left coordinate of box
    x: number;
    y: number;
    width: number;
    height: number;
};

export type Point = {
    x: number;
    y: number;
};

function boxesCollide(box1: Box, box2: Box) {
    // Helper function to detect whether two boxes collide or not, you'll probably need this at some point
}

/**
 * Finds the closest position (to boxToPlace.x and boxToPlace.y) where we can place boxToPlace:
 * - without colliding with any of the boxes.
 * - fitting inside insideContainer
 *
 * @param insideContainer A Box describing the area in which NameTags must be rendered. The returned position-Box must fall inside this Box
 * @param boxToPlace A Box describing the width and height of the NameTag we want to place, and the ideal coordinates we want to place it closest to
 * @param boxes Other Boxes, with which the returned position-box cannot collide
 */
export function getClosestFreePosition(
    insideContainer: Box,
    boxToPlace: Box,
    boxes: Box[]
): Point {
    // Well, we kind of got stuck here! For now, I'm just returning `boxToPlace` and therefor position
    // it at exactly the position requested. But this doesn't take into account any of the other boxes
    // Can you create a smarter layouting algorithm?

    // You can add any methods to this file to complete the exercise (no need to modify any other files)
    return boxToPlace;
}
