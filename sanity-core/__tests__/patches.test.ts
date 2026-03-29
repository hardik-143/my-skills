import { set, unset, setIfMissing, inc, dec, createPatchEvent, normalizePatchEvent, applyPatches } from '../patches';

describe('patches', () => {
  describe('set', () => {
    it('creates a set patch', () => {
      const patch = set('title', 'Hello');
      expect(patch).toEqual({ type: 'set', path: 'title', value: 'Hello' });
    });
  });

  describe('unset', () => {
    it('creates an unset patch', () => {
      const patch = unset('title');
      expect(patch).toEqual({ type: 'unset', path: 'title' });
    });
  });

  describe('setIfMissing', () => {
    it('creates a setIfMissing patch', () => {
      const patch = setIfMissing('title', 'Default');
      expect(patch).toEqual({ type: 'setIfMissing', path: 'title', value: 'Default' });
    });
  });

  describe('inc', () => {
    it('creates an inc patch', () => {
      const patch = inc('count', 1);
      expect(patch).toEqual({ type: 'inc', path: 'count', value: 1 });
    });
  });

  describe('dec', () => {
    it('creates a dec patch', () => {
      const patch = dec('count', 1);
      expect(patch).toEqual({ type: 'dec', path: 'count', value: 1 });
    });
  });

  describe('createPatchEvent', () => {
    it('wraps patches in a PatchEvent', () => {
      const event = createPatchEvent(set('a', 1), set('b', 2));
      expect(event.patches).toHaveLength(2);
      expect(event.patches[0].path).toBe('a');
      expect(event.patches[1].path).toBe('b');
    });
  });

  describe('normalizePatchEvent', () => {
    it('passes through a PatchEvent', () => {
      const event = { patches: [set('x', 1)] };
      expect(normalizePatchEvent(event)).toBe(event);
    });

    it('wraps a raw value as a set on root', () => {
      const result = normalizePatchEvent('hello');
      expect(result.patches).toHaveLength(1);
      expect(result.patches[0].type).toBe('set');
      expect(result.patches[0].value).toBe('hello');
    });
  });

  describe('applyPatches', () => {
    it('applies set patches', () => {
      const doc = { title: 'Old' };
      const result = applyPatches(doc, [set('title', 'New')]);
      expect(result.title).toBe('New');
    });

    it('applies nested set patches', () => {
      const doc = { seo: { title: 'Old' } };
      const result = applyPatches(doc, [set('seo.title', 'New')]);
      expect((result.seo as Record<string, unknown>).title).toBe('New');
    });

    it('applies unset patches', () => {
      const doc = { title: 'Hello', subtitle: 'World' };
      const result = applyPatches(doc, [unset('subtitle')]);
      expect(result.subtitle).toBeUndefined();
    });

    it('applies setIfMissing patches', () => {
      const doc = { title: 'Exists' };
      const result = applyPatches(doc as Record<string, unknown>, [
        setIfMissing('title', 'Default'),
        setIfMissing('subtitle', 'New'),
      ]);
      expect(result.title).toBe('Exists');
      expect(result.subtitle).toBe('New');
    });

    it('applies inc patches', () => {
      const doc = { count: 5 };
      const result = applyPatches(doc, [inc('count', 3)]);
      expect(result.count).toBe(8);
    });

    it('applies dec patches', () => {
      const doc = { count: 5 };
      const result = applyPatches(doc, [dec('count', 2)]);
      expect(result.count).toBe(3);
    });

    it('does not modify the original document', () => {
      const doc = { title: 'Original' };
      const result = applyPatches(doc, [set('title', 'Changed')]);
      expect(doc.title).toBe('Original');
      expect(result.title).toBe('Changed');
    });
  });
});
