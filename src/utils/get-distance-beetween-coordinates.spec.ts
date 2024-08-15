import { describe, it, expect } from "vitest";

import {
  getDistanceBetweenCoordinates,
  Coordinate,
} from "./get-distance-beetween-coordinates";

describe("Get distance between coordinates", () => {
  it("should return 0 with same coordinated", () => {
    const coord1: Coordinate = { latitude: 37.7749, longitude: -122.4194 };
    const distance = getDistanceBetweenCoordinates(coord1, coord1);
    expect(distance).toBe(0);
  });

  it("should get distance > 1", () => {
    const coord1: Coordinate = { latitude: 37.7749, longitude: -122.4194 };
    const coord2: Coordinate = { latitude: 37.8044, longitude: -122.2711 };

    const distance = getDistanceBetweenCoordinates(coord1, coord2);
    expect(distance).toBeGreaterThan(1);
  });

  it("should return exatly distance", () => {
    const coord1: Coordinate = { latitude: 40.7128, longitude: -74.006 };
    const coord2: Coordinate = { latitude: 34.0522, longitude: -118.2437 };

    const distance = getDistanceBetweenCoordinates(coord1, coord2);
    expect(distance).toBeCloseTo(3935.55, 1);
  });

  it("should correctly handle very close coordinates", () => {
    const coord1: Coordinate = { latitude: 37.7749, longitude: -122.4194 };
    const coord2: Coordinate = { latitude: 37.774, longitude: -122.419 };

    const distance = getDistanceBetweenCoordinates(coord1, coord2);
    expect(distance).toBeGreaterThan(0);
    expect(distance).toBeLessThan(1);
  });
});
