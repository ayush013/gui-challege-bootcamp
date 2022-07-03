export default class ViewportObserver {
  static observe(element, onViewabilityChanged) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        onViewabilityChanged(entries[0]);
      }
    });
    observer.observe(element);
  }
}

// INTERSECTION OBSERVER (PROVIDER)
// props -> element to observe
// onViewabilityChanged callback
