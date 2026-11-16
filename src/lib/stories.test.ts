import { describe, expect, it } from "vitest";
import { STORIES, VIDEO_TESTIMONIALS } from "./stories";

describe("image-led story index", () => {
  it("gives every customer story a cover image", () => {
    expect(STORIES).toHaveLength(5);
    expect(STORIES.every((story) => story.image.length > 0)).toBe(true);
  });

  it("lists all six recorded video testimonials with matching photos", () => {
    expect(VIDEO_TESTIMONIALS).toHaveLength(6);
    expect(new Set(VIDEO_TESTIMONIALS.map((story) => story.videoId)).size).toBe(
      6,
    );
    expect(VIDEO_TESTIMONIALS.every((story) => story.image.length > 0)).toBe(
      true,
    );
  });
});
