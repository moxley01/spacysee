import { getBoxToBoxArrow } from "perfect-arrows";

class SvgApi {
    private lastDrawnConnection: {
        source: HTMLSpanElement;
        target: HTMLSpanElement;
        labelText: string;
        width: number;
    } | null = null;
    constructor(private readonly svg: SVGSVGElement) {
        this.svg = svg;
        svg.style.height = `${window.innerHeight}px`;
    }

    public drawConnection(
        source: HTMLSpanElement,
        target: HTMLSpanElement,
        labelText: string = ""
    ) {
        // if the connection is the same as the last one, don't draw it again
        if (!this.needsRedraw(source, target, labelText)) {
            return;
        }

        // first, clear the svg
        this.clear();

        // if the source and target are the same, don't draw anything
        if (source === target) {
            return;
        }

        // now draw the connection
        const sourceRect = source.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const arrow = getBoxToBoxArrow(
            sourceRect.x,
            sourceRect.y,
            sourceRect.width,
            sourceRect.height,
            targetRect.x,
            targetRect.y,
            targetRect.width,
            targetRect.height,
            {
                straights: false,
                bow: 1,
                padStart: 5,
                padEnd: 8,
            }
        );

        const [sx, sy, cx, cy, ex, ey, ae, as_, ec] = arrow;

        const endAngleAsDegrees = ae * (180 / Math.PI);
        const startAngleAsDegrees = as_ * (180 / Math.PI);

        // make handle
        const handle = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
        );
        handle.setAttribute("cx", sx.toString());
        handle.setAttribute("cy", sy.toString());
        handle.setAttribute("r", "4");

        // make line
        const d = `M${sx},${sy} Q${cx},${cy} ${ex},${ey}`;
        const line = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );
        line.setAttribute("d", d);
        line.setAttribute("fill", "none");

        // make arrowhead
        const arrowHead = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "polygon"
        );
        arrowHead.setAttribute("points", "0,-6 12,0, 0,6");
        arrowHead.setAttribute(
            "transform",
            `translate(${ex},${ey}) rotate(${endAngleAsDegrees})`
        );

        // make a foreignObject as a label and position it near the control point
        const labelWrap = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "foreignObject"
        );
        // lets refrain from setting transform on the foreignObject
        // because it is not supported in Safari
        labelWrap.setAttribute("width", "100%");
        labelWrap.setAttribute("height", `100%`);

        const label = document.createElement("div");

        const midPoint = line.getPointAtLength(line.getTotalLength() / 2);
        const midPointRotate =
            (startAngleAsDegrees + endAngleAsDegrees) / 2 - 90;

        label.style.top = `${midPoint.y}px`;
        label.style.left = `${midPoint.x}px`;

        label.style.transformOrigin = "center center";

        // make a div to hold the text
        const text = document.createElement("div");
        const isUpsideDown = midPointRotate > 90 || midPointRotate < -90;
        const isShortLine = line.getTotalLength() < 50;
        const bisectY = sy + (ey - sy) / 2;
        let transformY = 0;
        if (midPoint.y > bisectY === isUpsideDown) {
            transformY = isShortLine ? -1.6 : -1.2;
        } else {
            transformY = isShortLine ? 1.6 : 1.2;
        }
        // if midPointRotate is big enough to be upside down, flip the text upside down
        if (isUpsideDown) {
            text.style.transformOrigin = "center center";
            text.style.transform = "rotate(180deg)";
        }
        label.style.transform = `translate(-50%, -50%) rotate(${midPointRotate}deg) translate(0, ${transformY}em)`;

        text.textContent = labelText;
        label.appendChild(text);
        labelWrap.appendChild(label);

        this.svg.appendChild(handle);
        this.svg.appendChild(line);
        this.svg.appendChild(arrowHead);
        this.svg.appendChild(labelWrap);
        this.lastDrawnConnection = {
            source,
            target,
            labelText,
            width: window.innerWidth,
        };
    }
    public clear() {
        while (this.svg.firstChild) {
            this.svg.removeChild(this.svg.firstChild);
        }
        this.lastDrawnConnection = null;
    }
    private needsRedraw(
        source: HTMLSpanElement,
        target: HTMLSpanElement,
        labelText: string
    ) {
        if (!this.lastDrawnConnection) {
            return true;
        }
        return (
            source !== this.lastDrawnConnection.source ||
            target !== this.lastDrawnConnection.target ||
            labelText !== this.lastDrawnConnection.labelText ||
            window.innerWidth !== this.lastDrawnConnection.width
        );
    }
}

export default SvgApi;
