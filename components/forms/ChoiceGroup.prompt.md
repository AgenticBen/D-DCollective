Both screening forms lean on this — leadership background, populations served, return tier.

```jsx
<ChoiceGroup name="tier" columns={1} value={tier} onChange={setTier}
  options={['Market or above (8%+ IRR)','Below market (0–7%)','Angel / PRI']} />
```

Selected rows take a teal border and a mist fill; `type="checkbox"` for multi-select.
