
export const getHexRGBFromHexHash = (hexHash: string) => {
  return `#${hexHash.slice(0, 6)}`
}

export const getHSLFromHexHash = (hexHash: string) => {
  const R = parseInt(hexHash.slice(0, 2), 16)
  const G = parseInt(hexHash.slice(2, 4), 16)
  const B = parseInt(hexHash.slice(4, 6), 16)

  const r = R / 255
  const g = G / 255
  const b = B / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const delta = max - min

  let hue, saturation, lightness

  if (delta === 0) {
    hue = 0
  } else if (max === r) {
    hue = ((g - b) / delta) % 6
  } else if (max === g) {
    hue = (b - r) / delta + 2
  } else {
    hue = (r - g) / delta + 4
  }
  hue = Math.round(hue * 60)
  if (hue < 0) hue += 360

  lightness = (max + min) / 2

  saturation = delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1))

  return { hue, saturation, lightness }
}