import 'intersection-observer';

function observeElement(element, callback) {
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      callback();
      observer.unobserve(element); // Stop observing after intersection
    }
  }, {
    threshold: 0.5, // Start animation when 50% of the element is visible
  });

  observer.observe(element);
}

export default observeElement;