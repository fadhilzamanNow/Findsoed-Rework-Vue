import { onMounted, ref, ShallowRef, watchEffect } from "vue";

type FunctionProps = {
  refElement: Readonly<ShallowRef<HTMLDivElement | null>>;
  observerOptions: IntersectionObserverInit;
};

export function useFirstViewPortEntry(
  refElement: FunctionProps["refElement"],
  observerOptions: FunctionProps["observerOptions"]
) {
  const entered = ref(false);

  onMounted(() => {
    const observer = ref(
      new IntersectionObserver(
        ([entry]) => (entered.value = entry.isIntersecting),
        observerOptions
      )
    );

    watchEffect(() => {
      const element = refElement.value;
      const ob = observer.value;
      if (entered.value) {
        ob.disconnect();
        return;
      }

      if (element && !entered.value) ob.observe(element);

      return () => ob.disconnect();
    });
  });

  return entered;
}
