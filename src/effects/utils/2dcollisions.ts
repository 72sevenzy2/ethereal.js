// more enhanced 2d collision equation in code

import { circleType } from "../circles";

export function resolveCollisions(p1: circleType, p2: circleType) {
    const d1x = p2.positionX - p1.positionX;
    const d1y = p2.positionY - p1.positionY;
    const hyp = Math.hypot(d1x, d1y);

    if (hyp === 0) {
        return null
    }

    const overlap = 0.5 * (p1.radius + p2.radius - hyp);
    const sock = (d1x / hyp) * overlap;
    const rock = (d1y / hyp) * overlap;

    p1.positionX -= sock;
    p1.positionY -= rock;
    p2.positionX += sock;
    p2.positionY += rock;

    const dx = p2.positionX - p1.positionX;
    const dy = p2.positionY - p1.positionY;
    const phi = Math.atan2(dy, dx);
    const v1 = Math.sqrt(p1.velocityX ** 2 + p1.velocityY ** 2);
    const v2 = Math.sqrt(p2.velocityX ** 2 + p2.velocityY ** 2);
    const theta1 = Math.atan2(p1.velocityY, p1.velocityX);
    const theta2 = Math.atan2(p2.velocityY, p2.velocityX);
    const m1 = p1.mass;
    const m2 = p2.mass;

    const v1x = (
        ((v1 * Math.cos(theta1 - phi)) * (m1 - m2) + 2 * m2 * v2 * Math.cos(theta2 - phi)) / (m1 + m2)
    ) * Math.cos(phi) + v1 * Math.sin(theta1 - phi) * Math.cos(phi + Math.PI / 2);
    const v1y = (
        ((v2 * Math.cos(theta1 - phi)) * (m1 - m2) + 2 * m2 * v2 * Math.cos(theta2 - phi)) / (m1 + m2)
    ) * Math.sin(phi) + v1 * Math.sin(theta1 - phi) * Math.sin(phi + Math.PI / 2);
    const v2x = (
        ((v2 * Math.cos(theta2 - phi)) * (m2 - m1) + 2 * m1 * v1 * Math.cos(theta1 - phi)) / (m1 + m2)
    ) * Math.cos(phi) + v2 * Math.sin(theta2 - phi) * Math.cos(phi + Math.PI / 2);
    const v2y = (
        ((v2 * Math.cos(theta2 - phi)) * (m2 - m1) + 2 * m1 * v1 * Math.cos(theta1 - phi)) / (m1 + m2)
    ) * Math.sin(phi) + v1 * Math.sin(theta2 - phi) * Math.sin(phi + Math.PI / 2);

    // assigning the values
    p1.velocityX = v1x;
    p1.velocityY = v1y;
    p2.velocityX = v2x;
    p2.velocityY = v2y;
}