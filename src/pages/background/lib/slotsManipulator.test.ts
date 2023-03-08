import { SlotsManipulator } from "@pages/background/lib/slotsManipulator";

const defaultSlot: Slot = {
  id: "1",
  name: "name",
  isSelected: false,
  type: "ChatGPT",
};

describe("SlotsManipulator test", () => {
  test("getSelectedSlot test", () => {
    // given
    const MOCK_SELECTED_SLOT: Slot = { ...defaultSlot, isSelected: true };
    const MOCK_SLOTS: Slot[] = [
      defaultSlot,
      defaultSlot,
      defaultSlot,
      MOCK_SELECTED_SLOT,
    ];

    // when
    const foundedSlot = SlotsManipulator.getSelectedSlot(MOCK_SLOTS);

    // then
    expect(foundedSlot).toEqual(MOCK_SELECTED_SLOT);
  });
  test("addSlot test", () => {
    // given
    const MOCK_SLOT: Slot = { ...defaultSlot };
    const MOCK_SLOTS: Slot[] = [];

    // when
    const slots = SlotsManipulator.addSlot(MOCK_SLOTS, MOCK_SLOT);

    // then
    expect(slots).toHaveLength(1);
  });
  test("updateSlot test", () => {
    // given
    const MOCK_SLOT_ID = "update";
    const MOCK_SLOT: Slot = {
      ...defaultSlot,
      id: MOCK_SLOT_ID,
      isSelected: true,
    };
    const UPDATED_SLOT: Slot = { ...MOCK_SLOT, isSelected: false };
    const MOCK_SLOTS: Slot[] = [
      defaultSlot,
      defaultSlot,
      defaultSlot,
      MOCK_SLOT,
    ];

    // when
    const updatedSlots = SlotsManipulator.updateSlot(MOCK_SLOTS, UPDATED_SLOT);

    // then
    const updatedSlot = updatedSlots.find(({ id }) => id === MOCK_SLOT_ID);
    expect(updatedSlot).toEqual(UPDATED_SLOT);
  });
  test("deleteSlot test", () => {
    // given
    const DELETED_SLOT_ID = "deleted";
    const MOCK_SLOTS: Slot[] = [
      defaultSlot,
      { ...defaultSlot, id: DELETED_SLOT_ID },
    ];

    // when
    const deletedSlots = SlotsManipulator.deleteSlot(
      MOCK_SLOTS,
      DELETED_SLOT_ID
    );

    // then
    expect(deletedSlots).toHaveLength(1);
  });
});
