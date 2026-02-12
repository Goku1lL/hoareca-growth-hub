

# Fix: Replace react-leaflet with vanilla Leaflet to eliminate crashes

## Problem
The `react-leaflet` library (even v4.2.1) conflicts with Radix UI Dialog portals, causing a `render2 is not a function` crash whenever the map is rendered inside a dialog. This is a fundamental incompatibility between react-leaflet's React context system and how Radix portals mount components.

## Solution
Remove `react-leaflet` entirely and rewrite `MapPinPicker` using the **vanilla Leaflet JS API** with a `useRef` + `useEffect` pattern. This completely sidesteps React context issues since the map is managed imperatively via DOM refs, not through React's rendering pipeline.

The map will be scoped to Bangalore city with bounded panning.

## Changes

### 1. Rewrite `src/components/MapPinPicker.tsx`
- Remove all `react-leaflet` imports (`MapContainer`, `TileLayer`, `Marker`, `useMapEvents`)
- Use a `div ref` and initialize the Leaflet map with `L.map()` inside a `useEffect`
- Set `maxBounds` to Bangalore city area (approx 12.75-13.18 lat, 77.35-77.85 lng)
- Handle click events via `map.on('click', ...)` instead of `useMapEvents`
- Manage the marker imperatively with `L.marker()` add/remove
- Properly clean up with `map.remove()` on unmount

### 2. Remove `react-leaflet` dependency
- Remove `react-leaflet` from `package.json`
- Keep `leaflet` and `@types/leaflet` (still needed)

### 3. Simplify `src/pages/LeadsPage.tsx`
- Remove `lazy()` and `Suspense` wrapper since the vanilla Leaflet component won't have context issues
- Use a normal import for `MapPinPicker`
- Keep the conditional render `{(createLeadOpen || addNewLeadOpen) && <MapPinPicker ... />}` as a minor optimization

## Technical Details

The rewritten MapPinPicker will look roughly like:

```text
useEffect(() => {
  const map = L.map(mapRef.current, {
    center: [12.9716, 77.5946],
    zoom: 13,
    maxBounds: [[12.75, 77.35], [13.18, 77.85]]
  });
  L.tileLayer('https://...').addTo(map);
  map.on('click', (e) => onLocationSelect(e.latlng.lat, e.latlng.lng));
  return () => map.remove();
}, []);
```

This pattern is fully compatible with Radix Dialog portals because no React context providers are involved.

