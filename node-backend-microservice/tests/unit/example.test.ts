import { getUsernameHash } from '../../src/services/hashing.service'
import { getHexRGBFromHexHash, getHSLFromHexHash } from '../../src/services/color.service'

describe('Hashing', () => {
  it('should return an expected value', () => {
    expect(getUsernameHash('steven')).toBe('c7c084318b6f1bece6f74ffce1ea53596070345272dee8040037497c7d4cbffe');
  });
});

describe('Colors', () => {
  it('should return a expected RGB', () => {
    expect(getHexRGBFromHexHash('c7c084318b6f1bece6f74ffce1ea53596070345272dee8040037497c7d4cbffe')).toBe('#c7c084');
  })
  it('should return a expected HSL', () => {
    expect(getHSLFromHexHash('c7c084318b6f1bece6f74ffce1ea53596070345272dee8040037497c7d4cbffe')).toEqual({ hue: 54, saturation: 0.37430167597765357, lightness: 0.6490196078431373 });
  })
})