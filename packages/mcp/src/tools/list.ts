import { listItems } from '../registry/adapter';

export function handleList(params: {
  kind: 'components' | 'blocks' | 'templates' | 'themes';
  category?: string | undefined;
}) {
  const { kind, category } = params;
  const items = listItems(kind, category ?? undefined);

  return {
    kind,
    category: category || 'all',
    total: items.length,
    items,
  };
}
