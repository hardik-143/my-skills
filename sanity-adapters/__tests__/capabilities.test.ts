import { detectCapabilities, getCapabilities, resetCapabilities, setCapabilities, hasCapability } from '../capabilities';

describe('capabilities', () => {
  beforeEach(() => {
    resetCapabilities();
  });

  describe('detectCapabilities', () => {
    it('returns a capabilities object with all boolean flags', () => {
      const caps = detectCapabilities();
      expect(typeof caps.hasDefineField).toBe('boolean');
      expect(typeof caps.hasDefineType).toBe('boolean');
      expect(typeof caps.hasSanityUI).toBe('boolean');
      expect(typeof caps.hasHooksAPI).toBe('boolean');
      expect(typeof caps.hasPluginSystem).toBe('boolean');
      expect(typeof caps.hasPreviewPane).toBe('boolean');
      expect(typeof caps.hasPatchEvent).toBe('boolean');
      expect(typeof caps.hasDocumentActions).toBe('boolean');
      expect(typeof caps.hasDeskTool).toBe('boolean');
      expect(typeof caps.hasStructureTool).toBe('boolean');
      expect(typeof caps.hasFormBuilder).toBe('boolean');
    });

    it('returns false for all capabilities when no Sanity is installed', () => {
      const caps = detectCapabilities();
      // In test environment, no Sanity packages are installed
      expect(caps.hasDefineField).toBe(false);
      expect(caps.hasDefineType).toBe(false);
      expect(caps.hasSanityUI).toBe(false);
      expect(caps.hasHooksAPI).toBe(false);
      expect(caps.hasPluginSystem).toBe(false);
    });
  });

  describe('getCapabilities', () => {
    it('caches the result', () => {
      const first = getCapabilities();
      const second = getCapabilities();
      expect(first).toBe(second);
    });
  });

  describe('setCapabilities', () => {
    it('overrides specific capabilities', () => {
      setCapabilities({ hasDefineField: true });
      expect(hasCapability('hasDefineField')).toBe(true);
      // Others remain default
      expect(hasCapability('hasSanityUI')).toBe(false);
    });
  });

  describe('resetCapabilities', () => {
    it('clears the cache', () => {
      setCapabilities({ hasDefineField: true });
      expect(hasCapability('hasDefineField')).toBe(true);
      resetCapabilities();
      expect(hasCapability('hasDefineField')).toBe(false);
    });
  });

  describe('hasCapability', () => {
    it('checks individual capability', () => {
      expect(hasCapability('hasSanityUI')).toBe(false);
    });
  });
});
