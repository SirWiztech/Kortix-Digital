<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Button background fix (2026-07-30)

The `<Tag>` (anchor/button) inside `SpecularButton` has `backgroundColor: baseColor` set inline. Both the container `div` and the `<Tag>` share the same `baseColor` (`#080908` default). This ensures a solid dark fallback on mobile where `import("ogl")` or WebGL context creation often fails — without it, the transparent Tag would show white on mobile browsers.

The "separate visual box" issue was caused by the earlier DPR bug (canvas only covering half the button on retina displays), which is now fixed — `uCenter` and `uHalfSize` in the shader are multiplied by `devicePixelRatio` to match `gl_FragCoord`'s physical pixel coordinate space.
