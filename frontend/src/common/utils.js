export function makeNavbarItems(items) {
  return items.map(item => ({
    title: item,
    handleButtonClick() {
      console.log(`You clicked the ${item} button`);
    },
  }));
}
