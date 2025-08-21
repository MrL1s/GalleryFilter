import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import GalleryFilter from "../GalleryFilter.vue";

// mock components
vi.mock("../GallerySearch.vue", () => ({
  default: {
    name: "GallerySearch",
    props: ["search"],
    template: `<input :value="search" @input="$emit('update:search', $event.target.value)" />`,
  },
}));
vi.mock("../GalleryHeader.vue", () => ({ default: { template: "<header />" } }));
vi.mock("../GalleryCard.vue", () => ({ default: { template: "<div />" } }));
vi.mock("../GalleryModal.vue", () => ({ default: { template: "<div />" } }));

describe("GalleryFilter.vue", () => {
  it("очищает поле поиска при клике на кнопку 'очистить'", async () => {
    const wrapper = mount(GalleryFilter);

    // search mock input in galleryfilter
    const input = wrapper.find("input");
    await input.setValue("test");

    // watch input
    expect(input.element.value).toBe("test");

    // clear input
    const clearBtn = wrapper.get("button.text-blue-600");
    await clearBtn.trigger("click");

    expect(input.element.value).toBe(""); // input cleared
  });

  it("переключает видимость фильтров при клике на кнопку 'скрыть/фильтр'", async () => {
    const wrapper = mount(GalleryFilter);

    const filterBtn = wrapper.get("button.text-gray-500");

    // panel filter
    const getFilterPanel = () => wrapper.find("div.flex.flex-wrap.gap-2.w-full");

    // default checked
    expect(getFilterPanel().isVisible()).toBe(true);

    // first click -> hide
    await filterBtn.trigger("click");
    expect(getFilterPanel().exists() ? getFilterPanel().isVisible() : false).toBe(false);

    // two click -> visible
    await filterBtn.trigger("click");
    expect(getFilterPanel().exists() ? getFilterPanel().isVisible() : false).toBe(true);
  });
});
