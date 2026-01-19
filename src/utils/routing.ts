export interface Point {
    x: number;
    y: number;
}

export interface Rect {
    x: number;
    y: number;
    width: number;
    height: number;
}

// Corner radius for rounded paths (Carbon style)
const CORNER_RADIUS = 8;

// Create a path with rounded corners
const createRoundedPath = (points: Point[], radius: number = CORNER_RADIUS): string => {
    if (points.length < 2) return '';

    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 1; i < points.length - 1; i++) {
        const p0 = points[i - 1];
        const p1 = points[i];
        const p2 = points[i + 1];

        // Calculate vectors
        const v1 = { x: p1.x - p0.x, y: p1.y - p0.y };
        const v2 = { x: p2.x - p1.x, y: p2.y - p1.y };

        // Calculate segment lengths
        const len1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
        const len2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);

        if (len1 === 0 || len2 === 0) {
            path += ` L ${p1.x} ${p1.y}`;
            continue;
        }

        // Clamp radius to half the shorter segment
        const r = Math.min(radius, len1 / 2, len2 / 2);

        // Calculate where to start and end the curve
        const beforeCorner = {
            x: p1.x - (v1.x / len1) * r,
            y: p1.y - (v1.y / len1) * r
        };
        const afterCorner = {
            x: p1.x + (v2.x / len2) * r,
            y: p1.y + (v2.y / len2) * r
        };

        // Line to corner start, then quadratic bezier curve
        path += ` L ${beforeCorner.x} ${beforeCorner.y}`;
        path += ` Q ${p1.x} ${p1.y} ${afterCorner.x} ${afterCorner.y}`;
    }

    // Line to final point
    path += ` L ${points[points.length - 1].x} ${points[points.length - 1].y}`;

    return path;
};

/**
 * Manhattan routing for VERTICAL LANES layout.
 * Arrows go LEFT-TO-RIGHT between lanes (horizontal primary direction).
 * Uses S-curves with the vertical segment at the midpoint between source and target.
 */
export const getManhattanPath = (source: Rect, target: Rect): string => {
    if (!source || !target) return '';

    // Standard horizontal connection: exit right side, enter left side
    const startPoint: Point = {
        x: source.x + source.width,
        y: source.y + source.height / 2
    };

    const endPoint: Point = {
        x: target.x,
        y: target.y + target.height / 2
    };

    const dx = endPoint.x - startPoint.x;
    const dy = endPoint.y - startPoint.y;

    const points: Point[] = [];
    points.push(startPoint);

    if (dx > 40) {
        // Normal forward connection: S-curve with vertical jog at midpoint
        const midX = startPoint.x + dx / 2;

        if (Math.abs(dy) > 5) {
            // Need vertical transition
            points.push({ x: midX, y: startPoint.y });
            points.push({ x: midX, y: endPoint.y });
        }
        points.push(endPoint);
    } else if (dx > 0) {
        // Short forward connection - direct with small jog
        const midX = startPoint.x + dx / 2;
        if (Math.abs(dy) > 5) {
            points.push({ x: midX, y: startPoint.y });
            points.push({ x: midX, y: endPoint.y });
        }
        points.push(endPoint);
    } else {
        // Backward connection - go around
        const offset = 30;
        const loopY = Math.max(source.y + source.height, target.y + target.height) + offset;

        points.push({ x: startPoint.x + offset, y: startPoint.y });
        points.push({ x: startPoint.x + offset, y: loopY });
        points.push({ x: endPoint.x - offset, y: loopY });
        points.push({ x: endPoint.x - offset, y: endPoint.y });
        points.push(endPoint);
    }

    return createRoundedPath(points);
};
