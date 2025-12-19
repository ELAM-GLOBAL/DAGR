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

// Helper to create a rounded corner path
const createRoundedCornerPath = (points: Point[], radius: number = 8): string => {
    if (points.length < 2) return '';

    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 1; i < points.length - 1; i++) {
        const p0 = points[i - 1];
        const p1 = points[i];
        const p2 = points[i + 1];

        // Vector p0 -> p1
        const v1 = { x: p1.x - p0.x, y: p1.y - p0.y };
        // Vector p1 -> p2
        const v2 = { x: p2.x - p1.x, y: p2.y - p1.y };

        // Length logic to ensure we don't start rounding before we can
        // For simplicity in this specific "right-angle" case, we assume segments are long enough
        // In a robust implementation, we'd clamp radius to min(segment_len / 2)

        // Move to start of curve
        // We basically want to stop 'radius' pixels before p1
        const dist1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
        const r1 = Math.min(radius, dist1 / 2);

        // We want to stop r1 pixels before p1.
        // Since lines are orthogonal, it's just x or y subtraction

        // Determining direction to shorten the line
        const shortenX1 = (v1.x === 0 ? 0 : (v1.x > 0 ? -r1 : r1));
        const shortenY1 = (v1.y === 0 ? 0 : (v1.y > 0 ? -r1 : r1));

        path += ` L ${p1.x + shortenX1} ${p1.y + shortenY1}`;

        // Quadratic bezier to end of curve (which is r pixels along v2)
        const dist2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);
        const r2 = Math.min(radius, dist2 / 2);

        const shortenX2 = (v2.x === 0 ? 0 : (v2.x > 0 ? r2 : -r2));
        const shortenY2 = (v2.y === 0 ? 0 : (v2.y > 0 ? r2 : -r2));

        // Control point is p1
        path += ` Q ${p1.x} ${p1.y} ${p1.x + shortenX2} ${p1.y + shortenY2}`;
    }

    // Line to last point
    path += ` L ${points[points.length - 1].x} ${points[points.length - 1].y}`;

    return path;
};

// Manhattan routing with rounded corners
export const getManhattanPath = (source: Rect, target: Rect): string => {
    if (!source || !target) return '';

    const startPoint: Point = {
        x: source.x + source.width,
        y: source.y + source.height / 2
    };

    const endPoint: Point = {
        x: target.x,
        y: target.y + target.height / 2
    };

    const dx = endPoint.x - startPoint.x;

    // Midpoint for the vertical segment
    const midX = startPoint.x + dx / 2;

    // Key points for the polyline
    const points: Point[] = [];

    points.push(startPoint);

    if (dx > 20) {
        // Forward S-shape
        points.push({ x: midX, y: startPoint.y });
        points.push({ x: midX, y: endPoint.y });
        points.push(endPoint);
    } else {
        // Loop back case (Target is behind or close)
        const escapeX = startPoint.x + 20;
        const entryX = endPoint.x - 20;
        const midY = Math.max(source.y + source.height, target.y + target.height) + 20;

        points.push({ x: escapeX, y: startPoint.y });
        points.push({ x: escapeX, y: midY });
        points.push({ x: entryX, y: midY });
        points.push({ x: entryX, y: endPoint.y });
        points.push(endPoint);
    }

    return createRoundedCornerPath(points, 8); // 8px radius for smooth Carbon feel
};
