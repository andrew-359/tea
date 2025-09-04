export function startViewTransition(run: () => void) {
  const anyDoc = document as any;
  const fn = anyDoc.startViewTransition as undefined | ((cb: () => void) => any);
  if (typeof fn === 'function') {
    try {
      // Call with proper this binding to avoid Illegal invocation
      return fn.call(anyDoc, run);
    } catch {
      // Fallback: no-op transition
      run();
      return;
    }
  }
  run();
}
